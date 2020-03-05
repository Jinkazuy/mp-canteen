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
	// 用户人脸识别上传成功后的图片地址
	store_userFaceVbURL: '', 
	
	// 用户登录后,后台返回的token值,用于每次发送请求时判断用户是否属于后台真的登录状态;
	store_token: '', // token过期时间由后台订, 在http_login_setToken时获取过期时间,然后在util的isLogin中判断是否过期
	store_tokenExpiration: '', // 过期时间

	// 用户余额
	store_userBalance: null,
	// 后台返回信息 ↓
	// createTime: "2020-02-27 19:19:53",       // 
	// dataSort: 0,                             // 
	// emp: null,                               // 
	// empIdCard: null,                         // 
	// id: 2,                                   // 用户ID
	// isDelete: 0,                             // 是否删除了
	// lastRechargeTime: "2020-02-27 19:19:53", // 最后一次充值时间
	// rechargeCash: 0,                         // 充值金额????
	// rechargeCount: 0,                        // 充值数量????
	// returnCash: 0,                           // 返回现金????
	// status: 0,                               // 
	// updateTime: "2020-02-27 19:19:53",       // 
	// user: null,                              // 
	// userId: 2,                               // 用户ID
	
	// 用户定位信息
	store_userLocalInfo: -1,
	
	// 用户详细位置信息
	store_userLocalInfoDetail: -1,
	
	// 首页区域信息
	store_homeDistrict: [],
	
	// 首页banner
	store_homeBannerList: [],
	
	// 首页公告
	store_homeNotiInfo: {},
	
	// 首页餐厅列表
	// 如果用户点击某个餐厅之后,那么请求到的该餐厅下的 档口数据,就插入到这个餐厅的某个属性下;
	store_homeCanteenList: [
		
		// 单个食堂数据
		{
			canteenAddress: "天安门北边",      // 食堂地址
			canteenName: "西雁翅楼",           // 食堂名称
			canteenNum: "A0012",               // 食堂编号
			concatWay: "15132582590",          // 
			createTime: "2020-02-17 16:34:43", // 创建时间
			dataSort: null,                    // 数排序
			distance: 11.8864,                 // 距离
			districtId: 5,                     // 地区ID
			districtName: null,                // 地区名称
			id: 1,                             // 食堂ID
			isDelete: 0,                       // 该食堂数据是否已删除
			latitude: "39.914668",             // 精度
			longitude: "116.404557",           // 纬度
			remark: ["好吃", "不贵"],          // 标签
			status: 0,                         // 状态
			updateTime: "2020-02-18 09:19:36", // 更新数据事件
			
			// 下边就是模拟该食堂下的档口的数据
			// 这个档口数据暂时没拿到, 但是拿到了某个档口下的食品列表数据
			stalls: [
				
				// 单个档口数据
				{
					id: 2,
					name: '香锅档口',
					goodsList: [
						{
							"id": "1",                           // 商品ID
							"footname": "麻辣香锅1111",              // 商品名称
							"shelve": "1",                       // 上架状态, 1为上架,  时间戳则为删除时间
							"createTime": "2020-02-05 00:00:00", // 数据创建时间
							"stock": "99",                       // 库存
							"price": "15.06",                     // 单价
							"boothNum": "2",                     // 档口ID
							"canteenNum": "1"                    // 食堂ID
						},
						{
							"id": "2",                           // 商品ID
							"footname": "麻辣香锅2222",              // 商品名称
							"shelve": "1",                       // 上架状态, 1为上架,  时间戳则为删除时间
							"createTime": "2020-02-05 00:00:00", // 数据创建时间
							"stock": "99",                       // 库存
							"price": "15.0",                     // 单价
							"boothNum": "2",                     // 档口ID
							"canteenNum": "1"                    // 食堂ID
						},
						{
							"id": "3",                           // 商品ID
							"footname": "麻辣香锅3333",              // 商品名称
							"shelve": "1",                       // 上架状态, 1为上架,  时间戳则为删除时间
							"createTime": "2020-02-05 00:00:00", // 数据创建时间
							"stock": "99",                       // 库存
							"price": "1.5",                     // 单价
							"boothNum": "2",                     // 档口ID
							"canteenNum": "1"                    // 食堂ID
						},
					]
				},
				
			]
		}
		
	],
	
	// 
	
	
	
	// 该用户购物车的数据
	// store_userGoodsCarDatas: []
	store_userGoodsCarDatas: [
		// {
		// 	canteenId: 1,
		// 	stalls: [
		// 		{
		// 			stallsId: 2,
		// 			goodsList: [
		// 				{
		// 					// 商品ID
		// 					goodsId: 2, 
		// 					// 商品总个数
		// 					count: 3,
		// 					// 商品信息(其中有商品价格)
		// 					goodsInfo: {
		// 						boothNum: "2",
		// 						canteenNum: "1",
		// 						createTime: '',
		// 						footname: "麻辣香锅2222",
		// 						id: "2",
		// 						price: "15.56",
		// 						shelve: "1",
		// 						stock: "99"
		// 					} 
		// 				}
		// 			]
		// 		}
		// 	]
		// }
	],
	
	
	// 订单数据,HTTP获取来的,用户已经支付的订单
	store_orderData: [],
	
	// 订单数据,本地缓存的,用户未支付的订单
	// 在档口详情页的时候, 用户点击去结算时, 将该食堂下的该档口的购物车中的数据,删除并转移到这里,不能是覆盖,而是.push进来
	// 然后在支付成功之后,将该食堂下的该档口的本地未支付的订单删除
	store_orderData_didNotPay: [
		// {
		// 	didOrderId: 2365415611, // 格林威治时间戳,在购物车点击结算是生成
		// 	didOrderObj: { // 购物车中的数据
		// 		canteenId: 1,
		// 		stalls: [
		// 			{
		// 				stallsId: 2,
		// 				goodsList: [
		// 					{
		// 						// 商品ID
		// 						goodsId: 2, 
		// 						// 商品总个数
		// 						count: 3,
		// 						// 商品信息(其中有商品价格)
		// 						goodsInfo: {
		// 							boothNum: "2",
		// 							canteenNum: "1",
		// 							createTime: '',
		// 							footname: "麻辣香锅2222",
		// 							id: "2",
		// 							price: "15.56",
		// 							shelve: "1",
		// 							stock: "99"
		// 						} 
		// 					}
		// 				]
		// 			}
		// 		]
		// 	}
		// }
	],
	
	// 小功能:点击购物车的加号,将加号的XY左边传递给购物车bar，购物车bar先设置好几个固定的小球隐藏起来
	store_ballXY: {x:0,y:0},
	
	// 暂时模拟购物车添加
	ttt: 0,
	
	
	// 用户发送手机验证码倒计时
	store_getCountTime: 0,
	
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