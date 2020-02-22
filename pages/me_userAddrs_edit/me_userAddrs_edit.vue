<template>
	<div class="user-addrs-edit">
		<div class="user-addrs-edit-tit">我的地址</div>
		<div class="user-addrs-edit-inp">
			<input type="text" v-model="addrs" placeholder="暂无地址,点击输入" placeholder-style="color:#F76260">
		</div>
		<van-button
		round 
		type="primary" 
		:class="['submit-btn', {'submit-btn-no':!addrs.length}]" 
		@click="subAddrs">保存地址</van-button>
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
			addrs: ''
		}
	},
	onLoad() {
		
		// 获取用户地址信息
		// 没有值的话是等于null，这里转化一下，如果是null那么就让 this.addrs = ''
		if( this.store_UserInfoData.address===null) {
			this.addrs = ''
		} else {
			this.addrs = this.store_UserInfoData.address
		}
		
	},
	methods: {
		// 点击提交按钮
		subAddrs() {
			let res = this.addrs.trim()
			// 判断输入框内容长度
			if(!res.length) {
				Toast('请输入内容')
				this.addrs = ''
			} else if(this.addrs!==this.store_UserInfoData.address){ 
				// 判断是否等于原来的内容
				console.log('当前内容 => ' + res)
				console.log('发送http请求')
				
				// 提交成功,清空内容
				Toast('已保存')
				// 此时发送请求，如果返回成功的话，那么在http请求中手动设置本地store，那么这里就能获取到最新的地址的值
				this.addrs = this.store_UserInfoData.address
			} else {
				Toast('地址未修改')
			}
		},
	},
	// watch: {
	// 	addrs(newVal) {
	// 		console.log(newVal)
	// 	}
	// },
	computed: {
		...mapGetters([
			'store_UserInfoData'
		])
	}
}
</script>

<style lang="stylus">
.user-addrs-edit {
	padding: 0 30rpx;
	box-sizing: border-box;
	.user-addrs-edit-tit, .user-addrs-edit-inp {
		height: 100rpx;
		border-bottom: 1rpx solid #eee;
		display: flex;
		justify-content: space-between;
		align-items: center;
		line-height: 1;
	}
	.user-addrs-edit-tit {
		font-size: 30rpx;
		color: #666;
	}
	.user-addrs-edit-inp {
		font-size: 26rpx;
		color: #999;
		input {
			width: 100%;
		}
		
	}
	.submit-btn{
		display: flex;
		justify-content: center;
	}
	.van-button--primary, {
		margin: 40rpx auto 0!important;
		width: 690rpx;
		color: #fff !important;
		border-radius: 10rpx !important;
		background-color: #0177BF !important;
		border: none !important;
		font-size: 30rpx !important;
		line-height: 36rpx !important;
		transition: all .4s !important;
	}
	.submit-btn-no {
		.van-button--primary {
			background-color: #A0A0A0 !important;	
		}
	}
}
</style>
