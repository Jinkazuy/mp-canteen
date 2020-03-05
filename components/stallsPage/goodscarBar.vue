<template>
	<div class="car-bar">
		<div class="car-bar-left-box" @click="openCar">
			<div class="car-icon-wrapper">
				<!-- 当该商户下的购物车个数大于1，那么就改变购物车icon样式 -->
				<!-- <div :class="{store_ttt?'car-icon-nor':'car-icon-cat'}"> -->
				<div :class="[{'car-icon-nor':userGoodsCarTotalCount<=0}, {'car-icon-act':userGoodsCarTotalCount>0}]">
					<i></i>
				</div>
				<div class="arr-num" :animation="redDit" v-if="userGoodsCarTotalCount>0">{{userGoodsCarTotalCount}}</div>
			</div>
			<div class="payment-amount">￥{{userGoodsCarTotalPrice}}元</div>
		</div>
		<div 
			:class="[{'payment-btn-nor':userGoodsCarTotalCount<=0}, {'payment-btn-act':userGoodsCarTotalCount>0}]"
			@click="toSettlementPage"
			>{{userGoodsCarTotalCount>0?'去结算':'请选餐'}}</div>
	</div>
</template>

<script>
// 拿到vuex中的函数
import {mapGetters, mapMutations, mapActions} from 'vuex'	
// 判断用户是否登录
import {isLogin} from '@/utils/utils.js'
export default {
	props: {
		// 食堂ID
		canteenID: {
			type: Number,
			default() {
				return -1
			}
		},
		// 档口ID
		stallID: {
			type: Number,
			default() {
				return -1
			}
		},
		// 购物车  商品总数
		userGoodsCarTotalCount: {
			type: Number,
			default() {
				return -1
			}
		},
		// 购物车  商品总价格
		userGoodsCarTotalPrice: {
			type: Number,
			default() {
				return -1
			}
		},
	},
	data() {
		return {
			
			// 设置小红点动画
			redDit: {},
			// 需要两个动画对象，因为抖动A控制放大，然后B控制立刻缩小
			// animation 对象
			animationA: {},
			animationB: {},
			
			// 购物车浮层
			carPopShow: true,
			
			// 该食堂下、该档口的购物车中的数据，用于转移到订单
			// thatGoodsCardDatas: null
			
		}
	},
	
	methods: {
		openCar() {
			if(this.userGoodsCarTotalCount>0) {
				// 点击购物车,调用父级传入的函数,由此触发父级函数,打开购物车列表浮层
				this.$emit('opengoodscar')
			}
		},
		
		// 去支付
		toSettlementPage() {
			
			if(this.userGoodsCarTotalCount>0) {
				// 已登录，跳转到下单页，并且把食堂ID、名称，档口ID传入、名称
				// 跳转到登录页
				uni.navigateTo({
					// 跳转路径
					// 摊位列表页
					url: '../../pages/confirmationOrder/confirmationOrder?canteenID=' +this.canteenID+ '&stallID=' +this.stallID
				})
			}
			
		},
		
		
		// 当该购物车中，该商户下的内容发生变化时，那么就让红色小点显示
		...mapMutations([
			'setDidNotPayOrderData'
		]),
		...mapActions([
			'clearUserGoodsCar' // 清除本地的该食堂下档口的购物车
		])
	},
	mounted() {
		// 小红点动画
		
		// 此时拿到了这个动画函数，在减号的DIV上 给  :animation="ani" 属性就行
		// 然后看文档操作 https://uniapp.dcloud.io/api/ui/animation?id=createanimation
		this.animationA = new uni.createAnimation({
			duration : 200,	// number 	400 	否 	动画持续时间，单位 ms
			timingFunction : 'linear',	// string 	'linear' 	否 	动画的效果
			delay : 0,	// number 	0 	否 	动画延迟时间，单位 ms
			transformOrigin: '50% 50%', // string 	'50% 50% 0' 	否
		})
		
		this.animationB = new uni.createAnimation({
			duration : 200,	// number 	400 	否 	动画持续时间，单位 ms
			timingFunction : 'linear',	// string 	'linear' 	否 	动画的效果
			delay : 0,	// number 	0 	否 	动画延迟时间，单位 ms
			transformOrigin: '50% 50%', // string 	'50% 50% 0' 	否
		})
		
	},
	computed: {
		...mapGetters([
			'store_ttt',
			'store_ballXY',
			'store_userGoodsCarDatas',
			'store_UserInfoData'
		])
	},
	watch: {
		store_ttt(newVal, oldVal) {
			// 当新的值大于旧的值的时候,做小红点显示、抖动的动画
			if(newVal>oldVal) {
				console.log('购物车增加')
				// 顺序不要搞乱
				this.animationA.scale(1.3).step()
				this.redDit = this.animationA.export()
				
				// 控制缩小，这里要等放大结束，也就是上边设置的 duration : 200, 毫秒
				clearTimeout(dd)
				let dd = setTimeout(()=>{
					this.animationA.scale(1.0).step()
					this.redDit = this.animationA.export()
				},210)
			} 
		},
	}
}
</script>

<style lang="stylus">
.car-bar {
	display: flex;
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	height: 96rpx;
	// background-color: #141d27;
	background-color: #4D4B4A;
	.car-bar-left-box {
		position: relative;
		height: 100%;
		flex: 1;
		background-color: #4D4B4A;
		.car-icon-wrapper {
			position: absolute;
			left: 24rpx;
			bottom: 4rpx;
			width: 112rpx;
			height: 112rpx;
			box-sizing: border-box;
			border-radius: 50%;
			padding: 12rpx;
			background-color: #4D4B4A;
			.car-icon-nor, .car-icon-act {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 100%;
				border-radius: 50%;
				transition: all .3s;
				i {
					width: 40rpx;
					height: 40rpx;
					background-position: center;
					background-size: 100%;
					background-repeat: no-repeat;
					transition: all .3s;
				}
			}
			.car-icon-nor {
				background-color: #2b343c;
				i {
					background-image: url('../../common/images/stalls/icon-car-nor.png');
				}
			}
			.car-icon-act {
				background-color: #fff;
				i {
					background-image: url('../../common/images/stalls/icon-car-act.png');
				}
			}
			.arr-num {
				position: absolute;
				right: 10rpx;
				top: 10rpx;
				width: 30rpx;
				height: 30rpx;
				background-color: #FC5858;
				border-radius: 50%;
				font-size: 18rpx;
				color: #fff;
				line-height: 30rpx;
				text-align: center;
			}
		}
		.payment-amount {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 160rpx;
			right: 50rpx;
			height: 100%;
			line-height: 96rpx;
			font-size: 36rpx;
			font-weight: 700;
			color: #fff;
		}
	}
	.payment-btn-nor, .payment-btn-act {
		flex-basis: 200rpx;
		height: 100%;
		font-size: 30rpx;
		font-weight: 700;
		line-height: 96rpx;
		text-align: center;
	}
	.payment-btn-nor {
		background-color: #737373;
		color: #fff;
	}
	.payment-btn-act {
		background-color: #3ECC78;
		color: #fff;
	}
}
</style>
