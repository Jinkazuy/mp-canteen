<template>
	<div id="page-login">
		<div class="logo-wrapper">
				<img src="../../common/images/login/logo.png">
				<p>智慧食堂</p>
		</div>
		<!-- 这个@getuserinfo是uniapp提供的处理事件，只适用于微信小程序，在点击这个按钮后，会触发bindGetUserInfo，然后拿到用户点击弹窗授权的回调函数 -->
		<!-- 不同于@click，这个@getuserinfo只能在用户授权的弹窗，当用户点击拒绝或接受才会触发这个事件，并且这个事件只能用在小程序 -->
		<div class="page-login-btn">
			<van-button round type="primary" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" v-if="onLoginBTN">登录</van-button>
			<van-button round type="primary" open-type="getPhoneNumber" @getphonenumber="bindgetphonenumber" v-if="getPhoneBTN">获取手机号</van-button>
		</div>
		<van-toast id="van-toast" />
		<div class="log-tips">
			<p>登录代表您已同意<span>智慧食堂用户协议、隐私协议</span></p>
		</div>
	</div>
</template>

<script>

	// toast组件，拿到的不是组件，是方法；
	// 如此这般：Toast('我是提示文案，建议不超过十五字~');
	import Toast from '../../wxcomponents/weapp/dist/toast/toast'

	// 拿到vuex中的函数
	import {mapGetters, mapMutations} from 'vuex'
	// 引入自己封装的发送http请求的函数
	import {http_login_setToken} from '../../utils/http/http_login_setToken.js'
	import {http_getUserInfoData} from '../../utils/http/http_getUserInfoData.js'
	import {http_getPhone} from '../../utils/http/http_getPhone.js'
	export default {
		data () {
			return {
				// 授权按钮是否显示，当没有获取用户授权时，显示授权按钮
				onLoginBTN: false,
				// 获取用户手机号按钮
				getPhoneBTN: false,
				// 登录时出现888的次数，超过5次就算是登录失败，这个原因是因为后台解析错误
				errNum: 0
			}
		},
		// 监听页面显示。
		// 页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
		async onShow () {

			// 隐藏返回首页按钮，仅支持微信小程序
			// #ifdef MP-WEIXIN
			// uni.hideHomeButton()
			// #endif


			
		},
		// 页面加载
		onLoad(val) {
			if(val.onLoadErrMsg){
				Toast(val.onLoadErrMsg)
			}
			// 注销登录会传过来logOut===1，那么代表是注销后跳转到这里
			// 那么就不要进行自动登录操作；
			if(val.logOut && val.logOut==='1') {
				console.log('logOut')
				// 获取用户信息
				this.onLoginBTN = true,
				// 获取用户手机号按钮
				this.getPhoneBTN = false
			}
			if(!val.logOut) {
				/*
				* 页面功能逻辑：
				* 1、获取用户本地的信息
				* 2、获取到用户基本信息后 - 获取手机号
				* 3、获取手机号后 - 获取token，刷新token过期时间；
				*
				*
				*/
				this.getSetting()
			}
		},
		// 页面卸载
		onUnload() {},
		methods: {

			/*
			* 获取用户设置
			*/
			getSetting () {
				
				Toast.loading({
					message: '正在登陆....',
					duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
				})
				
				uni.getSetting({
				  success: (res) => {
						if (res.authSetting["scope.userInfo"]) {
							console.log('已获取用户“用户信息授权，直接获取用户信息（非敏感数据）”')
							// 用户已授权：用户信息
							// 获取用户信息
							// 这里禁止页面自动登录
							this.getUserInfo()
						} else {
							Toast.clear()
							Toast('需要您的授权')
							// 未授权用户信息,显示授权用户信息按钮，隐藏其他按钮；
							this.onLoginBTN = true
							this.getPhoneBTN = false
						}
				  }
				})
			},


			/**
			* 获取用户信息授权
			* 获取用户信息
			*/
			getUserInfo () {
				uni.getUserInfo({
				  success: (res) => {
						// 获取成功，存本地
						// 将用户基本信息储存到本地，这步其实没什么用，因为用户登录后，会获取用户更详细的信息
						this.setUserInfo(res.userInfo)
						
						// 获取token，将用户加密信息发送给后台
						this.loginAndGetToken(res.encryptedData, res.iv)
				  }
				})
			},



		 /**
		 * @param obj[auto]
		 * @return null
		 * 备注：点击open-type="getUserInfo"按钮时 触发@getuserinfo事件，将参数自动传递至bindGetUserInfo (e) 中
		 */
		 // 用户点击授权按钮后，弹出弹窗，然后在弹窗点取消或授权，会进入这个函数
		 // 这个@getuserinfo是uniapp提供的处理事件，只适用于微信小程序，
		 // 在点击这个按钮后，会触发bindGetUserInfo，然后拿到用户点击弹窗授权的回调函数
		 // 不同于@click，这个@getuserinfo只能在用户授权的弹窗，当用户点击拒绝或接受才会触发这个事件，并且这个事件只能用在小程序
			bindGetUserInfo (e) {
					console.log(e)
					if (e.target.userInfo) {
						console.log(e.target.userInfo)
						
						Toast.loading({
							message: '正在登陆....',
							duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
						})
						
						
						// 拿到用户基本信息此时的操作，
						// 将用户基本信息储存到本地，这步其实没什么用，因为用户登录后，会获取用户更详细的信息
						this.setUserInfo(e.target.userInfo)

						// 用户登录后，向后台换取token存储到本地
						// 这里不去效验本地是否有token，因为：用户信息可能更新、变动，
						// 所以，这里把当前操作用户的加密数据发送给后台，后台解码后将用户信息和最终登录日期等数据入库；
						this.loginAndGetToken(e.detail.encryptedData, e.detail.iv)


					} else {
						Toast('需要您的授权才能登录')
					}
			},

			/**
			* 检查本地是否能获取用户手机号
			*/
			async ifStoreUserPhone () {
				// 用户基本信息和详细信息中都有手机号
				
				if ((this.store_UserInfoData.mobile.trim()) !== '' && this.store_UserInfoData.mobile!==null) {
						console.log('拿到手机号，本地用户手机号↓')
						console.log(this.store_UserInfoData.mobile)
						// 拿到用户信息、拿到手机号，登录
						// 检查本地用户信息，这里就用用户名做检测，如果手机号、用户新都存在，那么视为登录
						if( this.store_UserInfoData.nickName!==null && this.store_UserInfoData.nickName!=="") {
							this.backOnePage()
						}
					} else {
						// 本地用户手机号为空
						this.getPhoneBTN = true
						Toast('请允许获取您的手机号')
						console.log('本地手机号获取为空，显示获取手机号按钮')
					}
			},

			/**
			 * @param obj[auto]
			 * @return null
			 * 备注：点击open-type="getPhoneNumber"按钮时 触发@getphonenumber事件，将参数自动传递至bindgetphonenumber (e) 中
			*/
			async bindgetphonenumber (e) {
				console.log('用户点击获取手机号按钮')
				console.log(e)
				if (e.detail.encryptedData) {
					console.log('用户授权手机号，拿到加密数据，发送给后台换取手机号')
					let phoneRes = await http_getPhone(e.detail.encryptedData, e.detail.iv)
					
					if (phoneRes) {
						// 等待换取手机号结束，检测本地手机号
						this.ifStoreUserPhone()
					} else {
						Toast('伺服器正在调整，暂不提供登录，抱歉')
						console.log('服务器解码手机号失败')
					}
					
				} else {
					Toast('请您授权获取手机号')
					console.log('用户拒绝授权获取手机号')
				}
			},

			/*
			* 获取token，将用户加密信息发送给后台
			*/
			async loginAndGetToken (encryptedData, iv) {
				// 用户登录后，向后台换取token存储到本地
				uni.login({
				  success: async (loginRes) => {
					  
						// 拿到用户登录Code，发送给后台，后台返回token值，将token存储到本地中；
						if (loginRes.code) {
							console.log('登录，获取token')
							let httpRes = await http_login_setToken(loginRes.code, encryptedData, iv)
							
							// 登录失败
							console.log(httpRes)
							if(!httpRes) {
								// 显示登录按钮，隐藏其他按钮
								this.onLoginBTN = true
								this.getPhoneBTN = false
								
								Toast.clear()
								
								Toast('登录失败')
								
								
							} else if(httpRes===888 && this.errNum<6) {
								console.log('微信解码出错')
								this.errNum++
								this.getUserInfo ()
							} else if(httpRes===888 && this.errNum>=6) {
								// 显示登录按钮，隐藏其他按钮
								this.onLoginBTN = true
								this.getPhoneBTN = false
								this.errNum = 0
								Toast.clear()
								Toast('登录失败，code888')
							}else {
								
								// 登录成功，执行获取手机号步骤
								// 登录 & 获取token成功
								
								// 获取token成功后，获取用户详细数据
								let getUD = await http_getUserInfoData()
								
								// 如果获取用户详细信息成功，就判断是否有手机号
								if(getUD) {
									// 如果获取到的用户详细信息中没有手机号，说明用户之前登陆没有设置手机号，其实逻辑上是不通的，应该是设置手机号了
									if((this.store_UserInfoData.mobile.trim()) === '' || this.store_UserInfoData.mobile === null ) {
										Toast.clear()
										
										// 显示获取手机号
										this.onLoginBTN = false
										this.getPhoneBTN = true
										// 然后检测本地用户手机号
										this.ifStoreUserPhone()
									} else {
										
										// 进入到里，此时，用户信息、用户手机号、token都获取成功，进行跳转回上一页
										if( this.store_UserInfoData.nickName!==null) {
											this.backOnePage()
										}
										
									}
								}
							}
						}
				  }
				})
			},
			backOnePage() {
				Toast.success({
					message: '登录成功'
				})
				setTimeout(()=>{
					uni.navigateBack({
					    delta: 1
					})
				},2000)
			},
			...mapMutations({
			        // 这里映射了这个方法，那么在调用x的时候，就等于使用了this.$store.commit('SET_SINGER', value)这个方法；
			        setUserInfo: 'setUserInfo',
					setToken: 'setToken'
			})
		},
		computed: {
			// vuex提供的辅助函数，拿到store/getters.js向外暴露的内容；
			...mapGetters([
				'store_UserInfo',
				'store_UserInfoData', // 用户详细数据
				'store_token',
				'store_UserPhone'
			])
		}
	}
</script>

<style lang="stylus">
	#page-login {
		position: relative;
	}
	.logo-wrapper {
		width: 100%;
		height: 200rpx;
		margin-top: 154rpx;
		text-align: center;
	}
	.logo-wrapper>img{
		display: block;
		margin: 0 auto;
		width: 120rpx;
		height: 120rpx;
	}
	.logo-wrapper>p{
		margin-top: 20rpx;
		color: #333;
		font-weight: 700;
	}
	.page-login-btn {
		display: flex;
		justify-content: center;
	}
	.van-button--primary{
		margin: 100rpx auto 0!important;
		width: 600rpx;
		color: #fff !important;
		border-radius: 16rpx !important;
		background-color: #0177BF !important;
		border: none !important;
		font-size: 36rpx !important;
		line-height: 36rpx !important;
	}
	.log-tips {
		position: absolute;
		top: 900rpx;
		width: 100%;
		left: 50%;
		transform: translateX(-50%);
		text-align: center;
		p {
			line-height: 1;
			color: #999;
			font-size: 24rpx;
			span {
				color: #0177BF;
			}
		}
	}
</style>
