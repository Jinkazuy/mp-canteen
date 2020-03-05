<template>
	<div class="feedback">
		<div class="tt-area-box">
			<div class="pm-type-sel">
				<p class="tt-tips">请选择问题类型</p>
				<span 
					v-for="(item,index) in pmType" 
					:key="index"
					@click="pmTypeSel(index,item)"
					:class="['pm-type-item', {'pm-type-item-act':index===pmTypeCut}]" 
					>
					{{item.msgContentLabel}}
				</span>
			</div>
			<div class="tt-area">
				<textarea 
					maxlength="200"
					v-model="ttCont"
					placeholder-class="placehoders"
					placeholder="请写下您的意见与反馈"
					>
				</textarea>
				<span class="number-tips">{{ttCont.length}}/200</span>	
			</div>
		</div>
		<van-button 
		round 
		type="primary" 
		:class="['submit-btn', {'submit-btn-no':!ttCont.length}]" 
		@click="subFeedBack">提交</van-button>
		<van-toast id="van-toast" />
		<van-popup :show="caiflag" close-on-click-overlay="false">
			<div class="cai">
				<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582294068134&di=6b3ea2277d9a4c50376f4113c79eb4e6&imgtype=0&src=http%3A%2F%2Fc2.haibao.cn%2Fimg%2F0_0_100_0%2F1508212247.043%2F47adba769cc5b70852fab6a5a054fe58.png">
			</div>
		</van-popup>
	</div>
</template>

<script>

import Toast from '../../wxcomponents/weapp/dist/toast/toast'

// 获取留言问题分类标签
import {http_getFeedbackTips} from '../../utils/http/http_getFeedbackTips.js'
// 发送留言
import {http_putFeedback} from '../../utils/http/http_putFeedback.js'
export default {
	data() {
		return {
			ttCont: '',
			// 问题类型
			pmType: [],
			pmTypeCut: 0,
			
			// 小彩蛋次数
			cai: 0,
			caiflag: false
		}
	},
	async onShow() {
		// 获取留言问题分类标签
		this.pmType = await http_getFeedbackTips()
	},
	methods: {
		// 点击提交按钮
		async subFeedBack() {
			let res = this.ttCont.trim()
			console.log(res.length)
			// 判断输入框内容
			if(!res.length) {
				Toast('请输入内容')
				this.ttCont = ''
				this.cai += 1
				if(this.cai>=5) {
					Toast('怎么肥四，小老弟？？')
					this.caiflag = true
					this.cai = 0
					setTimeout(()=>{
						this.caiflag = false
					},3000)
				}
			} else {
				
				
				let msgContent = res
				let msgTitle = this.pmType[this.pmTypeCut].msgTitleValue
				let msgTitleName = this.pmType[this.pmTypeCut].msgContentLabel
				
				console.log(msgContent, msgTitle, msgTitleName)
				
				let putRes = await http_putFeedback(msgContent, msgTitle, msgTitleName)
				
				if(putRes) {
					// 提交成功,清空内容
					Toast('感谢您的反馈~！')
					this.ttCont = ''
					this.pmTypeCut = 0
				} else {
					// 提交成功,清空内容
					Toast('提交失败')
				}
			}
		},
		// 选择问题类型
		pmTypeSel(idx) {
			this.pmTypeCut = idx
		},
		
		// 菜单关闭
		caiOnClose() {
			this.caiflag = false
			this.cai = 0
		}
	}
}
</script>

<style lang="stylus">
.feedback {
	padding: 30rpx 30rpx 0;
	.tt-area-box {
		width: 100%;
		background-color: #F4F4F4;
		border-radius: 6rpx;
		.pm-type-sel {
			padding: 20rpx 20rpx 0;
			border-bottom: 1rpx solid #A0A0A0;
			box-sizing: border-box;
			.tt-tips {
				font-size: 24rpx;
				color: #999;
				line-height: 1;
				margin-bottom: 20rpx;
			}
			.pm-type-item {
				display: inline-block;
				padding: 14rpx 30rpx;
				background-color: #fff;
				border: 1rpx solid #A0A0A0;
				border-radius: 10rpx
				line-height: 1;
				text-align: center;
				transition: all .3s;
				font-size: 24rpx;
				color: #666;
				margin: 0 10rpx 20rpx 0;
			}
			.pm-type-item-act {
				border: 1rpx solid #0177BF;
				color: #0177BF;
			}
		}
		.tt-area {
			position: relative;
			textarea {
				width: 100%;
				padding: 10rpx 30rpx 30rpx;
				box-sizing: border-box;
				line-height: 1.4;
			}
			.placehoders, .number-tips{
				position: absolute;
				font-size: 24rpx;
				color: #999;
				line-height: 1;
			}
			.placehoders {
				top: 30rpx;
				left: 30rpx;
			}
			.number-tips {
				right: 12rpx;
				bottom: 12rpx;
			}
		}
	}
	
	.submit-btn{
		display: flex;
		justify-content: center;
	}
	.van-button--primary, {
		margin: 40rpx auto 0!important;
		width: 690rpx;
		color: #fff !important;
		border-radius: 10rpx !important;
		background-color: #0177BF !important;
		border: none !important;
		font-size: 30rpx !important;
		line-height: 36rpx !important;
		transition: all .4s !important;
	}
	.submit-btn-no {
		.van-button--primary {
			background-color: #A0A0A0 !important;	
		}
	}
	
	.cai {
		width: 400rpx;
		height: 400rpx;
		background-color: #fff;
		img {
			width: 100%;
			height: 100%;
		}
	}
	
}	
</style>
