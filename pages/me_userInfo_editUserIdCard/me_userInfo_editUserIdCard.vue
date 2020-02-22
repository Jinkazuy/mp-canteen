<template>
	<div class="edit-user-idcard">
		<div class="inp">
			<span class="sp">员工号</span>
			<input 
				type="text" 
				v-model="userIdCard"
				placeholder-class="placehoders"
				placeholder="请输入员工号"
			>
			<!-- <span class="inp-tisp">请输入员工号</span> -->
		</div>
		<van-button round type="primary" class="submit-btn" @click="editUserIdentity">员工号验证</van-button>
		<p class="discount-tips">员工号是你的内部人员身份证明，消费可享受折扣</p>
		<van-toast id="van-toast" />
	</div>
</template>

<script>
// 拿到vuex中的函数
import {mapGetters, mapMutations} from 'vuex'
import Toast from '../../wxcomponents/weapp/dist/toast/toast'
// 设置用户信息
import {http_setUserInfoData} from '../../utils/http/http_setUserInfoData.js'
export default {
	data() {
		return {
			userIdCard: ''
		}
	},
	onLoad() {
		// 获取员工号
		if( this.store_UserInfoData.idCard===null) {
			this.userIdCard = ''
		} else {
			this.userIdCard = this.store_UserInfoData.idCard
		}
	},
	methods: {
		
		async editUserIdentity() {
			
			let res = this.userIdCard.trim()
			
			// 判断输入框内容长度
			if(!res.length) {
				Toast('请输入员工号')
				this.userIdCard = ''
			} else if(this.userIdCard!==this.store_UserInfoData.idCard){ 
				
				
				// 这里发送员工号给后台，然后验证完了再发送数据给后台存储
				// 返回号码规范： 0 成功， 1 员工号被使用， 2 员工号不存在
				// let ValidateUserIdCard = await http_验证员工号
				let ValidateUserIdCard = 0
				
				if(ValidateUserIdCard === 0) {
					// 存储
					let res = await http_setUserInfoData({
						"userType": 0,
						"idCard": this.userIdCard
					})
					
					if(res) {
						Toast('设置成功，您的身份是：内部员工')
						setTimeout(()=>{
							uni.navigateBack({
							    delta: 2
							})
						},1000)
					} else {
						Toast('设置失败')
					}
				} else if(ValidateUserIdCard === 1) {
					Toast('员工号被使用')
				} else if(ValidateUserIdCard === 2) {
					Toast('员工号不存在')
				}
				
				
				
				
				
				// 此时发送请求，如果返回成功的话，那么在http请求中手动设置本地store，那么这里就能获取到最新的地址的值
				this.userIdCard = this.store_UserInfoData.idCard
			} else {
				Toast('员工号未修改')
			}
			
		},
		// 点击提交按钮
		subAddrs() {
			
		},
	},
	computed: {
		...mapGetters([
			'store_UserInfoData'
		])
	}
}
</script>

<style lang="stylus">
	.edit-user-idcard {
		padding: 0 30rpx;
		box-sizing: border-box;
		
		.inp {
			display: flex;
			height: 100rpx;
			border-bottom: 1rpx solid #eee;
			.sp {
				 flex-basis: 90rpx;
				 font-size: 30rpx;
				 color: #666;
				 line-height: 100rpx;
				 margin-right: 2%;
			}
			input {
				flex: 1;
				height: 100%;
				border: none;
			}
			.placehoders {
				font-size: 24rpx;
				color: #999;
				line-height: 1;
			}
			.inp-tisp {
				line-height: 100rpx;
				 flex-basis: 160rpx;
				 font-size: 26rpx;
				 color: #999;
			}
		}
		.submit-btn {
			display: flex;
			justify-content: center;
		}
		.van-button--primary{
			margin: 40rpx auto 0!important;
			width: 690rpx;
			color: #fff !important;
			border-radius: 10rpx !important;
			background-color: #0177BF !important;
			border: none !important;
			font-size: 30rpx !important;
			line-height: 36rpx !important;
		}
		.discount-tips {
			color: #999;
			font-size: 20rpx;
			line-height: 1;
			margin-top: 20rpx;
		}
	}
	
</style>
