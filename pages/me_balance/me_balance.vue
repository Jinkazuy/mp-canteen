<template>
	<div class="me-balance">
		<div class="balance-icon-box">
			<img src="../../common/images/me/money.png">
		</div>
		<div class="balance-tit">账户余额</div>
		<div class="balance-num">¥20.05</div>
		<van-button
		round 
		type="primary" 
		class="btn-recharge" 
		@click="openRecharge">充值</van-button>
		<van-button
		round 
		type="primary"
		class="btn-cash-withdrawal" 
		@click="openCash">提现</van-button>
	</div>
</template>

<script>
export default {
	data () {
		return {}
	},
	methods: {
		openRecharge() {
			// 
			// uni.navigateTo({
			// 	url: '../../pages/me_recharge/me_recharge',
			// 	complete (res) {
			// 		console.log(res)
			// 	}
			// })
		},
		openCash() {
			// 
			uni.navigateTo({
				url: '../../pages/me_cash_withdrawal/me_cash_withdrawal',
				complete (res) {
					console.log(res)
				}
			})
		}
	}
}
</script>

<style lang="stylus">
.me-balance {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-top: 70rpx;
	box-sizing: border-box;
	line-height: 1;
	.balance-icon-box {
		width: 120rpx;
		height: 120rpx;
		margin-bottom: 20rpx;
		img {
			width: 100%;
			height: 100%;
		}
	}
	.balance-tit {
		font-size: 30rpx;
		color: #666;
		margin-bottom: 20rpx;
	}
	.balance-num {
		font-size: 72rpx;
		color: #333;
		margin-bottom: 170rpx;
	}
	
	.btn-recharge, .btn-cash-withdrawal{
		display: flex;
		justify-content: center;
	}
	.van-button--primary, {
		margin: 30rpx auto 0!important;
		width: 300rpx;
		color: #fff !important;
		border-radius: 10rpx !important;
		background-color: #0177BF !important;
		border: none !important;
		font-size: 30rpx !important;
		line-height: 36rpx !important;
		transition: all .4s !important;
	}
	.btn-recharge {
	}
	.btn-cash-withdrawal{
		.van-button--primary {
			background-color: #D2D2D2 !important;
		}
	}
}
</style>
