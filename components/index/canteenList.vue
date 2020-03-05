<template>
	<div class="canteen-list">
		<div class="canteen-list-title">
			<p>附近餐厅</p>
		</div>
		<restaurantCard :canteenListData="store_homeCanteenList"></restaurantCard>
		<div class="tips">
			<span>选择食堂开始点餐</span>
			<div class="bg-line"></div>
		</div>
		<!-- <div class="miao">
			<img src="../../common/images/layout/foooter-miao.png">
		</div> -->
	</div>
</template>

<script>
import restaurantCard from '../layout/restaurantCard.vue'	
// 拿到vuex中的函数
import {mapGetters, mapMutations} from 'vuex'
export default {
	data () {
		return {
			
		}
	},
	methods: {

	},
	components: {
		restaurantCard
	},
	computed: {
		// vuex提供的辅助函数，拿到store/getters.js向外暴露的内容；
		...mapGetters([
			'store_homeCanteenList' // 餐厅列表
		])
	}
}
</script>

<style lang="stylus">
	.canteen-list {
		.canteen-list-title {
			padding: 30rpx 0 10rpx 30rpx;
			box-sizing: border-box;
			color: #444;
			font-size: 30rpx;
			font-weight 700;
		}
		.tips {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 80rpx;
			font-size: 24rpx;
			color: #999;
			text-align: center;
			span {
				background-color: #fff;
				padding: 0 20rpx;
				z-index: 10;
			}
			.bg-line {
				position: absolute;
				content: '';
				z-index: 1;
				top: 50%;
				transform: translateY(-50%);
				width: 50%;
				height: 1rpx;
				background-color: #999;
			}
		}
		.miao {
			width: 100%;
			img {
				width: 100%;
				height: 370rpx;
			}
		}
	}
</style>
