<template>
	<div class="order-evaluate-result">
		<div class="order-evaluate-result-card">
			<div class="card-icon"></div>
			<div class="card-tit">评价成功</div>
			<div class="card-text">您的评价，是其他用户选购的重要参考！</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {}
	},
	onShow() {
		uni.hideHomeButton()
		setTimeout(()=>{
			uni.switchTab({
				url: '../../pages/order/order'
			})
		},2000)
	},
	methods: {}
}
</script>

<style lang="stylus">
page {
	background-color: #eee;
}
.order-evaluate-result {
	padding: 20rpx 30rpx 0;
	box-sizing: border-box;
	.order-evaluate-result-card {
		line-height: 1;
		text-align: center;
		padding: 30rpx 0 52rpx;
		width: 100%;
		background-color: #fff;
		
		.card-icon {
			margin: 0 auto 30rpx;
			width: 80rpx;
			height: 80rpx;
			background: url('../../common/images/order/result.png') no-repeat;
			background-position: center;
			background-size: 100%;
		}
		
		.card-tit {
			margin-bottom: 30rpx;
			color: #333;
			font-size: 36rpx;
		}
		
		.card-text {
			font-size: 24rpx;
			color: #666;
		}
		
	}
}
</style>
