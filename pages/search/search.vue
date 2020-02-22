<template>
	<div class="search-page">
		<div class="search-box">
			<i class="search-box-icon"></i>
			<input 
				type="text" 
				class="search-input" 
				placeholder="搜索商家、菜品名称" 
				placeholder-style="color:#666; font-size:24rpx"
				auto-focus 
				@input="onInput"
				@focus="onFocus"
				@blur="onBlue">
		</div>
		<div class="search-history-wrapper">
			<div class="search-history-title">历史搜索</div>
			<ul class="search-history-info">
				<li>炸鸡</li>
				<li>肯德基</li>
				<li>快乐柠檬</li>
				<li>第一食堂</li>
				<li>第一食堂</li>
			</ul>
		</div>
		<div class="search-hot-wrapper">
			<div class="search-hot-title">热门搜索</div>
			<ul class="search-hot-info">
				<li>炸鸡</li>
				<li>肯德基</li>
				<li>快乐柠檬</li>
				<li>第一食堂</li>
				<li>第一食堂</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			
		}
	},
	methods: {
		onInput(e) {
			// 发送请求,但需要设置定时器,延迟x秒后发送
			console.log(e.detail.value)
		},
		onFocus() {
			console.log('获取焦点')
		},
		onBlue() {
			console.log('失去焦点')
		}
	}
}	
</script>

<style lang="stylus">
	.search-page {
		padding: 12rpx 30rpx 0;
		box-sizing: border-box;
		.search-box {
			display: flex;
			align-items: center;
			height: 60rpx;
			width: 100%;
			border-radius: 10rpx;
			border: 1rpx solid #BFBFBF;
			padding: 0 30rpx;
			box-sizing: border-box;
			.search-box-icon {
				width: 24rpx;
				height: 26rpx;
				background-color: pink;
				margin-right: 20rpx;
				// background: url('../../common/images/');
			}
			.search-input {
				flex: 1;
				height: 100%;
				padding-top: 2rpx;
				box-sizing: border-box;
			}
		}
		.search-history-wrapper {
			margin-top: 56rpx;
			.search-history-title {
				margin-bottom: 40rpx;
				color: #777;
				font-size: 30rpx;
				font-weight: 700;
			}
			.search-history-info {
				// display: flex;
				// justify-content: space-between;
				li {
					display: inline-block;
					padding: 16rpx 20rpx;
					font-size: 30rpx;
					color: #666;
					border: 1rpx solid #BFBFBF;
					border-radius: 10rpx;
					margin: 0 20rpx 20rpx 0;
				}
			}
		}
		.search-hot-wrapper {
			margin-top: 56rpx;
			.search-hot-title {
				margin-bottom: 40rpx;
				color: #777;
				font-size: 30rpx;
				font-weight: 700;
			}
			.search-hot-info {
				// display: flex;
				// justify-content: space-between;
				li {
					display: inline-block;
					padding: 16rpx 20rpx;
					font-size: 30rpx;
					color: #666;
					border: 1rpx solid #BFBFBF;
					border-radius: 10rpx;
					margin: 0 20rpx 20rpx 0;
				}
			}
		}
	}
</style>
