
import store from '@/store/index.js';

import http from './http.js'

import {url_toPay} from './http_req_list.js'



export const http_toPay = function(datas) {
	

	return new Promise(async (resolve, reject) => {
		await http.post(url_toPay, {
			datas
		}).then(res => {
			console.log(res)
			if(res.statusCode==200) {
				console.log(res.data)
				// res.data↓
				// data:{
				// 	nonceStr: "kOlz3qbSVDkhZWqJ"
				// 	paySign: "BC9EE61F215608C63C604EB343F58166"
				// 	prepay_id: "wx011859292692943c47a4a7881249020900"
				// 	signType: "MD5"
				// 	timeStamp: "1583060368"
				// }
				// message: "Success!"
				// msg: "统一下单成功!"
				// status: 200
				if(res.data.status==200) {
					
					resolve({code: 0, data:res.data.data})
					
				} else {
					resolve({code: 1})
				}
				
				
			} else {
				// 其他错误
				resolve({code: 1})
			}
		
		}).catch(error => {
			console.log(error)
			resolve({code: 1})
		}).finally(() => {})
	})
	
}
