<template>
	<div class="succ-rder" v-if="orderData!==null">
		<div class="stalls-tit">
			<div class="img-box"></div>
			<div class="stalls-name">{{orderData.boothName}}<span>({{orderData.canteenName}})</span></div>
		</div>
		<div class="stalls-toatl-price-wrapper">
			<div class="order-time">下单时间：{{orderData.ordertime}}</div>
			<div class="stalls-toatl-price">
				<span class="sum-tip">小计：</span>
				<span class="stalls-toatl-price-num">{{orderData.countprice}}</span>
			</div>
		</div>
		<div class="estimated-time" v-if="orderData.ordstatus==1">去付款</div>
		<div class="estimated-time" v-if="orderData.ordstatus==2">预计取餐时间：{{getFoodsTime}}</div>
		<div class="estimated-time" v-if="orderData.ordstatus==3">去评价</div>
		<div class="estimated-time" v-if="orderData.ordstatus==4">已退款</div>
		<div class="estimated-time" v-if="orderData.ordstatus==5">该订单已取消</div>
		<!-- <div class="take-meals-code">
			<span>取餐码：28号</span>
		</div> -->
	</div>
</template>

<script>
import {http_getOrderOneData} from '@/utils/http/http_getOrderOneData.js'
export default {
	data () {
		return {
			orderId: -1, // 订单号
			state: -1, // 订单状态 0 支付成功， 
			orderData: null, // 订单数据
			getFoodsTime: -1, // 取餐时间
		}
	},
	async onLoad(e) {
		
		console.log('订单号=> '+e.orderId)
		console.log('订单状态=> '+e.code)
		
		this.state = e.code
		// this.orderId = e.orderId
		this.orderId = 123
		// code规范
		// 0 支付成功
		// 1 用户余额不足
		// 2 该用户是新户,也是提示去充值
		
		
		// =================== 解开注释 ==================
		// 拿到支付成功的订单ID 发送请求获取该订单信息
		let getOrderOneData = await http_getOrderOneData(this.orderId)
		// code: 0,
		// orderInfo: {
		// 	boothName: "小小窗口",
		// 	boothNum: "1",
		// 	canteenName: "博信",
		// 	canteenNum: "1",
		// 	cid: null,
		// 	countprice: "99",
		// 	orderid: "Ds2003011600",
		// 	ordertime: "2020-03-01 16:00:58",
		// 	ordstatus: "1",
		// 	// ordstatus   1 待付款, 2 待取餐(已付款了)  3待评价(已取餐)   4退款(已退款)   5取消订单(已取消)
		// 	statusName: "待付款",
		// 	varlist: []            // 商品数据
		// }
		
		if(getOrderOneData.code === 0) {
			this.orderData = getOrderOneData.orderInfo
			console.log('订单信息↓')
			console.log(this.orderData)
			
			// 如果订单待取餐，那么就设置一个取餐时间，用订单下单时间+10分钟
			if(this.orderData.ordstatus==2) {
				let Millisecond = new Date(this.orderData.ordertime).getTime() + 600000
				let H = new Date(Millisecond).getHours()
				let M = new Date(Millisecond).getMinutes()
				this.getFoodsTime = H+':'+M
			}
			
			let tit = '订单状态'
			switch(this.orderData.ordstatus) {
				case '1': tit = '待付款'
				break
				case '2': tit = '待取餐'
				break
				case '3': tit = '待评价'
				break
				case '4': tit = '退款'
				break
				case '5': tit = '取消订单'
				break
			}
			
			// 设置当前页面标题 为 餐厅名
			uni.setNavigationBarTitle({
				title: tit
			})
			
			
		} else {
			console.log('获取订单数据失败')
		}
		// =================== 解开注释 ==================
		
		// uni.request({
		// 	url: 'http://jtxhkh.natappfree.cc/order/ordinfo/list?token=e42e76198744b1cd2e66b20f1a6d117a',
		// 	data: {orderId: e.orderId},
		// 	method: 'POST',
		// 	success: (res) => {
		// 		console.log('获取订单数据成功')
		// 		console.log(res.data)
		// 		// boothName: "小小窗口"
		// 		// boothNum: "1"
		// 		// canteenName: "博信"
		// 		// canteenNum: "1"
		// 		// cid: null
		// 		// countprice: "1e39"
		// 		// orderid: "Ds2003011600"
		// 		// ordertime: "2020-03-01 16:00:58"
		// 		// ordstatus: "1"
		// 		// statusName: "待付款"
		// 		// varlist: [] // 商品数据
		// 	},
		// 	fail: (err)=>{
		// 		console.log('失败')
		// 		console.log(err)
		// 	}
		// })
		
	}
}	
</script>

<style lang="stylus">
.succ-rder {
	padding: 0 30rpx;
	box-sizing: border-box;
	// 档口信息
	.stalls-tit {
		height: 120rpx;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #eee;
		.img-box {
			width: 100rpx;
			height: 100rpx;
			border-radius: 10rpx;
			margin-right: 20rpx;
			background-color: #eee;
		}
		.stalls-name {
			height: 100rpx;
			font-size: 36rpx;
			line-height: 100rpx;
			font-weight: 700;
			color: #666;
			span {
				font-size: 26rpx;
				margin-left: 20rpx;
			}
		}
		
	}
	
	// 预计取餐时间、总价
	.stalls-toatl-price-wrapper {
		height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid #eee;
		margin-bottom: 30rpx;
		.order-time {
			font-size: 24rpx;
			color: #666;
		}
		.stalls-toatl-price {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			.sum-tip{
				font-size: 24rpx;
				color: #666;
			}
			.stalls-toatl-price-num{
				font-size: 36rpx;
				color: #666;
				font-weight: 700;
			}
		}
	}
	
	
	// 预计取餐时间
	.estimated-time {
		text-align: center;
		font-weight: 700;
		font-size: 24rpx;
		color: #666;
		margin-bottom: 24rpx;
	}
	
	// 取餐码
	.take-meals-code {
		text-align: center;
		span {
			display: inline-block;
			height: 60rpx;
			line-height: 60rpx;
			padding: 0 36rpx;
			color: #666;
			font-size: 24rpx;
			margin: 0 auto;
			border:1rpx solid #0177BF;
			border-radius: 10rpx;
		}
	}
}
</style>
