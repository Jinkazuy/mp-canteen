<template>
	<div class="user-addrs">
		<div class="user-addrs-tit">我的地址</div>
		<div class="user-addrs-info">
			<span class="open-setting" @click="openSettingPage">{{
				locationFlag? (locationInfo!==''?locationInfo:'获取位置失败，点击开启定位') :'获取位置失败，点击开启定位'
			}}
			</span>
			<i @click="openEditAddrsPage"></i>
		</div>
		<van-toast id="van-toast" />
	</div>
</template>

<script>
// 拿到vuex中的函数
import {mapGetters, mapMutations} from 'vuex'
import Toast from '../../wxcomponents/weapp/dist/toast/toast';
export default {
	data() {
		return {
			locationFlag:false,
			locationInfo: '',
		}
	},
	onShow() {
		// 判断当前用户的地址信息如果为null那么就获取定位，设置地址
		if(this.store_UserInfoData.address===null || this.store_UserInfoData.address==='') {
			this.locationFlag = false
			this.getLocationAuthor()
		} else {
			this.locationInfo = this.store_UserInfoData.address
			// 获取成功
			this.locationFlag = true
		}
	},
	methods: {
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
			          this.locationFlag = true
					  this.getLocationIfno()
			        },
					fail:()=> {
						this.locationFlag = false
						Toast({
							message: '需要您的授权，才能获取您的位置',
							forbidClick: false, // 是否禁止背景点击
							duration: 4000 // 展示时长(ms)，值为 0 时，toast 不会消失，在触发其他弹窗或主动取消时消失
						})
					}
			      })
			    } else if (res.authSetting['scope.userLocation']===false) {
					// 显示定位失败页面，隐藏其他
					Toast({
						message: '需要您的授权，才能获取您的位置',
						forbidClick: false, // 是否禁止背景点击
						duration: 4000 // 展示时长(ms)，值为 0 时，toast 不会消失，在触发其他弹窗或主动取消时消失
					})
					this.locationFlag = false
				} else if(res.authSetting['scope.userLocation']===true) {
					// 获取成功
					this.locationFlag = true
					this.getLocationIfno()
				}
			  }
			})
		},
		getLocationIfno() {
			uni.getLocation({
				type:'', // 默认为 wgs84 返回 gps 坐标，gcj02 返回国测局坐标，可用于 uni.openLocation 的坐标
				altitude: false, // 传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度
				geocode: true, // 是否解析地址信息
				success: (res)=> {
					console.log(res)
					this.locationInfo = res
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
		openSettingPage() {
			if(this.locationFlag === false) {
				uni.openSetting({
				  success(res) {
				    // console.log(res.authSetting)
				  }
				})
			}
			
		},
		openEditAddrsPage() {
			uni.navigateTo({
				url: '../../pages/me_userAddrs_edit/me_userAddrs_edit',
				complete (res) {
					console.log(res)
				}
			})
		}
	},
	computed: {
		...mapGetters([
			'store_UserInfoData'
		])
	}
}
</script>

<style lang="stylus">
.user-addrs {
	padding: 0 30rpx;
	box-sizing: border-box;
	.user-addrs-tit, .user-addrs-info {
		height: 100rpx;
		border-bottom: 1rpx solid #eee;
		display: flex;
		justify-content: space-between;
		align-items: center;
		line-height: 1;
	}
	.user-addrs-tit {
		font-size: 30rpx;
		color: #666;
	}
	.user-addrs-info {
		font-size: 26rpx;
		color: #999;
		i {
			width: 38rpx;
			height: 38rpx;
			background-image: url('../../common/images/me/edit.png');
			background-position: center;
			background-size: 100%;
			background-repeat: no-repeat;
		}
	}
}
</style>
