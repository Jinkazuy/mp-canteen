// 由于不是vue组件,所以不能拿到this的vue实例,
// 所以这里操作store就用原始的方法,直接操作文件;
import store from '@/store/index.js';

import http from '@/utils/http/http.js'

import {url_getUserLocationsInfo, key} from '@/utils/http/http_req_list.js'

// 获取用户定位详细信息,使用腾旭地图API
// 返回 OBJ 或者 false
export const http_getUserLocationsInfo = async function (la,lo) {

	
	
	return await new Promise(async (resolve, reject)=>{
		
		// url_getUserLocationsInfo = 'http://apis.map.qq.com/ws/geocoder/v1/?'
		// 实例 http://apis.map.qq.com/ws/geocoder/v1/?location=39.85856,116.28616&key=HRLBZ-P3E3D-7WG4Q-PSF6Z-SPUET-AHBYG
		http.get(url_getUserLocationsInfo+'location='+la+',' + lo + '&key=' + key).then(res => {
			if(res.status===200) {
				if(res.data.status===0) {
					console.log(res.data)
					resolve(res.data.result)
				} else {
					resolve(false)
				}
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
