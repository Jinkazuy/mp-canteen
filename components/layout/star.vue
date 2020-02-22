<template>
	<div class="star-wrapper">
		<div class="star-nor"></div>
		<div class="star-fill" :style="{'width': scoreProportion + '%'}"></div>
	</div>
</template>

<script>
export default {
	props: {
		scoreNum: {
			type: Number,
			default() {
				return 4.3
			}
		}
	},
	data() {
		return {
			// 评分比例
			scoreProportion: 0
		}
	},
	created() {
		this.calculation(this.scoreNum)
	},
	methods:{
		// 评分比例计算
		calculation(score) {
			
			let maxScore = 5
			this.scoreProportion = (score/maxScore*100) >= 100? 100: (score/maxScore*100)
			
			
		}
	}
}	
</script>

<style lang="stylus">
	.star-wrapper {
		position: relative;
		width: 116rpx;
		height: 20rpx;
		margin-right: 10rpx;
		.star-fill {
			position: absolute;
			left: 0;
			top: 0;
			height: 100%;
			background: url('../../common/images/layout/star-fill.png') no-repeat;
			background-size: 116rpx 20rpx;
		}
		.star-nor {
			position: absolute;
			left: 0;
			top: 0;
			height: 100%;
			width: 100%;
			background: url('../../common/images/layout/star-nor.png') no-repeat;
			background-size: 100%;
		}
	}
</style>
