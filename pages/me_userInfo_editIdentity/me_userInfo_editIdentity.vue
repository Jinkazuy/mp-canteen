<template>
	<div class="identity">
		<div class="identity-box-in" @click="selectIn">
			<img src="../../common/images/identity/in.png">
			<p>内部员工</p>
		</div>
		<div class="identity-box-out" @click="selectOutn">
			<img src="../../common/images/identity/out.png">
			<p>外来访客</p>
		</div>
		<van-toast id="van-toast" />
	</div>
</template>

<script>


import {mapGetters, mapMutations} from 'vuex'
// toast组件，拿到的不是组件，是方法；
// 如此这般：Toast('我是提示文案，建议不超过十五字~');
import Toast from '../../wxcomponents/weapp/dist/toast/toast'
// 设置用户信息
import {http_setUserInfoData} from '../../utils/http/http_setUserInfoData.js'
export default {
	data () {
		return {
			
		}
	},
	methods: {
		async selectIn () {
			console.log('内部人员')
			// // 强制跳转到内部员工信息设置页
			// 逻辑：跳转到工号和部门设置页，填写提交给后台，后台验证通过后生效 设置 state.store_UserInfoData.userType = 0 并且跳转上2页
			uni.navigateTo({
				url: '../../pages/me_userInfo_editUserIdCard/me_userInfo_editUserIdCard',
				complete (res) {
					console.log(res)
				}
			})
			
		},
		async selectOutn () {
			console.log('外部人员')
			console.log(this.store_UserInfoData.userType)
			
			let res = await http_setUserInfoData({
				"userType": 1,
				"idCard": ''
			})
			
			if(res) {
				Toast('设置成功，您的身份是：访客')
				// 清空员工号
				
				// 跳转回 '我的' 页面
				setTimeout(()=>{
					uni.switchTab({
						url: '../../pages/me/me',
						complete (res) {
							console.log(res)
						}
					})
				},1000) 
			} else {
				Toast('设置失败')
			}
		},
		...mapMutations({
			setUserIdentity: 'setUserIdentity'
		})
	},
	computed: {
		...mapGetters([
			'store_UserInfoData'
		])
	}
}
</script>

<style lang="stylus">
.identity {
	width: 100%;
	.identity-box-in,.identity-box-out {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		img {
			display: block;
			width: 230rpx;
			height: 230rpx;
			margin-bottom: 30rpx;
		}
		p {
			font-size: 30rxp;
			color: #666;
			text-align: center;
			line-height: 1;
		}
	}
	.identity-box-in {
		margin: 130rpx 0 100rpx 0;
	}
}
</style>
