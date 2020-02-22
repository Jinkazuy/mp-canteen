// 由于不是vue组件,所以不能拿到this的vue实例,
// 所以这里操作store就用原始的方法,直接操作文件;
import store from '@/store/index.js';

import http from '@/utils/http/http.js'

import {url_getGoodsList} from '@/utils/http/http_req_list.js'

// 获取首页banner列表
// 返回 OBJ
export const http_getGoodsList = async function () {

	// bannerMock
	// 
	
	
	// 获取到了商品列表数据,应该循环查询 => 本地数据中是否有这个食堂的数据? => 是否有这个档口的数据? 如果有的话,那么更新,没有的话添加(是push,不是覆盖)
	return await new Promise(async (resolve, reject)=>{
		resolve(true)	
	}).catch(error => {
		resolve(false)
	}).finally(() => {
	})
	
	// return await new Promise(async (resolve, reject)=>{
		
	// 	http.get(url_getGoodsList).then(res => {
			
	// 		console.log(res)
	// 		if(res.data.code===0) {
	// 			console.log('=============banenrs================')
	// 			console.log(res)
	// 			if(res.data.list.length===0) {
	// 				console.log('得到的banner列表是空,启动模拟')
	// 				store.commit('setHomeBannerList', dddata)
	// 			} else {
	// 				store.commit('setHomeBannerList', res.data.list)
	// 			}
	// 			resolve(true)
	// 		} else {
	// 			resolve(false)
	// 		}
			
	// 	}).catch(error => {
	// 		resolve(false)
	// 	}).finally(() => {
			
	// 	})
			
	// }).catch(error => {
		
	// 	resolve(false)
		
	// }).finally(() => {
	// })
  
	


}
