<template>
	<view id="index">
		<!-- 搜索栏，searchBar -->
		<searchBar></searchBar>
		<!-- 轮播图、banner -->
		<div class="banner-wrapper">
			<specialBanner :banner-list="store_homeBannerList" :swiper-config="swiperConfig"></specialBanner>
		</div>
		<!-- 公告、notice -->
		<noti :notiInfo="store_homeNotiInfo"></noti>
		<!-- 金刚区 -->
		<changeRegion></changeRegion>
		<div class="spaceX"></div>
		<!-- 商品列表 -->
		<canteenList :canteenListData="store_homeCanteenList"></canteenList>
	</view>
</template>

<script>
	// 拿到vuex中的函数
	import {mapGetters, mapMutations} from 'vuex'
	// 搜索框
	import searchBar from '@/components/index/searchBar.vue'
	// banner
	import specialBanner from '@/components/index/specialBanner.vue'
	// 公告
	import noti from '@/components/index/noti.vue'
	// 金刚区
	import changeRegion from '@/components/index/changeRegion.vue'
	// 商品列表
	import canteenList from '@/components/index/canteenList.vue'
	
	// 获取首页banner
	import {http_getHomeBannerList} from '@/utils/http/http_getHomeBannerList.js'
	// 获取首页公告
	import {http_getHomeNotiInfo} from '@/utils/http/http_getHomeNotiInfo.js'
	// 获取首页附近餐厅列表
	import {http_getHomeNearbyCanteenList} from '@/utils/http/http_getHomeNearbyCanteenList.js'
	export default {
		data() {
			return {
				
				// banner配置
				swiperConfig: {
					indicatorDots: false,
					indicatorColor: 'rgba(255, 255, 255, .4)',
					indicatorActiveColor: 'rgba(255, 255, 255, 1)',
					autoplay: true,
					interval: 3000,
					duration: 300,
					circular: true,
					previousMargin: '10rpx', // 左右banner露出的尺寸
					nextMargin: '10rpx'
				},
				
			}
		},
		async onLoad() {
			console.log('获取数据')
			// 获取首页数据
			this.gethomeDatas()
		},
		// 下拉刷新
		async onPullDownRefresh() {
			// 下拉刷新时，刷新数据，同onLoad
			console.log('下拉刷新')
			
			// 获取首页数据
			this.gethomeDatas()
			
			// 下拉刷新结束
			setTimeout(() => {
				console.log('下拉刷新结束')
				uni.stopPullDownRefresh()
			}, 1000)
		},
		methods: {
			gethomeDatas() {
				// 获取banner
				this.getBanner()
				// 获取公告
				this.getNotiInfo()
				// 获取首页附近餐厅列表
				this.getNearCanteenList()
			},
			async getBanner() {
				let bannerFlag = await http_getHomeBannerList()
				console.log(this.store_homeBannerList)
			},
			
			async getNotiInfo() {
				let bannerFlag = await http_getHomeNotiInfo()
				console.log(this.store_homeNotiInfo)
			},
			
			async getNearCanteenList() {
				let bannerFlag = await http_getHomeNearbyCanteenList()
				console.log('=============首页餐厅列表=============')
				console.log(this.store_homeCanteenList)
			}
			
			
		},
		components: {
			searchBar,
			specialBanner,
			noti,
			changeRegion,
			canteenList
		},
		computed: {
			// vuex提供的辅助函数，拿到store/getters.js向外暴露的内容；
			...mapGetters([
				'store_homeBannerList', // banner数据
				'store_homeNotiInfo',
				'store_homeCanteenList'
			])
		}
	}
</script>

<style lang="stylus">
	#index {
		.banner-wrapper {
			/* margin: 10px 0 30rpx; */
			height: 220rpx;
			margin: 10rpx 0 20rpx;
		}
	}
</style>
