<template>
	<div id="search-bar" class="search-bar">
		<div class="select-addr" @click="openLocationPage">
			<i class="icon-addr"></i>
			<span class="addr-title nowrap">北京大学东校区北京北京北京北京北京大学东校区北京大学东校区</span>
			<i class="icon-arrow"></i>
		</div>
		<div class="search-box-wrapper">
			<div class="search-box" @click="openSearchPage">
				<i class="serch-icon"></i>
				<span class="placeholder nowrap">搜索商家、菜品名称</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		openSearchPage() {
			uni.navigateTo({
				  // 跳转路径
					url: '../../pages/search/search'
			});
		},
		openLocationPage() {
			uni.navigateTo({
				  // 跳转路径
					url: '../../pages/location/location'
			});
		}
	}
}	
</script>

<style lang="stylus">
	.search-bar{
		height: 84rpx;
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		.select-addr {
			width: 10%;
			flex-grow: 1;
			position: relative;
			height: 100%;
			display: flex;
			align-items: center;
			.icon-addr {
				width: 22rpx;
				height: 28rpx;
				background: url(../../common/images/index/location@2x.png) no-repeat;
				background-size: 100%;
			}
			.addr-title {
				width: 70%;
				margin: 0 10rpx 0 14rpx;
				font-size: 30rpx;
				color: #0177BF;
				font-weight: 700;
			}
			.icon-arrow {
				// position: absolute;
				// right: 0;
				// bottom: 0;
				width: 10rpx;
				height: 10rpx;
				margin-bottom: -12rpx;
				background: url(../../common/images/index/arrow.png) no-repeat;
				background-size: 100%;
			}
		}
		.search-box-wrapper {
			// flex: 1;
			flex-basis: 400rpx;
			height: 100%;
			display: flex;
			align-items: center;
			.search-box {
				display: flex;
				align-items: center;
				height: 60rpx;
				width: 400rpx;
				border: 1px solid #0177BF;
				border-radius: 30rpx;
				padding: 0 0 0 60rpx;
				box-sizing: border-box;
				.serch-icon {
					width: 24rpx;
					height: 26rpx;
					margin-right: 20rpx;
					background: url(../../common/images/index/search.png) no-repeat;
					background-size: 100%;
				}
				.placeholder {
					width: 72%;
					font-size: 24rpx;
					color: #666666;
				}
			}
		}
	}
</style>
