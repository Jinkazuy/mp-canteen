// 由于不是vue组件,所以不能拿到this的vue实例,
// 所以这里操作store就用原始的方法,直接操作文件;
import store from '@/store/index.js';

import http from './http.js'

import {formatDate} from '../utils.js'

import {url_paymentOrder} from './http_req_list.js'


// 支付订单
export const http_paymentOrder = function(orderDatas) {
	
	return {code:0, orderId:123}

	// return new Promise(async (resolve, reject) => {
	// 	await http.post(url_paymentOrder, {
	// 		orderDatas
	// 		// canteenNum,  // 餐厅id  "canteenNum": "1",
	// 		// boothNum,    // 食堂id  "boothNum": "1",
	// 		// userId,      // 用户id  "userId": "1122",
	// 		// body,        // 商品明细(商品ID和商品总数)  "body": "2-2",
	// 		// money,       // 金额    "money": "70",
	// 		// mealid       // 餐别ID  "mealid": "1"
	// 	}).then(res => {
		
	// 		// resolve规范
	// 		// 0 支付成功
	// 		// 1 用户余额不足
	// 		// 2 该用户是新户,也是提示去充值
	// 		// false 网络请求失败
	// 		console.log(res)
	// 		if(res.statusCode == 200) {
	// 			if (res.data.code == 200) {
					
	// 				resolve({code:0, orderId:res.data.orderid})
					
	// 			} else if(res.data.code == 500) {
					
	// 				resolve({code:1, orderId:res.data.orderid})
					
	// 			} else if(res.data.code == 300) {
	// 				resolve({code:2, orderId:res.data.orderid})
					
	// 			} else {
	// 				// 其他错误
	// 				resolve('提交失败↓')
	// 				resolve(res)
	// 				resolve(false)
	// 			}
	// 		} else {
	// 			// 网络请求失败
	// 			resolve(false)
	// 		}
			
		
	// 	}).catch(error => {
	// 		console.log(error)
	// 		resolve(false)
	// 	}).finally(() => {})
	// })
	
}
