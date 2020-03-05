// matutaions负责修改state中的数据
// 如果是复杂的操作，那么就需要用actions.js来操作 matutaions 中的函数，
// 但是，不能在 actions.js 直接操作 state ，
// 只能由actions操作matutaions，从而操作state中的数据
const matutaions = {
	// 设置用户信息(不包含敏感数据)
	setUserInfo(state, userInfo) {
		state.store_UserInfo = userInfo
	},
	// 设置用户手机号
	setUserPhone(state, userPhone) {
		state.store_UserInfoData.mobile = userPhone
	},
	// 设置token
	setToken(state, storeToken) {
		state.store_token = storeToken
	},
	// 设置用户详细数据
	setUserInfoData(state, data) {
		state.store_UserInfoData = data
	},
	// 设置用户人脸识别上传成功后的图片地址
	setUserFaceVbURL(state, URL) {
		state.store_userFaceVbURL = URL
	},
	// 设置用户余额
	setUserBalance(state, balanceOBJ) {
		state.store_userBalance = balanceOBJ
	},
	// 设置token过期时间(毫秒数)
	setTokenExpiration(state, expiration) {
		state.store_tokenExpiration = expiration
	},
	// 设置用户位置
	setUserLocalInfo(state, locationOBJ) {
		state.store_userLocalInfo = locationOBJ
	},
	// 设置用户详细位置信息
	setUserLocalInfoDetail(state, locationDetailOBJ) {
		state.store_userLocalInfoDetail = locationDetailOBJ
	},
	// 设置首页区域信息
	setHomeDistrict(state, district) {
		state.store_homeDistrict = district
	},
	// 设置首页餐厅列表
	setHomeCanteenList(state, canteenList) {
		state.store_homeCanteenList = canteenList
	},
	// 设置首页banner列表
	setHomeBannerList(state, bannerList) {
		state.store_homeBannerList = bannerList
	},
	// 设置首页公告
	setHomeNotiInfo(state, notiInfo) {
		state.store_homeNotiInfo = notiInfo
	},
	
	// 设置用户身份
	setUserIdentity(state, identity) {
		state.store_UserInfoData.userType = identity
	},
	
	// 设置 订单数据
	setOrderData(state, orderData) {
		state.store_orderData = orderData
	},
	// 设置 本地 未支付订单 push方式存储
	setDidNotPayOrderData(state, didNotPayOrder) {
		// 这里不能用push,只能是获取长度之后,在直接赋值
		state.store_orderData_didNotPay[state.store_orderData_didNotPay.length] = didNotPayOrder
	},
	// 小功能:点击购物车的加号,将加号的XY左边传递给购物车bar，购物车bar先设置好几个固定的小球隐藏起来
	setballXY(state, xyObj) {
		state.store_ballXY = xyObj
	},
	// 暂时模拟购物车添加
	testAdd(state) {
		state.ttt += 1
	},
	// 暂时模拟购物车添加
	testSub(state) {
		if(state.ttt>0) {
			state.ttt -= 1
		}
	},
	
	// 设置某个食堂下的某个档口下的食品列表数据
	setCanteenNumStallNumGoodsList(state, dt) {
		state.store_homeCanteenList[dt.canteenIndex].stalls[dt.stallIndex].goodsList = dt.goodsListData
	},
	
	// 设置用户发送手机验证码倒计时
	setCountTime(state, time) {
		state.store_getCountTime = time
	}
	
}

// 将 matutaions 导出，在store/index.js引入
export default matutaions
