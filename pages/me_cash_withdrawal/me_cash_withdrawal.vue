<template>
	<div class="me-cash-withdrawal">
		<p class="me-cash-withdrawal-text">提现金额</p>
		<div class="inp-wrapper">
			<span>￥</span>
			<!-- <van-cell-group>
			  <van-field
			    :value="money"
				type="digit"
			    placeholder="请输入金额"
			    border=flase
			    @change="onChange"
				placeholder-class="placeholder"
			  />
			</van-cell-group> -->
			<input 
				type="digit" 
				v-model="money" 
				placeholder="请输入金额" 
				placeholder-class="placeholder"
				step="any"
				min="0"
				@input="onChange"
			>
		</div>
		<p class="cw-tips">当前可提现余额{{'23.05'}}元，<span>全部提取</span></p>
		<van-button
		round 
		type="primary" 
		:class="['submit-btn', {'submit-btn-no':money==='' || Number(money) <= 0}]" 
		@click="openProcess">提现到微信钱包</van-button>
	</div>
</template>

<script>
export default {
	data () {
		return {
			money: ''
		}
	},
	methods: {
		openProcess() {
			console.log(1)
			
			// 发送请求,返回结算成功跳转到提现成功页
			// uni.navigateTo({
			// 	url: '../../pages/me_cash_withdrawal_process/me_cash_withdrawal_process',
			// 	complete (res) {
			// 		console.log(res)
			// 	}
			// })
		},
		onChange(e) {
			// console.log(e.detail.value)
			let newValue = e.detail.value
			// console.log(newValue)
			// 不能让金额大于用户余额
			let userBalance = 168.05
			
			// 若等于
			if(newValue == '00') {
				console.log('两个0开头')
				// 这里v-model有个BUG，需要设置延迟才行
				if(st) {
					clearTimeout(st)
				}
				let st = setTimeout(() => { this.money = '' }, 5)
				console.log(this.money)
			}
			
			if(newValue == '0.00') {
				console.log('都是0')
				// 这里v-model有个BUG，需要设置延迟才行
				if(st) {
					clearTimeout(st)
				}
				let st = setTimeout(() => { this.money = '' }, 5)
				console.log(this.money)
			}
			
			
			if(Number(newValue)>Number(userBalance)) {
				console.log('金额大于了')
				// 这里v-model有个BUG，需要设置延迟才行
				if(st) {
					clearTimeout(st)
				}
				let st = setTimeout(() => { this.money = userBalance }, 5)
				console.log(this.money)
			}
			
			
			if(isNaN(Number(newValue))) {
				console.log('不是数字')
				if(st) {
					clearTimeout(st)
				}
				let st = setTimeout(() => { this.money = '' }, 0)
			} 
			
			if((Number(newValue))<0){
				// 是数字，但必须大于0
				console.log('小于0')
				if(st) {
					clearTimeout(st)
				}
				let st = setTimeout(() => { this.money = '' }, 0)
			} 
			
			
			if(String(newValue).indexOf(" ")>=0) {
				console.log('有空格')
				if(st) {
					clearTimeout(st)
				}
				let st = setTimeout(() => { this.money = '' }, 0)
			}
			
			
			// 保留两位小数
			if(String(newValue).indexOf(".")>=0) {
				console.log('有小数点')
				this.ifTwo(newValue)
			}
			
			
			
		},
		// 保留两位小数
		ifTwo(num) {
			// 如果大于两位小数，那么就保留两位小数
			let floatNum = (String(num).split(".")[1].length)
			if(floatNum>2) {
				console.log('小数点后，保留两位')
				let result = Number(num).toFixed(2);
				
				if(st) {
					clearTimeout(st)
				}
				let st = setTimeout(() => { this.money = result }, 0)
			}
		}
	}
}
</script>

<style lang="stylus">
.me-cash-withdrawal {
	padding: 110rpx 50rpx 0;
	box-sizing: border-box;
	
	.me-cash-withdrawal-text {
		font-size: 30rpx;
		color: #666;
		line-height: 1;
		margin-bottom: 40rpx;
	}
	.inp-wrapper {
		display: flex;
		align-items: center;
		height: 100rpx;
		border-bottom: 1rpx solid #999;
		line-height: 1;
		color: #333;
		font-size: 72rpx;
		padding-bottom: 18rpx;
		span {
			margin-right: 28rpx;
		}
		input {
			height: 64rpx;
		}
		.placeholder {
			font-size: 40rpx;
			color: #999;
		}
	}
	.cw-tips {
		line-height: 1;
		margin-top: 24rpx;
		font-size: 24rpx;
		color: #999;
		span {
			color: #0177BF;
		}
	}
	
	
	
	.submit-btn{
		display: flex;
		justify-content: center;
	}
	.van-button--primary, {
		margin: 52rpx auto 0!important;
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
