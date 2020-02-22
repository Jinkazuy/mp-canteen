<template>
	<div class="order-detail">
		<div class="order-detail-state">
			<div class="order-detail-state-tit">订单待取餐 ></div>
			<div class="order-detail-state-text">
				<p class="state-text-describe">预计取餐时间：11:58</p>
				<div class="state-text-other">
					<!-- type-text 目前只有 订单取消 才有 -->
					<div class="other-type-text">超过15分钟未支付，订单自动取消</div>
					<!-- <div class="other-type-btns"> -->
						<!-- 取餐码 -->
						<!-- <div class="type-btns-take-meals">取餐码：28号</div> -->
						<!-- 取消订单&去支付 -->
						<!-- <div class="type-btns-take-cancel">取消订单</div> -->
						<!-- <div class="type-btns-take-payment">去支付（还剩14分20秒）</div> -->
						<!-- 评价&查看评价 -->
						<!-- <div class="type-btns-take-to-evaluate">评价</div> -->
						<!-- <div class="type-btns-take-view-payment">查看评价</div> -->
					<!-- </div> -->
				</div>
			</div>
		</div>
		<div class="order-detail-info">
			<div class="info-tit">
				<div class="img-box">
					<!-- <img src=""> -->
				</div>
				<div class="stalls-title">
					<p>A2档口（第一食堂）</p>
					<div class="arrow-icon"></div>
				</div>
			</div>
			<div class="stalls-goods-item" v-for="(item,index) in [1,1,1]" :key="index">
				<p class="goods-name">广式云吞</p>
				<p class="goods-count">x1</p>
			</div>
			<div class="order-time-total-count">
				<div class="order-time">下单时间：2020-01-30 11:48</div>
				<div class="total-count">共8件商品</div>
			</div>
			<div class="subtotal">
				<span class="subtotal-tt">小计：</span>
				<span class="subtotal-num">243.21</span>
			</div>
		</div>
	</div>
</template>

<script>
// 拿到vuex中的函数
import {mapGetters, mapMutations} from 'vuex'
export default {
	data () {
		return {
			
		}
	},
	onLoad(data) {
		console.log(data.orderId)
	},
	methods: {
		
	},
	computed: {
		...mapGetters([])
	}
}
</script>

<style lang="stylus">
page{
	background-color: #eee;
}
.order-detail {
	padding: 20rpx 30rpx 0;
	box-sizing: border-box;
	.order-detail-state, .order-detail-info {
		background-color: #fff;
		border-radius: 10rpx;
	}
	.order-detail-state {
		.order-detail-state-tit {
			padding: 0 20rpx;
			box-sizing: border-box;
			height: 100rpx;
			border-bottom: 1rpx solid #eee;
			line-height: 100rpx;
			font-size: 36rpx;
			color: #333;
		}
		.order-detail-state-text {
			padding: 30rpx 20rpx;
			box-sizing: border-box;
			.state-text-describe {
				font-size: 24rpx;
				color: #666;
				line-height: 1;
				margin-bottom: 30rpx;
			}
			.state-text-other {
				.other-type-text {
					font-size: 18rpx;
					color: #666;
					line-height: 1;
				}
				.other-type-btns {
					display: flex;
					height: 50rpx;
					align-items: center;
					div {
						border-radius: 10rpx;
						line-height: 1;
						padding: 14rpx 26rpx;
						box-sizing: border-box;
						border-width: 1rpx;
						border-style:solid;
						font-size: 24rpx;
						color: #666;
						margin-right: 20rpx;
						// border-color:#666;
					}
					.type-btns-take-meals {
						border-color: #0177BF;
					}
					.type-btns-take-cancel,
					.type-btns-take-to-evaluate,
					.type-btns-take-view-payment
					{
						border-color: #666;
					}
					.type-btns-take-payment {
						border-color: #F3463D;
						color: #F3463D;
					}
				}
			}
		}
	}
	.order-detail-info {
		margin-top: 20rpx;
		// padding: 0rpx;
		// box-sizing: border-box;
		.info-tit {
			display: flex;
			align-items: center;
			height: 90rpx;
			padding: 10rpx 0 0 20rpx;
			box-sizing: border-box;
			.img-box {
				flex-basis: 60rpx;
				height: 60rpx;
				border-radius: 10rpx;
				background-color: #eee;
				margin-right: 20rpx;
			}
			.stalls-title {
				flex: 1;
				height: 80rpx;
				display: flex;
				align-items: center;
				border-bottom: 1rpx solid #eee;
				box-sizing: border-box;
				p {
					margin-right: 12rpx;
					font-size: 24rpx;
					color: #333;
				}
				.arrow-icon {
					line-height: 1;
					width: 12rpx;
					height: 22rpx;
					background-color: #eee;
				}
			}
		}
		.stalls-goods-item {
			display: flex;
			justify-content: space-between;
			padding-left: 100rpx;
			box-sizing: border-box;
			height: 70rpx;
			font-size: 24rpx;
			color: #333;
			.goods-name, .goods-count {
				display: flex;
				align-items: center;
				height: 100%;
				border-bottom: 1rpx solid #eee;
				box-sizing: border-box;
				line-height: 1;
			}
			.goods-name {
				flex: 1;
			}
			.goods-count {
				flex-basis: 80rpx;
				padding-right: 20rpx;
				justify-content: flex-end;
			}
		}
		.order-time-total-count {
			height: 84rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 20rpx;
			box-sizing: border-box;
			.order-time {
				font-size: 20rpx;
				color: #333;
			}
			.total-count {
				font-size: 24rpx;
				color: #999;
			}
		}
		.subtotal {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			padding: 0 20rpx 26rpx 0;
			box-sizing: border-box;
			color: #666;
			.subtotal-tt {
				font-size: 24rpx;
			}
			.subtotal-sum {
				font-size: 36rpx;
				font-weight: 700;
			}
		}
	}
	
}
</style>
