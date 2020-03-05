// 这里的 getters， 只负责 将state中的数据，对外提供展示数据，
// 向外导出数据，只能展示不能修改；

// 用户信息(不含敏感信息)
export const store_UserInfo = state => state.store_UserInfo

// 用户详细数据,包后台数据表中的数据;
export const store_UserInfoData = state => state.store_UserInfoData

// 用户人脸识别上传成功后的图片地址
export const store_userFaceVbURL = state => state.store_userFaceVbURL

// 手机号
export const store_UserPhone = state => state.store_UserPhone

// token
export const store_token = state => state.store_token

// token 过期时间
export const store_tokenExpiration = state => state.store_tokenExpiration

// token 用户身份设置
export const store_userIdentity = state => state.store_UserInfoData.identity

// 获取用户定位信息
export const store_userLocalInfo = state => state.store_userLocalInfo

// 获取用户余额
export const store_userBalance = state => state.store_userBalance

// 获取用户详细的定位信息
export const store_userLocalInfoDetail = state => state.store_userLocalInfoDetail

// 首页区域信息
export const store_homeDistrict = state => state.store_homeDistrict

// 首页餐厅列表
export const store_homeCanteenList = state => state.store_homeCanteenList

// 首页banner列表
export const store_homeBannerList = state => state.store_homeBannerList

// 首页公告
export const store_homeNotiInfo = state => state.store_homeNotiInfo

// 订单购物车数据
export const store_userGoodsCarDatas = state => state.store_userGoodsCarDatas

// 订单数据
export const store_orderData = state => state.store_orderData

// 本地未支付订单数据
export const store_orderData_didNotPay = state => state.store_orderData_didNotPay


// 小功能:点击购物车的加号,将加号的XY左边传递给购物车bar，购物车bar先设置好几个固定的小球隐藏起来
export const store_ballXY = state => state.store_ballXY


// 暂时模拟购物车添加
export const store_ttt = state => state.ttt



// 获取用户发送手机验证码倒计时
export const store_getCountTime = state => state.store_getCountTime


