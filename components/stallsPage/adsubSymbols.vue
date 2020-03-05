<template>
	<div class="adsub-symbols">
		<!-- 给减号设置动画，利用微信提供的函数 -->
		<div :animation="ani" class="subtract-btn" @click.stop="subBtn"></div>
		<p class="goods-num">{{goodsNum>0?goodsNum:''}}</p>
		<div class="add-btn" @click.stop="addBtn"></div>
		
	</div>
</template>

<script>
// 拿到vuex中的函数
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
	props: {
		// boothNum: "2"
		// canteenNum: "1"
		// createTime: "2020-02-05 00:00:00"
		// footname: "麻辣香锅"
		// id: "2"
		// price: "15.0"
		// shelve: "1"
		// stock: "99"
		goodsInfo: {
			type: Object,
			default() {
				return {}
			}
		},
		// 餐厅ID
		canteenID: {
			type: Number,
			default() {
				return -1
			}
		},
		// 档口ID
		stallID: {
			type: Number,
			default() {
				return -1
			}
		},
		// 这个是商品详情浮层，调用加减号组件传过来的
		// 因为 商品详情浮层 的加减号不能立刻获取商品数量，所以现在用这个代替
		// 商品在购物车中的数量
		goodsInfoModCount: {
			type: Number,
			default() {
				return -1
			}
		},
	},
	data() {
		return {
			// 模拟商品个数
			goodsNum: 0,
			
			// 减号是否显示
			subtractNtn: false,
			
			// 设置减号动画
			ani: {},
			
			// animation 对象
			animation: {}
		}
	},
	beforeMount() {
		// 循环找到该商品,如果找不到那么按钮数字就是0
		if(this.store_userGoodsCarDatas.length>0) {
			for (let i = 0; i < this.store_userGoodsCarDatas.length; i++) {
				// 购物车有食堂，往下找到该食堂
				if(this.store_userGoodsCarDatas[i].canteenId == this.canteenID) {
					// 找到该食堂了，往下继续循环找到该档口
					for(let j = 0; j< this.store_userGoodsCarDatas[i].stalls.length; j++) {
						if(this.store_userGoodsCarDatas[i].stalls[j].stallsId == this.stallID) {
							// 找到该档口了,那么继续往下该商品
							for(let k=0; k<this.store_userGoodsCarDatas[i].stalls[j].goodsList.length; k++) {
								if(this.store_userGoodsCarDatas[i].stalls[j].goodsList[k].goodsId == this.goodsInfo.id) {
									// 找到了该商品,拿到该商品的数量
									this.goodsNum = this.store_userGoodsCarDatas[i].stalls[j].goodsList[k].count
									
								}
							}
						}
					}
				}
			}
		}
		// 购物车连食堂数据都没有, 那么不用管，按钮数据就是0
	},
	created() {
	},
	async mounted() {
		
		
		let ctani = await this.creatAni()
		if(ctani) {
			if(newVal<=0) {
				console.log('隐藏减号')
				this.subtractNtn = false
				
				// 顺序不要搞乱
				this.animation.opacity(0).translateX(0).rotate(0).step()
				this.ani = this.animation.export()
				
			}else if(newVal>=1 && !this.subtractNtn) {
				console.log('显示减号')
				this.subtractNtn = true
				
				// 顺序不要搞乱
				this.animation.opacity(1).translateX(-50).rotate(-360).step()
				this.ani = this.animation.export()
			} 
		}
		
		
	},
	methods: {
		
		// 点击加号
		// 如果当前商品个数不为0，显示减号
		addBtn(e){
			
			// 模拟商品个数
			// this.goodsNum += 1
			
			
			// 操作action的方法
			let count = +1
			let dds = {
				canteenId: this.canteenID,
				stallId: this.stallID,
				goodsId: this.goodsInfo.id,
				count,
				goodsInfo: this.goodsInfo,
			}
			this.setUserGoodsCar(dds)
			
			
			
			// 获取当前点击的位置
			let x = e.detail.x
			let y = e.detail.y
			// console.log('x轴 => '+ x)
			// console.log('y轴 => '+ y)
			
			
			// 因为层级太多了，所以直接用store传递
			// 功能1，小球动画
			// 点击加号的时候，将XY坐标传给购物车bar，购物车bar先设置好几个固定的小球隐藏起来
			this.setballXY({x, y})
			// console.log(this.store_ballXY)
			
			
			
			
		},
		// 点击减号
		// 点击减号：如果当前商品个数为0，隐藏减号
		subBtn(){
			
			
			if(this.goodsNum>0) {
				
				let count = -1
				let dds = {
					canteenId: this.canteenID,
					stallId: this.stallID,
					goodsId: this.goodsInfo.id,
					count,
					goodsInfo: this.goodsInfo,
				}
				this.setUserGoodsCar(dds)
				
			}
			
			
			
			
		},
		
		// 动画初始化，因为created原因所有使用async+await这样的话，在初始化组件的时候可以等待这个动画插件初始化完成
		async creatAni() {
			return await new Promise(async (resolve, reject)=>{
				// 此时拿到了这个动画函数，在减号的DIV上 给  :animation="ani" 属性就行
				// 然后看文档操作 https://uniapp.dcloud.io/api/ui/animation?id=createanimation
				this.animation = await new uni.createAnimation({
					duration : 200,	// number 	400 	否 	动画持续时间，单位 ms
					timingFunction : 'linear',	// string 	'linear' 	否 	动画的效果
					delay : 0,	// number 	0 	否 	动画延迟时间，单位 ms
					transformOrigin: '50% 50%', // string 	'50% 50% 0' 	否
				})
				resolve(true)
			}).catch(error => {
				resolve(false)
			}).finally(() => {
			})
		},
		
		...mapMutations({
		        // 这里映射了这个方法，那么在调用x的时候，就等于使用了this.$store.commit('SET_SINGER', value)这个方法；
		        setballXY: 'setballXY',
				testAdd: 'testAdd',
				testSub: 'testSub'
		}),
		// 因为添加、减少购物车方法复杂，这里就用mapActions setUserGoodsCar
		...mapActions([
		        'setUserGoodsCar'
		])
	},
	watch: {
		// watch监听vuex数据需要这样
		'store_userGoodsCarDatas':{
			handler(newVal) {
				
				if(newVal.length>0) {
					for (let i = 0; i < newVal.length; i++) {
						// 购物车有食堂，往下找到该食堂
						if(newVal[i].canteenId == this.canteenID) {
							// 找到该食堂了，往下继续循环找到该档口
							for(let j = 0; j< newVal[i].stalls.length; j++) {
								if(newVal[i].stalls[j].stallsId == this.stallID) {
									// 找到该档口了,那么继续往下该商品
									for(let k=0; k<newVal[i].stalls[j].goodsList.length; k++) {
										if(newVal[i].stalls[j].goodsList[k].goodsId == this.goodsInfo.id) {
											// 找到了该商品,拿到该商品的数量
											this.goodsNum = newVal[i].stalls[j].goodsList[k].count
											
										}
									}
								}
							}
						}
					}
				}
			},
			deep: true
		},
		async goodsNum(newVal) {
			// 监听当前的商品个数,实现减号动画
			// vue的<transition> 标签好像不好用，而且微信提供了设置动画的函数
			// https://developers.weixin.qq.com/miniprogram/dev/api/ui/animation/wx.createAnimation.html
			// uniapp就是直接拿到这个微信的函数一模一样的东西，但是uniapp有用例，所看↓这个文档
			// 然后看文档操作 https://uniapp.dcloud.io/api/ui/animation?id=createanimation
			
			let ctani = await this.creatAni()
			if(ctani) {
				if(newVal<=0) {
					console.log('隐藏减号')
					this.subtractNtn = false
					
					// 顺序不要搞乱
					this.animation.opacity(0).translateX(0).rotate(0).step()
					this.ani = this.animation.export()
					
				}else if(newVal>=1 && !this.subtractNtn) {
					console.log('显示减号')
					this.subtractNtn = true
					
					// 顺序不要搞乱
					this.animation.opacity(1).translateX(-50).rotate(-360).step()
					this.ani = this.animation.export()
				} 
			}
		},
		
		// 这个是监听，点击商品卡片，然后显示浮层，浮层中调用加减号组件时传过来的商品总数
		goodsInfoModCount(newVals) {
			if(this.goodsInfoModCount!==-1) {
				console.log('----------------------------')
				this.goodsNum = this.goodsInfoModCount
			}
		}
	},
	computed: {
		// vuex提供的辅助函数，拿到store/getters.js向外暴露的内容；
		...mapGetters([
			'store_ballXY',
			'store_userGoodsCarDatas' // 用户所有的购物车数据
		])
	}
}	
</script>

<style lang="stylus">
.adsub-symbols {
	position: relative;
	width: 140rpx;
	height: 40rpx;
	.goods-num {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		height: 100%;
		width: 60rpx;
		font-size: 30rpx;
		color: #999;
		line-height: 40rpx;
		text-align: center;
		z-index: 1;
	}
	.add-btn, .subtract-btn {
		position: absolute;
		width: 40rpx;
		height: 40rpx;
		border-radius: 50rpx;
		background-position: center;
		background-size: 100%;
		background-repeat: no-repeat;
	}
	.add-btn {
		right: 0;
		background-image: url('../../common/images/stalls/icon-add.png')
		z-index: 10;
	}
	// 这里的减号也先在加号下边,当显示的时候,这个减号滚动到左边
	.subtract-btn {
		right: 0;
		background-image: url('../../common/images/stalls/icon-sub.png')
		z-index: 5;
	}
	
	
	
}	
</style>
