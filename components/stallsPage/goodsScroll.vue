<template>
	<div class="goods-scroll-wrapper">
		<!-- 左边栏 -->
		<scroll-view 
			class="goods-scroll-left"
			scroll-y
			scroll-with-animation
			show-scrollbar
			:scroll-top="leftScrollTop"
		>
		<!-- 渲染每个分类 -->
			<div 
				:class="['category-menu-items', currentLeftMenu===0?'category-menu-items-active':'']" 
				id="menu-items-0" 
				@click="RightScrollTo((0))">
				<p>全部</p>
			</div>
			<!-- 每个元素的ID，用于获取该元素的高度值，从1开始 -->
			<div 
			v-for="(item, index) in mockData.goodsCategoryList"
			:key="index"
			:class="['category-menu-items', currentLeftMenu===index+1?'category-menu-items-active':'']" 
			:id="'menu-items-'+(index+1)"
			@click="RightScrollTo((index+1))"
			>
				<p>{{item.title}}</p>
			</div>
			<div class="spac-d"></div>
			<div class="spac-d"></div>
			<div class="spac-d"></div>
			<div class="spac-d"></div>
			<div class="spac-d"></div>
		</scroll-view>
		<!-- 右边栏 -->
		<scroll-view
			class="goods-scroll-right"
			scroll-y
			scroll-with-animation
			show-scrollbar
			:scroll-top="rightScrollTop"
			@scroll="rightScrollCurrent"
			@scrolltolower="scrolltolower"
			lower-threshold="10"
		>
			<!-- 每个分类 -->
			<div 
				class="category-items" 
				v-for="(item, index) in mockData.goodsCategoryList"
				:key="index"
				:id="'category-items-'+(index+1)"
				>
				<p class="category-items-title">{{item.title}}</p>
				<!-- 商品卡片 -->
				<!-- 传入一个函数，点击每个卡片的时候，ckGoodsCard(e) 不只拿ID ，通过e拿到该商品的数据，
				这样省去展示该商品浮层时再去循环该商家的每个分类的商品了 -->
				<goodsCardItems 
					v-for="(itm,idx) in item.goodsInfoList"
					:goodsInfo="itm"
					:key="idx"
					@ckgoods="ckGoodsCard"
				></goodsCardItems>
			</div>
		</scroll-view>
	</div>
</template>

<script>
// 商品卡片
import goodsCardItems from '@/components/stallsPage/goodsScroll-Card.vue'	
export default {
	data() {
		return {
			
			// Mock
			// 商品分类
			mockData: {
				goodsCategoryList: [
					{
						title: '折扣优惠折扣优惠折扣优惠折扣优惠',
						goodsInfoList: [
							{
								goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
								goodsTitle: '暖心单人套餐暖心单人套餐暖心单人套餐暖心单人套餐',
								goodsInfo: '拿铁1杯+香辣鸡翅2块',
								goodsSaleCount: 99,
								goodsPrice: 16.8
							},
							{
								goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
								goodsTitle: '暖心单人套餐暖心单人套餐暖心单人套餐暖心单人套餐',
								goodsInfo: '拿铁1杯+香辣鸡翅2块',
								goodsSaleCount: 99,
								goodsPrice: 16.8
							},
							{
								goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
								goodsTitle: '暖心单人套餐暖心单人套餐暖心单人套餐暖心单人套餐',
								goodsInfo: '拿铁1杯+香辣鸡翅2块',
								goodsSaleCount: 99,
								goodsPrice: 16.8
							},
							{
								goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
								goodsTitle: '暖心单人套餐暖心单人套餐暖心单人套餐暖心单人套餐',
								goodsInfo: '拿铁1杯+香辣鸡翅2块',
								goodsSaleCount: 99,
								goodsPrice: 16.8
							}
						]
					},
					{
						title: '必点',
						goodsInfoList: [
							{
								goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
								goodsTitle: '必点',
								goodsInfo: '拿铁1杯+香辣鸡翅2块',
								goodsSaleCount: 99,
								goodsPrice: 16.8
							},
							{
								goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
								goodsTitle: '必点',
								goodsInfo: '拿铁1杯+香辣鸡翅2块',
								goodsSaleCount: 99,
								goodsPrice: 16.8
							}
						]
					},
					{
						title: '套餐',
						goodsInfoList: [
							{
								goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
								goodsTitle: '套餐',
								goodsInfo: '拿铁1杯+香辣鸡翅2块',
								goodsSaleCount: 99,
								goodsPrice: 16.8
							}
						]
					},
					{
						title: '主食',
						goodsInfoList: [
							{
								goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
								goodsTitle: '主食',
								goodsInfo: '拿铁1杯+香辣鸡翅2块',
								goodsSaleCount: 99,
								goodsPrice: 16.8
							},
							{
								goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
								goodsTitle: '必点',
								goodsInfo: '拿铁1杯+香辣鸡翅2块',
								goodsSaleCount: 99,
								goodsPrice: 16.8
							},
							{
								goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
								goodsTitle: '主食',
								goodsInfo: '拿铁1杯+香辣鸡翅2块',
								goodsSaleCount: 99,
								goodsPrice: 16.8
							},
							{
								goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
								goodsTitle: '必点',
								goodsInfo: '拿铁1杯+香辣鸡翅2块',
								goodsSaleCount: 99,
								goodsPrice: 16.8
							},
							{
								goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
								goodsTitle: '主食',
								goodsInfo: '拿铁1杯+香辣鸡翅2块',
								goodsSaleCount: 99,
								goodsPrice: 16.8
							},
							{
								goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
								goodsTitle: '必点',
								goodsInfo: '拿铁1杯+香辣鸡翅2块',
								goodsSaleCount: 99,
								goodsPrice: 16.8
							}
						]
					},
					{
						title: '饮料',
						goodsInfoList: [
							{
								goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
								goodsTitle: '饮料',
								goodsInfo: '拿铁1杯+香辣鸡翅2块',
								goodsSaleCount: 99,
								goodsPrice: 16.8
							}
						]
					},
					{
						title: '饮料',
						goodsInfoList: [
							{
								goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
								goodsTitle: '饮料',
								goodsInfo: '拿铁1杯+香辣鸡翅2块',
								goodsSaleCount: 99,
								goodsPrice: 16.8
							},
							{
								goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
								goodsTitle: '饮料',
								goodsInfo: '拿铁1杯+香辣鸡翅2块',
								goodsSaleCount: 99,
								goodsPrice: 16.8
							},
							{
								goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
								goodsTitle: '饮料',
								goodsInfo: '拿铁1杯+香辣鸡翅2块',
								goodsSaleCount: 99,
								goodsPrice: 16.8
							}
						]
					},
					{
						title: '饮料',
						goodsInfoList: [
							{
								goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
								goodsTitle: '饮料',
								goodsInfo: '拿铁1杯+香辣鸡翅2块',
								goodsSaleCount: 99,
								goodsPrice: 16.8
							}
						]
					},
					{
						title: '饮料',
						goodsInfoList: [
							{
								goodsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582112050816&di=61afc6ef1cf29dd930330f41e663f105&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171026%2Fb7d5cbcae1df4c7ba42ed83decc06994.jpeg',
								goodsTitle: '饮料',
								goodsInfo: '拿铁1杯+香辣鸡翅2块',
								goodsSaleCount: 99,
								goodsPrice: 16.8
							}
						]
					},
				]
			},
			
			// 用来计算左侧滚动类别按钮的索引和高度
			leftNenus: [
				{
					// 索引从1开始，第0个是 '全部' 这个按钮
					idx: 1,
					// 左侧DOM元素高度值，根据实际渲染的高度来获取，否则不同分辨率会出现偏差
					domHeight: 0,
					// 这个分类下，有几个商品
					// 单个商品卡片的高度是固定的(230rpx)，然后再加上一个分类的小横条(52rpx)
					// 就能计算出来右侧需要滚动到哪里了；
					goodsCount: 3,
					
					// 那么，点击左侧的某个 分类按钮的时候，将
				}
			],
			
			// 右侧栏,每个分类的高度值
			RightCategoryBoxHeight: [],
			
			// 右侧栏每个分类栏的 绝对高度，如果是第2个那么就是 1分类+2分类 的高度，第3个就是1+2+3的高度
			allRightCategoryBoxHeight: [],
				
			// 当前被点击的左侧按钮的索引，用于熏染激活状态
			// 0-全部，1-第1个按钮(不包括全部)，以此类推
			currentLeftMenu: 0,
				
				
			// 设置左侧 scroll-view 的Y轴滚动位置
			leftScrollTop: 0,
			
			// 设置右侧 scroll-view 的Y轴滚动位置
			rightScrollTop: 0,
			
			// 右侧栏实时滚动位置
			rightScrollCurrentPosition:0,
			
			
			scrollFlag: true 
			
			
		}
	},
	// 熏染DOM后，可以获取DOM元素的属性
	// uni.createSelectorQuery()获取DOM元素属性
	// 那么在这里就可以获取 左边栏、右边栏初始的时候每个元素举例页面顶部的高度，
	// 然后需要滚动的时候，就减去上边其他的元素的高度，调用scroll-view设置滚动值的API即可；
	mounted () {
		// 先获取右侧，再过去左侧，顺序别乱
		this.getRightMenuDatas()
		this.getLeftMenuDatas()
	},
	methods: {
		
		// 获取每个左侧栏标签按钮的索引和高度，关联起来
		getLeftMenuDatas() {
			
			// 先清空数据
			this.leftNenus = []
			
			
			for (let i=0; i<this.mockData.goodsCategoryList.length; i++) {
				
				// 每次循环的时候，先push一个对象，对象内容都是空的
				let objs = {idx:0, domHeight:0, goodsCount:0}
				this.leftNenus.push(objs)
				
				const query = uni.createSelectorQuery().in(this);
				// id的索引从1开始，所以i+1
				query.select('#menu-items-'+(i+1)).boundingClientRect(data => {
					// console.log('左侧第 '+(i+1)+' 个按钮DOM↓')
					// console.log(data)
					this.leftNenus[i].idx = i+1
					this.leftNenus[i].domHeight = data.height // 拿到左侧按钮的具体高度
					this.leftNenus[i].goodsCount = this.mockData.goodsCategoryList[i].goodsInfoList.length // 拿到每个分类下商品数
					
					
					// console.log('左侧第-- ' + (i+1) + ' --个按钮计算的数据')
					// console.log(this.leftNenus[i])
					// console.log("得到布局位置信息" + JSON.stringify(data));
					// console.log("节点离页面顶部的距离为" + data.top);
				}).exec();
			}
		},
		
		// 获取右侧每个分类的高度值(分类标签+商品高度*商品个数) 和 绝对高度
		getRightMenuDatas() {
			for (let i=0; i<this.mockData.goodsCategoryList.length; i++) {
				const query = uni.createSelectorQuery().in(this);
				// id的索引从1开始，所以i+1
				query.select('#category-items-'+(i+1)).boundingClientRect(data => {
					
					this.RightCategoryBoxHeight[i] = data.height
					// console.log("得到布局位置信息" + JSON.stringify(data));
					// console.log("节点离页面顶部的距离为" + data.top);
				}).exec();
			}
			// console.log('右侧每个栏的高度↓')
			// console.log(this.RightCategoryBoxHeight)
			
			
			// 计算右侧每个栏的绝对高度
			clearTimeout(st)
			let st = setTimeout(()=>{
				// 这里就来获取右侧每个栏的绝对高度
				// 如果是第2个那么就是 1分类+2分类 的高度，第3个就是1+2+3的高度
				// 所以这里循环相加
				for (let k=0; k < this.RightCategoryBoxHeight.length; k++) {
					// 如果这里是0那么不会进入这个for
					// 如果是1，那么就应该用 1+0的值，
					// 那么此时1的值就是 1+0的和，那么2+1的话，就等于2+1+0的值了
					if( k === 0 ) {
						this.allRightCategoryBoxHeight[k] = this.RightCategoryBoxHeight[k]
					}  else if(k >= 1) {
						this.allRightCategoryBoxHeight[k] = this.RightCategoryBoxHeight[k] + this.allRightCategoryBoxHeight[k-1]
					}
				}
				
				// console.log('======右侧每个栏的决对高度↓===============')
				// console.log(this.allRightCategoryBoxHeight)
			},100)
			
		},
		
		// 点击左侧分类按钮，然后拿到在mounted钩子时获取到的左侧按钮计算后数据,
		// 使右侧栏滚动
		RightScrollTo(idx) {
			
			// 先设置左侧按钮被点击的时的类，使其反白
			this.currentLeftMenu = idx
			
			
			// 因为右侧滚动会影响左侧的激活类的反白渲染，所以这里在点击 1 秒后，再让右侧滚动影响左侧的开关打开
			this.scrollFlag = false
			
			if(fst) {
				clearTimeout(fst)
			}
			let fst = setTimeout(()=>{
				this.scrollFlag = true
			},2000)
			
			
			
			
			// 这里的idx是从1开始的，左侧 '全部' 按钮，点击后是传过来 0
			
			// 那么这里拿到的就是被点击的按钮 经过计算 的属性，其中 this.leftNenus[idx].RightCategoryBoxHeight 就是右侧分类DOM的高度
			// 那么设置 <scroll-view> 的 scroll-top 属性即可
			// 这里还要除以2，因为是rpx渲染的
			
			// 滚动逻辑：
			if(idx===0 || idx===1 ) {
				// 如果是0，那么说明点击的是第一个分类或者、或者点击是全部按钮，那么直接将右侧列表滚动到顶部
				
				// 这里需要先错位1像素
				// 是因为：比如点击左侧第4个分类，然后右侧手动滑动，然后再点击第4个分类，rightScrollTop不会生效，因为rightScrollTop已经是那个值了
				this.rightScrollTop = this.rightScrollTop+1
				if(st) {
					clearTimeout(st)
				}
				let st = setTimeout(()=>{
					this.rightScrollTop = 0
					// console.log(this.rightScrollTop)
				},10)
				
			} else {
				// 因为传过来的idx是从1开始的，那么点击第2个按钮的时候，就该拿到右侧栏的第1个元素的绝对高度
				// console.log('绝对高度'+this.allRightCategoryBoxHeight[idx-2])
				
				// 这里需要先错位1像素
				// 是因为：比如点击左侧第4个分类，然后右侧手动滑动，然后再点击第4个分类，rightScrollTop不会生效，因为rightScrollTop已经是那个值了
				this.rightScrollTop = this.rightScrollTop+1
				// console.log(this.rightScrollTop)
				if(st) {
					clearTimeout(st)
				}
				let st = setTimeout(()=>{
					this.rightScrollTop = this.allRightCategoryBoxHeight[idx-2]
					// console.log(this.rightScrollTop)
				},10)
				 
			}
		},
		
		// 右侧栏滚动时 实时 触发，用于获取右侧栏实时滚动Y轴位置
		rightScrollCurrent(e) {
			// 飞快滚动时，会有BUG，获取不到精准的滚动Y轴位置
			// console.log(e.detail)
			this.rightScrollCurrentPosition = e.detail.scrollTop
			// 那么这里根据右侧滚动栏的Y轴位置计算，当Y轴值大于xx的时候，左侧按钮设置激活类，并且让左侧栏滚动到顶部
			// this.allRightCategoryBoxHeight.length
			
			
			// 这里注意 i 从1
			if(this.scrollFlag === true) {
				for (let i=1; i<=this.allRightCategoryBoxHeight.length; i++) {
					// 这里反向查找，如果找到最大的就停止for循环
					if(e.detail.scrollTop+100>this.allRightCategoryBoxHeight[this.allRightCategoryBoxHeight.length-i]) {
						this.currentLeftMenu = this.allRightCategoryBoxHeight.length-i + 2
						break;
						
						// 因为有TM的一个 '全部按钮' 所以这里必须判断一下
					} else if(e.detail.scrollTop<50 && e.detail.scrollTop>=10){
						this.currentLeftMenu = 1
					} else if(e.detail.scrollTop<10){
						this.currentLeftMenu = 0
					}
				}
			}
		},
		
		// 滚动到底部触发
		scrolltolower() {
			// 因为右侧滚动会影响左侧的激活类的反白渲染，所以这里在点击 1 秒后，再让右侧滚动影响左侧的开关打开
			this.scrollFlag = false
			
			if(fst) {
				clearTimeout(fst)
			}
			let fst = setTimeout(()=>{
				this.scrollFlag = true
			},1000)
			console.log('---------------')
			this.currentLeftMenu = this.leftNenus.length
		},
		
		
		// 点击每个卡片时，该子组件传回来的商品数据
		// 那么因为当前这个组件是滚动组件，所以还得传给父级，档口详情页面 stallsPage.vue 
		ckGoodsCard(CurrentClickGoodsInfo) {
			this.$emit('showgoodsmod', CurrentClickGoodsInfo)
		}
		
	},
	watch: {
		// 监听左侧按钮当前被激活的索引值，尽可能的让左侧滚动栏滚动可见位置,
		// 这是因为左侧栏可能栏目很多，也需要滚动
		currentLeftMenu(newVal, oldVal) {
			// 因为左侧栏的数量不多，所以就直接在这里循环计算了
			console.log(this.leftNenus.length)
			console.log('当前左侧'+newVal)
			
			// 这个newVal就是当前被点击的左侧按钮,基本上是按顺序 12345这么排列的
			// 所以循环这个newVal
			let scrollNum = 0;
			if(newVal===0 || newVal===1) {
				this.leftScrollTop = 1
				if(std) {
					clearTimeout(std)
				}
				let std = setTimeout(()=>{
					this.leftScrollTop = 0
				},10)
				
			} else {
				for (let i = 0; i<newVal; i++) {
					scrollNum += this.leftNenus[i].domHeight
					console.log('---' + scrollNum)
				}
				this.leftScrollTop = scrollNum-1
				if(std) {
					clearTimeout(std)
				}
				let std = setTimeout(()=>{
					// 这里本来应该把该元素放到左侧顶部的，但是前一个标签就看不到了，所以加一些举例
					this.leftScrollTop = scrollNum-80
				},10)
			}
			
			
			// leftNenus: [
			// 	{
			// 		// 索引从1开始，第0个是 '全部' 这个按钮
			// 		idx: 1,
			// 		// 左侧DOM元素高度值，根据实际渲染的高度来获取，否则不同分辨率会出现偏差
			// 		domHeight: 0,
			// 		// 这个分类下，有几个商品
			// 		// 单个商品卡片的高度是固定的(230rpx)，然后再加上一个分类的小横条(52rpx)
			// 		// 就能计算出来右侧需要滚动到哪里了；
			// 		goodsCount: 3,
					
			// 		// 那么，点击左侧的某个 分类按钮的时候，将
			// 	}
			// ],
			
			console.log(newVal)
		}
	},
	components: {
		goodsCardItems
	}
}	
</script>

<style lang="stylus">
.goods-scroll-wrapper {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: pink;
	width: 100%;
	
	// 左侧商品品类滚动栏
	// 这里注意，需要固定高度，所以用position，不要给父级设置flex布局了；
	.goods-scroll-left {
		width: 200rpx;
		z-index: 2;
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		background-color: #F9F9F9;
		padding-bottom: 40rpx;
		box-sizing: border-box;
		.category-menu-items {
			display:flex;
			align-items: center;
			width: 100%;
			background-color: #F9F9F9;
			padding: 36rpx 0 36rpx 52rpx;
			box-sizing: border-box;
			p {
				width: 80%;
				font-size: 24rpx;
				line-height: 1.4;
				color: #666;
			}
		}
		.category-menu-items-active {
			color: #0177BF;
			background-color: #fff;
		}
		// 用于把左侧栏按钮顶上去一些
		.spac-d {
			height: 80rpx;
			width: 100%;
		}
	}
	
	// 右侧商品列表滚动栏
	.goods-scroll-right {
		height: 100%;
		position: absolute;
		z-index: 1;
		padding-left: 200rpx;
		box-sizing: border-box;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		.category-items {
			width: 100%;
			.category-items-title {
				width: 100%;
				height: 52rpx;
				padding-left: 20rpx;
				background-color: #f3f5f7;
				border-left: 8rpx solid #d9dde1;
				box-sizing: border-box;
				font-size: 24rpx;
				color: #666;
				line-height: 52rpx;
			}
		}
	}
}	
</style>
