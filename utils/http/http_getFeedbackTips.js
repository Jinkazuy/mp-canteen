// 由于不是vue组件,所以不能拿到this的vue实例,
// 所以这里操作store就用原始的方法,直接操作文件;
import store from '@/store/index.js';

import http from '@/utils/http/http.js'

import {url_getFeedbackTips} from '@/utils/http/http_req_list.js'


export const http_getFeedbackTips = async function () {

	
	return await new Promise(async (resolve, reject)=>{
		
		http.get(url_getFeedbackTips).then(res => {
			
			if(res.data.code===0) {
				console.log('=============分类标签================')
				console.log(res)
				console.log(res.data.list)
				// 无需存储到本地,直接将标签返回即可
				resolve(res.data.list)
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
