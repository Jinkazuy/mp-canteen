
import store from '@/store/index.js';

import http from './http.js'

import {url_getUserInfo} from './http_req_list.js'



export const http_getUserInfoData = function() {
	
	// 注意,这里用get请求,如果是要修改请求头,那么就需要在http.js中if (config.method == 'get') {config.data = 'true'} ,并且,get请求的第二个参数,是设置请求头;

	// 由于想要在get请求时修改请求头,所以参数2是设置请求头,如果要传参就直接加到URL里
	// 测试get请求
	// let URLD = 'https://api.douban.com/v2/book/isbn/9787506394864?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=10'
	// http.get(URLD,{headers: {'Content-Type': 'application/text'}}).then(res => {
	// await http.post(url_login_getToken, {code, encryptedData, iv}).then(res => {
	// 	//  拿到服务器返回的token,存储到本地
	// 	store.commit('setToken', res.data.token)
	// }).catch(error => {
	// }).finally(() => {
	// })

	// console.log(store)

	// 测试post请求
	// 如果是post请求,参数1是URL,那么参数2是数据,参数3个设置请求头;
	// http.post(URL, [data], {potion}).then(res => {
	// }).catch(error => {
	// }).finally(() => {
	// })
	
	// get 请求示例(记得放在promise中返回)
	// let URLD = 'https://api.douban.com/v2/book/isbn/9787506394864?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=10'
	// http.get(URLD,{headers: {'Content-Type': 'application/text'}}).then(res => {
	// 		console.log(res)
	// })


	return new Promise(async (resolve, reject) => {
		await http.get(url_getUserInfo).then(async res => {
		
			if (res.data.code === 0) {
				
				store.commit('setUserInfoData', res.data.user)
				console.log('用户详细数据↓')
				console.log(store.getters.store_UserInfoData)
				
				// todo，这里不仅需要存储到store中，而且还应该存储到本地中，因为store是缓存
				// 而且，在初始化的时候，store的state，应该先读取本地的内容，比如：
				// localStorage.setItem("store_UserInfoData", res.data.user) // 因为小城不支持window对象，但提供了别的存储到本地的API
				
				
				console.log('-----本地存储的用户信息------------')
				// uni.setStorage是异步的promise版本
				// uni.setStorage({
				// 	key:"store_UserInfoData", 
				// 	data:res.data.user,
				// })
				// 但getStorageSync是同步版本，我们这里只同步版本获取本地的localstorage即可
				let getS = uni.getStorageSync('store_UserInfoData')
				
				
				
				console.log(getS)
				// 但是state文件中，不能使用await，所以就使用.then()的方式获取哦，因为 uni.getStorage 也是返回一个promise对象
				
				
				
					
				
				resolve(true)
			}  else {
				// 其他错误
				resolve(false)
			}
		
		}).catch(error => {
			resolve(false)
			console.log(error)
		}).finally(() => {})
	})
	
}
