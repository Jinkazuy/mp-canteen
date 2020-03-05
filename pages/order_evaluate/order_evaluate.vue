<template>
	<div class="order_evaluate">
		<div class="order_evaluate-box">
			<div class="stalls-tit">
				<div class="img-box">
					<!-- <img src=""> -->
				</div>
				<div class="name-star">
					<div class="stalls-name nowrap">麦当劳档口麦当劳档口麦当劳档口麦当劳档口（第一餐厅）</div>
					<div class="evaluate-star">
						<!-- https://youzan.github.io/vant-weapp/#/rate -->
						<van-rate 
							:value="starValue"
							@change="starOnChange"
							size="30"
							touchable=true
						 />
					</div>
				</div>
			</div>
			<div class="tt-area">
				<textarea 
					maxlength="200"
					v-model="ttCont"
					placeholder-class="placehoders"
					placeholder="说说哪里好，其他顾客想知道"
					>
				</textarea>
				<span class="number-tips">{{ttCont.length}}/200</span>	
			</div>
		</div>
		<van-button
		round 
		type="primary" 
		:class="['submit-btn', {'submit-btn-no':!ttCont.length}]" 
		@click="subEva">评  价</van-button>
		<van-toast id="van-toast" />
	</div>
</template>

<script>
// 拿到vuex中的函数
import {mapGetters, mapMutations} from 'vuex'
import Toast from '../../wxcomponents/weapp/dist/toast/toast';
export default {
	data () {
		return {
			ttCont: '',
			starValue: 0,
			orderId: -1
		}
	},
	onLoad(data) {
		this.orderId = data.orderId
	},
	methods: {
		// 点击提交按钮
		subEva() {
			let res = this.ttCont.trim()
			console.log(res.length)
			// 判断输入框内容
			if(!res.length) {
				Toast('请输入内容')
				this.ttCont = ''
			} else if(this.starValue===0) {
				Toast('客官，至少给一颗星吧~！')
			} else {
				
				console.log('内容 => ' + res)
				console.log('订单ID => ' + this.orderId)
				console.log('星星 => ' + this.starValue)
				
				console.log('发送成功后，重新获取该用户的订单数据')
				console.log('发送http请求')
				if(this.orderId!==-1) {
					// 提交成功,清空内容
					// Toast('评价成功')
					this.ttCont = ''
					this.starValue = 0
					// 跳转
					// uni.reLaunch({
					// 	url: '../../pages/order_evaluate_result/order_evaluate_result',
					// 	complete (res) {
					// 		console.log(res)
					// 	}
					// })
					
				} else {
					Toast('提交失败')
				}
			}
		},
		
		// 点击评分星星
		starOnChange(e) {
			this.starValue = e.detail
			console.log(this.starValue)
		}
	}
}
</script>

<style lang="stylus">
.order_evaluate {
	padding: 20rpx 30rpx;
	box-sizing: border-box;
	
	.order_evaluate-box {
		border: 1rpx solid #DCDCDC;
		border-radius: 10rpx;
		padding: 20rpx 20rpx;
		box-sizing: border-box;
		.stalls-tit {
			display: flex;
			margin-bottom: 64rpx;
			.img-box {
				width: 100rpx;
				height: 100rpx;
				border-radius: 10rpx;
				margin-right: 50rpx;
				background-color: #eee;
				img {
					width: 100%;
					height: 100;
				}
			}
			.name-star {
				flex: 1;
				.stalls-name {
					width: 470rpx;
					margin-bottom: 28rpx;
					font-weight: 700;
					font-size: 36rpx;
					line-height: 1;
					color: #666;
				}
				.evaluate-star {
					height: 60rpx;
					width: 350rpx;
				}
			}
		}
		.tt-area {
			position: relative;
			textarea {
				width: 100%;
				padding: 10rpx 30rpx 30rpx;
				box-sizing: border-box;
				line-height: 1.4;
				background-color: #FAFAFA;
			}
			.placehoders, .number-tips{
				position: absolute;
				font-size: 24rpx;
				color: #999;
				line-height: 1;
			}
			.placehoders {
				top: 30rpx;
				left: 30rpx;
			}
			.number-tips {
				right: 12rpx;
				bottom: 12rpx;
			}
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
			background-color: #FAFAFA !important;	
			color: #999 !important;
		}
	}
}
</style>
