<template>
	<div class="succ-rder">
		<div class="stalls-tit">
			<div class="img-box"></div>
			<div class="stalls-name">麦当劳档口<span>(第一食堂)</span></div>
		</div>
		<div class="stalls-toatl-price-wrapper">
			<div class="order-time">下单时间：2020-02-19 11</div>
			<div class="stalls-toatl-price">
				<span class="sum-tip">小计：</span>
				<span class="stalls-toatl-price-num">243.21</span>
			</div>
		</div>
		<div class="estimated-time">预计取餐时间：11:58</div>
		<div class="take-meals-code">
			<span>取餐码：28号</span>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			
		}
	},
	onLoad(e) {
		console.log(e.succOrderId)
		// 拿到支付成功的订单ID，去store中找到，然后显示
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
