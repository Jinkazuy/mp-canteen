<template>
	<div class="canteen-list-page">
		<div class="canteen-list-page-title">第一食堂档口列表</div>
		<stallsCard></stallsCard>
		<div class="tips">
			<span>选择档口开始点餐</span>
			<div class="bg-line"></div>
		</div>
	</div>
</template>

<script>
import stallsCard from '../../components/canteen-list-page/stallsCard.vue'	
export default {
	data () {
		return {
			
		}
	},
	onLoad(e) {
		console.log(e)
	},
	components: {
		stallsCard
	}
}
</script>

<style lang="stylus">
.canteen-list-page {
	padding: 24rpx 30rpx 20rpx;
	box-sizing: border-box;
	.canteen-list-page-title {
		margin-bottom: 16rpx;
		font-size: 30rpx;
		font-weight: 700;
		color: #333;
	}
	.tips {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 80rpx;
		font-size: 24rpx;
		color: #999;
		text-align: center;
		span {
			background-color: #fff;
			padding: 0 20rpx;
			z-index: 10;
		}
		.bg-line {
			position: absolute;
			content: '';
			z-index: 1;
			top: 50%;
			transform: translateY(-50%);
			width: 50%;
			height: 1rpx;
			background-color: #999;
		}
	}
}	
</style>
