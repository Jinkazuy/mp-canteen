<template>
	<div class="order-refund-detail">
		<div class="order-refund-detail-warpper">
			<div class="order-refund-tit">退款成功</div>
			<div class="order-refund-state">已到账</div>
			<div class="order-refund-money-wrapper">
				<span class="money-tit">退款金额</span>
				<span class="money-price">¥232.24</span>
			</div>
			<div class="order-refund-account-wrapper">
				<span class="account-tit">退款账户</span>
				<span class="account-type">原支付账户</span>
			</div>
			<div class="space-onex"></div>
			<div class="order-refund-process-wrapper">
				<div class="process-tit">退款流程</div>
				<div class="step-wrapper">
					<div class="left-lines-box">
						<div class="round-o"></div>
						<div class="lines-o"></div>
						<div class="round-t"></div>
						<div class="lines-t"></div>
						<div class="round-th"></div>
					</div>
					
					<div class="text-group">
						<p class="text-o">发起退款申请</p>
						<p class="text-t">2020-02-02 12:20</p>
						<p class="text-h">商家同意退款</p>
						<p class="text-r">2020-02-02 12:20</p>
						<p class="text-f text-act">到账成功</p>
						<p class="text-x">2020-02-02 12:20</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {}
	},
	methods: {
		
	}
}
</script>

<style lang="stylus">
page {
	background-color: #eee;
}
.order-refund-detail {
	.order-refund-detail-warpper {
		position: fixed;
		top: 20rpx;
		left: 30rpx;
		right: 30rpx;
		bottom: 40rpx;
		border-radius: 10rpx;
		border-top: 16rpx solid #0177BF;
		padding: 30rpx 20rpx 0; 
		box-sizing: border-box;
		background-color: #fff;
		line-height: 1;
		
		.order-refund-tit {
			margin-bottom: 20rpx;
			font-size: 36rpx;
			color: #333;
		}
		
		.order-refund-state {
			margin-bottom: 46rpx;
			font-size: 24rpx;
			color: #333;
		}
		
		.order-refund-money-wrapper, .order-refund-account-wrapper {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 40rpx;
			.money-tit, .account-tit {
				font-size: 24rpx;
				color: #666;
			}
			.money-price, .account-type{
				font-size: 30rpx;
				color: #333;
			}
		}
		
		.space-onex {
			width: 100%;
			height: 1rpx;
			background-color: #eee;
			margin-bottom: 30rpx;;
		}
		
		.order-refund-process-wrapper {
			.process-tit {
				margin-bottom: 52rpx;
				font-size: 30rpx;
				color: #333;
			}
			.step-wrapper {
				display: flex;
				padding: 0 0 0 12rpx;
				box-sizing: border-box;	
				.left-lines-box {
					display: flex;
					flex-direction: column;
					justify-content: start;
					align-items: center;
					padding: 8rpx 0 0;
					box-sizing: border-box;
					width: 36rpx;
					// background-color: #eee;
					.round-o, .round-t, .round-th {
						width: 14rpx;
						height: 14rpx;
						border-radius: 50%;
						background-color: #0177BF;
					}
					.lines-o, .lines-t {
						width: 2rpx;
						margin-left: 2rpx;
						box-sizing: border-box;
						height: 94rpx;
						border-left: 2rpx dashed #0177BF;
					}
				}
				.text-group {
					margin-left: 32rpx;
					line-height: 1;
					.text-o,
					.text-h,
					.text-f{
						margin-bottom: 8rpx;
						font-size: 30rpx;
						line-height: 1;
						color: #666;
					}
					.text-t, .text-r, .text-x {
						margin-bottom: 46rpx;
						font-size: 20rpx
						color: #999;
					}
					.text-r {
						margin-bottom: 50rpx;
					}
					
					.text-act {
						color: #0177BF;
					}
				}
			}
		}
		
		
		
		
	}
}
</style>
