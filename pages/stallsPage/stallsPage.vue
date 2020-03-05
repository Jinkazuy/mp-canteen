<template>
	<div class="stall-list-page">
		<!-- 头部，档口信息 -->
		<div class="stall-header">
			<div class="header-box">
				<div class="header-box-img-box">
					<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg">
				</div>
				<div class="header-box-text-group">
					<div class="header-box-text-group-title nowrap">麦当劳档口（第一餐厅）麦当劳档口（第一餐厅）麦当劳档口（第一餐厅）</div>
					<div class="header-box-text-group-score">
						<star :scoreNum="3.2"></star>
						<!-- <div class="score-number">{{item.score%1===0?item.score+'.0':item.score}}</div> -->
						<div class="score-number">3.2</div>
						<div class="score-count">月销{{66}}</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 中间，tab切换部分 -->
		<div class="stall-center">
			<van-tabs
			swipeable 
			animated 
			sticky 
			line-width="20"
			:active="active" 
			@change="tabOnChange"
			class="scroll-tab-wrapper"
			>
			  <!-- 点餐tab -->
			  <van-tab title="点餐" class="goods-scroll-tab">
				  <!-- $emit传入的事件名称只能使用小写，不能使用大写的驼峰规则命名 -->
				  <!-- 这里两种方案，因为没有了左侧的分类滚动，所以启用另一个没有左侧商品分类的滚动条 -->
				  <!-- <goodsScroll @showgoodsmod="showGoodsMod"></goodsScroll> -->
				  <!-- this.canteenID 餐厅id -->
				  <!-- this.stallID 档口id -->
				  <goodsScrollSB @showgoodsmod="showGoodsMod" :canteenID="canteenID" :stallID="stallID" :goodsList="goodsList"></goodsScrollSB>
			  </van-tab>
			  <!-- 评价tab -->
			  <van-tab title="评价" class="goods-proportion-tab">
			  		<div class="rate-wrapper">
						<div class="spaceX"></div>
						<div class="rate-info">
							<div class="rate-info-left">
								<div class="rate-num">4.5</div>
								<div class="rate-star-box">
									<p class="rate-star-tit">商家评分</p>
									<div class="rate-star">
										<star :scoreNum="4.5"></star>
									</div>
								</div>
							</div>
							<div class="rate-info-right">
								<div class="kw">
									<p class="tit">口味</p>
									<p class="num">4.8</p>
								</div>
								<div class="bz">
									<p class="tit">包装</p>
									<p class="num">4.8</p>
								</div>
							</div>
						</div>
						<div class="spaceX"></div>
					</div>
			  		<div class="evaluate-list">
						<evaluateListItem></evaluateListItem>
						<evaluateListItem></evaluateListItem>
						<evaluateListItem></evaluateListItem>
						<evaluateListItem></evaluateListItem>
					</div>
			  </van-tab>
			</van-tabs>  
		</div>
		<!-- 底部，购物车bar -->
		<div class="stall-foo">
			<!-- 将食堂ID、档口ID、购物车总数、购物车总价 传入 -->
			<goodsCar @opengoodscar="openGoodsCar"  :canteenID="canteenID" :stallID="stallID" :userGoodsCarTotalCount="userGoodsCarTotalCount" :userGoodsCarTotalPrice="userGoodsCarTotalPrice"></goodsCar>
		</div>
		<!-- // 商品详情浮层 -->
		<!-- vant 自带的show 不是 v-show -->
		<!-- custom-style   自定义弹出层样式 -->
		<!-- overlay-style 	自定义遮罩层样式 -->
		<!-- closeable 	是否显示关闭图标 -->
		<van-popup 
			:show="goodsInfoModshow" 
			@close="goodsInfoModshowOnClose"
			z-index=99999
			custom-style="background-color:rgba(0,0,0,0);"
			overlay-style="background-color: rgba(0,0,0,.2);"
			>
			<div class='mod-cont'>
				<div class="mod-cont-title">{{goodsInfoModData.footname}}</div>
				<div class="mod-cont-img-box">
					<img :src="goodsInfoModData.goodsImg">
				</div>
				<div class="mod-cont-test-box">
					<div class="sale-and-rate">
						<span class="goods-c">月售 {{'后端未返回字段'}}</span>
						<span class="desc">好评率 {{'后端未返回字段'}}%</span>
					</div>
					<div class="goods-desc">{{'后端未返回字段'}}</div>
				</div>
				<div class="mod-cont-ft-box">
					<div class="goods-price">
						<span class="goods-price-num">¥{{goodsInfoModData.price}}</span>
						<span class="goods-price-company">/{{'后端未返回字段'}}</span>
					</div>
					<div class="mc-add-sub-btn-box">
						<!-- 加减号组件，将食堂ID、档口ID、商品数据 -->
						<!-- 那么这里因为渲染的原因，所以在之类加减号的时候应该把商品的个数传入， -->
						<!-- 然后加减号组件判断是否有这个属性，如果有的话，说明是这里调用的 -->
						<adsubSymbols :canteenID="canteenID" :stallID="stallID" :goodsInfo="goodsInfoModData" :goodsInfoModCount="goodsInfoModCount"></adsubSymbols>
					</div>
				</div>
			</div>
		</van-popup>
		<!-- 购物车浮层，因为组件无法使用 van-popup 标签，所以点击购物车bar时，调用父级传入的方法，然年触发父级的某个函数，让这个上拉浮层展示 -->
		<van-popup
		  :show="goodsCarModShow"
		  position="bottom"
		  @close="goodsCarModClose"
		  z-index=10
		  custom-style="background-color:rgba(255,255,255,1);padding-bottom: 140rpx;  box-sizing: border-box;"
		  overlay-style="background-color: rgba(0,0,0,.2);"
		  class="goodsCar-list"
		>
			<div class="goodsCar-list-title">
				<div class="goodsCar-list-title-l">已选（{{userGoodsCarTotalCount}}）</div>
				<div class="goodsCar-list-title-r" @click="clearGoodsCar"><i></i>清空</div>
			</div>
			<!-- 商品+价格+加减号按钮 -->
			<div class="goodsCar-list-goods-item" v-for="(item,idx) in userGoodsCarDatas" :key="idx">
				<div class="item-box">
					<div class="goods-item-title nowrap">{{item.goodsInfo.footname}}</div>
					<div class="goods-item-price-box">
						<div class="goods-item-price">¥ {{item.goodsInfo.price}}</div>
						<!-- 加减号 -->
						<div class="goods-item-add-sub-btn-box">
							<!-- 加减号组件，将食堂ID、档口ID、商品数据 -->
							<adsubSymbols :canteenID="canteenID" :stallID="stallID" :goodsInfo="item.goodsInfo"></adsubSymbols>
						</div>
					</div>
				</div>
			</div>
		</van-popup>
		<van-toast id="van-toast" />
	</div>
</template>

<script>
// 星星组件
import star from '@/components/layout/star.vue'	
// 商品滑动列表
// 这里两种方案，因为没有了左侧的分类滚动，所以启用另一个没有左侧商品分类的滚动条
// import goodsScroll from '@/components/stallsPage/goodsScroll.vue'	
import goodsScrollSB from '@/components/stallsPage/goodsScrollSB.vue'	
// 购物车bar
import goodsCar from '@/components/stallsPage/goodscarBar.vue'	
// 加减号组，商品详情
import adsubSymbols from '@/components/stallsPage/adsubSymbols.vue'	
// 用户评价组件
import evaluateListItem from '@/components/stallsPage/evaluateListItem.vue'
// 拿到vuex中的函数
import {mapGetters, mapActions ,mapMutations} from 'vuex'	

// 获取商品列表
import {http_getGoodsList} from '@/utils/http/http_getGoodsList.js'	

import Toast from '../../wxcomponents/weapp/dist/toast/toast'
// 检测是否登录、token是否过期
import {isLogin} from '@/utils/utils.js'
export default {
	data() {
		return {
			// tablayout索引
			active: 0,
			
			
			// 被点击的商品卡片，展示浮层
			goodsInfoModshow: false,
			// 被点击的卡片的传过来商品数据
			goodsInfoModData: {},
			// 点击卡片，传过来的商品数据，因为created的原因，所以 在浮层加减号组件中不能立刻拿到商品数量
			goodsInfoModCount: 0,
			// 弹出层样式
			modelStyle: [],
			// 遮罩层样式
			maskStyle: [],
			
			
			// 购物车列表的上拉浮层
			goodsCarModShow: false,
			
			// 餐厅id
			canteenID: -1,
			
			// 档口id
			stallID: -1,
			
			// 该档口下的商品数据
			goodsList: [],
			
			
			// 该食堂下、该档口购物车是数据，而不是所有的购物车数据
			userGoodsCarDatas: [],
			// 单个商品数据结构
			// {
			// 	// 商品ID
			// 	goodsId: 2, 
			// 	// 商品总个数
			// 	count: 3,
			// 	// 商品信息(其中有商品价格)
			// 	goodsInfo: {
			// 		boothNum: "2",
			// 		canteenNum: "1",
			// 		createTime: '',
			// 		footname: "麻辣香锅2222",
			// 		id: "2",
			// 		price: "15.56",
			// 		shelve: "1",
			// 		stock: "99"
			// 	} 
			// }
			
			// 记录 计算出的购物车总数
			userGoodsCarTotalCount: 0,
			
			// 记录 计算出的购物车商品总价
			userGoodsCarTotalPrice: 0,
			
		}
	},
	onLoad(e) {
		console.log('===========================')
		console.log(e)
		this.canteenID = e.canteenID || -1
		this.stallID = e.stallID || -1
	},
	async onShow() {
		
		// 检测用户登录
		// 登录后才能点餐
		
		
		let islogin = await isLogin()
		if(!islogin) {
			// 用户未登录，跳转到登录页
			uni.navigateTo({
				// 跳转路径
				// 摊位列表页
				url: '../../pages/login/login'
			})
			return
		}
		
		// 获取档口ID
		// 如果档口id不等于-1,那么请求数据
		this.getGoodsData()
		
		
		
		// 再初始化的时候，就调用一次计算该食堂下、该商家购物车总数的方法
		// 计算购物车总数
		// 初始化还要稍等VUEX的数据，所以等到100毫秒
		setTimeout(()=>{
			// 计算总数
			this.computeCanteenStallGoodsCarCount(this.store_userGoodsCarDatas)
			// 计算总价格
			this.computeCanteenStallGoodsCarTotalPrice(this.store_userGoodsCarDatas)
			// 获取所有购物车中  该食堂下的该档口的 购物车数据
			this.computeCanteenStallGoodsCarDatas(this.store_userGoodsCarDatas)
		},100)
	},
	methods: {
		tabOnChange(e) {
			console.log(e)
		},
		
		// 点击商品卡片，该商品将商品详细数据传给滚动栏，滚动栏拿到再传给本组件，也就是档口详情页
		showGoodsMod(CurrentClickGoodsInfo, goodsCount) {
			console.log('被点击的商品的数据，做浮层=↓')
			console.log(CurrentClickGoodsInfo)
			this.goodsInfoModData = CurrentClickGoodsInfo
			this.goodsInfoModCount = goodsCount
			// 展示卡片
			this.goodsInfoModshow = true
		},
		// 关闭商品详情卡片时的回调函数
		goodsInfoModshowOnClose() {
			this.goodsInfoModshow = false
			console.log('卡片关闭啦')
		},
		
		// 打开或关闭 购物车上拉浮层，这个函数由点击 子组件购物车bar 触发，传回来
		openGoodsCar() {
			// 这里看看商品数是否大于0
			this.goodsCarModShow===true?this.goodsCarModShow=false:this.goodsCarModShow=true
		},
		// 关闭购物车上拉浮层的回调
		goodsCarModClose() {
			this.goodsCarModShow = false
		},
		
		// 清空购物车
		clearGoodsCar() {
			
			// 既然清空了，就关闭上拉浮层
			this.goodsCarModShow = false
			
			// 这里要等一下清空购物车，不然隐藏购物车列表会有些小残留的样子
			if(clt) {
				clearTimeout(clt)
			}
			let clt = setTimeout(()=>{
				let clobj = {
					canteenId: this.canteenID,
					stallId: this.stallID
				}
				this.clearUserGoodsCar(clobj)
				
			},100)
			
			
		},
		
		async getGoodsData() {
			if(this.canteenID!==-1) {
				if(this.stallID!==-1) {
					console.log('获取档口的食品列表')
					// 返回值规范：返回档口下食品数据 - 无问题， 
					// 			  返回1 - 数据获取失败，
					//            返回2 - 本地store数据结构循环有问题
					let res = await http_getGoodsList(this.canteenID, this.stallID)
					
					if(res===2) {
						// 数据有问题跳转回首页
						uni.switchTab({
							url: '../../pages/index/index',
							complete (res) {
								console.log(res)
							}
						})
					} else if(res===1) {
						Toast('获取数据失败，请返回首页刷新重试')
					}else {
						// 到这里了,那么说明返回的就是该档口下的商品数据
						this.goodsList = res
					}
					
				} else {
					// 数据有问题跳转回首页
					uni.switchTab({
						url: '../../pages/index/index',
						complete (res) {
							console.log(res)
						}
					})
				}
			} else {
				// 数据有问题跳转回首页
				uni.switchTab({
					url: '../../pages/index/index',
					complete (res) {
						console.log(res)
					}
				})
			}
		},
		// 计算购物车  总数
		computeCanteenStallGoodsCarCount(newVal){
			this.userGoodsCarTotalCount = 0
			if(newVal.length>0) {
				for (let i = 0; i < newVal.length; i++) {
					// 购物车有食堂，往下找到该食堂
					if(newVal[i].canteenId == this.canteenID) {
						// 找到该食堂了，往下继续循环找到该档口
						for(let j = 0; j< newVal[i].stalls.length; j++) {
							if(newVal[i].stalls[j].stallsId == this.stallID) {
								// 找到该档口了,那么继续往下该商品
								for(let k=0; k<newVal[i].stalls[j].goodsList.length; k++) {
										
									this.userGoodsCarTotalCount += newVal[i].stalls[j].goodsList[k].count
									
								}
							}
						}
					}
				}
				console.log('该食堂下、该档口的购物车  总数')
				console.log(this.userGoodsCarTotalCount)
			}
		},
		
		// 计算购物车  总价格
		computeCanteenStallGoodsCarTotalPrice(newVal){
			this.userGoodsCarTotalPrice = 0
			if(newVal.length>0) {
				for (let i = 0; i < newVal.length; i++) {
					// 购物车有食堂，往下找到该食堂
					if(newVal[i].canteenId == this.canteenID) {
						// 找到该食堂了，往下继续循环找到该档口
						for(let j = 0; j< newVal[i].stalls.length; j++) {
							if(newVal[i].stalls[j].stallsId == this.stallID) {
								// 找到该档口了,那么继续往下该商品
								for(let k=0; k<newVal[i].stalls[j].goodsList.length; k++) {
									
									
									this.userGoodsCarTotalPrice += (newVal[i].stalls[j].goodsList[k].count * Number(newVal[i].stalls[j].goodsList[k].goodsInfo.price))
									// 只保留两位小数.toFixed(2) toFixex返回是字符串，所以转一下数字
									this.userGoodsCarTotalPrice = Number(this.userGoodsCarTotalPrice.toFixed(2))
								}
							}
						}
					}
				}
				console.log('该食堂下、该档口的购物车  总价格')
				console.log(this.userGoodsCarTotalPrice)
			}
		},
		
		// 获取所有购物车数据中，该食堂下，该档口的购物车数据
		computeCanteenStallGoodsCarDatas(newVal) {
			this.userGoodsCarDatas = []
			if(newVal.length>0) {
				for (let i = 0; i < newVal.length; i++) {
					// 购物车有食堂，往下找到该食堂
					if(newVal[i].canteenId == this.canteenID) {
						// 找到该食堂了，往下继续循环找到该档口
						for(let j = 0; j< newVal[i].stalls.length; j++) {
							if(newVal[i].stalls[j].stallsId == this.stallID) {
								// 找到该档口了,那么继续往下该商品
								for(let k=0; k<newVal[i].stalls[j].goodsList.length; k++) {
									
									// 不获取商品数为0的
									if(newVal[i].stalls[j].goodsList[k].count>0) {
										this.userGoodsCarDatas.push(newVal[i].stalls[j].goodsList[k])
									}
									
								}
							}
						}
					}
				}
				console.log('该食堂下、该档口的购物车 数据')
				console.log(this.userGoodsCarDatas)
			}
		},
		
		...mapMutations({
		}),
		...mapActions([
			'clearUserGoodsCar'
		])
		
	},
	components: {
		// goodsScroll,
		goodsScrollSB,
		star,
		goodsCar,
		adsubSymbols,
		evaluateListItem
	},
	computed: {
		...mapGetters([
			'store_ttt', // 模拟商品数
			'store_userGoodsCarDatas'
		])
	},
	watch: {
		// 监听购物车商品个数,如果<=0那么关闭购物车浮层
		userGoodsCarTotalCount(newVal) {
			if(newVal<=0) {
				this.goodsCarModShow = false
			}
		},
		
		// watch监听vuex数据需要这样
		'store_userGoodsCarDatas':{
			handler(newVal) {
				// 计算总数
				this.computeCanteenStallGoodsCarCount(newVal)
				// 计算总价格
				this.computeCanteenStallGoodsCarTotalPrice(newVal)
				// 获取所有购物车中  该食堂下的该档口的 购物车数据
				this.computeCanteenStallGoodsCarDatas(newVal)
			},
			deep: true
		},
		
	}
}	
</script>

<style lang="stylus">
page {
}	
.stall-list-page {
	// 头部
	.stall-header {
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		.header-box {
			display: flex;
			align-items: center;
			width: 100%;
			height:200rpx;
			box-shadow:2px 6px 14px 2px rgba(0, 0, 0, 0.05);
			border-radius: 10rpx;
			background-color: #fff;
			.header-box-img-box {
				width: 130rpx;
				height: 130rpx;
				border-radius: 10rpx;
				overflow: hidden;
				margin: 0 20rpx 0 30rpx;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.header-box-text-group {
				flex: 1;
				line-height: 1;
				height: 130rpx;
				.header-box-text-group-title {
					max-width: 500rpx;
					font-size: 36rpx;
					font-weight: 700;
					color: #666;
					margin-bottom: 30rpx;
				}
				.header-box-text-group-score {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					line-height: 1;
					margin-bottom: 36rpx;
					.score-number {
						font-size: 24rpx;
						color: #F46050;
						margin-right: 20rpx;
					}
					.score-count {
						font-size: 24rpx;
						color: #999;
					}
				}
			}
		}
	}
	// 中间
	.stall-center {
		width: 100%;
		position: absolute;
		display: flex;
		top: 240rpx;
		left: 0;
		right: 0;
		bottom: 0;
		padding-bottom: 96rpx;
		// 下边是vant组件的样式，是JK翻找DOM找到的。
		.van-tabs{
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			// tab栏
			.van-sticky {
				position: relative;
			}
			.van-tabs__content {
				color: #999;
				position: absolute;
				top: 86rpx;
				left: 0;
				right: 0;
				bottom: 0;
			}
		}
		.scroll-tab-wrapper {
			flex: 1;
			width: 100%;
			position: relative;
			.van-tab__pane {
				height: 100%;
			}
			// 点餐tab内容区
			.goods-scroll-tab {
			}
			// 评价tab内容区
			.goods-proportion-tab{
				background-color: deeppink;
				// 评价头(评分)
				.rate-wrapper {
					.rate-info {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 0 80rpx 0 60rpx;
						box-sizing: border-box;
						width: 100%;
						height: 150rpx;
						background-color: #fff;
						.rate-info-left {
							width: 50%;
							height: 100%;
							display: flex;
							align-items: center;
							.rate-num {
								font-size: 72rpx;
								color: #0177BF;
								line-height: 1;
								margin-right: 24rpx;
							}
							.rate-star-box {
								.rate-star-tit {
									font-size: 24rpx;
									line-height: 1;
									color: #666;
									margin-bottom: 16rpx;
								}
								.rate-star {
									
								}
							}
						}
						.rate-info-right {
							width: 50%;
							height: 100%;
							display: flex;
							align-items: center;
							justify-content: flex-end;
							.kw, .bz {
								text-align: center;
								line-height: 1;
								.tit {
									font-size: 24rpx;
									color: #666;
									margin-bottom: 18rpx;
								}
								.num {
									font-size: 48rpx;
									color: #0177BF;
								}
							}
							.bz {
								margin-left: 88rpx;
							}
						}
					}
				}
				// 评价内容列表
				.evaluate-list {
					width: 100%;
					background-color: #fff;
					padding: 0 30rpx;
					box-sizing: border-box;
				}
			}
		}
		
	}
	// 底部、购物车
	.stall-foo {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
		width: 100%;
	}
	
	// 商品详情弹出层样式
	.mod-cont {
		width: 660rpx;
		border-radius: 10rpx;
		padding: 30rpx;
		box-sizing: border-box;
		background-color: #fff;
		.mod-cont-title {
			font-size: 30rpx;
			color: 666;
			font-weight: 700;
			line-height: 1;
			margin-bottom: 60rpx;
		}
		.mod-cont-img-box {
			width: 600rpx;
			height: 420rpx;
			margin-bottom: 36rpx;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.mod-cont-test-box {
			margin-bottom: 90rpx;
			.sale-and-rate {
				line-height: 1;
				font-size: 20rpx;
				color: #999;
				margin-bottom: 16rpx;
			}
			.goods-desc {
				line-height: 1.4;
				font-size: 20rpx;
				color: #666;
			}
		}
		.mod-cont-ft-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 48rpx;
			.goods-price {
				.goods-price-num {
					font-size: 48rpx;
					color: #FA5E5E;
					line-height: 1
				}
				.goods-price-company {
					font-size: 24rpx;
					color: #999;
					line-height: 1
				}
			}
			.mc-add-sub-btn-box {
				width: 140rpx;
				height: 40rpx;
			}
		}
	}
	
	// 购物车浮层
	.goodsCar-list {
		.goodsCar-list-title{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 80rpx;
			padding: 0 30rpx;
			box-sizing: border-box;
			background-color: #EFF0F2;
			color: #666;
			font-size: 30rpx;
			.goodsCar-list-title-l {
			}
			.goodsCar-list-title-r {
				width: 300rpx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				i {
					width: 30rpx;
					height: 30rpx;
					background-image: url('../../common/images/stalls/del.png');
					background-position: center;
					background-repeat: no-repeat;
					background-size: 100%;
					margin-right: 20rpx;
				}
			}
		}
		.goodsCar-list-goods-item {
			height: 98rpx;
			background-color: #fff;
			padding: 0 30rpx;
			box-sizing: border-box;
			.item-box {
				position: relative;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 100%;
				.goods-item-title {
					width: 50%;
					font-size: 30rpx;
					color: #333333;
				}
				.goods-item-price-box {
					display: flex;
					justify-content: flex-end;
					align-items: center;
					height: 100%;
					.goods-item-price {
						font-size: 36rpx;
						font-weight: 700;
						color: #FC5858;
					}
					.goods-item-add-sub-btn-box {
						right: 0;
						bottom: 0;
						width: 140rpx;
						height: 40rpx;
						margin-left: 46rpx; 
					}
				}
			}
		}
	}
}	



// van-tabs 样式类
.van-sticky {
	.van-tabs__nav {
		// 下划线样式
		.van-tabs__line {
			border-radius: 3rpx;
			background-color: #0177BF;
			height: 6rpx !important;
		}
		// 普通标签样式
		.van-tab  {
			flex-basis: 19% !important;
			padding: 0;
			font-size: 30rpx;
			color: #666;
			font-weight: 700;
		}
		// 激活标签样式
		.van-tab--active {
			color: #0177BF;
		}
	}
}
// 取消tablayout 上下border
.van-hairline--bottom::after,
.van-hairline--left::after,
.van-hairline--right::after,
.van-hairline--surround::after,
.van-hairline--top-bottom::after,
.van-hairline--top::after,
.van-hairline::after {
	border: none !important;
}
	
</style>
