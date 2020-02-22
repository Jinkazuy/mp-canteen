<template>
	<div class="me-recharge-record">
		<div class="recharge-record-item" v-for="(item, index) in recordList" :key="index">
			<div class="recharge-record-item-tit-amount">
				<div class="item-tit">充值</div>
				<div class="item-amount">+100</div>
			</div>
			<div class="recharge-record-item-date-balance">
				<div class="item-date">2020-02-22 12:38</div>
				<div class="item-balance">余额 108</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			recordList: [1,2,3]
		}
	},
	methods: {
		
	}
}
</script>

<style lang="stylus">
.me-recharge-record {
	width: 100%;
	padding: 0 30rpx;
	box-sizing: border-box;
	.recharge-record-item {
		width: 100%;
		border-bottom: 1rpx solid #eee;
		box-sizing: border-box;
		.recharge-record-item-tit-amount,
		.recharge-record-item-date-balance {
			display: flex;
			justify-content: space-between;
			align-items: center;
			line-height: 1;
		}
		.recharge-record-item-tit-amount {
			font-size: 30rpx;
			color: #333;
			margin: 28rpx 0 20rpx;
			.item-amount {
				font-weight: 700;
			}
		}
		.recharge-record-item-date-balance {
			margin: 0 0 20rpx;
			font-size: 24rpx;
			color: #666;
		}
	}
}
</style>
