<template>
	<!-- 点击该卡片，该卡片调用父级传的函数，将该商品的ID传给父级 -->
	<div class="goods-card-item" @click="tapCard">
		<div class="goods-card-item-img-box">
			<img :src="goodsInfo.goodsImg">
		</div>
		<div class="goods-card-item-text-box">
			<p class="goods-card-item-text-box-goods-title nowrap">{{goodsInfo.goodsTitle}}</p>
			<p class="goods-card-item-text-box-goods-info nowrap">{{goodsInfo.goodsInfo}}</p>
			<p class="goods-card-item-text-box-sales-count">月售{{goodsInfo.goodsSaleCount}}份 </p>
			<p class="goods-card-item-text-box-sales-price">
				<span class="price">¥{{goodsInfo.goodsPrice}}</span>
			</p>
			<!-- 加减号 -->
			<div class="add-sub-btn-box">
				<!-- 加减号组件，需要将 商家(摊位、档口)的ID、 商品的ID传入 -->
				<adsubSymbols></adsubSymbols>
			</div>
		</div>
	</div>
</template>

<script>
import adsubSymbols from '@/components/stallsPage/adsubSymbols.vue'	
export default {
	props: {
		goodsInfo: {
			type: Object,
			default() {
				return {}
			}
		}
	},
	data () {
		return {
			
		}
	},
	methods: {
		tapCard() {
			// TODO 将该商品ID传给父级，也就是滚动列表组件
			// 父级传过来的函数名 ckGoodsCard
			this.$emit('ckgoods', this.goodsInfo)
			
		}
	},
	components: {
		adsubSymbols
	}
}	
</script>
<style lang="stylus">
	.goods-card-item {
		display: flex;
		align-items: center;
		width: 100%;
		height: 230rpx;
		padding: 0 20rpx 0;
		box-sizing: border-box;
		background-color: #fff;
		.goods-card-item-img-box {
			width: 170rpx;
			height: 170rpx;
			margin-right: 20rpx;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.goods-card-item-text-box {
			position: relative;
			width: 64%;
			height: 170rpx;
			line-height: 1;
			.goods-card-item-text-box-goods-title {
				font-size: 30rpx;
				color: #666;
				font-weight: 700;
				margin: 18rpx 0;
			}
			.goods-card-item-text-box-goods-info {
				font-size: 20rpx;
				color: #999;
				margin-bottom: 14rpx;
			}
			.goods-card-item-text-box-sales-count {
				font-size: 20rpx;
				color: #999;
				margin-bottom: 18rpx;
			}
			.goods-card-item-text-box-sales-price {
				height: 40rpx;
				.price {
					line-height: 40rpx;
					color: #FC5858;
					font-size: 24rpx;
				}
			}
			.add-sub-btn-box {
				position: absolute;
				right: 0;
				bottom: 0;
				width: 140rpx;
				height: 40rpx;
			}
		}
	}
</style>
