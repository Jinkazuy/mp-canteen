
// URL汇总

// # 路由前缀
// export const baseUrl = 'http://39.106.32.178:8020'
export const baseUrl = 'https://test.api.chinaunicloud.com'

// ================== 我的 ==================

// # 首次登录 & 获取token
export const  url_login_getToken = baseUrl+'/app/wx/login'

// # 获取当前用户信息
export const  url_getUserInfo = baseUrl+'/app/user/info'

// # 设置当前用户信息
export const  url_setUserInfo = baseUrl+'/app/save/info'

// # 获取手机号
export const  url_getPhone = baseUrl+'/app/wx/phoneNumber'

// # 验证员工号
export const  url_validationUserIdCard = baseUrl+'/app/validateEmpIdCard/'

// # 留言问题分类标签
export const  url_getFeedbackTips = baseUrl+'/app/mine/appmessage/title/list'

// # 提交留言
export const url_putFeedback = baseUrl+'/app/mine/appmessage'

// # 提交用户人脸 
export const url_putUserFacePic = baseUrl+'/app/upload/uploadFile'

// # 微信支付
export const url_toPay = baseUrl+'/pay/wx/payment'

// # 充值到虚拟账户
export const url_recharge = baseUrl+'/app/recharge/recharge'


// ================== 首页 ==================

// # 获取首页区域信息
export const url_getHomeDistrict = baseUrl+'/app/home/district/list'

// # 获取餐厅列表 /app/home/listWithDistrict/{districtId}
export const url_getHomeCanteenList = baseUrl+'/app/home/listWithDistrict/'

// # 获取首页banner列表
export const url_getHomeBannerList = baseUrl+'/app/home/publishedBanner/list'

// # 因为获取到的banner是资源,所以需要二次获取
export const url_getHomeBannerListRes = baseUrl+'/app/upload/preViewImage?fileUrl='

// # 获取首页公告
export const url_getHomeNotiInfo = baseUrl+'/app/home/publishedAnnouncement/list'

// # 获取用户定位的详细信息,使用腾讯地图API
export const url_getUserLocationsInfo = 'http://apis.map.qq.com/ws/geocoder/v1/?'

// # 获取用户定位的详细信息,使用腾讯地图API
export const key = 'HRLBZ-P3E3D-7WG4Q-PSF6Z-SPUET-AHBYG'
// 实例 http://apis.map.qq.com/ws/geocoder/v1/?location=39.85856,116.28616&key=HRLBZ-P3E3D-7WG4Q-PSF6Z-SPUET-AHBYG


// ================== 食堂/档口 ==================
// # 获取档口的食品列表
export const url_getGoodsList = baseUrl+'/commo/commodity/list'
// export const url_getGoodsList = 'http://bv9ahu.natappfree.cc/commo/commodity/list?token=d6f32f68b887952e3cfcf4877e3ca9c0'


// ================== 订单 ==================

// # 获取订单页数据
export const url_getOrderData = baseUrl+'/x'

// # 获取单个订单数据
export const url_getOrderOneData = baseUrl+'/x'

// # 推送订单
export const url_pushOrder = baseUrl+'/x'

// # 发送新订单数据,获取支付数据
export const url_getOrderPay = baseUrl+'/x'

// # 获取用户余额
export const url_getUserBalance = baseUrl+'/app/recharge/balance'

// 支付订单,暂时用的立魏的接口
// export const url_paymentOrder = baseUrl+''
export const url_paymentOrder = 'http://caepam.natappfree.cc/order/ordinfo/pay?token=2d176c4be4b916d66ceed1af2ab8a788'



