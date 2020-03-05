<template>
	<div class="edit-user-phone">
		<div class="edit-tit">请输入新的手机号</div>
		<div class="inp-wrapper">
			<span>+86</span>
			<input
				type="digit" 
				v-model="phoneNum" 
				placeholder="请输入新的手机号" 
				placeholder-class="placeholder"
				step="any"
				max="11"
				@input="onChange"
			>
		</div>
		<van-button
			round 
			type="primary" 
			:class="['submit-btn', {'submit-btn-no':!phoneNum.length}]" 
			@click="subVerificationCode">获取验证码
		</van-button>
		<van-toast id="van-toast" />
		<van-dialog id="van-dialog" />
	</div>
</template>

<script>
// 拿到vuex中的函数
import {mapGetters, mapMutations} from 'vuex'
import Toast from '../../wxcomponents/weapp/dist/toast/toast'
import Dialog from '../../wxcomponents/weapp/dist/dialog/dialog'
export default {
	data() {
		return {
			phoneNum: '',
			// 短信倒计时
			interval: {}
		}
	},
	onShow() {
		// 页面显示时，就开始计算倒计时
		if(this.store_getCountTime>0) {
			
			clearInterval(this.interval)
			
			this.interval = setInterval(()=>{
				
				if(this.store_getCountTime>0) {
					this.setCountTime((this.store_getCountTime-1))
					console.log('当前短信倒计时=> ' + this.store_getCountTime)
				}
			},1000)
			
		}
	},
	// 卸载页面的时候清空定时器
	onUnload() {
		console.log('卸载定时器')
		clearInterval(this.interval) 
	},
	methods: {
		async subVerificationCode() {
			
			
			// 先验证手机号
			// 长度
			if(this.phoneNum.length===11) {
				
				// 正则效验
				// 验证130-139,150-159,180-189号码段的手机号码
				let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
				if(myreg.test(this.phoneNum))  {
					
					console.log('向后台验证手机号是否已经被绑定了')
					
					// 返回规则:
					// 0-该手机号未被使用/不是当前用户手机号/
					// 1-该手机号就是当前用户的手机号
					// 2-该手机号已被其他用户绑定
					// 3-后台HTTP请求失败
					
					
					// let res = await http_x      http_getVerificationCode 因为目前没有接口，所以不知道是post还是get
					let res = 0
					
					if(res===0) {
						
						
						// 判断短信发送倒计时是否已经超过60秒了
						if(this.store_getCountTime<=0) {
							
							// 如果<=0的话，那么就重新设置倒计时
							this.setCountTime(60)
							clearInterval(this.interval)
							
							
							// 验证成功了,弹窗提示,然后跳转到输入验证码页
							Toast.success({
								forbidClick: true, // 禁用背景点击
								message: '验证码已发送',
							})
							
							setTimeout(()=>{
								// 跳转到验证码填写页面
								uni.navigateTo({
									url: '../../pages/me_editUserPhone_verify/me_editUserPhone_verify?number=' + this.phoneNum,
									complete (res) {
										console.log(res)
									}
								})
							},1000)
						} else {
							Toast('请等待'+this.store_getCountTime+'秒后再次获取验证码')
						}
						
						
					} else if(res===1){
						// 1-该手机号就是当前用户的手机号
						Dialog.alert({
						  title: '提示',
						  message: '您当前已经绑定该手机号'
						}).then(() => {
						  // on close
						});
						
					} else if(res===2){
						// 2-该手机号已被其他用户绑定
						Dialog.alert({
						  title: '提示',
						  message: '该手机号已绑定其他账户，请解绑后再进行绑定'
						}).then(() => {
						  // on close
						});
					} else if(res===3){
						// 3-后台HTTP请求失败
						Toast('获取验证码失败')
					}
				} else {
					Toast('请检查手机号(号码段)')
				}
			} else {
				Toast('请检查手机号(长度)')
			}
			
			
			
			
		},
		onChange(e) {
			let newValue = e.detail.value
			// console.log(newValue)
			
			 
				   
			// 若等于
			if(newValue == '0' || newValue == '00') {
				console.log('0开头')
				// 这里v-model有个BUG，需要设置延迟才行
				if(st) {
					clearTimeout(st)
				}
				let st = setTimeout(() => { this.phoneNum = '' }, 5)
				console.log(this.phoneNum)
			}
			
			if(newValue == '0.00') {
				console.log('都是0')
				// 这里v-model有个BUG，需要设置延迟才行
				if(st) {
					clearTimeout(st)
				}
				let st = setTimeout(() => { this.phoneNum = '' }, 5)
				console.log(this.phoneNum)
			}
			
			// 长度不大于11位
			if(newValue.length>11) {
				console.log('长度超过11位')
				Toast('手机号长度超过11位')
				// 这里v-model有个BUG，需要设置延迟才行
				if(st) {
					clearTimeout(st)
				}
				let st = setTimeout(() => { this.phoneNum = '' }, 5)
				console.log(this.phoneNum)
			}
			
			
			// 确保是数字
			if(isNaN(Number(newValue))) {
				console.log('不是数字')
				Toast('请输入数字')
				if(st) {
					clearTimeout(st)
				}
				let st = setTimeout(() => { this.phoneNum = '' }, 0)
			} 
			
		
			// 不准有空格
			if(String(newValue).indexOf(" ")>=0) {
				console.log('有空格')
				Toast('请输入正确手机号')
				if(st) {
					clearTimeout(st)
				}
				let st = setTimeout(() => { this.phoneNum = '' }, 0)
			}
			
			
			// 不准有小数点
			if(String(newValue).indexOf(".")>=0) {
				console.log('有小数点')
				Toast('请输入正确手机号')
				if(st) {
					clearTimeout(st)
				}
				let st = setTimeout(() => { this.phoneNum = '' }, 0)
			}
		},
		...mapMutations({
			setCountTime:'setCountTime'
		})
	},
	computed: {
		...mapGetters([
			'store_getCountTime'
		])
	}
}
</script>

<style lang="stylus">
.edit-user-phone {
	
	padding: 140rpx 100rpx 0;
	box-sizing: border-box;
	
	.edit-tit {
		margin-bottom: 56rpx;
		font-size: 36rpx;
		color: #333;
		line-height: 1;
	}
	
	.inp-wrapper {
		display: flex;
		align-items: center;
		height: 100rpx;
		border-bottom: 1rpx solid #eee;
		line-height: 1;
		color: #333;
		// padding-bottom: 18rpx;
		span {
			font-size: 26rpx;
			margin-right: 28rpx;
		}
		input {
			font-size: 40rpx;
			height: 64rpx;
		}
		.placeholder {
			font-size: 30rpx;
			color: #999;
		}
	}
	
	.submit-btn{
		display: flex;
		justify-content: center;
	}
	.van-button--primary, {
		margin: 50rpx auto 0!important;
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
	
	
	// 退出弹窗样式重置
	.dialog-index--van-dialog {
		border-radius: 10rpx !important;
		.van-dialog__header {
			color: #333 !important;
			font-weight: 700 !important;
		}
	}
}
</style>
