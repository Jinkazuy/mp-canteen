const state = {
  // 用户基本数据,不包含敏感信息;
  store_UserInfo: {
		avatarUrl: null,
		city: null,
		country: null,
		gender: null,
		language: null,
		nickName: null,
		province: null
	},
	// 用户详细数据,包后台数据表中的数据;
	store_UserInfoData: {
		address: '123', // 用户地址
		avatarUrl: null, // 头像imgURL
		birth: null, // 生日
		city: null, // 城市
		country: null, // 国家
		createTime: null, // 注册时间
		dataSort: null, // 数据排序
		email: null, // 邮箱
		gender: null, // 性别 1 | 0
		id: null, // 用户ID
		idCard: '123', // 当用户选择内部员工时必填
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
	},
	// 用户登录后,后台返回的token值,用于每次发送请求时判断用户是否属于后台真的登录状态;
	store_token: '', // token过期时间由后台订, 在http_login_setToken时获取过期时间,然后在util的isLogin中判断是否过期
	store_tokenExpiration: '', // 过期时间

	// 首页banner
	store_homeBannerList: {},
	
	// 首页公告
	store_homeNotiInfo: {},
	
	// 首页餐厅列表
	store_homeCanteenList: [],
	
	// 订单数据
	store_orderData: [],
	
	// 小功能:点击购物车的加号,将加号的XY左边传递给购物车bar，购物车bar先设置好几个固定的小球隐藏起来
	store_ballXY: {x:0,y:0},
	
	// 暂时模拟购物车添加
	ttt: 0,
	
	// ========= 立魏发来的数据字段(订单) ===========
	orderDatas:[ // 这个orderDatas是JK起的
		// 每个订单是一个对象
		{
			// 订单ID
			orderId: null, // string
			// 档口ID
			staid: null, // string
			// 食堂ID
			cafId: null, // string
			// 餐别ID
			cid: null, // string
			// 菜品名称
			cname: null, // string
			// 菜品数量
			number: null, // string
			// 菜品总数量
			count: null, // string
			// 菜品总价
			total: null, // string
			// 下单时间
			ordertime: null, // bigDecimal
			// 取餐码
			mealcode: null, // string
			// 订单状态
			code: 0, // string
			// 订单状态中文
			codename: '' // string
		}
	]
	
	
	
}

export default state