<template>
	<div class="change-region">
		<ul>
			<li>
				<img class="food" src="../../common/images/index/food.png">
				<div>美食</div>
			</li>
			<li>
				<img src="../../common/images/index/market.png">
				<div>超市</div>
			</li>
			<li>
				<img src="../../common/images/index/drink.png">
				<div>甜点</div>
			</li>
			<li>
				<img src="../../common/images/index/fruits.png">
				<div>水果</div>
			</li>
		</ul>
	</div>
</template>

<script>
</script>

<style lang="stylus">
.change-region {
	width: 100%;
	height: 186rpx;
	padding: 30rpx 74rpx 38rpx;
	box-sizing: border-box;
	ul {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: space-between;
		li {
			width: 66rpx;
			height: 100%;
			position: relative;
			image {
				width: 66rpx;
				height: 66rpx;
			}
			.food {
				margin-top: 10rpx;
				width: 50rpx;
				height: 50rpx;
			}
			div {
				position: absolute;
				bottom: 0;
				text-align: center;
				font-size: 24rpx;
				color: #444;
			}
		}
	}
}	
</style>
