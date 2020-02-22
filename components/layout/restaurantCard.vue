<template>
	<div class="card-box">
		<div class="canteen-card-wrapper" v-for="(item, index) in canteenListData" :key="index" @click="opencanteenInfoPage(item.canteenlistId)">
			<div class="canteen-card-info">
				<!-- 图片 -->
				<div class="canteen-pic">
					<img :src="item.pic">
				</div>
				<!-- 文字组 -->
				<div class="canteen-card-text-group">
					<div class="canteen-card-text-group-title">{{item.Tile}}</div>
					<div class="canteen-card-text-group-score">
						<star :scoreNum="item.score"></star>
						<div class="score-number">{{item.score%1===0?item.score+'.0':item.score}}</div>
						<div class="score-count">月销{{item.saleCount}}</div>
					</div>
					<!-- 标签 -->
					<ul class="label">
						<li v-for="(itm,idx) in item.labels" :key="idx">{{itm}}</li>
					</ul>
					<div class="distance">距离{{item.distance}}m</div>
				</div>
			</div>
			<!-- 分割线 -->
			<div class="space-one"></div>
		</div>
	</div>
</template>

<script>
// 星星组件
import star from '@/components/layout/star.vue'	
export default {
	props: {
		canteenListData: {
			type: Array,
			default() {
				return []
			}
		}
	},
	data () {
		return {
			// 星星评分
			scoreNum: 4.3
		}
	},
	methods: {
		opencanteenInfoPage(id) {
			uni.navigateTo({
				// 跳转路径
				// 摊位列表页
				url: '../../pages/canteen-list-page/canteen-list-page?id='+id
			});
		}
	},
	components: {
		star
	}
}
</script>

<style lang="stylus">
	.canteen-card-wrapper {
		width: 100%;
		.canteen-card-info {
			display: flex;
			padding: 30rpx;
			box-sizing: border-box;
			.canteen-pic {
				flex-basis: 130rpx;
				height: 130rpx;
				border: 1rpx solid #eee;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.canteen-card-text-group {
				position: relative;
				flex: 1;
				padding-left: 20rpx;
				box-sizing: border-box;
				.canteen-card-text-group-title {
					line-height: 1;
					color: #0F0808;
					font-size: 30rpx;
					font-weight: 700;
					margin-bottom: 12rpx;
				}
				.canteen-card-text-group-score {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					line-height: 1;
					margin-bottom: 36rpx;
					.score-number {
						font-size: 24rpx;
						color: #F46050;
						margin-right: 20rpx;
					}
					.score-count {
						font-size: 24rpx;
						color: #999;
					}
				}
				.label {
					display: flex;
					justify-content: flex-start;
					height: 30rpx;
					li {
						height: 100%;
						padding: 4rpx 20rpx;
						box-sizing: border-box;
						border-radius: 4rpx;
						border: 1px solid #a0a0a0;
						line-height: 1;
						margin-right: 10rpx;
						font-size: 20rpx;
						color: 999;
					}
				}
				.distance {
					position: absolute;
					right: 0;
					top: 0;
					font-size: 24rpx;
					color: #999;
				}
				
			}
		}
		.space-one {
			width: 100%;
			height: 1rpx;
			background-color: #eee;
		}
	}
</style>
