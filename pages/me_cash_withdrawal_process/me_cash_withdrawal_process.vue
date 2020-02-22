<template>
	<div class="me-cash-withdrawal-process">
		<div class="step-wrapper">
			<div class="left-lines-box">
				<div class="round-o"></div>
				<div class="lines-o"></div>
				<div class="lines-icon">
					<img src="../../common/images/me/time.svg">
				</div>
				<div class="lines-t"></div>
				<div class="round-t"></div>
			</div>
			
			<div class="text-group">
				<p class="text-o">发起提现申请</p>
				<p class="text-t">处理中</p>
				<p class="text-h">预计2小时到账</p>
				<p class="text-r">到账成功</p>
			</div>
		</div>
		<div class="cash-withdrawal-info">
			<div class="cash-withdrawal-info-tit">提现金额</div>
			<div class="cash-withdrawal-info-num">￥10</div>
		</div>
		<van-button
		round 
		type="primary" 
		class="submit-btn" 
		@click="closeProcess">完成</van-button>
	</div>
</template>

<script>
export default {
	data () {
		return {}
	},
	methods: {
		closeProcess() {
			uni.switchTab({
				url: '../../pages/me/me',
				complete (res) {
					console.log(res)
				}
			})
		}
	}
}
</script>

<style lang="stylus">
.me-cash-withdrawal-process {
	padding: 90rpx 50rpx 0;
	box-sizing: border-box;
	.step-wrapper {
		display: flex;
		padding: 0 0 80rpx 66rpx;
		border-bottom: 1rpx solid #999;
		box-sizing: border-box;	
		.left-lines-box {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: 8rpx 0;
			box-sizing: border-box;
			width: 36rpx;
			// background-color: #eee;
			.round-o, .round-t {
				width: 14rpx;
				height: 14rpx;
				border-radius: 50%;
			}
			.round-o {
				background-color: #0177BF;
			}
			.round-t {
				background-color: #BFBFBF;
			}
			.lines-icon {
				width: 36rpx;
				height: 36rpx;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.lines-o, .lines-t {
				width: 2rpx;
				margin-left: 2rpx;
				box-sizing: border-box;
			}
			.lines-o {
				height: 80rpx;
				border-left: 2rpx dashed #0177BF;
			}
			.lines-t {
				height: 120rpx;
				border-left: 2rpx dashed #BFBFBF;
			}
		}
		.text-group {
			margin-left: 26rpx;
			.text-o,
			.text-t,
			.text-h,
			.text-r{
				font-size: 30rpx;
				line-height: 1;
			}
			.text-o {
				color: #666;
				margin-bottom: 78rpx;
			}
			.text-t {
				color: #0177BF;
				margin-bottom: 20rpx;
			}
			.text-h {
				color: #999;
				margin-bottom: 66rpx;
			}
			.text-r {
				color: #999;
			}
		}
	}
	
	.cash-withdrawal-info {
		display: flex;
		justify-content: space-between;
		margin: 20rpx 0 400rpx;
		align-items: center;
		font-size: 30rpx;
		.cash-withdrawal-info-tit {
			color: #999;
		}
		.cash-withdrawal-info-num {
			color: #333;
			font-size: 700;
		}
	}
	
	.submit-btn{
		display: flex;
		justify-content: center;
	}
	.van-button--primary, {
		margin: 0 auto !important;
		width: 300rpx;
		color: #0177BF !important;
		border-radius: 10rpx !important;
		background-color: #DCDCDC !important;
		border: none !important;
		font-size: 30rpx !important;
		line-height: 36rpx !important;
		transition: all .4s !important;
	}
}
</style>
