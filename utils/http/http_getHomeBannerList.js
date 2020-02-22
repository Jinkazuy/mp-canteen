// 由于不是vue组件,所以不能拿到this的vue实例,
// 所以这里操作store就用原始的方法,直接操作文件;
import store from '@/store/index.js';

import http from '@/utils/http/http.js'

import {url_getHomeBannerList} from '@/utils/http/http_req_list.js'

// 获取首页banner列表
// 返回 OBJ
export const http_getHomeBannerList = async function () {

	// bannerMock
	let dddata = [
		{
			picture: 'http://image.mishi.cn/r/yry_h5_test/detail/3_1535359279285.png',
			path: '../../pages/banner-detail/banner-detail?id=11'
		}, {
			picture: 'http://image.mishi.cn/r/yry_h5_test/detail/2_1535359240426.png',
			path: '../../pages/banner-detail/banner-detail?id=11'
		}, {
			picture: 'http://image.mishi.cn/r/yry_h5_test/detail/1_1535359204228.png',
			path: '../../pages/banner-detail/banner-detail?id=11'
		}, {
			picture: 'http://image.mishi.cn/r/yry_h5_test/detail/4_1535359327213.png',
			path: '../../pages/banner-detail/banner-detail?id=11'
		},
	]
	
	return await new Promise(async (resolve, reject)=>{
		
		http.get(url_getHomeBannerList).then(res => {
			
			console.log(res)
			if(res.data.code===0) {
				console.log('=============banenrs================')
				console.log(res)
				if(res.data.list.length===0) {
					console.log('得到的banner列表是空,启动模拟')
					store.commit('setHomeBannerList', dddata)
				} else {
					store.commit('setHomeBannerList', res.data.list)
				}
				resolve(true)
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
