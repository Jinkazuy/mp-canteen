<template>
	<div class="order">
		<div class="no-log" v-if="!watchIsLogin">
			<img src="../../common/images/order/order-err.png" class="err-img">
			<p>您还没有登录，请登录后查看订单</p>
			<van-button round type="primary" class="log-in" @click="openLogin" v-if="!watchIsLogin">登录</van-button>
		</div>
		<div class="order-wrapper" v-if="watchIsLogin">
			<tablayout :tabData="tabs" :defaultIndex="defaultIndex" @tabClick='tabClick'></tablayout>
			<div class="order-list">
				<!-- 这里的store_orderData是order.vue通过mapGetters拿到的 -->
				<!-- 这里的渲染逻辑就是，当订单类型===tab切换的索引数字时 或者 tab的索引数字是0(全部渲染) -->
				<orderCard 
					v-for="(item, index) in store_orderData" 
					:key="index" 
					:orderItemInfo="item"
					v-if="item.orderType === defaultIndex || defaultIndex === 0">
				</orderCard>
			</div>
			<!-- 暂无订单，根据不同订单切换 -->
			<div class="no-order-type">
				
				<!-- 没有任何订单 -->
				<img src="../../common/images/order/ToBeEvaluated.png" class="no-order-type-img" v-if="defaultIndex === 0 && store_orderData.length===0">
				<p v-if="defaultIndex === 0 && store_orderData.length===0">您没有订单</p>
				<p v-if="defaultIndex === 0 && store_orderData.length===0">-</p>
				<p v-if="defaultIndex === 0 && store_orderData.length===0">请下拉刷新</p>
				
				<!-- 待付款 -->
				<img src="../../common/images/order/pendingPay.png" class="no-order-type-img" v-if="defaultIndex === 1 && pendingPay===0">
				<p v-if="defaultIndex === 1 && pendingPay===0">您没有待付款的订单</p>
				
				<!-- 待取餐 -->
				<img src="../../common/images/order/WaitGetMeal.png" class="no-order-type-img" v-if="defaultIndex === 2 && WaitGetMeal===0">
				<p v-if="defaultIndex === 2 && WaitGetMeal===0">您没有待取餐的订单</p>
				
				<!-- 待评价 -->
				<img src="../../common/images/order/ToBeEvaluated.png" class="no-order-type-img" v-if="defaultIndex === 3 && ToBeEvaluated===0">
				<p v-if="defaultIndex === 3 && ToBeEvaluated===0">您没有待评价的订单</p>
				
				<!-- 退款/取消 -->
				<img src="../../common/images/order/refundOrCanle.png" class="no-order-type-img" v-if="defaultIndex === 4 && refundOrCanle===0">
				<p v-if="defaultIndex === 4 && refundOrCanle===0">您没有退款/取消的订单</p>
				
			</div>
		</div>
	</div>
</template>

<script>
// 拿到vuex中的函数
import {mapGetters, mapMutations} from 'vuex'
// 检测是否登录、token是否过期
import {isLogin} from '@/utils/utils.js'
// tablayout
import tablayout from '@/components/liuyuno-tabs/liuyuno-tabs.vue'
// 订单卡片
import orderCard from '@/components/layout/orderCard.vue'
// http 获取用户订单数据
import {http_getOrderData} from '@/utils/http/http_getOrderData.js'
export default {
	data() {
		return {
			// 是否登录
			watchIsLogin:false,
			// tablayout索引
			defaultIndex: 0,
			// tablayout内容
			tabs: ['全部','待付款','待取餐','待评价','退款/取消'],
			
			// 每种类别订单的分别的个数
			// 1 待付款
			pendingPay: 0,
			// 2 待取餐
			WaitGetMeal: 0,
			// 3 待评价
			ToBeEvaluated: 0,
			// 4 退款/取消
			refundOrCanle: 0,
			// 5 已完成
			compl: 0,
			
		}
	},
	onShow() {
		// this.watchIsLogin = isLogin()
		this.watchIsLogin = true
		// 获取用户订单数据
		this.getOrderData()
	},
	methods: {
		openLogin() {
			uni.navigateTo({
				url: '../../pages/login/login',
				complete (res) {
					console.log(res)
				}
			})
		},
		// 获取订单数据
		async getOrderData() {
			let res = await http_getOrderData()
			console.log('订单数据↓')
			console.log(this.store_orderData)
			
			// 然后计算出每个类别的订单的个数
			
			// 先清空
			// 1 待付款
			this.pendingPay =  0
			// 2 待取餐
			this.WaitGetMeal = 0
			// 3 待评价
			this.ToBeEvaluated = 0
			// 4 退款/取消
			this.refundOrCanle = 0
			// 5 已完成
			this.compl = 0
			
			for(let i = 0; i<this.store_orderData.length; i++) {
				console.log(this.store_orderData[i].orderType)
				
				if(this.store_orderData[i].orderType===1) {
					this.pendingPay+=1
				} else if (this.store_orderData[i].orderType===2) {
					this.WaitGetMeal+=1
				} else if (this.store_orderData[i].orderType===3) {
					this.ToBeEvaluated+=1
				} else if (this.store_orderData[i].orderType===4) {
					this.refundOrCanle+=1
				} else if (this.store_orderData[i].orderType===5) {
					this.compl+=1
				}
			}
			
		},
		// tablayout 切换时获取当前tab索引
		tabClick (e) {
			console.log('当前tab=>'+e)
			this.defaultIndex = e
			
			// 根据索引来切换当前页面中显示的订单的类型
			// 0 全部订单
			// 1 待付款
			// 2 待取餐
			// 3 待评价
			// 4 退款/取消
		},
		...mapMutations({
			// 这里映射了这个方法，那么在调用x的时候，就等于使用了this.$store.commit('SET_SINGER', value)这个方法；
			setToken: 'setToken',
			setTokenExpiration: 'setTokenExpiration',
			setUserPhone: 'setUserPhone',
			setUserInfo: 'setUserInfo'
		}),
	},
	computed: {
		// vuex提供的辅助函数，拿到store/getters.js向外暴露的内容；
		...mapGetters([
			'store_UserInfo',
			'store_UserInfoData', // 用户详细数据
			'store_UserPhone',
			'store_token',
			'store_tokenExpiration',
			'store_orderData' // 用户订单数据
		])
	},
	components: {
		tablayout,
		orderCard
	}
	
}
</script>

<style lang="stylus">
page {
	background-color: #F5F5F5;
}	
.order {
	.no-log {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.err-img {
			display: block;
			margin: 84rpx 0 72rpx;
			width: 376rpx;
			height: 264rpx;
		}
		p {
			font-size: 24rpx;
			color: #777;
			line-height: 1;
		}
		
		.van-button--primary{
			margin: 32rpx auto 0!important;
			width: 200rpx;
			height: 70rpx;
			color: #fff !important;
			border-radius: 16rpx !important;
			background-color: #0177BF !important;
			border: none !important;
			font-size: 30rpx !important;
			line-height: 70rpx !important;
		}
	}
	
	.order-wrapper {
		position: relative;
		width: 100%;
		.order-list {
			width: 100%;
			padding: 20rpx 30rpx;
			box-sizing: border-box;
		}
		.no-order-type {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.no-order-type-img {
				display: block;
				margin: 84rpx 0 72rpx;
				width: 376rpx;
				height: 264rpx;
			}
			p {
				font-size: 24rpx;
				color: #777;
				line-height: 1;
			}
		}
	}
}
</style>
