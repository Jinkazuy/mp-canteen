// 由于不是vue组件,所以不能拿到this的vue实例,
// 所以这里操作store就用原始的方法,直接操作文件;
import store from '@/store/index.js';

import http from '@/utils/http/http.js'

import {url_getHomeNearbyCanteenList} from '@/utils/http/http_req_list.js'

// 获取首页banner列表
// 返回 OBJ
export const http_getHomeNearbyCanteenList = async function () {

	
	// 首页 - 附近餐厅列表
	let nearbyCanteenListdddddd = [
					{
						pic: 'https://bkimg.cdn.bcebos.com/pic/6609c93d70cf3bc7e397cf8edc00baa1cd112a38?x-bce-process=image/watermark,g_7,image_d2F0ZXIvYmFpa2UxNTA=,xp_5,yp_5',
						Tile: '第一食堂（东校区）',
						score: 3.3,
						saleCount: 60,
						labels: [
							'好吃',
							'便宜',
							'取餐快'
						],
						distance: '110',
						canteenlistId: 1
					},
					{
						pic: 'https://bkimg.cdn.bcebos.com/pic/6609c93d70cf3bc7e397cf8edc00baa1cd112a38?x-bce-process=image/watermark,g_7,image_d2F0ZXIvYmFpa2UxNTA=,xp_5,yp_5',
						Tile: '第一食堂（东校区）',
						score: 4.6,
						saleCount: 60,
						labels: [
							'好吃',
							'便宜',
							'取餐快'
						],
						distance: '110',
						canteenlistId: 1
					},
					{
						pic: 'https://bkimg.cdn.bcebos.com/pic/6609c93d70cf3bc7e397cf8edc00baa1cd112a38?x-bce-process=image/watermark,g_7,image_d2F0ZXIvYmFpa2UxNTA=,xp_5,yp_5',
						Tile: '第一食堂（东校区）',
						score: 2.5,
						saleCount: 60,
						labels: [
							'好吃',
							'便宜',
							'取餐快'
						],
						distance: '110',
						canteenlistId: 1
					}
				]
	store.commit('setHomeCanteenList', nearbyCanteenListdddddd)
	return true
	
	// return await new Promise(async (resolve, reject)=>{
		
	// 	http.get(url_getHomeNearbyCanteenList).then(res => {
			
	// 		console.log(res)
	// 		if(res.data.code===0) {
	// 			console.log('=============附近餐厅列表↓================')
	// 			console.log(res)
				
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
