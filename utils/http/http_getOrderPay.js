// 由于不是vue组件,所以不能拿到this的vue实例,
// 所以这里操作store就用原始的方法,直接操作文件;
import store from '@/store/index.js';

import http from './http.js'

import {url_getOrderPay} from './http_req_list.js'

// login后,将code发送给后台,换取token,将token存储到本地
// 同时获取用户详细信息, 包括用户在后台数据表中的ID

export const http_getOrderPay = function() {
	
	// return new Promise(async (resolve, reject) => {
	// 	await http.post(url_getOrderPay, {
	// 		x
	// 	}).then(res => {
		
			
	// 		if (res.data.code === 0) {
				
	// 			console.log(res.data.data)
				
				
				
	// 			resolve(res.data.data)
	// 		}  else {
	// 			// 其他错误
	// 			resolve(false)
	// 		}
		
	// 	}).catch(error => {
	// 		resolve(false)
	// 		console.log(error)
	// 	}).finally(() => {})
	// })
}
