<template>
	<div class="stalls-card-wrapper">
		<div class="stalls-card" v-for="(item,index) in stallsDatas" :key="index" @click="openStallsPage(item.stallsId)">
			<div class="stalls-card-img-box">
				<img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2110525847,869116441&fm=26&gp=0.jpg">
			</div>
			<div class="stalls-card-info-box">
				<div class="info-title">{{item.title}}</div>
				<div class="info-text nowrap">主打：{{item.hotGoods}}、</div>
				<div class="info-score">
					<star></star>
					<div class="score-number">{{item.score%1===0?item.score+'.0':item.score}}</div>
					<div class="score-count">月销{{item.saleCount}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import star from '@/components/layout/star.vue'	
export default {
	data () {
		return {
			stallsDatas: [
					{
						pic: 'https://bkimg.cdn.bcebos.com/pic/6609c93d70cf3bc7e397cf8edc00baa1cd112a38?x-bce-process=image/watermark,g_7,image_d2F0ZXIvYmFpa2UxNTA=,xp_5,yp_5',
						title: 'A1档口',
						score: 3.3,
						hotGoods: '拿铁、香辣鸡翅、奥尔良鸡腿堡良鸡腿堡良鸡腿堡良鸡腿堡良鸡腿堡',
						saleCount: 60,
						stallsId: 1
					},
					{
						pic: 'https://bkimg.cdn.bcebos.com/pic/6609c93d70cf3bc7e397cf8edc00baa1cd112a38?x-bce-process=image/watermark,g_7,image_d2F0ZXIvYmFpa2UxNTA=,xp_5,yp_5',
						title: '淮南牛肉汤',
						score: 4.0,
						hotGoods: '拿铁、香辣鸡翅、奥尔良鸡腿堡',
						saleCount: 60,
						stallsId: 2
					},
					{
						pic: 'https://bkimg.cdn.bcebos.com/pic/6609c93d70cf3bc7e397cf8edc00baa1cd112a38?x-bce-process=image/watermark,g_7,image_d2F0ZXIvYmFpa2UxNTA=,xp_5,yp_5',
						title: '麻辣烫',
						score: 2.6,
						hotGoods: '拿铁、香辣鸡翅、奥尔良鸡腿堡',
						saleCount: 60,
						stallsId: 3
					},
					{
						pic: 'https://bkimg.cdn.bcebos.com/pic/6609c93d70cf3bc7e397cf8edc00baa1cd112a38?x-bce-process=image/watermark,g_7,image_d2F0ZXIvYmFpa2UxNTA=,xp_5,yp_5',
						title: '快乐柠檬',
						score: 4.6,
						hotGoods: '拿铁、香辣鸡翅、奥尔良鸡腿堡',
						saleCount: 60,
						stallsId: 3
					},
				]
		}
	},
	methods: {
		openStallsPage(id) {
			uni.navigateTo({
				// 跳转路径
				// 摊位列表页
				// url: '../../pages/stallsPage/stallsPage?canteenID='+id+'&stallID'+id
				url: '../../pages/stallsPage/stallsPage?canteenID='+'1'+'&stallID='+'2'
			});
		}
	},
	components: {
		star
	}
}
</script>

<style lang="stylus">
.stalls-card-wrapper {
	.stalls-card {
		display: flex;
		align-items: center;
		padding: 30rpx 20rpx;
		border-bottom: 1rpx solid #eee;
		box-sizing: border-box;
		.stalls-card-img-box {
			flex-basis: 170rpx;
			height: 170rpx;
			margin-right: 30rpx;
			img {
				width: 170rpx;
				height: 170rpx;
			}
		}
		.stalls-card-info-box {
			width: 69%;
			height: 170rpx;
			line-height: 1;
			.info-title {
				font-size: 30rpx;
				color: #666;
				font-weight: 700;
				margin: 20rpx 0 20rpx;
			}
			.info-text {
				width: 100%;
				font-size: 24rpx;
				color: #999;
				margin-bottom: 20rpx;
			}
			.info-score {
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
		}
	}
}

</style>
