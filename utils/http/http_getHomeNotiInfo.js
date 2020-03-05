// 由于不是vue组件,所以不能拿到this的vue实例,
// 所以这里操作store就用原始的方法,直接操作文件;
import store from '@/store/index.js';

import http from '@/utils/http/http.js'

import {url_getHomeNotiInfo} from '@/utils/http/http_req_list.js'

// 获取首页公告
export const http_getHomeNotiInfo = async function () {

	// cancelTime: null
	// content: "第一食堂今天免费"
	// createTime: "2020-02-12 13:36:25"
	// createUser: 1
	// createUserName: null
	// dataSort: 2
	// id: 1
	// ifCancel: 0
	// isDelete: 0
	// priority: 5
	// publishTime: "2020-02-17 11:17:47"
	// publishUser: 1
	// publishUserName: null
	// status: 1
	// title: "第一食堂"
	// updateTime: "2020-02-17 11:17:47"
	
	// 公告Mock
	// let notiInfoddda = [
	// 	{
	//     info:'1疫情期间，第一食堂暂不营业，请见谅！1',
	//     path: '../../pages/notice-detail/notice-detail?id=11'
	// 	},{
	//     info:'2疫情期间，第一食堂暂不营业，请见谅！2',
	//     path: '../../pages/notice-detail/notice-detail?id=11'
	// 	},{
	//     info:'3疫情期间，第一食堂暂不营业，请见谅！3',
	//     path: '../../pages/notice-detail/notice-detail?id=11'
	// 	}
	// ]
	
	return await new Promise(async (resolve, reject)=>{
		
		http.get(url_getHomeNotiInfo).then(res => {
			
			// console.log(res)
			if(res.data.code===0) {
				// console.log('=============公告↓================')
				// console.log(res)
				// 先清空
				store.commit('setHomeNotiInfo', [])
				store.commit('setHomeNotiInfo', res.data.list)
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
