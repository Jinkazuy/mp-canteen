// 由于不是vue组件,所以不能拿到this的vue实例,
// 所以这里操作store就用原始的方法,直接操作文件;
import store from '@/store/index.js';

import http from '@/utils/http/http.js'

import {url_getHomeCanteenList} from '@/utils/http/http_req_list.js'


// 获取首页餐厅列表
export const http_getHomeCanteenList = async function (districtID) {

	// 先清空
	// store.commit('setHomeCanteenList', [])
	return await new Promise(async (resolve, reject)=>{
		
		http.get(url_getHomeCanteenList + districtID).then(res => {
			
			console.log(res)
			if(res.data.code===0) {
				console.log('=============餐厅列表================')
				console.log(res)
				// 餐厅标签为字符串,以逗号,分割,需要截取成数组
				let canteenList = res.data.canteenList
				for(let i=0; i<canteenList.length; i++) {
					canteenList[i].remark = canteenList[i].remark.split(',');
					
					// 这里本地需要一个 stalls 字段,也就是餐厅下的档口数据
					// 但是后台不返回,那么这里就手动添加
					// 这里的操作不能清空原有每个餐厅下的档口的数据,所以判断一下是否为null
					// 这里要循环一下本地的餐厅列表的id和这个餐厅的id是否相同,如果相同的话,那么就看看本地的这个餐厅下的 stalls 是否存在
					// 如果存在的话,那么就将本地的数据插入进入到新获取的数据中, 如果没有的话,就赋一个空数组
					for(let k = 0; k < store.getters.store_homeCanteenList.length; k++ ) {
						if(canteenList[i].id === store.getters.store_homeCanteenList[k].id) {
							canteenList[i].stalls = store.getters.store_homeCanteenList[k].stalls || []
						}
					}
					
					// 经过for循环,如果本地没有id和新数据id相同的话,那么此时就给新数据下的档口赋空数组
					if(!canteenList[i].stalls) {
						canteenList[i].stalls = []
					}
					
				}
				
				store.commit('setHomeCanteenList', canteenList)
				console.log(store.getters.store_homeCanteenList)
				resolve(true)
			} else {
				// 如果获取失败的话,那么就清除本地餐厅相关的所有内容
				store.commit('setHomeCanteenList', [])
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
