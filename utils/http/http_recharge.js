
import store from '@/store/index.js';

import http from './http.js'

import {url_recharge} from './http_req_list.js'

export const http_recharge = function(moneyNum) {
	

	return new Promise(async (resolve, reject) => {
		await http.post(url_recharge, {
			'rechargeCash': moneyNum
		}).then(res => {
			console.log('充值到虚拟账户')
			console.log(res)
			if(res.statusCode==200) {
				console.log(res.data)
				
				if(res.data.status==200) {
					
					resolve({code: 0})
					
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
