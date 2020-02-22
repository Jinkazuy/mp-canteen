<template>
	<div class="noti-wrapper">
		<div class="noti-box">
			<i class="noti-icon"></i>
			<div class="swiper-box">
				<swiper
					class="noti-swiper"
					autoplay="true" 
					interval="5000"
					vertical="true"
					circular="true">
					<block v-for="(item, index) in notiInfo" :key="index">
						<swiper-item>
							<view class="swiper-item" @click="getNotiInfo(item.path)">{{ item.info }}</view>
						</swiper-item>
					</block>
				</swiper>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		notiInfo: {
			type: Array,
			default () {
				return []
			}
		},
	},
	data() {
		return {}
	},
	methods: {
		getNotiInfo(path) {
			console.log(path)
			uni.navigateTo({
				  // 跳转路径
					url: path
			});
		}
	}
}
</script>

<style lang="stylus">
.noti-wrapper{
	width 100%
	height 60rpx
	padding 0 30rpx
	margin 50rpx 0 0
	box-sizing border-box
	.noti-box{
			width 100%
			height 100%
			border-radius 10rpx
			background-color #F0F9FF
			display flex
			align-items center
			.noti-icon{
				width 28rpx
				height 28rpx
				margin 0 20rpx 0 20rpx
				background url('../../common/images/index/Notice.png') no-repeat
				background-size 100%
			}
			.swiper-box{
				height: 100%;
				width: 100%;
				.noti-swiper{
					height: 100%;
					width: 100%;
					.swiper-item {
						width: 100%;
						height: 20rpx;
						line-height: 60rpx;
						color: #0177BF;
						font-size: 24rpx;
					}
				}
			}
	}	
}		
</style>
