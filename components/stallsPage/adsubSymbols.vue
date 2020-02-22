<template>
	<div class="adsub-symbols">
		<!-- 给减号设置动画，利用微信提供的函数 -->
		<div :animation="ani" class="subtract-btn" @click.stop="subBtn"></div>
		<p class="goods-num">{{goodsNum===0?'':goodsNum}}</p>
		<div class="add-btn" @click.stop="addBtn"></div>
		
	</div>
</template>

<script>
// 拿到vuex中的函数
import {mapGetters, mapMutations} from 'vuex'
export default {
	data() {
		return {
			// 模拟商品个数
			goodsNum: 0,
			
			// 减号是否显示
			subtractNtn: false,
			
			
			// 设置减号动画
			ani: {},
			
			// animation 对象
			animation: {}
		}
	},
	mounted() {
		
		// 此时拿到了这个动画函数，在减号的DIV上 给  :animation="ani" 属性就行
		// 然后看文档操作 https://uniapp.dcloud.io/api/ui/animation?id=createanimation
		this.animation = new uni.createAnimation({
			duration : 200,	// number 	400 	否 	动画持续时间，单位 ms
			timingFunction : 'linear',	// string 	'linear' 	否 	动画的效果
			delay : 0,	// number 	0 	否 	动画延迟时间，单位 ms
			transformOrigin: '50% 50%', // string 	'50% 50% 0' 	否
		})
		
	},
	methods: {
		// 点击加号
		// 如果当前商品个数不为0，显示减号
		addBtn(e){
			
			// 模拟商品个数
			this.goodsNum += 1
			
			
			console.log(e)
			
			
			
			// 获取当前点击的位置
			let x = e.detail.x
			let y = e.detail.y
			console.log('x轴 => '+ x)
			console.log('y轴 => '+ y)
			
			
			// 因为层级太多了，所以直接用store传递
			// 功能1，小球动画
			// 点击加号的时候，将XY坐标传给购物车bar，购物车bar先设置好几个固定的小球隐藏起来
			this.setballXY({x, y})
			console.log(this.store_ballXY)
			
			// 功能2，点击加号，购物车红点膨胀一下
			// 暂时模拟购物车加入，购物车这个红点应该监听store中的该商家的商品的个数的，但是没有数据，就模拟一下
			this.testAdd()
			console.log('购物车=>'+this.store_ttt)
			
			
		},
		// 点击减号
		// 点击减号：如果当前商品个数为0，隐藏减号
		subBtn(){
			// 模拟商品个数
			if(this.goodsNum!==0){
				this.goodsNum -= 1
				this.testSub()
				console.log('购物车=>'+this.store_ttt)
			}
		},
		...mapMutations({
		        // 这里映射了这个方法，那么在调用x的时候，就等于使用了this.$store.commit('SET_SINGER', value)这个方法；
		        setballXY: 'setballXY',
				testAdd: 'testAdd',
				testSub: 'testSub'
		})
	},
	watch: {
		// 这里暂时先用 goodsNum 代替，等有数据了，肯定要监听store中的该商品的个数
		goodsNum(newVal) {
			// 监听当前的商品个数,实现减号动画
			// vue的<transition> 标签好像不好用，而且微信提供了设置动画的函数
			// https://developers.weixin.qq.com/miniprogram/dev/api/ui/animation/wx.createAnimation.html
			// uniapp就是直接拿到这个微信的函数一模一样的东西，但是uniapp有用例，所看↓这个文档
			// 然后看文档操作 https://uniapp.dcloud.io/api/ui/animation?id=createanimation
			if(newVal<=0) {
				console.log('隐藏减号')
				this.subtractNtn = false
				
				// 顺序不要搞乱
				this.animation.opacity(0).translateX(0).rotate(0).step()
				this.ani = this.animation.export()
				
			}else if(newVal>=1 && !this.subtractNtn) {
				console.log('显示减号')
				this.subtractNtn = true
				
				// 顺序不要搞乱
				this.animation.opacity(1).translateX(-50).rotate(-360).step()
				this.ani = this.animation.export()
				
			} 
		}
	},
		computed: {
			// vuex提供的辅助函数，拿到store/getters.js向外暴露的内容；
			...mapGetters([
				'store_ballXY',
				'store_ttt'
			])
		}
}	
</script>

<style lang="stylus">
.adsub-symbols {
	position: relative;
	width: 140rpx;
	height: 40rpx;
	.goods-num {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		height: 100%;
		width: 60rpx;
		font-size: 30rpx;
		color: #999;
		line-height: 40rpx;
		text-align: center;
		z-index: 1;
	}
	.add-btn, .subtract-btn {
		position: absolute;
		width: 40rpx;
		height: 40rpx;
		border-radius: 50rpx;
		background-position: center;
		background-size: 100%;
		background-repeat: no-repeat;
	}
	.add-btn {
		right: 0;
		background-image: url('../../common/images/stalls/icon-add.png')
		z-index: 10;
	}
	// 这里的减号也先在加号下边,当显示的时候,这个减号滚动到左边
	.subtract-btn {
		right: 0;
		background-image: url('../../common/images/stalls/icon-sub.png')
		z-index: 5;
	}
	
	
	
}	
</style>
