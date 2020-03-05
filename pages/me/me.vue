<template>
	<div id="me">
		<div class="me-bg-box">
			<div class="me-bg-img-box">
				<div class="me-bg-img-1"></div>
				<div class="me-bg-img-2"></div>
				<div class="me-bg-img-3"></div>
			</div>
			<div class="user-avatar">
				<div class="avatar-nor" v-if="!watchIsLogin"></div>
				<img :src="store_UserInfoData.avatarUrl" v-if="watchIsLogin">
			</div>
			<div class="user-info-wrapper">
				<p class="user-name">{{watchIsLogin?store_UserInfoData.nickName:'未登录'}}</p>
				<p class="user-phone" v-if="watchIsLogin">{{store_UserInfoData.mobile&&watchIsLogin?store_UserInfoData.mobile.substring(0,3)+'****':''}}{{store_UserInfoData.mobile&&watchIsLogin?store_UserInfoData.mobile.substring(7,11):''}}</p>
			</div>
		</div>
		<div class="functional-wrapper">
			<div class="functional-box">
				<ul>
					<li @click="openBalance">
						<div class="functional-img-balance"></div>
						<div class="functional-box-text-group">
							<p :class="{'text-num':!watchIsLogin}">余额</p>
							<p class="text-num" v-if="watchIsLogin">200.00元</p>
						</div>
					</li>
					<li @click="openRecharge">
						<div class="functional-img-recharge"></div>
						<div class="functional-box-text-group">
							<p class="text-num">充值</p>
						</div>
					</li>
					<li>
						<div class="functional-img-evaluate"></div>
						<div class="functional-box-text-group">
							<p :class="{'text-num':!watchIsLogin}">我的评论</p>
							<p class="text-num" v-if="watchIsLogin">12</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<ul class="btn-list-wrapper">
			<li @click="toPage(1)">
				<div class="text-group">
					<i></i>
					<span>个人信息</span>
				</div>
				<div class="arrow-wrapper">
					<i></i>
				</div>
			</li>
			<li @click="toPage(2)">
				<div class="text-group">
					<i></i>
					<span>人脸识别支付</span>
				</div>
				<div class="arrow-wrapper">
					<i></i>
				</div>
			</li>
			<li @click="toPage(3)">
				<div class="text-group">
					<i></i>
					<span>我的地址</span>
				</div>
				<div class="arrow-wrapper">
					<i></i>
				</div>
			</li>
			<li @click="toPage(4)">
				<div class="text-group">
					<i></i>
					<span>意见反馈</span>
				</div>
				<div class="arrow-wrapper">
					<i></i>
				</div>
			</li>
			<li @click="toPage(5)">
				<div class="text-group">
					<i></i>
					<span>修改手机号</span>
				</div>
				<div class="arrow-wrapper">
					<span>{{store_UserInfoData.mobile?store_UserInfoData.mobile.substring(0,3)+'****':''}}{{store_UserInfoData.mobile?store_UserInfoData.mobile.substring(7,11):''}}</span>
					<i></i>
				</div>
			</li>
		</ul>
		<!-- 这里的isLogin是mixin中拿到的，检测是否登录了 -->
		<div class="log-out" @click="logOut" v-if="watchIsLogin">退出登录</div>
		<div class="log-in" @click="openLogin" v-if="!watchIsLogin">登录</div>
		<van-toast id="van-toast" />
		<van-dialog id="van-dialog" />
	</div>
</template>

<script>	
// 拿到vuex中的函数
import {mapGetters, mapMutations} from 'vuex'
// 检测是否登录、token是否过期
import {isLogin} from '@/utils/utils.js'
// toast组件，拿到的不是组件，是方法；
// 如此这般：Toast('我是提示文案，建议不超过十五字~');
import Toast from '../../wxcomponents/weapp/dist/toast/toast'
import Dialog from '../../wxcomponents/weapp/dist/dialog/dialog'
export default {
	data () {
		return {
			watchIsLogin:false
		}
	},
	onShow() {
		this.watchIsLogin = isLogin()
		console.log(this.watchIsLogin)
	},
	methods: {
		logOut() {
			Dialog.confirm({
			  title: '确认退出登录',
			  message: '退出登录后您将无法使用此账号登录智慧食堂小程序'
			}).then(() => {
			  // on confirm
			  console.log('logOut')
			  this.setToken('')
			  this.setTokenExpiration('')
			  this.setUserInfo({
			  	avatarUrl: null,
			  	city: null,
			  	country: null,
			  	gender: null,
			  	language: null,
			  	nickName: null,
			  	province: null
			  })
			  this.setUserInfoData({
			  	address: null, // 用户地址
			  	avatarUrl: null, // 头像imgURL
			  	birth: null, // 生日
			  	city: null, // 城市
			  	country: null, // 国家
			  	createTime: null, // 注册时间
			  	dataSort: null, // 数据排序
			  	email: null, // 邮箱
			  	gender: null, // 性别 1 | 0
			  	id: null, // 用户ID
			  	idCard: null, // 当用户选择内部员工时必填
			  	isDelete: null, // 逻辑删除: 0:未删除 1:已删除
			  	language: null, // 语言
			  	mobile: null, // 手机号
			  	nickName: null, // 昵称
			  	openId: null, // string
			  	passwd: null, // 登录密码
			  	province: null, // 省份
			  	sessionKey: null, // 
			  	status: null, // 数据状态 0:正常  1:锁定
			  	unionId: null, // 
			  	updateTime: null, // 更新时间: 2020-11-11 00:00:00
			  	userType: null, // 用户类型 0:内部 1:外部 当外部用户时, 不需要绑定员工号
			  })
			  this.watchIsLogin = false
			  Toast('已退出登录')
			}).catch(() => {
			  // on cancel
			});
			
			
			
			// 退出登录后，如果需要跳转到登录页，开启下方注释即可
			// uni.navigateTo({
			// 	// 这里的logOut代表是否是退出操作，如果是退出操作，那么跳转页面的时候，传参就是1
			// 	url: '../../pages/login/login?logOut='+'1',
			// 	complete (res) {
			// 		console.log(res)
			// 	}
			// })
		},
		openLogin() {
			uni.navigateTo({
				url: '../../pages/login/login',
				complete (res) {
					console.log(res)
				}
			})
		},
		
		// 因为ul下的4个li 都是跳转页面，而且都需要判断用户是否已经登录
		// 那么这里就统一进行跳转，
		// 根据传过来的 参数 进行页面跳转
		toPage(pageCode) {
			
			if(this.watchIsLogin) {
				// 1 个人信息页
				// 2 我的地址
				// 3 意见反馈
				// 4 修改手机号
				switch(pageCode){
					case 1:
						this.openPage('me_userInfo');
						break;
					case 2:
						this.openPage('me_faceUpLoad');
						break;
					case 3:
						this.openPage('me_userAddrs');
						break;
					case 4:
						this.openPage('me_feedback'); 
						break;
					case 5:
						this.openPage('me_editUserPhone'); 
						break;
				}
				
			} else {
				Toast('请您先登录')
				console.log('用户未登录')
			}
		},
		openPage(pageNmae) {
			uni.navigateTo({
				url: '../../pages/'+pageNmae+'/'+pageNmae,
				complete (res) {
					console.log(res)
				}
			})
		},
		
		// 余额
		openBalance() {
			if(this.watchIsLogin) {
				uni.navigateTo({
					url: '../../pages/me_balance/me_balance',
					complete (res) {
						console.log(res)
					}
				})
			} else {
				Toast('请您先登录')
				console.log('用户未登录')
			}
			
		},
		// 充值
		openRecharge() {
			if(this.watchIsLogin) {
				uni.navigateTo({
					url: '../../pages/me_recharge/me_recharge',
					complete (res) {
						console.log(res)
					}
				})
			} else {
				Toast('请您先登录')
				console.log('用户未登录')
			}
		},
		
		...mapMutations({
			// 这里映射了这个方法，那么在调用x的时候，就等于使用了this.$store.commit('SET_SINGER', value)这个方法；
			setToken: 'setToken',
			setTokenExpiration: 'setTokenExpiration',
			setUserPhone: 'setUserPhone',
			setUserInfo: 'setUserInfo',
			setUserInfoData: 'setUserInfoData'
		}),
	},
	computed: {
		// vuex提供的辅助函数，拿到store/getters.js向外暴露的内容；
		...mapGetters([
			'store_UserInfo',
			'store_UserInfoData', // 用户详细数据
			'store_token',
			'store_tokenExpiration'
		])
	}
}
</script>

<style lang="stylus">
page {
	background-color: #F5F5F5;
}
#me {
	position: relative;
	.me-bg-box {
		position: relative;
		display: flex;
		align-items: center;
		width: 100%;
		height: 280rpx;	
		background-color: #0177BF;
		padding: 0 30rpx 80rpx;
		box-sizing: border-box;
		margin-bottom: 180rpx;
		.me-bg-img-box {
			width: 100%;
			height: 150rpx;
			position: absolute;
			left: 0;
			bottom: 0;
			.me-bg-img-1 {
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				height: 140rpx;
				background-color: rgba(0,0,0,.4);
				background: url('../../common/images/me/bg-1.png') no-repeat;
				background-size: 200% 100%;
				background-position: 0rpx 0rpx;
				animation-name: bgmove;
				animation-duration: 14s;
				animation-iteration-count: infinite;
				animation-timing-function: linear;
				animation-play-state: running;
				animation-direction:alternate;
			}
			.me-bg-img-2 {
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				height: 94rpx;
				background-color: rgba(0,0,0,.4);
				background: url('../../common/images/me/bg-2.png') no-repeat;
				background-size: 200% 100%;
				background-position: 0rpx 0rpx;
				animation-name: bgmove;
				animation-duration: 17s;
				animation-iteration-count: infinite;
				animation-timing-function: linear;
				animation-play-state: running;
				animation-direction:alternate;
			}	
			.me-bg-img-3 {
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				height: 136rpx;
				background-color: rgba(0,0,0,.4);
				background: url('../../common/images/me/bg-3.png') no-repeat;
				background-size: 200% 100%;
				background-position: 0rpx 0rpx;
				animation-name: bgmove;
				animation-duration: 20s;
				animation-iteration-count: infinite;
				animation-timing-function: linear;
				animation-play-state: running;
				animation-direction:alternate;
			}
		}
		
		@keyframes bgmove {
			from {
				background-position: 0rpx 0rpx;	
				}
				
			to {
				background-position: -750rpx 0rpx;
				}
		}
		.user-avatar {
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			z-index: 10;
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
			background-color: #fff;
			img {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				overflow: hidden;
			}
			.avatar-nor {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				overflow: hidden;
				background: url('../../common/images/me/avatar-nor.png') no-repeat;
				background-size: 100%;
			}
		}
		.user-info-wrapper {
			position: relative;
			z-index: 10;
			line-height: 1;
			margin-left: 48rpx;
			color: #fff;
			font-size: 32rpx;
			.user-name {
				
			}
			.user-phone {
				margin-top: 20rpx;
			}
		}
	}
	.functional-wrapper {
		width:100%;
		height: 200rpx;
		padding: 0 30rpx;
		box-sizing:border-box;
		position: absolute;
		top: 220rpx;
		left: 0;
		.functional-box {
			height: 220rpx;
			width: 100%;
			border-radius: 20rpx;
			background-color: #fff;
			box-shadow:0 3rpx 40rpx 0 rgba(65,136,242,0.15);
			ul {
				display: flex;
				justify-content: space-between;
				height: 100%;
				width: 100%;
				padding: 0 48rpx;
				box-sizing: border-box;
				li {
					display: flex;
					flex-direction: column;
					align-items: center;
					height: 100%;
					width: 33%;
					.functional-img-balance, .functional-img-evaluate, .functional-img-recharge {
						width: 80rpx;
						height: 80rpx;
						margin: 30rpx 0 16rpx;
					}
					.functional-img-balance {
						background: url('../../common/images/me/balance.png') no-repeat;
						background-size: 100%;
					}
					.functional-img-evaluate{
						background: url('../../common/images/me/evaluate.png') no-repeat;
						background-size: 100%;
					}
					.functional-img-recharge{
						background: url('../../common/images/me/recharge.png') no-repeat;
						background-size: 100%;
					}
					.functional-box-text-group{
						p {
							font-size: 26rpx;
							color: #666;
							line-height: 1;
							text-align: center;
						}
						.text-num {
							margin-top: 12rpx;
						}
					}
				}
			}
		}
	}
	
	.btn-list-wrapper {
		width: 100%;
		li {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 90rpx;
			weidth: 100%
			padding: 0 30rpx;
			box-sizing: border-box;
			background-color: #fff;
			margin-bottom: 16rpx;
			.text-group {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				i {
					width: 28rpx;
					height: 28rpx;
					margin-right: 20rpx;
				}
				span {
					font-size: 26rpx;
					color: #666;
				}
			}
			.arrow-wrapper {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				span {
					font-size: 26rpx;
					color: #666;
				}
				i {
					width: 16rpx;
					height: 28rpx;
					margin-left: 20rpx;
					background: url('../../common/images/me/arrow.png') no-repeat;
					background-size: 100%;	
				}
			}
		}
		li:nth-of-type(1) {
			.text-group{
				i {
					background: url('../../common/images/me/gerenxinxi.png') no-repeat;
					background-size: 100%;	
				}
			}
		}
		li:nth-of-type(2) {
			.text-group{
				i {
					background: url('../../common/images/me/face.png') no-repeat;
					background-size: 100%;	
				}
			}
		}
		li:nth-of-type(3) {
			.text-group{
				i {
					background: url('../../common/images/me/wodedizhi.png') no-repeat;
					background-size: 100%;	
				}
			}
		}
		li:nth-of-type(4) {
			.text-group{
				i {
					background: url('../../common/images/me/yijianfankui@2x.png') no-repeat;
					background-size: 100%;	
				}
			}
		}
		li:nth-of-type(5) {
			.text-group{
				i {
					background: url('../../common/images/me/xiugaishoujihao@2x.png') no-repeat;
					background-size: 100%;	
				}
			}
		}
		li:last-of-type {
			margin-bottom: 0;
		}
	}
	.log-in,.log-out {
		width: 100%;
		height: 90rpx;
		background-color: #fff;
		line-height: 90rpx;
		text-align: center;
		font-size: 32rpx;
		margin-top: 40rpx;
	}
	.log-in {
		color: #007AFF;
	}
	.log-out {
		color: #F98166;
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
