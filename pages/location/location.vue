<template>
	<div class="location">
		<div class="top-bar-wrapper" v-if="store_userLocalInfo !== -1">
			<div class="city-select">
				<i class="city-location-icon"></i>
				<span class="city-name nowrap">北京市</span>
				<i class="city-arrow-icon"></i>
			</div>
			<div class="location-search-box">
				<i class="location-search-box-icon"></i>
				<input 
					type="text" 
					class="location-search-input" 
					placeholder="请输入地址" 
					placeholder-style="color:#666; font-size:24rpx"
					auto-focus 
					@input="onInput"
					@focus="onFocus"
					@blur="onBlue">
			</div>
		</div>
		<div class="current-location-wrapper" v-if="store_userLocalInfo !== -1">
			<div class="current-location-title">当前位置</div>
			<div class="current-location-info">
				<div class="current-location-info-text">北京大学东校区</div>
				<div class="current-location-info-btn" @click="getLocationIfno">
					<i class="btn-icon"></i>
					<span class="btn-text">重新定位</span>
				</div>
			</div>
		</div>
		<div class="nearby-addr-wrapper" v-if="store_userLocalInfo !== -1">
			<div class="nearby-addr-title">附近位置</div>
			<ul class="nearby-addr-list">
				<li>北京大学东校区</li>
				<li>学院路25号</li>
				<li>清华大学</li>
			</ul>
		</div>
		<div class="location-err" v-if="store_userLocalInfo === -1">
			<img src="../../common/images/location/err-location.png">
			<p>无法获取地理位置</p>
			<p>请开启定位</p>
			<div class="open-setting" @click="openSettingPage">开启定位</div>
		</div>
		<van-toast id="van-toast" />
		<div class="testteset">
			西经：{{store_userLocalInfo.longitude}}
			南纬：{{store_userLocalInfo.latitude}}
		</div>
	</div>
</template>

<script>
// 拿到vuex中的函数
import {mapGetters, mapMutations} from 'vuex'
import Toast from '../../wxcomponents/weapp/dist/toast/toast';
import {http_getUserLocationsInfo} from '../../utils/http/http_getUserLocationsInfo.js';
export default {
	data () {
		return {
		}
	},
	onShow() {
		this.getLocationAuthor()
	},
	methods: {
		onInput(e) {
			console.log(e.detail.value)
		},
		onFocus() {
			console.log('获取焦点')
		},
		onBlue() {
			console.log('失去焦点')
		},
		openSettingPage() {
			uni.openSetting({
			  success(res) {
			    // console.log(res.authSetting)
			  }
			});
		},
		// 获取用户位置
		getLocationAuthor() {
			uni.getSetting({
			  success: (res) => {
				
			    if (res.authSetting['scope.userLocation']) {
				  // console.log('用户没有授权定位')
			      uni.authorize({
			        scope: 'scope.userLocation',
			        success: (res) => {
			          // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
			          console.log('已可以获取用户定位，调用用户位置信息')
			          
					  this.getLocationIfno()
			        },
					fail: ()=> {
						console.log('未能获取用户定位')
						this.setUserLocalInfo(-1)
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
				success: async (res)=> {
					
					// red.latitude // 纬度，浮点数，范围为-90~90，负数表示南纬 39.83907699584961,116.24424743652344
					// red.longitude // 经度，浮点数，范围为-180~180，负数表示西经 
					// red.speed // 速度，浮点数，单位m/s
					// red.accuracy // 位置的精确度
					// red.altitude // 高度，单位 m
					// red.verticalAccuracy // 垂直精度，单位 m（Android 无法获取，返回 0）
					// red.horizontalAccuracy // 水平精度，单位 m
					// red.address // 地址信息（仅App端支持，需配置geocode为true）
					
					
					// 设置store中的用户位置信息
					this.setUserLocalInfo(res)
					
					
					console.log('用户位置信息，原生↓')
					console.log(this.store_userLocalInfo)
					// 得到了位置信息后, 调用第三方接口获取用户准确位置大区/城市等信息,这个接口免费每日1万次调用,1万次以上需付费
					let getTencenMap = await http_getUserLocationsInfo(this.store_userLocalInfo.latitude, this.store_userLocalInfo.longitude)
					
					if(getTencenMap) {
						this.setUserLocalInfoDetail(res)
						console.log('用户位置信息，第三方解析后↓')
						console.log(getTencenMap)
						// 具体字段描述
						// https://lbs.qq.com/qqmap_wx_jssdk/method-reverseGeocoder.html
					} else {
						this.setUserLocalInfoDetail(-1)
					}
					
					
					
					
				},
				fail: (err)=> {
					console.log(err)
				}
				
			})
		},
		...mapMutations({
			setUserLocalInfo:'setUserLocalInfo',
			setUserLocalInfoDetail:'setUserLocalInfoDetail'
		})
	},
	computed: {
		// vuex提供的辅助函数，拿到store/getters.js向外暴露的内容；
		...mapGetters([
			'store_userLocalInfo', // 用户位置信息
			'store_userLocalInfoDetail' // 用户详细位置信息
		])
	}
}
</script>

<style lang="stylus">
	.location {
		position: relative;
		.top-bar-wrapper {
			display: flex;
			padding: 0 30rpx;
			box-sizing: border-box;
			justify-content: space-between;
			.city-select {
				width: 24%;
				display: flex;
				align-items: center;
				margin-right: 32rpx;
				.city-location-icon {
					width: 22rpx;
					height: 28rpx;
					margin-right: 20rpx;
					background-color: pink;
					background: url(../../common/images/index/location@2x.png) no-repeat;
					background-size: 100%;
				}
				.city-name {
					width: 70%;
					font-size: 30rpx;
					font-weight: 700;
					color: #0177BF;
					margin-right: 20rpx;
				}
				.city-arrow-icon {
					width: 10rpx;
					height: 10rpx;
					margin-bottom: -12rpx;
					background: url(../../common/images/index/arrow.png) no-repeat;
					background-size: 100%;
				}
			}
			.location-search-box {
				display: flex;
				align-items: center;
				height: 60rpx;
				width: 76%;
				border-radius: 10rpx;
				border: 1rpx solid #BFBFBF;
				padding: 0 30rpx;
				box-sizing: border-box;
				.location-search-box-icon {
					width: 24rpx;
					height: 26rpx;
					background-color: pink;
					margin-right: 20rpx;
					background: url('../../common/images/index/search.png') no-repeat;
					background-size: 100%;
				}
				.location-search-input {
					flex: 1;
					height: 100%;
					padding-top: 2rpx;
					box-sizing: border-box;
				}
			}
		}
		.current-location-wrapper {
			margin-top: 30rpx;
			.current-location-title {
				display: flex;
				align-items: center;
				height: 80rpx;
				width: 100%;
				background-color: #F5F5F5;
				padding: 0 30rpx;
				box-sizing: border-box;
				font-size: 30rpx;
				color: #777;
			}
			.current-location-info {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 30rpx;
				box-sizing: border-box;
				width: 100%;
				height: 100rpx;
				background-color: #fff;
				.current-location-info-text {
					color:#0177BF;
					font-size: 30rpx;
				}
				.current-location-info-btn {
					color:#0177BF;
					font-size: 30rpx;
					display: flex;
					.btn-icon {
						width: 32rpx;
						height: 32rpx;
						margin: 4rpx 10rpx 0 0;
						background: url(../../common/images/location/location.png) no-repeat;
						background-size: 100%;
					}
					.btn-text {
						color:#0177BF;
						font-size: 30rpx;
					}
				}
			}
		}
		.nearby-addr-wrapper {
			.nearby-addr-title{
				display: flex;
				align-items: center;
				height: 80rpx;
				width: 100%;
				background-color: #F5F5F5;
				padding: 0 30rpx;
				box-sizing: border-box;
				font-size: 30rpx;
				color: #777;
			}
			.nearby-addr-list {
				padding: 0 30rpx;
				box-sizing: border-box;
				li {
					display: flex;
					align-items: center;
					width: 100%;
					height: 80rpx;
					border-bottom: 1px solid #F5F5F5;
					font-size: 30rpx;
					color: #666;
				}
			}
		}
		.location-err {
			position: absolute;
			top: 100rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			img {
				display: block;
				width: 375rpx;
				height: 264rpx;
			}
			p {
				font-size: 24rpx;
				color: #999;
				line-height: 50rpx;
				text-align: center;
			}
			.open-setting {
				margin-top: 90rpx;
				width: 400rpx;
				height: 70rpx;
				line-height: 70rpx;
				text-align: center;
				color: #0177BF;
				font-size: 24rpx;
				border: 1rpx solid #0177BF;
				border-radius: 35rpx;
			}
		}
	}

</style>
