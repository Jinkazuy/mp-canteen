// 这个actions.js文件作用，是在多次操作mutation中的函数时用到；
// 涉及到复杂操作的时候，都用这个文件中写逻辑，操作mutations.js中的函数，从而修改state.js中的内容；

// 参数1对象中的 第1个变量，接收的是mutations中的函数
// 参数1对象中的 第2个变量，接收的是state中的数据，因为最终都有store/index.js引入所有文件
// 所以这个action.js中的变量也能够直接拿到state.js、mutations.js等文件中的函数、数据等；

// 参数2对象中的 第1个变量，接收的是调用这个方法时传进来的参数
// 参数2对象中的 第2个变量，接收的是嗲用这个方法时传进来的参数
// 示例↓
export const setUserInfo = function ({commit, state}, {list, index}) {
  // 因为最终都汇总到了store/index.js中，所以actions.js和mutations.js是可以相互访问的，
  // 所以这个commit就是调用mutations.js中的方法，第一个参数是方法名，
  // 就类似于在其他.vue文件中使用this.$store.commit.xxx(fnName, xx)
  // 方法名还是用mutation-types中的字符串来命名，得到统一性，
  // 第二个参数就是mutations.js中某个方法的形参，具体还得看mutations.js中该方法需要传入的是什么；

  // 调用mutations.js中的SET_SEQUENCE_LIST方法，将歌曲列表传入；
  // 第一个参数是mutations下的函数名，第二个则是传给第一个参数的一些数值；
  commit(types.SET_SEQUENCE_LIST, list)
  // 判断播放模式，如果当前播放模式等于随机播放，也就是2 的时候；
  if (state.mode === playMode.random) {
    // 那么调用洗牌函数，得到随机播放列表；
    let randomList = shuffle(list)
    // 并且将随机播放列表设置为当前播放列表
    commit(types.SET_PLAYLIST, randomList)
    // 然后调用 找到在随机播放列中，当前歌曲的索引 的函数；
    index = findIndex(randomList, list[index])
  } else {
    // 顺序播放
    commit(types.SET_PLAYLIST, list)
  }
  // 设置当前歌曲索引
  commit(types.SET_CURRENT_INDEX, index)
  // 打开播放器：打开
  commit(types.SET_FULL_SCREEN, true)
  // 播放器状态：播放
  commit(types.SET_PLAYING_STATE, true)
}

// 添加/减少  某个食堂下/某个档口的购物车中商品
export const setUserGoodsCar = function ({commit, state}, {canteenId,stallId, goodsId, count, goodsInfo}) {
 
	// 点击加减号传过来的内容
	console.log('食堂ID => ' + canteenId)
	console.log('档口ID => ' + stallId)
	console.log('商品ID => ' + goodsId)
	console.log('操作数量 => ' + count)
	console.log('商品信息 => ' + goodsInfo)
	
	// 这里循环state下用户购物车的数据
	// 先判断购物车是否是空的,如果是空的那么就直接追加
	if(state.store_userGoodsCarDatas.length>0) {
		// 如果购物车有数据,则循环查找
		console.log('购物车有数据')
		
		// 找到该食堂的标记符,如果循环完了,这个标记符还是false,说明购物车中没有该食堂的数据
		let canteenFlag = false
		for(let i = 0; i < state.store_userGoodsCarDatas.length; i++) {
			if(state.store_userGoodsCarDatas[i].canteenId == canteenId) {
				console.log('购物车有该食堂数据')
				// 将标记符改为true
				let canteenFlag = true
				let stallsFlag = false
				// 找到该食堂了,那么再往下查找, 是否有该档口
				for(let k = 0; k < state.store_userGoodsCarDatas[i].stalls.length; k++) {
					
					if(state.store_userGoodsCarDatas[i].stalls[k].stallsId == stallId) {
						console.log('购物车有该档口数据')
						let stallsFlag = true
						let goodsFlag = false
						// 继续往下查找,是否有该商品数据
						for (let j = 0; j < state.store_userGoodsCarDatas[i].stalls[k].goodsList.length; j++) {
							
							if(state.store_userGoodsCarDatas[i].stalls[k].goodsList[j].goodsId == goodsId) {
								let goodsFlag = true
								console.log('购物车有商品的数据直接 + 或 -')
								state.store_userGoodsCarDatas[i].stalls[k].goodsList[j].count += count
								// 这里还要确保该商品信息已经同步了
								state.store_userGoodsCarDatas[i].stalls[k].goodsList[j].goodsInfo = goodsInfo
								console.log('购物车中,该商品信息↓')
								console.log(state.store_userGoodsCarDatas[i].stalls[k].goodsList[j])
								// 减价完之后再判断当前商品数是否小于0,如果小于0话,那么就=0
								// 而且这里还要判断,商品的余量是多少,不能大于商品的剩余量
								if(state.store_userGoodsCarDatas[i].stalls[k].goodsList[j].count<=0) {
									state.store_userGoodsCarDatas[i].stalls[k].goodsList[j].count=0
									// 既然等于0了,就应该清楚这个商品的信息
									console.log('有个商品等于0了')
									if(stm) {
										clearTimeout(stm)
									}
									let stm = setTimeout(()=>{
										state.store_userGoodsCarDatas[i].stalls[k].goodsList.splice(j,1)
									},100)
									console.log(state.store_userGoodsCarDatas[i])
								}
								return
							}
						} // 查找商品循环结束, 此时商品标记符为false的话,那么说明: 购物车中,有该食堂,也有该档口,但是没有该商品数据,
						// 那么此时就将商品的数据直接插入
						if(!goodsFlag) {
							let goodsDatas = {
								goodsId,
								count: 1,
								goodsInfo
							}
								
							console.log('购物车中,有该食堂数据,有该档口数据, 但没有该商品数据, 直接将该商品追加进去')
							state.store_userGoodsCarDatas[i].stalls[k].goodsList.push(goodsDatas)
							console.log('此时用户购物车数据↓')
							console.log(state.store_userGoodsCarDatas)
						}
						return
					}
				} // 查找档口循环结束, 如果标记符为false,说明购物车中,有该食堂,但是没有该档口,那么直接将档口信息插入到这个食堂数据中
				if(!stallsFlag) {
					let stallsDatas = {
						stallsId: stallId,
						goodsList: [
							{
								goodsId,
								count: 1,
								goodsInfo
							}
						]
					}
						
					console.log('购物车中,有该食堂数据,但没有该档口数据,直接将该档口/该商品追加进去')
					state.store_userGoodsCarDatas[i].stalls.push(stallsDatas)
					console.log('此时用户购物车数据↓')
					console.log(state.store_userGoodsCarDatas)
				}
				
				return
			}
		}// 查找食堂循环结束,如果canteenFlag是false,说明该购物车下没有该食堂数据,那么直接将该食堂/档口/商品数据插入
		if(!canteenFlag) {
			// 如果没有该食堂数据,那么直接追加食堂数据、档口数据、食品数据
			// 直接追加数据
			let canteenDatas = {
				canteenId,
				stalls: [
					{
						stallsId: stallId,
						goodsList: [
							{
								goodsId,
								count: 1,
								goodsInfo
							}
						]
					}
				]
			}
			console.log('购物车没有该食堂数据,直接将该食堂/该档口/该商品追加进去')
			state.store_userGoodsCarDatas.push(canteenDatas)
			console.log('此时用户购物车数据↓')
			console.log(state.store_userGoodsCarDatas)
		}
		
		
		
	} else {
		// 如果整个购物车都没有内容,那么直接追加食堂数据、档口数据、食品数据
		// 如果没有该食堂数据,那么直接追加食堂数据、档口数据、食品数据
		// 直接追加数据
		let datas = {
			canteenId,
			stalls: [
				{
					stallsId: stallId,
					goodsList: [
						{
							goodsId,
							count: 1,
							goodsInfo
						}
					]
				}
			]
		}
		
		console.log('购物车没有该食堂数据,直接将该食堂/该档口/该商品追加进去')
		state.store_userGoodsCarDatas.push(datas)
		console.log('此时用户购物车数据↓')
		console.log(state.store_userGoodsCarDatas)
		
	}
	
	
	// console.log(state)
}

// 清空某个食堂下/某个档口的购物车
export const clearUserGoodsCar = function ({commit, state}, {canteenId, stallId}) {
	
	// 点击加减号传过来的内容
	console.log('食堂ID => ' + canteenId)
	console.log('档口ID => ' + stallId)
	// 找到该食堂,清空
	for(let i = 0; i < state.store_userGoodsCarDatas.length; i++) {
		if(state.store_userGoodsCarDatas[i].canteenId == canteenId) {
			for(let j=0; j<state.store_userGoodsCarDatas[i].stalls.length; i++) {
				if(state.store_userGoodsCarDatas[i].stalls[j].stallsId == stallId) {
					
					// 需要先将所有商品的数量清零,然后再清空这个档口下的商品数据
					for(let k=0; k<state.store_userGoodsCarDatas[i].stalls[j].goodsList.length; k++) {
						state.store_userGoodsCarDatas[i].stalls[j].goodsList[k].count = 0
					}
					
					// 这里就不用在清空了,因为在别处已经做了: 如果当购物车中,这个商品数为0那么就清除购物车中这个商品的数据
					state.store_userGoodsCarDatas[i].stalls[j].goodsList=[]
					// state.store_userGoodsCarDatas[i].stalls[j]={}
					return
				}
			}
			return
		}
	}
	
}
