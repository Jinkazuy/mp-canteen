<template>
	<div class="me-editUserPhone-verify">
		<p class="editUserPhone-verify-tit">请输入验证码</p>
		<p class="editUserPhone-verify-re-tips">若短信发送失败，请点击重新获取短信验证码</p>
		<div class="editUserPhone-verify-re-code">
			<p class="phone-interval-on" v-if="store_getCountTime>0">{{store_getCountTime}}s后重新获取</p>
			<p class="phone-interval-off" v-if="store_getCountTime<=0" @click="reVerifyCode">点击获取验证码</p>
		</div>
		<div class="inp-wrapper">
			<input
				type="digit" 
				v-model="verifyCode" 
				placeholder="请输入短信验证码" 
				placeholder-class="placeholder"
				step="any"
				max="11"
				@input="onChange"
			>
		</div>
		<van-toast id="van-toast" />
	</div>
</template>

<script>
// 拿到vuex中的函数
import {mapGetters, mapMutations} from 'vuex'
import Toast from '../../wxcomponents/weapp/dist/toast/toast'
import {http_setUserInfoData} from '../../utils/http/http_setUserInfoData.js'
export default {
	data() {
		return {
			// 通过URL传过来的手机号
			phoneNumber: '',
			// 短信倒计时对象
			interval: {},
			// 验证码
			verifyCode: ''
		}
	},
	onShow() {
		// 页面显示时，就开始计算倒计时
		// 设置定时器
		this.setCountDownInterval()
	},
	onLoad(option) {
		this.phoneNumber = option.number
	},
	// 卸载页面的时候清空定时器
	onUnload() {
		console.log('卸载定时器')
		clearInterval(this.interval) 
	},
	methods: {
		
		// 监听输入框变化，验证码位数=6的时候，发送HTTP请求验证
		async onChange(e) {
			
			let varInp = await this.verUserInput(e.detail.value)
			
			
			if(varInp && this.verifyCode.length===6) {
				
				console.log('发请求，验证 验证码')
				// 发送短信验证请求
				// 最后经过一系列判断，发送请求
				// let res = await http_xx
				let res = 1
				
				
				// 发送请求验证成功，
				// 那么就发送请求，将该手机号设置为该用户的绑定手机号
				if(res) {
					console.log('验证成功，设置用户手机号')
					// 设置用户信息，传入手机号
					let reUserPhone = await http_setUserInfoData({"mobile": this.phoneNumber})
					if (reUserPhone) {
						Toast('更换绑定成功！')
						// 清空倒计时和定时器
						this.setCountTime(0)
						clearInterval(this.interval)
						
						// 跳转到我的页面
						setTimeout(()=>{
							// 跳转到验证码填写页面
							uni.switchTab({
								url: '../../pages/me/me',
								complete (res) {
									console.log(res)
								}
							})
						},1000)
						
					} else {
						Toast('更换绑定失败！')
					}
					
				}
				
				
			}
		},
		
		
		// 重新获取验证码
		async reVerifyCode() {
			
			console.log('重新发送HTTP请求，获取验证码')
			
			// let res = await http_xx
			let res = 1
			
			if(1) {
				
				// 验证成功了,弹窗提示,然后跳转到输入验证码页
				Toast.success({
					forbidClick: true, // 禁用背景点击
					message: '验证码已发送',
				})
				
				// 设置倒计时时间
				this.setCountTime(60)
				
				// 设置定时器
				this.setCountDownInterval()
				
				
			}
			
		},
		
		// 随时验证用户输入的验证码
		verUserInput(newValue) {
			return new Promise((resolve, reject)=>{
				// 长度不大于6位
				if(newValue.length>6) {
					console.log('长度超过6位')
					Toast('手机号长度超过6位')
					// 这里v-model有个BUG，需要设置延迟才行
					if(st) {
						clearTimeout(st)
					}
					let st = setTimeout(() => { this.verifyCode = '' }, 5)
					console.log(this.verifyCode)
					return resolve(false)
				}
				
				// 确保是数字
				if(isNaN(Number(newValue))) {
					console.log('不是数字')
					Toast('请输入数字')
					if(st) {
						clearTimeout(st)
					}
					let st = setTimeout(() => { this.verifyCode = '' }, 0)
					return resolve(false)
				} 
				
						
				// 不准有空格
				if(String(newValue).indexOf(" ")>=0) {
					console.log('有空格')
					Toast('请输入正确验证码')
					if(st) {
						clearTimeout(st)
					}
					let st = setTimeout(() => { this.verifyCode = '' }, 0)
					return resolve(false)
				}
				
				// 不准有小数点
				if(String(newValue).indexOf(".")>=0) {
					console.log('有小数点')
					Toast('请输入正确验证码')
					if(st) {
						clearTimeout(st)
					}
					let st = setTimeout(() => { this.verifyCode = '' }, 0)
					return resolve(false)
				}
				
				// 上边经过一顿if判断，而且都return了，如果到了这里，说明验证通过
				resolve(true)
				
			}).catch(error => {
				resolve(false)
			}).finally(() => {
			})
			
			
			
			
		},
		
		setCountDownInterval() {
			// 开启定时器
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
.me-editUserPhone-verify {
	padding: 132rpx 110rpx 0;
	box-sizing: border-box;
	line-height: 1;
	
	.editUserPhone-verify-tit {
		font-size: 36rpx;
		color: #333;
		margin-bottom: 36rpx;
	}
	
	.editUserPhone-verify-re-tips {
		font-size: 24rpx;
		color: #666;
		margin-bottom: 18rpx;
	}
	
	.editUserPhone-verify-re-code {
		margin-bottom: 46rpx;
		font-size: 24rpx;
		.phone-interval-on {
			color: #999;
		}
		.phone-interval-off {
			color: #0177BF;
		}
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
	
	
}
</style>
