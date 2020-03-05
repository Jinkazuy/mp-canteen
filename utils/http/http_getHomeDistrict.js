// 由于不是vue组件,所以不能拿到this的vue实例,
// 所以这里操作store就用原始的方法,直接操作文件;
import store from '@/store/index.js';

import http from '@/utils/http/http.js'

import {url_getHomeDistrict} from '@/utils/http/http_req_list.js'

// 获取首页区域信息
// 返回 OBJ
export const http_getHomeDistrict = async function () {

	
	
	return await new Promise(async (resolve, reject)=>{
		
		http.get(url_getHomeDistrict).then(res => {
			
			// console.log(res)
			if(res.data.code===0) {
				console.log('=============区域信息================')
				// console.log(res)
				// 先清空
				store.commit('setHomeDistrict', [])
				store.commit('setHomeDistrict', res.data.list)
				resolve(true)
			} else {
				resolve(false)
			}
			
		}).catch(error => {
			resolve(false)
		}).finally(() => {
			
		})
			
	}).catch(error => {
		
		resolve(false)
		
	}).finally(() => {
	})
  
	


}
