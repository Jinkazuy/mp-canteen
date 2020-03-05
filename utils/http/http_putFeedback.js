// 由于不是vue组件,所以不能拿到this的vue实例,
// 所以这里操作store就用原始的方法,直接操作文件;
import store from '@/store/index.js';

import http from './http.js'

import {formatDate} from '../utils.js'

import {url_putFeedback} from './http_req_list.js'

// login后,将code发送给后台,换取token,将token存储到本地
// 同时获取用户详细信息, 包括用户在后台数据表中的ID

export const http_putFeedback = function(msgContent, msgTitle, msgTitleName) {
	

  // "createTime": "创建时间",
  // "dataSort": "排序",
  // "id": "留言ID",
  // "isDelete": "删除",
  // "msgContent": "留言内容",
  // "msgMobile": 15132582599,
  // "msgResult": "处理结果",
  // "msgTime": "留言时间, 默认当前即可",
  // "msgTitle": "留言主题",
  // "msgTitleName": "string",
  // "nickName": "string",
  // "status": "状态",
  // "updateTime": "更新时间",
  // "userId": "用户ID",
  
	let userInfo = store.getters.store_UserInfoData
	return new Promise(async (resolve, reject) => {
		await http.post(url_putFeedback, {
			msgContent, 
			msgTitle,
			msgTitleName,
			'msgTime': formatDate(new Date(new Date().getTime())),
			'msgMobile': userInfo.mobile, 
			'nickName':userInfo.nickName,
			'id': userInfo.id
		}).then(res => {
		
			console.log(res)
			if (res.data.code === 0) {
				resolve(true)
			}  else {
				
				resolve(false)
			}
		
		}).catch(error => {
			console.log(error)
			resolve(false)
		}).finally(() => {})
	})
	
}
