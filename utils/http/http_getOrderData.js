// 由于不是vue组件,所以不能拿到this的vue实例,
// 所以这里操作store就用原始的方法,直接操作文件;
import store from '@/store/index.js';

import http from '@/utils/http/http.js'

import {url_getOrderData} from '@/utils/http/http_req_list.js'


export const http_getOrderData = async function () {
	
	
	// mock订单数据
	let data = [
		{
			// 订单类型
			// 1 待付款
			// 2 待取餐
			// 3 待评价
			// 4 退款/取消
			// 5 已完成
			'orderType': 5,
			
			// 餐厅图片
			'restaurantImg':'https://bkimg.cdn.bcebos.com/pic/6609c93d70cf3bc7e397cf8edc00baa1cd112a38?x-bce-process=image/watermark,g_7,image_d2F0ZXIvYmFpa2UxNTA=,xp_5,yp_5',
			
			// 餐厅名称
			'restaurantTitle':'C17档口（第一食堂）',
			
			// 餐厅名称
			'orderState':'订单已完成',
			
			// 订单内的食品
			'foodList':[
				{
					'foodName': '广式云吞',
					'foodCount': '1'
				},
				{
					'foodName': '鲜肉烧麦',
					'foodCount': '5'
				}
			],
			
			// 下单时间
			'reserveTime':'2020-01-30 11:48',
			
			// 取餐码
			getFoodNumber: 12,
		},
		{
			// 订单类型
			// 1 待付款
			// 2 待取餐
			// 3 待评价
			// 4 退款/取消
			// 5 已完成
			'orderType': 2,
			
			// 餐厅图片
			'restaurantImg':'https://bkimg.cdn.bcebos.com/pic/6609c93d70cf3bc7e397cf8edc00baa1cd112a38?x-bce-process=image/watermark,g_7,image_d2F0ZXIvYmFpa2UxNTA=,xp_5,yp_5',
			
			// 餐厅名称
			'restaurantTitle':'C17档口（第一食堂）',
			
			// 餐厅名称
			'orderState':'订单已完成',
			
			// 订单内的食品
			'foodList':[
				{
					'foodName': '广式云吞',
					'foodCount': '1'
				},
				{
					'foodName': '鲜肉烧麦',
					'foodCount': '5'
				}
			],
			
			// 下单时间
			'reserveTime':'2020-01-30 11:48',
			
			// 取餐码
			getFoodNumber: 12,
		},
		{
			// 订单类型
			// 1 待付款
			// 2 待取餐
			// 3 待评价
			// 4 退款/取消
			// 5 已完成
			'orderType': 1,
			
			// 餐厅图片
			'restaurantImg':'https://bkimg.cdn.bcebos.com/pic/6609c93d70cf3bc7e397cf8edc00baa1cd112a38?x-bce-process=image/watermark,g_7,image_d2F0ZXIvYmFpa2UxNTA=,xp_5,yp_5',
			
			// 餐厅名称
			'restaurantTitle':'C17档口（第一食堂）',
			
			// 餐厅名称
			'orderState':'订单已完成',
			
			// 订单内的食品
			'foodList':[
				{
					'foodName': '广式云吞',
					'foodCount': '1'
				},
				{
					'foodName': '鲜肉烧麦',
					'foodCount': '5'
				}
			],
			
			// 下单时间
			'reserveTime':'2020-01-30 11:48',
			
			// 取餐码
			getFoodNumber: 12,
		}
	]
	
	
	
	// 模拟换取成功
	console.log('获取订单数据')
	return await new Promise(async (resolve, reject)=>{
		
		store.commit('setOrderData', data)
		resolve(true)
			
	}).catch(error => {
		
		resolve(false)
		
	}).finally(() => {
	})
	
	
	
	
   // 注意,这里用get请求,如果是要修改请求头,那么就需要在http.js中if (config.method == 'get') {config.data = 'true'} ,并且,get请求的第二个参数,是设置请求头;
	// await new Promise(async (resolve, reject)=>{
	// 	http.get(url_getOrderData,{params:{
	// 	  x
	// 	}}).then(res => {
	// 	// http.get(url_getPhone,{headers: {'Content-Type': 'application/text'}}).then(res => {
				
	// 	// 直接在getURL资源路径中添加请求体参数axios会出错,所以还是用params:{data}		
	// 	// http.get(url_getPhone+`?encryptedData=${encryptedData}&iv=${iv}`).then(res => {
			
	// 		// 由于不是vue组件,所以不能拿到this的vue实例,
	// 		// 所以这里操作store就用原始的方法,直接操作文件;
	// 		// 其他vue文件还是用...mutations映射方法操作
	// 		// console.log('换取用户手机号↓')
	// 		// console.log(res)
			
	// 		// store.commit('setUserPhone', '18801228710')
	// 		console.log(res)
	// 		if (res.data.code === 0) {
	// 			// store.commit('setOrderData', res.data.xx)
	// 			resolve(true)
	// 		} else {
	// 			resolve(false)
	// 		}
		
			
	// 	}).catch(error => {
	// 			resolve(false)
	// 	}).finally(() => {
	// 	})
	// })
	
	
	
}