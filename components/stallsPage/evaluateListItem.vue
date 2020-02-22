<template>
	<div class="evaluate-list-item">
		<div class="item-head">
			<div class="user-avatar">
				<!-- <img src="" alt=""> -->
			</div>
			<div class="user-title-and-date">
				<div class="user-title-box">
					<p class="username">用户昵称</p>
					<star :scoreNum="3.2"></star>
				</div>
				<span class="evaluate-date">2020-02-18</span>
			</div>
		</div>
		<div class="item-text">味道很好，取餐也很快，位置也好找，商家态度也非常好，点赞味道很好，取餐也很快，位置也好找，商家态度也非常好，点赞味道很好，取餐也很快，位置也好找，商家态度也非常好，点赞味道很好，取餐也很快，位置也好找，商家态度也非常好，点赞味道很好，取餐也很快，位置也好找，商家态度也非常好，点赞
		</div>
	</div>
</template>

<script>
// 星星组件
import star from '@/components/layout/star.vue'	
export default {
	data() {
		return {
			
		}
	},
	components: {
		star
	}
}	
</script>

<style lang="stylus">
.evaluate-list-item {
	width: 100%;
	border-bottom: 1rpx solid #eee;
	padding: 38rpx 0 30rpx;
	.item-head {
		height: 96rpx;
		width: 100%;
		display: flex;
		.user-avatar {
			flex-basis: 96rpx;
			height: 96rpx;
			border: 1rpx solid #E5E5E5;
			border-radius: 10rpx;
			margin-right: 20rpx;
		}
		.user-title-and-date {
			flex: 1;
			height: 100%;
			position: relative;
			.user-title-box {
				.username {
					font-size: 30rpx;
					color: #666;
					margin-bottom: 20rpx;
					line-height: 1;
				}
			}
			.evaluate-date {
				position: absolute;
				right: 0;
				top: 0;
				font-size: 24rpx;
				color: #666;
			}
		}
	}
	
	.item-text {
		padding-left: 120rpx;
		line-height: 40rpx;
		font-size: 24rpx;
		color: #666;
	}
	
}	
</style>
