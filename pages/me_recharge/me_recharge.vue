<template>
	<div class="me-recharge">
		<div class="me-recharge-tit">账户余额</div>
		<div class="me-recharge-num">¥20.05</div>
		<div class="me-recharge-sel-box">
			<div class="sel-btn-wra-o">
				<div :class="['btn-wra-o-l', {'act': moneyNum===100}]" @click="selectMoney(100)">100元</div>
				<div :class="['btn-wra-o-r', {'act': moneyNum===200}]" @click="selectMoney(200)">200元</div>
			</div>
			<div class="sel-btn-wra-t">
				<div :class="['btn-wra-o-l', {'act': moneyNum===300}]" @click="selectMoney(300)">300元</div>
				<div :class="['btn-wra-o-r', {'act': isOrtherMoney}]" @click="pickerShow">{{ isOrtherMoney && moneyNum!==-1 ?moneyNum:'其他金额' }}</div>
			</div>
		</div>
		<van-button
		round 
		type="primary"
		class="btn-on-recharge" 
		@click="onRecharge">充值</van-button>
		<div class="me-recharge-record" @click="openRecordPage">
			<p>充值记录</p>
			<i></i>
		</div>
		<van-toast id="van-toast" />
		<van-popup :show="pickerShowFlag" @close="onClose" z-index="99999" position="bottom">
			<van-picker :columns="columns" @change="onChange" />
		</van-popup>
	</div>
</template>

<script>
// 判断用户是否登录
import {isLogin} from '@/utils/utils.js'
// 微信支付
import {http_toPay} from '@/utils/http/http_toPay.js'
// 充值到虚拟账户
import {http_recharge} from '@/utils/http/http_recharge.js'
import {mapGetters} from 'vuex'
import Toast from '../../wxcomponents/weapp/dist/toast/toast'
// 获取用户余额
import {http_getUserBalance} from '@/utils/http/http_getUserBalance.js'
export default {
	data() {
		return {
			// 用户余额
			userBalance: -1,
			moneyNum: -1, // 充值金额
			// 付款对象
			payOBJ: {},
			// 可选择金额
			columns: ['300', '400', '500', '600', '700', '800', '900', '1000'],
			// 金额滚动条是否显示
			pickerShowFlag: false,
			// 当前用户是否选择其他金额
			isOrtherMoney: false
			
		}
	},
	async onShow() {
		// 获取用户余额
		let userB = await http_getUserBalance()
		console.log('刷新余额')
		console.log(userB)
		if(!userB) {
			Toast('获取余额信息失败，刷新重试')
		} else {
			this.userBalance = store_userBalance.xx.xx
		}
		
		
		// 测试
		// let virtualAccountRes = await http_recharge(1)
		// console.log(virtualAccountRes)
	},
	methods: {
		async onRecharge() {
			
			let islogin = await isLogin()
			if(!islogin) {
				// 用户未登录，跳转到登录页
				uni.navigateTo({
					// 跳转路径
					// 摊位列表页
					url: '../../pages/login/login'
				})
				return
			}
			
			console.log('充值按钮')
			console.log('openid=> ' + this.store_UserInfoData.openId)
			console.log('充值金额=> ' + this.moneyNum + '元')
			
			let datas = {
				money: this.moneyNum * 100, // 这里的money字段 金额，按分计算，10就是一毛钱 100就是1块钱，所以这列*100
				openid: this.store_UserInfoData.openId,
				body: '餐厅充值'
			}
			
			Toast.loading({
				message: '支付中...',
				duration: 0
			});
			
			let reRes = await http_toPay(datas)
			if(reRes.code==0) {
				// reRes.data:{
				// 	nonceStr: "kOlz3qbSVDkhZWqJ"
				// 	paySign: "BC9EE61F215608C63C604EB343F58166"
				// 	prepay_id: "wx011859292692943c47a4a7881249020900"
				// 	signType: "MD5"
				// 	timeStamp: "1583060368"
				// }
				this.payOBJ = reRes.data
				// 调用发起支付的方法
				this.callPayment()
			} else {
				Toast('支付失败')
			}
			
			// 跟立魏协同测试
			// uni.request({
			// 	url: 'http://jtxhkh.natappfree.cc/pay/wx/payment?token=befecada0d7cbd2e355f7356a2518153',
			// 	data: datas,
			// 	method: 'POST',
			// 	success: (res) => {
			// 		console.log('充值结果')
			// 		if(res.statusCode==200) {
			// 			console.log(res.data)
			// 			// res.data↓
			// 			// data:{
			// 			// 	nonceStr: "kOlz3qbSVDkhZWqJ"
			// 			// 	paySign: "BC9EE61F215608C63C604EB343F58166"
			// 			// 	prepay_id: "wx011859292692943c47a4a7881249020900"
			// 			// 	signType: "MD5"
			// 			// 	timeStamp: "1583060368"
			// 			// }
			// 			// message: "Success!"
			// 			// msg: "统一下单成功!"
			// 			// status: 200
			// 			if(res.data.status==200) {
			// 				this.payOBJ = res.data.data
			// 				// 调用发起支付的方法
			// 				this.callPayment()
			// 			}
			// 		}
			// 	},
			// 	fail: (err)=>{
			// 		console.log('失败')
			// 		console.log(err)
			// 	}
			// })
			
		},
		// 选择金额
		selectMoney(num) {
			
			this.moneyNum = num
			
			// 当前用户是否选择其他金额
			this.isOrtherMoney = false
		},
		// 选择金额  其他金额滚动条
		onChange(event) {
		    console.log(event.detail)
			this.moneyNum = Number(event.detail.value)
		 },
		 // 滚动选择金额展示、隐藏
		 pickerShow() {
			 this.pickerShowFlag = !this.pickerShowFlag
			 
			 // 当前用户是否选择其他金额
			 this.isOrtherMoney = true
		 },
		 onClose() {
			 console.log('隐藏上拉框')
			 this.pickerShowFlag = false
		 },
		// 发起支付
		async callPayment() {
			let serviceP = await this.getServiceProvider()
			
			console.log('支付对象↓')
			console.log(this.payOBJ)
			if(serviceP!==false) {
				uni.requestPayment({
					provider: serviceP,	// String 	是 	服务提供商，通过 uni.getProvider 获取。
					// orderInfo: ,	// String/Object 	是 	订单数据，注意事项
					
					timeStamp: this.payOBJ.timeStamp,	// String 	微信小程序必填 	时间戳从1970年1月1日至今的秒数，即当前的时间。
					nonceStr: this.payOBJ.nonceStr,	// String 	微信小程序必填 	随机字符串，长度为32个字符以下。。
					package: 'prepay_id=' + this.payOBJ.prepay_id,	// String 	微信小程序必填 	统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=xx。
					signType: this.payOBJ.signType,	// String 	微信小程序必填 	签名算法，暂支持 MD5。
					paySign: this.payOBJ.paySign,	// String 	微信小程序必填 	签名，具体签名方案参见 微信小程序支付文档
					
					// bannedChannels: ,	// Array<String> 	否 	需要隐藏的支付方式，详见 百度小程序支付文档
					// service: ,	// Number 	头条小程序必填
					_debug: 0,	// Number 	否 	仅限调试用，上线前去掉该参数。_debug=1时，微信支付期间可以看到中间报错信息，方便调试
					// getOrderStatus: ,	//  Function 	头条小程序必填
					success: async (res) => {
						
						if(res.errMsg == 'requestPayment:ok') {
							
							// 微信支付成功，此时要向后台发起充值到虚拟账户的请求，
							// 因为此时的微信支付，是支付到微信上，不是在虚拟账户中，
							// 所以微信支付成功后，还要向虚拟账户充值
							
							let virtualAccountRes = await http_recharge(this.moneyNum)
							
							if(virtualAccountRes.code==0) {
								console.log('支付成功')
								Toast.clear()
								Toast('充值成功')
								// 此时重新获取用户余额等信息
								let userB = await http_getUserBalance()
								console.log('刷新余额')
								console.log(userB)
								if(!userB) {
									Toast('获取余额信息失败，刷新重试')
								}
							}
							
						}
						
					} ,
					fail: async (err) => {
						console.log('支付失败')
						Toast.clear()
						Toast('支付失败')
						let userB = await http_getUserBalance()
						console.log('刷新余额')
						console.log(userB)
						if(!userB) {
							Toast('获取余额信息失败，刷新重试')
						}
						console.log(err)
					}
				})
			}
			
		},
		// 发起支付前，获取支付服务商
		getServiceProvider() {
			return new Promise(async (resolve, reject) => {
				
				await uni.getProvider({
					service: 'payment',
					success: (res) => {
						if(res.errMsg == 'getProvider:ok') {
							console.log(res.provider[0])
							resolve(res.provider[0])
						} else {
							resolve(false)
						}
					},
					fail: (err) => {
						resolve(false)
					}
				})
				
				
			})
		},
		// 打开充值记录页
		openRecordPage() {
			uni.navigateTo({
				url: '../../pages/me_recharge_record/me_recharge_record',
				complete (res) {
					console.log(res)
				}
			})
		}
	},
	computed: {
		...mapGetters([
			'store_UserInfoData', // 用户信息
			'store_userBalance',  // 用于余额信息
		])
	}
}
</script>

<style lang="stylus">
.me-recharge {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 60rpx 30rpx;
	box-sizing: border-box;
	
	.me-recharge-tit {
		font-size: 30rpx;
		color: #666;
		margin-bottom: 20rpx;
	}
	.me-recharge-num {
		font-size: 72rpx;
		color: #333;
		margin-bottom: 88rpx;
		font-weight: 700;
	}
	.me-recharge-sel-box {
		padding: 0 44rpx;
		box-sizing: border-box;
		.sel-btn-wra-o, .sel-btn-wra-t {
			height: 100rpx;
			display: flex;
			justify-content: center;
			font-size: 36rpx;
			color: #A0A0A0;
			line-height: 100rpx;
			text-align: center;
			.btn-wra-o-l, .btn-wra-o-r {
				height: 100%;
				width: 270rpx;
				border-radius: 10rpx;
				border-width: 1rpx;
				border-style: solid;
				border-color: #A0A0A0;
				color: #A0A0A0;
			}
			.btn-wra-o-l {
				margin-right: 60rpx;
			}
			.btn-wra-o-r {}
			.act {
				color: #0177BF;
				border-color: #0177BF;
			}
		}
		.sel-btn-wra-o {
			margin-bottom: 40rpx;
		}
	}
	
	.btn-on-recharge{
		display: flex;
		justify-content: center;
	}
	.van-button--primary, {
		margin: 40rpx auto 100rpx !important;
		width: 600rpx;
		color: #fff !important;
		border-radius: 10rpx !important;
		background-color: #0177BF !important;
		border: none !important;
		font-size: 30rpx !important;
		line-height: 36rpx !important;
		transition: all .4s !important;
	}
	
	.me-recharge-record {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100rpx;
		width: 100%;
		border-top: 1rpx solid #eee;
		border-bottom: 1rpx solid #eee;
		p {
			font-size: 30rpx;
			color: #666;
		}
		i {
			width: 16rpx;
			height: 28rpx;
			background: url('../../common/images/me/arrow.png') no-repeat;
			background-position: center;
			background-size: 100%;
		}
	}
	
	// 滚动栏
	.van-picker {
		
		background-color: #fff !important;
	}
	
	
}
</style>
