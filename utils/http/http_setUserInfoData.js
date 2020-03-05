// 由于不是vue组件,所以不能拿到this的vue实例,
// 所以这里操作store就用原始的方法,直接操作文件;
import store from '@/store/index.js';

import http from './http.js'

import {url_setUserInfo} from './http_req_list.js'

import {http_getUserInfoData} from './http_getUserInfoData.js'

// login后,将code发送给后台,换取token,将token存储到本地
// 同时获取用户详细信息, 包括用户在后台数据表中的ID

export const http_setUserInfoData = function(dataObj) {
	
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
	
	  // dataObj内容
	  // "address": "string",
	  // "birth": "日期: 2010-01-01 00:00:00",
	  // "email": "string",
	  // "gender": "性别  0:女 1:男",
	  // "idCard": "当用户选择内部员工时必填",
	  // "mobile": "手机号: 15132582555",
	  // "passwd": "登录密码",
	  // "userType": "0:内部 1:外部 当外部用户时, 不需要绑定员工号"
	  

	return new Promise(async (resolve, reject) => {
		await http.post(url_setUserInfo, dataObj).then(async res => {
		
				console.log(res)
			if (res.data.code === 0) {
				
				// 然后这里拉取用户最新信息,同步到本地即可
				let res = await http_getUserInfoData()
				if(res) {
					console.log('重新获取用户信息同步')
					console.log(store.getters.store_UserInfoData)
					resolve(true)
				} else {
					resolve(true)
				}
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
