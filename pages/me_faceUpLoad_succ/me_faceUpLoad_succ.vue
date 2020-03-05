<template>
	<div class="me-faceUpLoad-succ">
		<div class="me-faceUpLoad-succ-img-box">
			<img src="../../common/images/me/putFaceSucc.png">
		</div>
		<p>照片上传成功，请等待审核</p>
	</div>
</template>

<script>
export default {
	data() {
		return {}
	},
	onShow() {
		console.log('成功，跳转回我的')
		setTimeout(()=>{
			uni.switchTab({
				url: '../../pages/me/me',
				complete (res) {
					console.log(res)
				}
			})
		}, 3000)
	}
}
</script>

<style lang="stylus">
.me-faceUpLoad-succ {
	padding: 110rpx 0;
	box-sizing: border-box;
	.me-faceUpLoad-succ-img-box {
		width: 375rpx;
		height: 264rpx;
		margin: 0 auto 90rpx;
		img {
			width: 100%;
			height: 100%;
		}
	}
	p {
		text-align: center;
		font-size: 30rpx;
		line-height: 1;
		color: #666;
	}
}
</style>
