// 由于不是vue组件,所以不能拿到this的vue实例,
// 所以这里操作store就用原始的方法,直接操作文件;
import store from '@/store/index.js';

import http from '@/utils/http/http.js'

import {url_getHomeNotiInfo} from '@/utils/http/http_req_list.js'

// 获取首页banner列表
// 返回 OBJ
export const http_getHomeNotiInfo = async function () {

	
	// 公告Mock
	let notiInfoddda = [
		{
	    info:'1疫情期间，第一食堂暂不营业，请见谅！1',
	    path: '../../pages/notice-detail/notice-detail?id=11'
		},{
	    info:'2疫情期间，第一食堂暂不营业，请见谅！2',
	    path: '../../pages/notice-detail/notice-detail?id=11'
		},{
	    info:'3疫情期间，第一食堂暂不营业，请见谅！3',
	    path: '../../pages/notice-detail/notice-detail?id=11'
		}
	]
	
	return await new Promise(async (resolve, reject)=>{
		
		http.get(url_getHomeNotiInfo).then(res => {
			
			console.log(res)
			if(res.data.code===0) {
				console.log('=============公告↓================')
				console.log(res)
				if(res.data.list.length===0) {
					console.log('得到的公告列表是空,启动模拟')
					store.commit('setHomeNotiInfo', notiInfoddda)
				} else {
					store.commit('setHomeNotiInfo', res.data.list)
				}
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
