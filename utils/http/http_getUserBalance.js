// 由于不是vue组件,所以不能拿到this的vue实例,
// 所以这里操作store就用原始的方法,直接操作文件;
import store from '@/store/index.js';

import http from '@/utils/http/http.js'

import {url_getUserBalance} from '@/utils/http/http_req_list.js'


export const http_getUserBalance = async function () {

	return await new Promise(async (resolve, reject)=>{
		http.get(url_getUserBalance,{params:{
		  userId: store.getters.store_UserInfoData.id
		}}).then(res => {
		
			// console.log(res)
			// createTime: "2020-02-27 19:19:53",
			// dataSort: 0,
			// emp: null,
			// empIdCard: null,
			// id: 2,
			// isDelete: 0,
			// lastRechargeTime: "2020-02-27 19:19:53",
			// rechargeCash: 0, // 充值现金
			// rechargeCount: 0, // 充值计数
			// returnCash: 0, // 返还现金
			// status: 0,
			// updateTime: "2020-02-27 19:19:53",
			// user: null,
			// userId: 2,
			
			if (res.data.code === 0) {
				// store.commit('setUserBalance', res.data.account)
				console.log('http余额')
				console.log(res)
				if(store.getters.store_userBalance!==null) {
					resolve(true)
				}
				resolve(false)
			} else {
				resolve(false)
			}
		
			
		}).catch(error => {
				resolve(false)
		}).finally(() => {
		})
	})
	
	
	
}