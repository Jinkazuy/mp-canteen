// 由于不是vue组件,所以不能拿到this的vue实例,
// 所以这里操作store就用原始的方法,直接操作文件;
import store from '@/store/index.js';

import http from './http.js'

import {formatDate} from '../utils.js'

import {url_getOrderOneData} from './http_req_list.js'

// 获取单个订单数据
export const http_getOrderOneData = function(orderId) {
	
	return {
		code: 0,
		orderInfo: {
			boothName: "小小窗口",
			boothNum: "1",
			canteenName: "博信",
			canteenNum: "1",
			cid: null,
			countprice: "99",
			orderid: "Ds2003011600",
			ordertime: "2020-03-01 16:00:58",
			ordstatus: "2",
			// ordstatus   1 待付款, 2 待取餐(已付款了)  3待评价(已取餐)   4退款(已退款)   5取消订单(已取消)
			statusName: "待付款",
			varlist: []            // 商品数据
		}
	}
	
	
	
	// return new Promise(async (resolve, reject) => {
	// 	await http.post(url_getOrderOneData, {
	// 		orderId
	// 	}).then(res => {
		
	// 		console.log(res)
			
	// 		if(res.statusCode==200) {
				
	// 			if (res.data.boothName) {
					
	// 				// 订单数据 res.data
	// 				// boothName: "小小窗口"
	// 				// boothNum: "1"
	// 				// canteenName: "博信"
	// 				// canteenNum: "1"
	// 				// cid: null
	// 				// countprice: "1e39"
	// 				// orderid: "Ds2003011600"
	// 				// ordertime: "2020-03-01 16:00:58"
	// 				// ordstatus: "1"
	//              //  ordstatus   1 待付款, 2 待取餐(已付款了)  3待评价(已取餐)   4退款(已退款)   5取消订单(已取消)
	// 				// statusName: "待付款"
	// 				// varlist: [] // 商品数据
	// 				resolve({code: 0, orderInfo:res.data})
					
	// 			}  else {
	// 				// 其他错误
	// 				resolve('登录失败信息↓')
	// 				resolve(res)
	// 				resolve({code: 1})
	// 			}
				
				
	// 		} else if(res.statusCode===500) {
	// 			// 服务器报错
	// 			resolve({code: 1})
	// 		}
			
			
		
	// 	}).catch(error => {
	// 		console.log(error)
	// 		resolve({code: 1})
	// 	}).finally(() => {})
	// })
	
}
