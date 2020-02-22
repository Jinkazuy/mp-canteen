// 由于不是vue组件,所以不能拿到this的vue实例,
// 所以这里操作store就用原始的方法,直接操作文件;
import store from '@/store/index.js';

import http from './http.js'

import {formatDate} from '../utils.js'

import {
	url_login_getToken,
	url_getUserInfo
} from './http_req_list.js'

// login后,将code发送给后台,换取token,将token存储到本地
// 同时获取用户详细信息, 包括用户在后台数据表中的ID

export const http_login_setToken = function(code, encryptedData, iv) {
	
	// console.log('================code↓==================')
	// console.log(code)
	// console.log('==================enc↓================')
	// console.log(encryptedData)
	// console.log('==================iv↓================')
	// console.log(iv)
	
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
		await http.post(url_login_getToken, {
			code,
			encryptedData,
			iv
		}).then(res => {
		
			// 由于不是vue组件,所以不能拿到this的vue实例,
			// 所以这里操作store就用原始的方法,直接操作文件;
			// 其他vue文件还是用...mutations映射方法操作
			if (res.data.code === 0) {
				// 设置token,用于以后每次发送请求,请求头都必须带上
				store.commit('setToken', res.data.token)
				// token过期时间,由后太配置,用当前时间加上这个事件,然后储存在store中,然后再在util中的isLogin中判断是否过期expiration
				// res.data.expire为秒数 , 需 * 1000
				// 默认是7天
				let expiration = new Date().getTime() + (res.data.expire * 1000)
				console.log('=====token过期时间↓=========')
				store.commit('setTokenExpiration', expiration)
				console.log('当前时间 => ' + formatDate(new Date(new Date().getTime())))
				console.log('登陆(token)过期时间 => ' + formatDate(new Date(store.getters.store_tokenExpiration)))
				resolve(true)
			} else if (res.data.code === 888) {

				resolve(888)
			} else {
				// 其他错误
				resolve(false)
			}
		
		}).catch(error => {
			resolve(false)
			console.log(error)
		}).finally(() => {})
	})
	
}
