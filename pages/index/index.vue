<template>
	<view id="index">
		<!-- 搜索栏，searchBar -->
		<searchBar></searchBar>
		<!-- 轮播图、banner -->
		<div class="banner-wrapper">
			<specialBanner :banner-list="banenrList" :swiper-config="swiperConfig" v-if="banenrList.length"></specialBanner>
		</div>
		<!-- 公告、notice -->
		<noti :notiInfo="store_homeNotiInfo"></noti>
		<!-- 金刚区 -->
		<changeRegion></changeRegion>
		<div class="spaceX"></div>
		<!-- 餐厅列表，数据由vuex管理，就不用这里传入了 -->
		<canteenList></canteenList>
		<van-toast id="van-toast" />
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
	// 餐厅列表
	import canteenList from '@/components/index/canteenList.vue'
	
	// 获取区域信息
	import {http_getHomeDistrict} from '@/utils/http/http_getHomeDistrict.js'
	// 获取餐厅列表
	import {http_getHomeCanteenList} from '@/utils/http/http_getHomeCanteenList.js'
	// 获取首页banner
	import {http_getHomeBannerList} from '@/utils/http/http_getHomeBannerList.js'
	// 因为banner图片需要二次请求，所以引入URL列表
	import {url_getHomeBannerListRes} from '@/utils/http/http_req_list.js'
	// 获取首页公告
	import {http_getHomeNotiInfo} from '@/utils/http/http_getHomeNotiInfo.js'
	
	
	// 获取用户详细地址
	import {http_getUserLocationsInfo} from '@/utils/http/http_getUserLocationsInfo.js'

	import Toast from '../../wxcomponents/weapp/dist/toast/toast';
	
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
				
				// 区域ID，根据这个ID来发送 获取餐厅列表的请求
				// 区域ID为0，获取所有食堂列表数据
				districtID: 0,
				
				
				// 用户定位，用来计算距离
				locationInfo: '',
				// 用户位置是否获取成功
				
				// banner列表数据
				banenrList: []
				
				
			}
		},
		async onShow() {
			console.log('获取数据')
			// 获取首页数据
			this.gethomeDatas()
			
			console.log('获取用户位置')
			this.getLocationAuthor()
		},
		async onLoad() {
			// console.log('获取数据')
			// // 获取首页数据
			// this.gethomeDatas()
		},
		// 下拉刷新
		async onPullDownRefresh() {
			// 下拉刷新时，刷新数据，同onLoad
			console.log('下拉刷新')
			
			// 获取首页数据
			this.gethomeDatas()
			
			console.log('获取用户位置')
			this.getLocationAuthor()
			
			// 下拉刷新结束
			setTimeout(() => {
				console.log('下拉刷新结束')
				uni.stopPullDownRefresh()
			}, 1000)
		},
		methods: {
			gethomeDatas() {
				
				// 获取区域信息、然后获取餐厅列表
				this.getDistrict()
				
				// 获取banner
				this.getBanner()
				
				// 获取公告
				this.getNotiInfo()
				
			},
			async getDistrict() {
				let Flag = await http_getHomeDistrict()
				console.log(this.store_homeDistrict)
				
				// 获取餐厅列表，根据大区的ID获取
				if(this.store_homeDistrict.length) {
					this.getHomeCanteenList(this.districtID)
				}
			},
			
			async getBanner() {
				this.banenrList = []
				let bannersResourcesList = await http_getHomeBannerList()
				if(bannersResourcesList!==false) {
					for(let i=0; i<bannersResourcesList.length; i++) {
						// 这里返回的是图片资源,需要再次发起请求将图片下载到本地
						// 下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径。
						bannersResourcesList[i].bannerImgUrl = url_getHomeBannerListRes + bannersResourcesList[i].bannerImgUrl
						this.banenrList.push(bannersResourcesList[i])
					}
				}
			},
			
			async getNotiInfo() {
				let bannerFlag = await http_getHomeNotiInfo()
				// console.log(this.store_homeNotiInfo)
			},
			
			async getHomeCanteenList(districtID) {
				let bannerFlag = await http_getHomeCanteenList(districtID)
				console.log('=============首页餐厅列表=============')
				console.log(this.store_homeCanteenList)
			},
			
			// 获取用户位置
			getLocationAuthor() {
				uni.getSetting({
				  success: (res) => {
					
				    if (res.authSetting['scope.userLocation']===undefined) {
					  // console.log('用户没有授权定位')
				      uni.authorize({
				        scope: 'scope.userLocation',
				        success: (res) => {
				          // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
				          console.log('已可以获取用户定位，调用用户位置信息')
				          
						  this.getLocationIfno()
				        },
						fail: ()=> {
							this.setUserLocalInfo(-1)
							console.log('未能获取用户定位')
							Toast({
								message: '需要您的授权，才能获取您的位置',
								forbidClick: true, // 是否禁止背景点击
								duration: 4000 // 展示时长(ms)，值为 0 时，toast 不会消失，在触发其他弹窗或主动取消时消失
							})
							
						}
				      })
				    } else if (res.authSetting['scope.userLocation']===false) {
						// 显示定位失败页面，隐藏其他
						console.log('未能获取用户定位')
						this.setUserLocalInfo(-1)
						Toast({
							message: '需要您的授权，才能获取您的位置',
							forbidClick: true, // 是否禁止背景点击
							duration: 4000 // 展示时长(ms)，值为 0 时，toast 不会消失，在触发其他弹窗或主动取消时消失
						})
						
					} else if(res.authSetting['scope.userLocation']===true) {
						// 获取成功
						
						this.getLocationIfno()
					}
				  }
				})
			},
			getLocationIfno() {
				uni.getLocation({
					type:'', // 默认为 wgs84 返回 gps 坐标，gcj02 返回国测局坐标，可用于 uni.openLocation 的坐标
					altitude: false, // 传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度
					geocode: true, // 是否解析地址信息,仅APP端支持，所以小程序还是用腾讯地图的API接口吧
					success: (res)=> {
						this.setUserLocalInfo(res)
						console.log('用户位置信息↓')
						console.log(this.store_userLocalInfo)
						
						// red.latitude // 纬度，浮点数，范围为-90~90，负数表示南纬 39.83907699584961,116.24424743652344
						// red.longitude // 经度，浮点数，范围为-180~180，负数表示西经 
						// red.speed // 速度，浮点数，单位m/s
						// red.accuracy // 位置的精确度
						// red.altitude // 高度，单位 m
						// red.verticalAccuracy // 垂直精度，单位 m（Android 无法获取，返回 0）
						// red.horizontalAccuracy // 水平精度，单位 m
						// red.address // 地址信息（仅App端支持，需配置geocode为true）
					},
					fail: (err)=> {
						console.log(err)
					}
				})
			},
			...mapMutations({
				setUserLocalInfo:'setUserLocalInfo'
			})
			
			
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
				'store_homeDistrict', // 区域信息
				'store_homeBannerList', // banner数据
				'store_homeNotiInfo', // 公告
				'store_homeCanteenList', // 餐厅列表
				'store_userLocalInfo', // 用户位置信息
				'store_token' // 获取banner需要token
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
