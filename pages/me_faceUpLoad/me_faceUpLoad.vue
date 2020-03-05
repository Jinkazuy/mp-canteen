<template>
	<div class="me-face-upload">
		<!-- 用户未进行人脸识别 -->
		<div class="user-face-bv-no" v-if="!isFaceVb">
			<div class="img-box">
				<img src="../../common/images/me/faceCard.png" v-if="picSrcUrl==='' && !isPicCut">
				<img :src="picSrcUrl" v-if="picSrcUrl!=='' && isPicCut">
			</div>
			<div class="text-box">
				<p class="text-box-tit">请按照要求上传照片:</p>
				<p class="text-box-inf">1、头像位于照片中央，五官无遮挡，拍摄清晰</p>
				<p class="text-box-inf">2、背景简单，避免杂乱，亮度均匀</p>
			</div>
			<van-button
			round 
			type="primary" 
			class="submit-btn" 
			v-if="picSrcUrl==='' && !isPicCut"
			@click="selPic">选择或拍摄照片</van-button>
			<van-button
			round 
			type="primary" 
			class="submit-btn" 
			v-if="picSrcUrl!=='' && isPicCut"
			@click="subPci">上传照片</van-button>
			<van-toast id="van-toast" />
			<kpsImageCutter @ok="onok" @cancel="oncancle" :url="picSrcUrl" :fixed="false" :width="300" :height="220" v-if="PicCutMod"></kpsImageCutter>
		</div>
		<!-- 用户已经进行了人脸识别 -->
		<div class="user-face-bv-yes" v-if="isFaceVb">
			已经进行了人脸识别了
			<img :src="store_userFaceVbURL">
		</div>
	</div>
</template>

<script>
// 拿到vuex中的函数
import {mapGetters, mapMutations} from 'vuex'
	
// 图片裁剪工具，使用的UNIAPP插件市场的 https://ext.dcloud.net.cn/plugin?id=1076 在这个网页上 使用HBuilderX导入，样式属性JK略有调整
import kpsImageCutter from "@/components/ksp-image-cutter/ksp-image-cutter.vue"

import Toast from '../../wxcomponents/weapp/dist/toast/toast'

import {url_putUserFacePic, url_getHomeBannerListRes} from '../../utils/http/http_req_list.js'

export default {
	data() {
		return {
			// 图片路径
			picSrcUrl: '',
			// 图片是否已经裁剪过
			isPicCut: false,
			// 是否显示图片裁剪浮层
			PicCutMod: false,
			// 用户上传成功，返回图片地址
			upLoadFileURL: '',
			// 用户是否已经进行了人脸识别验证
			isFaceVb: false
		}
	},
	onShow() {
		this.picSrcUrl = ''
		this.isPicCut = false
		
		// 在onshow的时候，获取本地的用户已经上传的人脸识别的图片地址
		
		if(this.store_userFaceVbURL!=='') {
			this.isFaceVb = true
			console.log('用户已进行了人脸识别, 图片地址↓')
			console.log(this.store_userFaceVbURL)
		}
	},
	methods: {
		// 选择图片
		selPic() {
			uni.chooseImage({
				count: 1,
				// sizeType: ,
				// sourceType: ,
				success: (res)=> {
					if(res.errMsg=='chooseImage:ok') {
						this.picSrcUrl = res.tempFilePaths[0]
						this.PicCutMod = true
					}
				},
				fail: (err)=> {
					console.log(err)
				},
			})
		},
		// 提交图片
		async subPci() {
			console.log(this.picSrcUrl)
			
			// 发送请求提交图片
			// 这个是自己封装的上传文件的函数
			let putPic =  await this.upLoadFild(this.picSrcUrl)
			
			
			if(putPic) {
				// 提交成功，跳转到成功页
				Toast('提交成功')
				uni.reLaunch({
					url: '../../pages/me_faceUpLoad_succ/me_faceUpLoad_succ',
					complete (res) {
						console.log(res)
					}
				})
				
			} else {
				// 提交失败，将所有数据重置，并Toast提示
				Toast('提交失败，请重新尝试')
				this.picSrcUrl = ''
				// 图片是否已经裁剪过
				this.isPicCut = false
				// 是否显示图片裁剪浮层
				this.PicCutMod = false
			}
		},
		// 裁剪图片↓
		onok(ev) {
		    this.picSrcUrl = ev.path;
			this.PicCutMod = false
			this.isPicCut = true
		},
		oncancle() {
		    // url设置为空，隐藏控件
		    this.picSrcUrl = ''
			this.isPicCut = false
			// 是否显示图片裁剪浮层
			this.PicCutMod = false
		},
		// 上传文件
		upLoadFild(filePath) {
			return new Promise(async (resolve, reject) => {
				
				uni.uploadFile({
					url: url_putUserFacePic,
					filePath,
					name: 'file',
					// header: {'content-type':'multipart/form-data','token': this.store_token},
					header: {'content-type':'multipart/form-data'},
					// formData: {'token': this.store_token},
					success: (res) => {
						console.log(res)
						if(res.statusCode===200) {
							
							// 拿到的结果是json字符串
							
							let arrr = JSON.parse(res.data)
							console.log('json转数组')
							console.log(arrr)
							
							
							if(arrr.code==0){
								// 这里的图片路径，应该保存到本地
								// 拼接上图片文件预览的地址
								this.upLoadFileURL = ''
								this.upLoadFileURL = url_getHomeBannerListRes + arrr.filePath
								// 存储到本地先
								this.setUserFaceVbURL(this.upLoadFileURL)
								console.log('图片预览地址↓')
								console.log(this.store_userFaceVbURL)
								this.isFaceVb = true
								// 将这个路径保存到本地
								// console.log('上传成功')
								resolve(true)
							} else {
								resolve(false)
							}
						} else {
							resolve(false)
						}
					},
					fail: (err) => {
						console.log(err)
						resolve(false)
					},
				})
				
				
			})
		},
		...mapMutations([
			'setUserFaceVbURL'
		])
	},
	components: {
		kpsImageCutter
	},
	computed: {
		// vuex提供的辅助函数，拿到store/getters.js向外暴露的内容；
		...mapGetters([
			'store_token', // 
			'store_userFaceVbURL' // 用户上传成功后，人脸识别图片的预览地址
		])
	}
}
</script>

<style lang="stylus">
.me-face-upload{
	
	// 未进行识别
	.user-face-bv-no {
		position: relative;
		padding: 140rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.img-box {
			margin-bottom: 74rpx;
			width: 450rpx;
			height: 324rpx;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.text-box {
			color: #666;
			line-height: 1;
			.text-box-tit {
				font-size: 30rpx;
				margin-bottom: 30rpx;
			}
			.text-box-inf {
				font-size: 24rpx;
				margin-bottom: 30rpx;
			}
		}
		
		.submit-btn{
			display: flex;
			justify-content: center;
		}
		.van-button--primary, {
			margin: 20rpx auto 0!important;
			width: 690rpx;
			color: #fff !important;
			border-radius: 10rpx !important;
			background-color: #0177BF !important;
			border: none !important;
			font-size: 30rpx !important;
			line-height: 36rpx !important;
			transition: all .4s !important;
		}
		
	}
	
	// 已进行了人脸识别
	.user-face-bv-yes {}
	
}
</style>
