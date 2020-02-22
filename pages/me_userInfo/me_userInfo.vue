<template>
	<div class="user-info">
		<ul>
			<li @click="openIdentityPage">
				<div class="text-group">
					<span>我的身份</span>
				</div>
				<div class="arrow-wrapper">
					<span>{{store_UserInfoData.userType===1?'外部来客':'内部员工'}}</span>
					<i></i>
				</div>
			</li>
			<li v-if="store_UserInfoData.userType===0" @click="openEditUserCardPage">
				<div class="text-group">
					<span>员工号</span>
				</div>
				<div class="arrow-wrapper">
					<span>{{store_UserInfoData.idCard===null?'未填写':store_UserInfoData.idCard}}</span>
					<i></i>
				</div>
			</li>
			<li v-if="store_UserInfoData.userType===0">
				<div class="text-group">
					<span>部门</span>
				</div>
				<div class="arrow-wrapper">
					<!-- <span>{{store_UserInfoData.????===null?'未填写':'部门xxx'}}</span> -->
					<span>xxx部门</span>
					<i></i>
				</div>
			</li>
			<li>
				<div class="text-group">
					<span>电子邮箱</span>
				</div>
				<div class="arrow-wrapper">
					<i></i>
				</div>
			</li>
			<li>
				<div class="text-group">
					<span>用户状态</span>
				</div>
				<div class="arrow-wrapper">
					<span>{{'锁定'}}</span>
					<i></i>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
// 拿到vuex中的函数
import {mapGetters, mapMutations} from 'vuex'
export default {
	data () {
		return {
			
		}
	},
	methods: {
		openIdentityPage() {
			uni.navigateTo({
				url: '../../pages/me_userInfo_editIdentity/me_userInfo_editIdentity',
				complete (res) {
					console.log(res)
				}
			})
		},
		openEditUserCardPage() {
			uni.navigateTo({
				url: '../../pages/me_userInfo_editUserIdCard/me_userInfo_editUserIdCard',
				complete (res) {
					console.log(res)
				}
			})
		},
		
		...mapMutations({
			// 这里映射了这个方法，那么在调用x的时候，就等于使用了this.$store.commit('SET_SINGER', value)这个方法；
			setToken: 'setToken',
			setTokenExpiration: 'setTokenExpiration',
			setUserPhone: 'setUserPhone',
			setUserInfo: 'setUserInfo'
		}),
	},
	computed: {
		// vuex提供的辅助函数，拿到store/getters.js向外暴露的内容；
		...mapGetters([
			'store_UserInfoData'
		])
	}
}	
</script>

<style lang="stylus">
page {
	background-color: #F5F5F5;
}
.user-info {
	ul {
		width: 100%;
		li {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 90rpx;
			weidth: 100%
			padding: 0 30rpx;
			box-sizing: border-box;
			background-color: #fff;
			margin-bottom: 16rpx;
			.text-group {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				i {
					width: 28rpx;
					height: 28rpx;
					margin-right: 20rpx;
				}
				span {
					font-size: 26rpx;
					color: #666;
				}
			}
			.arrow-wrapper {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				span {
					font-size: 26rpx;
					color: #666;
				}
				i {
					width: 16rpx;
					height: 28rpx;
					margin-left: 20rpx;
					background: url('../../common/images/me/arrow.png') no-repeat;
					background-size: 100%;	
				}
			}
		}
		li:first-of-type {
			margin-top: 16rpx;
		}
		li:last-of-type {
			margin-bottom: 0;
		}
	}
}	
</style>
