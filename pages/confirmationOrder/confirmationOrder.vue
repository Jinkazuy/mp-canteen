<template>
	<div class="confirmation-order">
		<!-- 档口名称（食堂名称） -->
		<div class="stalls-name">麦当劳档口<span>(第一食堂)</span></div>
		<!-- 商品列表 -->
		<div class="stalls-order-goods-list">
			<div class="goods-list-item">
				<div class="goods-img-and-name">
					<div class="goods-img">
						<!-- <img src=""> -->
					</div>
					<div class="goods-name">暖心单人套餐</div>
				</div>
				<div class="goods-count-and-price">
					<div class="goods-total-count">x1</div>
					<div class="goods-total-price">¥50</div>
				</div>
			</div>
			<div class="goods-list-item">
				<div class="goods-img-and-name">
					<div class="goods-img">
						<!-- <img src=""> -->
					</div>
					<div class="goods-name nowrap">暖心单人套餐暖心单人套餐</div>
				</div>
				<div class="goods-count-and-price">
					<div class="goods-total-count">x1</div>
					<div class="goods-total-price">¥50</div>
				</div>
			</div>
			<div class="goods-list-item">
				<div class="goods-img-and-name">
					<div class="goods-img">
						<!-- <img src=""> -->
					</div>
					<div class="goods-name">暖心单人套餐</div>
				</div>
				<div class="goods-count-and-price">
					<div class="goods-total-count">x1</div>
					<div class="goods-total-price">¥50</div>
				</div>
			</div>
		</div>
		<!-- 折扣 -->
		<div class="discount-wrapper">
			<div class="discount-text">折扣</div>
			<div class="discount-price">- ¥16.8</div>
		</div>
		<!-- 订单备注 -->
		<div class="remarks-wrapper">
			<div class="remarks-text">订单备注</div>
			<div class="remarks-arr">口味、偏好 ></div>
		</div>
		<!-- 预计取餐时间、总价 -->
		<div class="stalls-toatl-price-wrapper">
			<div class="estimated-time">预计取餐时间：11:58</div>
			<div class="stalls-toatl-price">
				<span class="sum-tip">小计：</span>
				<span class="stalls-toatl-price-num">243.21</span>
			</div>
		</div>
		<!-- 底部栏 -->
		<div class="payment-bar">
			<div class="payment-bar-cont">
				<span class="total-price">¥243.21</span>
				<span class="total-discount">| 已优惠¥16.8</span>
			</div>
			<div class="payment-bar-btn" @click="toSettlement">去支付</div>
		</div>
	</div>
</template>

<script>
// 发送订单数据 ，获取支付对象
import {http_getOrderPay} from '@/utils/http/http_getOrderPay.js'	
export default {
	data() {
		return {
			
			// 支付服务提供商
			provider: ''
			
		}
	},
	methods: {
		// 发起支付
		async toSettlement () {
			
			
			// 先要获取服务提供商
			// 在App平台，可用的服务商，是打包环境中配置的服务商，与手机端是否安装了该服务商的App没有关系。
			// 云打包在manifest中配置相关模块和SDK信息，离线打包在原生工程中配置。某个服务商配置被打包进去，运行时就能得到相应的服务供应商。
			let getP = await this.getProv()
			
			
			
			// 获取提供商成功，发送数据给后台
			if(getP) {
				console.log('获取服务提供商成功')
				
				// let payData = await http_getOrderPay()
				// console.log('获取到支付对象')
				// console.log(payData)
				
				// 这里获取到的 payData 是后台发起支付之后的数据，返回前台，前台拿到才能进行 requestPayment 字段的填写，然后发起支付
				// if(payData) {
					
				// 	// uniapp 提供的支付函数，支持所有平台
				//  // https://uniapp.dcloud.io/api/plugins/payment?id=orderinfo
				// 	uni.requestPayment({
				// 		provider: this.provider, // String - 必填 - 服务提供商，通过 uni.getProvider 获取。
				// 		orderInfo: , // String/Object - 必填 - 订单数据，注意事项 https://uniapp.dcloud.io/api/plugins/payment?id=orderinfo
				// 		timeStamp: , // String - 微信小程序必填 - 时间戳从1970年1月1日至今的秒数，即当前的时间。
				// 		nonceStr: , // String - 微信小程序必填 - 随机字符串，长度为32个字符以下。
				// 		package: , // String - 微信小程序必填 - 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=xx。
				// 		signType: 'MD5', // String - 微信小程序必填 - 签名算法，暂支持 MD5。
				// 		paySign: , // String - 微信小程序必填 - 签名，具体签名方案参见 微信小程序支付文档
				// 		// _debug: , // Number - 否 - 仅限调试用，上线前去掉该参数。_debug=1时，微信支付期间可以看到中间报错信息，方便调试
				// 		// bannedChannels: , //  Array<String> - 否 - 需要隐藏的支付方式，详见 百度小程序支付文档
				// 		// service: , // Number - 头条小程序必填 - 
				// 		// getOrderStatus: , // Function - 头条小程序必填 - 
						
				// 		// 成功回调
				// 		success:(res)=> {
				// 			console.log('支付成功')
				// 			console.log(res)
						// 支付成功，跳转到支付成功页
						// 需要将订单的ID传入
						uni.navigateTo({
							// 跳转路径
							// 摊位列表页
							url: '../../pages/succOrder/succOrder?succOrderId=' + '12'
						});
				
				
				// 		},
				// 		// 失败回调
				// 		fail:(err) {
				// 			console.log('支付失败')
				// 			console.log(err)
				// 		}, // Function 
				// 		complete:(com) => {
				// 			console.log(com)
				// 		}, // Function 成功失败都回调
				// 	})
				// }
				
			}
		},
		
		// 获取服务提供商
		getProv() {
			return new Promise((resolve, reject)=> {
				// 在App平台，可用的服务商，是打包环境中配置的服务商，与手机端是否安装了该服务商的App没有关系。
				// 云打包在manifest中配置相关模块和SDK信息，离线打包在原生工程中配置。某个服务商配置被打包进去，运行时就能得到相应的服务供应商。
				uni.getProvider({
					service: 'payment', // String - 必填 - 服务类型，可取值见下面说明。oauth授权登录, share分享, payment支付, push推送
					
					// 接口调用成功的回调
					success: (res) => {
						if(res.errMsg === 'getProvider:ok') {
							console.log('获取到服务提供商↓')
							this.provider = res.provider[0]
							console.log(this.provider)
							resolve(true)
						}
					},
					
					// 接口调用失败的回调函数
					fail: (err) => {
						console.log(err)
						resolve(false)
					},
					
					// 接口调用结束的回调函数（调用成功、失败都会执行）
					complete: (com) => {
						// console.log(com)
					}
				})
			})
		}
		
	},
	onLoad(data) {
		// 获取食堂的ID，然后根据食堂的ID去遍历，拿到所有 档口的数据
		console.log(data.canteenId, data.stallsId)
		
		// 设置当前页面标题 为 餐厅名 
		uni.setNavigationBarTitle({
			title: '第一食堂'
		})
	}
}	
</script>

<style lang="stylus">
.confirmation-order{
	padding: 0 30rpx;
	box-sizing: border-box;
	// 档口名称（食堂名称）
	.stalls-name {
		height: 100rpx;
		border-bottom: 1rpx solid #eee;
		font-size: 36rpx;
		line-height: 100rpx;
		font-weight: 700;
		color: #666;
		span {
			font-size: 26rpx;
			margin-left: 20rpx;
		}
	}
	// 商品列表
	.stalls-order-goods-list {
		padding: 20rpx 0 0;
		box-sizing: border-box;
		border-bottom: 1rpx solid #eee;
		.goods-list-item {
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #666;
			line-height: 1;
			font-size: 30rpx;
			margin-bottom: 20rpx
			.goods-img-and-name {
				display: flex;
				align-items: center;
				width: 64%;
				height: 100%;
				.goods-img {
					width: 80rpx;
					height: 80rpx;
					background-color: #eee;
					margin-right: 20rpx;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.goods-name {
					width: 80%;
				}
			}
			.goods-count-and-price {
				width: 36%;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				.goods-total-price {
					margin-left: 60rpx;
				}
			}
		}
	}
	
	// 折扣
	.discount-wrapper {
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		border-bottom: 1rpx solid #eee;
		color: #666;
		line-height: 1;
		font-size: 30rpx;
		.discount-text {}
		.discount-price {
			color: #FC5858;
		}
	}
	
	// 订单备注
	.remarks-wrapper {
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		border-bottom: 1rpx solid #eee;
		color: #666;
		line-height: 1;
		font-size: 30rpx;
		.remarks-text {}
		.remarks-arr {
			font-size: 24rpx;
			color: #999;
		}
	}
	
	// 预计取餐时间、总价
	.stalls-toatl-price-wrapper {
		margin-top: 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.estimated-time {
			font-size: 24rpx;
			color: #666;
			font-weight: 700;
		}
		.stalls-toatl-price {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			.sum-tip{
				font-size: 24rpx;
				color: #666;
			}
			.stalls-toatl-price-num{
				font-size: 36rpx;
				color: #666;
			}
		}
	}
	
	
	// 底部栏
	.payment-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right:0;
		height: 100rpx;
		display: flex;
		.payment-bar-cont {
			padding-left: 30rpx;
			box-sizing: border-box;
			flex: 1;
			display: flex;
			align-items: center;
			background-color: #4D4B4A;
			color: #fff;
			.total-price {
				font-size: 36rpx;
				font-weight: 700;
				margin-right: 16rpx;
			}
			.total-discount {
				font-size: 24rpx;
			}
		}
		.payment-bar-btn {
			flex-basis: 200rpx;
			background-color: #3ECC78;
			line-height:100rpx;
			text-align: center;
			color: #fff;
			font-size: 30;
			font-weight: 700;
		}
	}
	
	
	
}	
</style>
