<template>
	<div class="goods-scroll-wrapper">
		<scroll-view
			class="goods-scroll-right"
			scroll-y
			scroll-with-animation
			show-scrollbar
			@scroll="rightScrollCurrent"
			@scrolltolower="scrolltolower"
			lower-threshold="10"
		>
			<div class="goods-wrappers" v-for="(itm,idx) in goodsList" :key="idx">
				<goodsCardItems
					:goodsInfo="itm"
					:canteenID="canteenID"
					:stallID="stallID"
					@ckgoods="ckGoodsCard"
				>
				</goodsCardItems>
				<div class="lines"></div>
			</div>
			<div class="no-more"></div>
		</scroll-view>
	</div>
</template>

<script>
// 商品卡片
import goodsCardItems from '@/components/stallsPage/goodsScroll-Card.vue'
// 拿到vuex中的函数
import {mapGetters, mapMutations} from 'vuex'
export default {
	props: {
		// 食堂ID
		canteenID: {
			type: Number,
			default() {
				return -1
			}
		},
		// 档口ID
		stallID: {
			type: Number,
			default() {
				return -1
			}
		},
		// 该食堂下的该档口的商品数据
		goodsList: {
			type: Array,
			default() {
				return []
			}
		}
	},
	data() {
		return {}
	},
	methods: {
		// 点击每个卡片时，该子组件传回来的商品数据
		// 那么因为当前这个组件是滚动组件，所以还得传给父级，档口详情页面 stallsPage.vue 
		ckGoodsCard(CurrentClickGoodsInfo, goodsCount) {
			this.$emit('showgoodsmod', CurrentClickGoodsInfo, goodsCount)
		}
	},
	components: {
		goodsCardItems
	},
	computed: {
		// ...mapGetters([
		// 	'store_homeCanteenList'
		// ])
	}
}	
</script>

<style lang="stylus">
.goods-scroll-wrapper {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	padding-bottom: 80rpx;
	
	
	// 右侧商品列表滚动栏
	.goods-scroll-right {
		height: 100%;
		position: absolute;
		z-index: 1;
		box-sizing: border-box;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		.goods-wrappers {
			.lines {
				width: 90%;
				margin: 0 auto;
				height: 1rpx;
				background-color: #eee;
			}
		}
		
		.no-more {
			width: 100%;
			height: 80rpx;
			// background-color: pink;
		}
	}
	
	
}	
</style>
