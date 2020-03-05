<template>
	<div class="confirmation-order">
		<!-- 档口名称（食堂名称） -->
		<div class="stalls-name">{{canteenName}}<span>({{stallName}})</span></div>
		<!-- 商品列表 -->
		<div class="stalls-order-goods-list">
			<div class="goods-list-item" v-for="(item, index) in userGoodsCarGoodsList" :key="index">
				<div class="goods-img-and-name">
					<div class="goods-img">
						<!-- <img src=""> -->
					</div>
					<div class="goods-name">{{item.goodsInfo.footname}}</div>
				</div>
				<div class="goods-count-and-price">
					<div class="goods-total-count">x{{item.count}}</div>
					<div class="goods-total-price">¥{{item.goodsInfo.price}}</div>
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
			<div class="estimated-time">预计取餐时间：{{getFoodsTime}}</div>
			<div class="stalls-toatl-price">
				<span class="sum-tip">小计：</span>
				<span class="stalls-toatl-price-num">{{userGoodsCarTotalPrice}}</span>
			</div>
		</div>
		<!-- 底部栏 -->
		<div class="payment-bar">
			<div class="payment-bar-cont">
				<span class="total-price">¥{{userGoodsCarTotalPrice}}</span>
				<span class="total-discount">| 已优惠¥16.8</span>
			</div>
			<div class="payment-bar-btn" @click="toSettlement">去支付</div>
		</div>
		<van-toast id="van-toast" />
		<!-- 支付弹窗 -->
		<van-popup :show="payModShow" @close="onClosePayMod">
			<div class="pay-mod-wrapper">
				<p class="pay-mod-tit">请输入支付密码</p>
				<p class="pay-mod-stall-name">智慧食堂平台商户</p>
				<p class="pay-mod-total-price">¥{{userGoodsCarTotalPrice}}</p>
				<div class="pay-mod-space"></div>
				<div class="pay-mod-bl-wrapper">
					<p class="balance">账户余额 ￥{{userBalance}}</p>
					<p class="to-recharge" v-if="userBalance<userGoodsCarTotalPrice" @click="toRecharge">余额不足，去充值</p>
				</div>
				<van-button
				round 
				type="primary" 
				:class="['submit-btn', {'submit-btn-no':userBalance<userGoodsCarTotalPrice}]" 
				@click="toPay">确认支付</van-button>
			</div>
		</van-popup>
	</div>
</template>

<script>
// 发送订单数据 ，获取支付对象
import {mapGetters, mapMutations, mapActions} from 'vuex'	
// 判断用户是否登录
import {isLogin} from '@/utils/utils.js'
// 查询用户余额
import {http_getUserBalance} from '@/utils/http/http_getUserBalance.js'
// 发起支付订单
import {http_paymentOrder} from '@/utils/http/http_paymentOrder.js'
import Toast from '../../wxcomponents/weapp/dist/toast/toast'
export default {
	props: {
		// 食堂ID
		canteenID: {
			type: Number,
			default() {
				return -1
			}
		},
		// 档口ID
		stallID: {
			type: Number,
			default() {
				return -1
			}
		}
	},
	data() {
		return {
			// 该食堂名
			canteenName: '',
			// 该档口名
			stallName: '',
			// 该档口下购物车总数
			userGoodsCarTotalCount: -1,
			// 该档口下购物车总价格
			userGoodsCarTotalPrice: -1,
			// 该档口下商品数据
			userGoodsCarGoodsList: [],
			// 取餐时间,当前时间+10分钟
			getFoodsTime: -1,
			// 订单折扣
			orderDiscount: -1,
			// 下单时间
			orderTime: -1,
			// 支付弹窗是否展示
			payModShow: false,
			// 用户余额
			userBalance: -1,
			// 未支付的订单的iD
			didOrderId: -1
		}
	},
	async onLoad(e) {
		
		this.canteenID = e.canteenID
		this.stallID = e.stallID
		
		// 去store中的该食堂下该档口找到购物车数据
		// 计算购物车总数、总价格
		if(this.canteenID!==-1&&this.stallID!==-1) {
			// 计算购物车 总数 & 计算购物车 总价格	&  该购物车下商品数据
			this.computeCanteenStallGoodsCarCountAndTotalPriceAndGoodsList(this.store_userGoodsCarDatas)
			// 从商品数据的循环找到食堂名、档口名
			this.findCanteenNameAndStallName(this.store_homeCanteenList)
			// 取餐时间=当前时间+10分钟
			this.getFoodsTime = this.computedGetGoodsTime() 
		}
		
		// 设置当前页面标题 为 餐厅名
		uni.setNavigationBarTitle({
			title: this.canteenName
		})
	},
	methods: {
		// 发起支付
		async toSettlement () {
			
			// 点击支付,必须确认用户处于已登录
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
			
			// todo:用户必须已经上传过人脸识别的照片，并且必须已经通过后台审核
			// todo:用户必须已经上传过人脸识别的照片，并且必须已经通过后台审核
			// todo:用户必须已经上传过人脸识别的照片，并且必须已经通过后台审核
			// todo:用户必须已经上传过人脸识别的照片，并且必须已经通过后台审核
			// todo:用户必须已经上传过人脸识别的照片，并且必须已经通过后台审核
			// todo:用户必须已经上传过人脸识别的照片，并且必须已经通过后台审核
			// todo:用户必须已经上传过人脸识别的照片，并且必须已经通过后台审核
			let userFaceVb = true
			
			if(!userFaceVb) {
				// 用户人脸支付未确认，跳转到人脸支付上传页面，获取提示弹窗、用户点击去人脸支付上传页面
				// uni.navigateTo({
				// 	// 跳转路径
				// 	// 摊位列表页
				// 	url: '../../pages/login/login'
				// })
				return
			}
			
			console.log('检查账户余额')
			let userBalanceFlag = await http_getUserBalance()
			
			if(userBalanceFlag) {
				// 用余额信息的用户id和本地缓存的用户id作对比
				// 判断当前登录用户ID 是否等于 当前本地用户余额中的用户ID
				if(this.store_UserInfoData.id === this.store_userBalance.userId) {
					console.log(this.store_userBalance)
					// todo：余额字段不明确
					// 由于字段不明确，所以这类先用模拟的
					this.userBalance = 99
					// 展示支付遮罩层
					this.payModShow = true
					
				} else {
					Toast('余额查询失败')
				}
			} else {
				Toast('获取余额信息失败')
			}
		},
		
		
		
		// 计算取餐时间
		computedGetGoodsTime() {
			// 取餐时间,当前时间+10分钟 10分钟等于 600000 毫秒
			let Millisecond = new Date().getTime() + 600000
			let H = new Date(Millisecond).getHours()
			let M = new Date(Millisecond).getMinutes()
			let getFoodsTime = H+':'+M
			return getFoodsTime
		},
		
		// 关闭遮罩层
		onClosePayMod() {
			this.payModShow = false
		},
		
		// 发起支付、推送订单
		async toPay() {
			console.log('用户余额=> ' + this.userBalance)
			console.log('需要支付=> ' + this.userGoodsCarTotalPrice)
			
			if(this.userBalance<this.userGoodsCarTotalPrice) {
				Toast('余额不足，请充值')
				return
			}
			
			Toast.loading({
				message: '支付中...',
				duration: 0
			});
			
			//===============解开注释======================
			// 发送HTTP请求，下单
			let goodsBody = []
			// 将商品转换成后台需要的参数 userGoodsCarGoodsList
			for(let k=0; k<this.userGoodsCarGoodsList.length; k++) {
				let goodsId = this.userGoodsCarGoodsList[k].goodsId
				let goodsCount = this.userGoodsCarGoodsList[k].count
				let bodyItem = goodsId + '-' + goodsCount
				goodsBody.push(bodyItem)
			}
			// 将数组转成字符串
			let body = goodsBody.join(",")
			
			let datass = {
				canteenNum: this.canteenID,
				boothNum: this.stallID,
				userId: this.store_UserInfoData.id,
				openId: this.store_UserInfoData.openId,
				// body: "", // [商品-该商品数量，商品-该商品数量]
				body: body,
				money: this.userGoodsCarTotalPrice,
				mealId: 1
			}
			
			console.log('发送订单，订单数据↓')
			console.log(datass)
			
			let toRes = await http_paymentOrder(datass)
			
			// resolve规范
			// 0 支付成功
			// 1 用户余额不足
			// 2 该用户是新户,也是提示去充值
			// false 网络请求失败
			if(stt) {
				clearTimeout(stt)
			}
			// 这里无论支付是否成功，此时订单都已经在服务器生成，那么除非是网络不通的情况下，都清楚购物车数据，并且跳转到支付结果页
			if(toRes.code===0 || toRes.code===1 || toRes.code===2) {
				// 0 支付成功
				// 跳转到支付成功页面
				// 此时应该把食堂名称、档口名称、档口图片、下单时间、取餐时间、小计费用传过去，
				// 支付成功页面拿到数据后直接渲染，不用再发请求了
				var stt = setTimeout(()=>{
					Toast({
					type: 'success',
					message: '下单成功',
					onClose: () => {
						
						// 这里无论支付是否成功，此时订单都已经在服务器生成，那么除非是网络不通的情况下，都清楚购物车数据，并且跳转到支付结果页
						// 清除本地 该食堂下，该档口的购物车数据
						// 关闭所有页面，打开支付结果页
						// 将订单ID和订单状态码传入
						this.clearGoodsCarAndOpenSuccPage(toRes.orderId, toRes.code)
					}
					})
				}, 1000)
			}
			// else if(toRes.code===1) {
			// 	// 1 用户余额不足， 提示去充值
			// 	var stt = setTimeout(()=>{
			// 		Toast('余额不足，请充值')
			// 	}, 1000)
			// } else if(toRes.code===2) {
			// 	// 2 该用户是新户 也是提示去充值
			// 	var stt = setTimeout(()=>{
			// 		Toast('余额不足，请充值')
			// 	}, 1000)
			// } 
			else if(toRes===false) {
				// false 网络请求失败
				var stt = setTimeout(()=>{
					Toast('支付失败，请检查网络')
				}, 1000)
			}
			//===============解开注释======================
			
			// 因为立魏测试的token冲突，所以先不经过本地HTTP请求
			
			// 测试数据
			// let datass = {
			// 	 "money":"9",
			// 	 "boothNum":"1",
			// 	 "body":"2-2",
			// 	 "canteenNum":"1",
			// 	 "userId":"1122",
			// 	 "mealId":"1",
			// 	 "openId": this.store_UserInfoData.openId
			// }
			// uni.request({
				
			// 	url: 'http://jtxhkh.natappfree.cc/order/ordinfo/pay?token=e42e76198744b1cd2e66b20f1a6d117a',
			// 	data: datass,
			// 	method: 'POST',
			// 	success: (res) => {
			// 		console.log('成功')
			// 		console.log(res)
			// 		// 支付成功，拿到返回的订单ID
			// 		let code = -1
					
			// 		switch(res.data.code) {
			// 			case '200': code = 0
			// 			break
			// 			case '500': code = 1
			// 			break
			// 		}
					
			// 		if(code !== -1) {
			// 			uni.navigateTo({
			// 				url: '../../pages/succOrder/succOrder?orderId=' + res.data.orderid + '&code='+code,
			// 				complete (res) {
			// 					console.log(res)
			// 				}
			// 			})
			// 		}
			// 	},
			// 	fail: (err)=>{
			// 		console.log('失败')
			// 		console.log(err)
			// 	}
			// })
			
			
			
		},
		// 用户余额不去，去充值
		// toRecharge() {
		// 	uni.navigateTo({
		// 		url: '../../pages/me_recharge/me_recharge',
		// 		complete (res) {
		// 			console.log(res)
		// 		}
		// 	})
		// },
		// 清空购物车数据,此时订单已经在服务器生成
		async clearGoodsCarAndOpenSuccPage(orderId, code) {
			// 判断当前餐厅下的 当前档口下的购物车个数是否大于0
			if(this.userGoodsCarTotalCount>0) {
				// 本来是将未支付的订单记录在本地的，但是现在改成订单无论已支付、未支付，都服务器入库
				// 那么这里将商品数据发送给数据库，下单
				for(let i=0; i<this.store_userGoodsCarDatas.length; i++) {
					if(this.store_userGoodsCarDatas[i].canteenId == this.canteenID) {
						
						for(let j=0; j<this.store_userGoodsCarDatas[i].stalls.length; j++) {
							if(this.store_userGoodsCarDatas[i].stalls[j].stallsId == this.stallID) {
									let dds = {
										canteenId: this.canteenID, 
										stallId: this.stallID
									}
									await this.clearUserGoodsCar(dds)
									console.log('清空该档口下购物车')
									console.log(this.store_userGoodsCarDatas)
									
									// 跳转到结算页，将订单ID传过去
									uni.reLaunch({
										url: '../../pages/succOrder/succOrder?orderId=' + orderId + '&code=' + code,
										complete (res) {
											console.log(res)
										}
									})
								return
							}
						}
						return 
					}
				}
			}
		},
		
		// 计算购物车  总数 、 总价格、 商品信息
		computeCanteenStallGoodsCarCountAndTotalPriceAndGoodsList(newVal){
			this.userGoodsCarTotalPrice = 0
			this.userGoodsCarTotalCount = 0
			if(newVal.length>0) {
				for (let i = 0; i < newVal.length; i++) {
					// 购物车有食堂，往下找到该食堂
					if(newVal[i].canteenId == this.canteenID) {
						// 找到该食堂了，往下继续循环找到该档口
						for(let j = 0; j< newVal[i].stalls.length; j++) {
							if(newVal[i].stalls[j].stallsId == this.stallID) {
								// 找到该档口了,那么继续往下该商品
								for(let k=0; k<newVal[i].stalls[j].goodsList.length; k++) {
										
									// 计算购物车总数
									this.userGoodsCarTotalCount += newVal[i].stalls[j].goodsList[k].count
									
									// 计算购物车总价格
									this.userGoodsCarTotalPrice += (newVal[i].stalls[j].goodsList[k].count * Number(newVal[i].stalls[j].goodsList[k].goodsInfo.price))
									console.log('商品数量=> '+newVal[i].stalls[j].goodsList[k].count)
									console.log('商品单价=> '+Number(newVal[i].stalls[j].goodsList[k].goodsInfo.price))
									// 只保留两位小数.toFixed(2) toFixex返回是字符串，所以转一下数字
									this.userGoodsCarTotalPrice = Number(this.userGoodsCarTotalPrice.toFixed(2))
									
									// 拿到该购物车下商品数据
									this.userGoodsCarGoodsList = newVal[i].stalls[j].goodsList
									
								}
							}
						}
					}
				}
				console.log('该食堂下、该档口的购物车  总数')
				console.log(this.userGoodsCarTotalCount)
				console.log('该食堂下、该档口的购物车  总价格')
				console.log(this.userGoodsCarTotalPrice)
				console.log('该食堂下、该档口的购物车  商品数据')
				console.log(this.userGoodsCarGoodsList)
			}
		},
		// 找到该食堂名、档口名
		findCanteenNameAndStallName(homeCanteenList) {
			
			if(homeCanteenList.length>0) {
				for(let i=0; i<homeCanteenList.length; i++) {
					if(homeCanteenList[i].id == this.canteenID) {
						
						// 该食堂名
						this.canteenName = homeCanteenList[i].canteenName
						console.log('食堂名↓')
						console.log(this.canteenName)
						
						for(let j=0;j<homeCanteenList[i].stalls.length;j++) {
							if(homeCanteenList[i].stalls[j].id==this.stallID) {
								// 该档口名
								this.stallName = homeCanteenList[i].stalls[j].name
								console.log('档口名↓')
								console.log(this.stallName)
								return
							}
						}
						return
					}
				}
			}
		},
		
		
		...mapActions([
			'clearUserGoodsCar'
		]),
		
	},
	computed: {
		...mapGetters([
			'store_userBalance', // 用户余额信息
			'store_UserInfoData', // 用户信息
			'store_userGoodsCarDatas', // 购物车数据
			'store_homeCanteenList', //食堂&档口&商品数据,用于找到食堂名/档口名
		])
	},
	watch: {}
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
					width: 100rpx;
					text-align: right;
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
	
	.van-popup {
		background-color: rgba(255, 255, 255, 0)
	}
	.pay-mod-wrapper {
		position: relative;
		width: 600rpx;
		height: 600rpx;
		background-color: #fff;
		border-radius: 10rpx;
		padding: 40rpx 30rpx;
		box-sizing: border-box;
		line-height: 1;
		text-align: center;
		color: #333;
		.pay-mod-tit {
			font-size: 30rpx;
			margin-bottom: 60rpx;
		}
		.pay-mod-stall-name {
			font-size: 36rpx;
			margin-bottom: 40rpx;
		}
		.pay-mod-total-price {
			font-size: 72rpx;
			margin-bottom: 48rpx;
			font-weight: 700;
		}
		.pay-mod-space {
			height: 1rpx;
			background-color: #eee;
			margin-bottom: 40rpx;
		}
		.pay-mod-bl-wrapper {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 60rpx;
			font-size: 24rpx;
			color: #999;
			.balance {}
			.to-recharge {
				color: red;
			}
		}
		.submit-btn{
			display: flex;
			justify-content: center;
		}
		.van-button--primary, {
			margin: 0 auto 0!important;
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
	}
	
}	
</style>
