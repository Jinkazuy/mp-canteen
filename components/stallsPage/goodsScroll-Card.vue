<template>
	<!-- 点击该卡片，该卡片调用父级传的函数，将该商品的ID传给父级 -->
	<div class="goods-card-item" @click="tapCard">
		<div class="goods-card-item-img-box">
			<img :src="goodsInfo.goodsImg">
		</div>
		<div class="goods-card-item-text-box">
			<p class="goods-card-item-text-box-goods-title nowrap">{{goodsInfo.footname}}</p>
			<p class="goods-card-item-text-box-goods-info nowrap">{{goodsInfo.goodsInfo}}</p>
			<p class="goods-card-item-text-box-sales-count">月售{{goodsInfo.goodsSaleCount}}份 </p>
			<p class="goods-card-item-text-box-sales-price">
				<span class="price">¥{{goodsInfo.price}}</span>
			</p>
			<!-- 加减号 -->
			<div class="add-sub-btn-box">
				<!-- 加减号组件，将食堂ID、档口ID、商品数据 -->
				<adsubSymbols :canteenID="canteenID" :stallID="stallID" :goodsInfo="goodsInfo"></adsubSymbols>
			</div>
		</div>
	</div>
</template>

<script>
import adsubSymbols from '@/components/stallsPage/adsubSymbols.vue'	
import {mapGetters} from 'vuex'
export default {
	props: {
		// boothNum: "2"
		// canteenNum: "1"
		// createTime: "2020-02-05 00:00:00"
		// footname: "麻辣香锅"
		// id: "2"
		// price: "15.0"
		// shelve: "1"
		// stock: "99"
		goodsInfo: {
			type: Object,
			default() {
				return {}
			}
		},
		// 餐厅ID
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
	},
	data () {
		return {
			
		}
	},
	methods: {
		tapCard() {
			// TODO 将该商品ID传给父级，也就是滚动列表组件
			// 父级传过来的函数名 ckGoodsCard
			// 因为这里是为了打开商品详情的浮层的，但是这里的 this.goodsInfo 不是购物车的数据，而是通过HTTP请求过来的商品数据
			// 所以还得计算一下，这个商品在购物车中的数量
				
			let gsCount = 0
			if(this.store_userGoodsCarDatas.length>0) {
				for(let i=0; i<this.store_userGoodsCarDatas.length; i++) {
					if(this.store_userGoodsCarDatas[i].canteenId == this.canteenID) {
						
						for(let j=0; j<this.store_userGoodsCarDatas[i].stalls.length; j++) {
							
							if(this.store_userGoodsCarDatas[i].stalls[j].stallsId == this.stallID) {
								// gsCount = this.store_userGoodsCarDatas[i].stalls[j]
								for(let k=0; k<this.store_userGoodsCarDatas[i].stalls[j].goodsList.length; k++) {
									// 此时的 this.store_userGoodsCarDatas[i].stalls[j].goodsList[k].goodsId 是购物车中，该商品的数据的id
									// this.goodsInfo.id取得是HTTP获取数据来的，该商品的数据的id
									if(this.store_userGoodsCarDatas[i].stalls[j].goodsList[k].goodsId == this.goodsInfo.id) {
										// 找到了该商品，那么就把该商品的总数记录，然后返回
										gsCount = this.store_userGoodsCarDatas[i].stalls[j].goodsList[k].count
										this.$emit('ckgoods', this.goodsInfo, gsCount)
										return
									}
									
								}
								
								this.$emit('ckgoods', this.goodsInfo, gsCount)
								return
							}
							
							
						}
						this.$emit('ckgoods', this.goodsInfo, gsCount)
						return
					}
				}
			}
			this.$emit('ckgoods', this.goodsInfo, gsCount)
			
		}
	},
	components: {
		adsubSymbols
	},
	computed: {
		// vuex提供的辅助函数，拿到store/getters.js向外暴露的内容；
		...mapGetters([
			'store_userGoodsCarDatas' // 用户所有的购物车数据
		])
	}
}	
</script>
<style lang="stylus">
	.goods-card-item {
		position: relative;
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
