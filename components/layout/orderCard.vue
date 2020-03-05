<template>
	<div class="orderCard" @click="openOrderDetail">
	<!-- <div class="orderCard"> -->
		<!-- 表头 -->
		<div class="orderCard-head">
			<div class="img-box">
				<img :src="orderItemInfo.restaurantImg">
			</div>
			<div class="title nowrap">{{orderItemInfo.restaurantTitle}}<i></i></div>
			<div class="order-state">{{orderItemInfo.orderState}}</div>
		</div>
		<!-- 内容 -->
		<div class="orderCard-cont">
			<ul class="goods-list">
				<li v-for="(item, index) in orderItemInfo.foodList" :key="index">
					<span class="goods-name">{{item.foodName}}</span>
					<span class="goods-count">x{{item.foodCount}}</span>
				</li>
			</ul>
			<div class="order-time-and-count-and-payment">
				<span class="order-time">下单时间：{{orderItemInfo.reserveTime}}</span>
				<span class="order-count-and-payment">共{{OrderFoodsCount}}件商品，实付¥32</span>
			</div>
		</div>
		<!-- 底部 -->
		<div class="orderCard-footer">
			<span class="meal-number" v-if="orderItemInfo.orderType===2">取餐码：{{orderItemInfo.orderType===2?orderItemInfo.getFoodNumber:''}}号</span>
			<div class="footer-btns">
				<div class="btn-item footer-btn-canle" v-if=" orderItemInfo.orderType===1 || orderItemInfo.orderType===2">取消订单</div>
				<div class="btn-item footer-btn-evaluate" v-if="orderItemInfo.orderType===5" @click="openEvaluate">评价</div>
				<div class="btn-item footer-btn-topay" v-if=" orderItemInfo.orderType===1">去支付（还剩14分20秒）</div>
				<div class="btn-item footer-btn-confirm" v-if="orderItemInfo.orderType===2">确认取餐</div>
				<!-- <div class="btn-item footer-btn-refund">退款详情</div> -->
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		orderItemInfo: {
			type: Object,
			default() {
				return {}
			}
		}
	},
	data () {
		return 	{
			// 该订单的商品总数
			OrderFoodsCount: 0,
			// 该订单的总金额
			OrderFoodsSunMoney: 0
		}
	},
	created() {
		this.resFoodsCount()
	},
	methods: {
		
		// 计算商品总数
		resFoodsCount() {
			let count = 0;
			for (let i = 0; i<this.orderItemInfo.foodList.length; i++) {
					count += parseInt(this.orderItemInfo.foodList[i].foodCount)
			}
			this.OrderFoodsCount = count
		},
		// 计算商品金额
		resSumMoney() {
			
		},
		
		// 跳转到订单详情页
		openOrderDetail() {
			let orderId = 12
			// 将本订单ID传过去
			uni.navigateTo({
				url: '../../pages/order_detail/order_detail?orderId=' + orderId,
				complete (res) {
					console.log(res)
				}
			})
		},
		
		// 点击评价按钮，跳转到评价页
		openEvaluate() {
			let orderId = 12
			// 将本订单ID传过去
			uni.navigateTo({
				url: '../../pages/order_evaluate/order_evaluate?orderId=' + orderId,
				complete (res) {
					console.log(res)
				}
			})
		}
	},
	computed: {
		
	}
}
</script>

<style lang="stylus">
	.orderCard {
		width: 100%;
		padding: 20rpx 0 20rpx 20rpx;
		box-sizing: border-box;
		background-color: #fff;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
		// 头部
		.orderCard-head {
			height: 80rpx;
			width: 100%;
			display: flex;
			align-items: center;
			position: relative;
			.img-box {
				width: 80rpx;
				height: 80rpx;
				border-radius: 10rpx;
				overflow: hidden;
				background-color: #eee;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.title {
				display: flex;
				height: 100%;
				align-items: center;
				padding-left: 20rpx;
				flex: 1;
				font-size: 30rpx;
				color: #333;
				font-weight: 700;
				border-bottom: 1rpx solid #eee;
				box-sizing: border-box;
				i {
					margin-top: 3rpx;
					width: 15rpx;
					height: 26rpx;
					background: url(../../common/images/order/arrRig.png) no-repeat;
					background-size: 100%;
				}
			}
			.order-state {
				height: 100%;
				width: 160rpx;
				text-align:right;
				line-height: 80rpx;
				font-size: 24rpx;
				padding-right: 20rpx;
				border-bottom: 1rpx solid #eee;
				box-sizing: border-box;
				color: #999999;
			}
		}
		
		// 食品内容
		.orderCard-cont {
			width: 100%;
			padding: 20rpx 20rpx 20rpx 0;
			box-sizing: border-box;
			background-color: #fff;
			.goods-list {
				width: 100%;
				padding-left: 100rpx;
				box-sizing: border-box;
				li {
					width: 100%;
					display: flex;
					margin-bottom: 20rpx;
					justify-content: space-between;
					font-size: 24rpx;
					color: #333;
					line-height: 1;
					.goods-name {
						
					}
					.goods-count {}
				}
				li:last-of-type {
					margin-bottom: 0;
				}
			}
			.order-time-and-count-and-payment {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				margin-top: 38rpx;
				.order-time {
					font-size: 20rpx;
					color: #333;
				}
				.order-count-and-payment {
					font-size: 24rpx;
					color: #999;
				}
			}
		}
		
		// 底部
		.orderCard-footer {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			margin-top: 4rpx;
			padding-right: 20rpx;
			box-sizing: border-box;
			.meal-number {
				width: 220rpx;
				font-size: 30rpx;
				color: #F04848;
				font-weight: 700;
			}
			.footer-btns {
				flex: 1;
				display: flex;
				justify-content: flex-end;
				height: 50rpx;
				.btn-item {
					height: 100%;
					padding: 0 18rpx;
					box-sizing: border-box;
					font-size: 24rpx;
					line-height: 50rpx;
					color: #666;
					border: 1rpx solid #666;
					border-radius: 10rpx;
					margin-left: 16rpx;
				}
				.footer-btn-topay {
					color: #F3463D;
					border: 1rpx solid #F3463D;
				}
			}
		}
	}
</style>
