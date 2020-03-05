// 由于不是vue组件,所以不能拿到this的vue实例,
// 所以这里操作store就用原始的方法,直接操作文件;
import store from '@/store/index.js';

import http from '@/utils/http/http.js'

import {url_getGoodsList} from '@/utils/http/http_req_list.js'


export const http_getGoodsList = async function (canteenID, stallID) {

	// return store.getters.store_homeCanteenList[0].stalls[0].goodsList
	
	
	// 获取到了商品列表数据,应该循环查询 => 本地数据中是否有这个食堂的数据? => 是否有这个档口的数据? 如果有的话,那么更新,没有的话添加(是push,不是覆盖)
	
	return await new Promise(async (resolve, reject)=>{
		
		console.log('档口ID=>'+ stallID)
		http.post(url_getGoodsList, {
				booth_num:stallID,
				canteen_num: canteenID
			}).then(res => {
				console.log('=====================================')
				console.log(res)
			if(res.status===200) {
				if(res.data.length > 0) {
					console.log('商品列表↓')
					console.log(res.data)
					console.log('属于食堂ID '+res.data[0].canteenNum)
					console.log('属于档口ID '+res.data[0].boothNum)
					
					console.log(store.getters.store_homeCanteenList)
					// 查找本地数据库中, 该食堂的数据, 如果没有则新建食堂/新建档口
					// for(let i = 0; i<store.getters.store_homeCanteenList.length; i++) {
					for(let i = 0; i<store.getters.store_homeCanteenList.length; i++) {
						
						if((store.getters.store_homeCanteenList[i].id) == res.data[0].canteenNum) {
							console.log('数据是ID为 ' + store.getters.store_homeCanteenList[i].id + ' 食堂的')
							
							// 找到该食堂的数据后,继续查找该食堂下的档口的数据
							for(let k=0; k < store.getters.store_homeCanteenList[i].stalls.length; k++) {
								if(store.getters.store_homeCanteenList[i].stalls[k].id == res.data[0].boothNum) {
									// 找到了该食堂下的该档口的
									// 那么就重新赋值这个档口下,食品列表的数据
									
									// 注意这里传入的索引,不是食堂和档口的ID
									let dt = {
										canteenIndex: [i],
										stallIndex: [k],
										goodsListData: res.data
									}
									
									store.commit('setCanteenNumStallNumGoodsList', dt)
									console.log('当前该食堂下的数据')
									console.log(store.getters.store_homeCanteenList[i])
									// 将食堂下的该档口的数据返回
									resolve(store.getters.store_homeCanteenList[i].stalls[k].goodsList)
									break // 结束查找档口的for
								} else {
									// 如果没找到档口,那么说明本地数据出了问题
									// 理论上来讲,只能是有了食堂数据以后,才能点击到某个档口,只有有了某个档口之后,点击该档口时才能跳转到档口详情页
									resolve(2)
								}
							}
							
							break // 结束查找食堂的for
						} else {
							// 如果没找到食堂,那么说明本地数据出了问题
							// 理论上来讲,只能是有了食堂数据以后,才能点击到某个档口,只有有了某个档口之后,点击该档口时才能跳转到档口详情页
							resolve(2)
						}
					} 
				}
				
				
			} else {
				resolve(1)
			}
			
		}).catch(error => {
			resolve(1)
		}).finally(() => {
			
		})
			
	}).catch(error => {
		
		resolve(false)
		
	}).finally(() => {
	})
  
	


}
