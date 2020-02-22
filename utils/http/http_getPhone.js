// 由于不是vue组件,所以不能拿到this的vue实例,
// 所以这里操作store就用原始的方法,直接操作文件;
import store from '@/store/index.js';

import http from '@/utils/http/http.js'

import {url_getPhone} from '@/utils/http/http_req_list.js'


export const http_getPhone = async function (encryptedData, iv) {
	
	console.log('手机号加密数据enc => ' + encryptedData)
	console.log('手机号加密数据iv => ' + iv)
	
	// 模拟换取成功
	// store.commit('setUserPhone', '18801228710')
	
   // 注意,这里用get请求,如果是要修改请求头,那么就需要在http.js中if (config.method == 'get') {config.data = 'true'} ,并且,get请求的第二个参数,是设置请求头;
	return await new Promise(async (resolve, reject)=>{
		http.get(url_getPhone,{params:{
		  encryptedData,
				iv
		}}).then(res => {
		// http.get(url_getPhone,{headers: {'Content-Type': 'application/text'}}).then(res => {
				
		// 直接在getURL资源路径中添加请求体参数axios会出错,所以还是用params:{data}		
		// http.get(url_getPhone+`?encryptedData=${encryptedData}&iv=${iv}`).then(res => {
			
			// 由于不是vue组件,所以不能拿到this的vue实例,
			// 所以这里操作store就用原始的方法,直接操作文件;
			// 其他vue文件还是用...mutations映射方法操作
			// console.log('换取用户手机号↓')
			// console.log(res)
			
			// store.commit('setUserPhone', '18801228710')
			console.log(res)
			if (res.data.code === 0) {
				store.commit('setUserPhone', res.data.data.phoneNumber)
				resolve(true)
			} else {
				resolve(false)
			}
		
			
		}).catch(error => {
				resolve(false)
		}).finally(() => {
		})
	})
	
	
	
}