// 由于不是vue组件,所以不能拿到this的vue实例,
// 所以这里操作store就用原始的方法,直接操作文件;
import store from '@/store/index.js';

import http from '@/utils/http/http.js'

import {url_validationUserIdCard} from '@/utils/http/http_req_list.js'

// 效验员工号
export const http_validationUserIdCard = async function (idNumber) {

	
	
	return await new Promise(async (resolve, reject)=>{
		
		http.get(url_validationUserIdCard + idNumber).then(res => {
			// 返回号码规范： 0 成功， 1 员工号被使用， 2 员工号不存在(或离职)
			// console.log(res)
			if(res.data.code===0) {
				console.log('=============员工号================')
				console.log(res)
				
				if(res.data.emp==null) {
					resolve(2)
				} else if(res.data.emp.empIdCard) {
					resolve(0)
				}
				
			} else {
				resolve(2)
			}
			
		}).catch(error => {
			resolve(2)
		}).finally(() => {
			
		})
			
	}).catch(error => {
		
		resolve(2)
		
	}).finally(() => {
	})
  
	


}
