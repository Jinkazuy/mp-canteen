<template>
	<div class="me-recharge">
		<div class="me-recharge-tit">账户余额</div>
		<div class="me-recharge-num">¥20.05</div>
		<div class="me-recharge-sel-box">
			<div class="sel-btn-wra-o">
				<div class="btn-wra-o-l">100元</div>
				<div class="btn-wra-o-r">200元</div>
			</div>
			<div class="sel-btn-wra-t">
				<div class="btn-wra-o-l">300元</div>
				<div class="btn-wra-o-r">其他金额</div>
			</div>
		</div>
		<van-button
		round 
		type="primary"
		class="btn-on-recharge" 
		@click="onRecharge">充值</van-button>
		<div class="me-recharge-record">
			<p>充值记录</p>
			<i></i>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			
		}
	},
	methods: {
		onRecharge() {
			console.log('充值按钮')
		}
	}
}
</script>

<style lang="stylus">
.me-recharge {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 60rpx 30rpx;
	box-sizing: border-box;
	
	.me-recharge-tit {
		font-size: 30rpx;
		color: #666;
		margin-bottom: 20rpx;
	}
	.me-recharge-num {
		font-size: 72rpx;
		color: #333;
		margin-bottom: 88rpx;
		font-weight: 700;
	}
	.me-recharge-sel-box {
		padding: 0 44rpx;
		box-sizing: border-box;
		.sel-btn-wra-o, .sel-btn-wra-t {
			height: 100rpx;
			display: flex;
			justify-content: center;
			font-size: 36rpx;
			color: #A0A0A0;
			line-height: 100rpx;
			text-align: center;
			.btn-wra-o-l, .btn-wra-o-r {
				height: 100%;
				width: 270rpx;
				border-radius: 10rpx;
				border-width: 1rpx;
				border-style: solid;
				border-color: #A0A0A0;
				color: #A0A0A0;
			}
			.btn-wra-o-l {
				margin-right: 60rpx;
			}
			.btn-wra-o-r {}
		}
		.sel-btn-wra-o {
			margin-bottom: 40rpx;
		}
	}
	
	.btn-on-recharge{
		display: flex;
		justify-content: center;
	}
	.van-button--primary, {
		margin: 40rpx auto 100rpx !important;
		width: 600rpx;
		color: #fff !important;
		border-radius: 10rpx !important;
		background-color: #0177BF !important;
		border: none !important;
		font-size: 30rpx !important;
		line-height: 36rpx !important;
		transition: all .4s !important;
	}
	
	.me-recharge-record {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100rpx;
		width: 100%;
		border-top: 1rpx solid #eee;
		border-bottom: 1rpx solid #eee;
		p {
			font-size: 30rpx;
			color: #666;
		}
		i {
			width: 16rpx;
			height: 28rpx;
			background: url('../../common/images/me/arrow.png') no-repeat;
			background-position: center;
			background-size: 100%;
		}
	}
	
	
}
</style>
