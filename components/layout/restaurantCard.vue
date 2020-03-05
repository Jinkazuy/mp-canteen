<template>
	<div class="card-box">
		<div class="canteen-card-wrapper" v-for="(item, index) in canteenList" :key="index" @click="opencanteenInfoPage(item.canteenlistId)">
			<div class="canteen-card-info">
				<!-- 图片 -->
				<!-- <div class="canteen-pic" v-if="item.pic!==''&&item.pic!==undefined&&item.pic!==null">
					<img :src="item.pic">
				</div> -->
				<!-- 文字组 -->
				<div class="canteen-card-text-group">
					<div class="canteen-card-text-group-title">{{item.canteenName}}</div>
					<div class="canteen-card-text-group-score">
						<!-- <star :scoreNum="item.score"></star> -->
						<!-- <div class="score-number">{{item.score%1===0?item.score+'.0':item.score}}</div> -->
						<!-- <div class="score-count">月销{{item.saleCount}}</div> -->
					</div>
					<!-- 标签 -->
					<ul class="label" v-if="item.remark.length">
						<li v-for="(itm,idx) in item.remark" :key="idx" v-if="itm!==''">{{itm}}</li>
					</ul>
					<div class="distance" v-if="store_userLocalInfo === -1">未获取您的位置</div>
					<div class="distance" v-if="store_userLocalInfo !== -1">距离&nbsp;
						<!-- {{parseInt(item.distance)+'Km'}} -->
						{{
							item.distance>5?
								'大于5Km'
								:item.distance>1?
									parseInt(item.distance)+' Km'
									:parseInt(item.distance*1000)>10?parseInt(item.distance*1000)+' m':'小于10m'
						}}
					</div>
				</div>
			</div>
			<!-- 分割线 -->
			<div class="space-one"></div>
		</div>
	</div>
</template>

<script>
// 星星组件
import star from '@/components/layout/star.vue'	

// canteenAddress: "天安门北边"
// canteenName: "西雁翅楼"
// canteenNum: "A0012"
// concatWay: "15132582590"
// createTime: "2020-02-17 16:34:43"
// dataSort: null
// districtId: 5
// districtName: null
// id: 2
// isDelete: 0
// latitude: "39.914668"
// longitude: "116.404557"
// remark: "好吃, 不贵"
// status: 0
// updateTime: "2020-02-18 09:19:36"

// latitude: 39.85856
// longitude: 116.28616

// 拿到vuex中的函数
import {mapGetters, mapMutations} from 'vuex'
export default {
	props: {},
	data () {
		return {
			// 星星评分
			scoreNum: 4.3,
			// 因为需要watch监听父级传过来canteenListData，所以要把所有的内容先赋值给本组件
			canteenList: []
		}
	},
	methods: {
		opencanteenInfoPage(id) {
			uni.navigateTo({
				// 跳转路径
				// 摊位列表页
				url: '../../pages/canteen-list-page/canteen-list-page?id='+id
			});
		},
		
		// 计算用户与餐厅的举例
		distance(la1, lo1, la2, lo2) {
		 
			let La1 = la1 * Math.PI / 180.0;
			 
			let La2 = la2 * Math.PI / 180.0;
			 
			let La3 = La1 - La2;
			 
			let Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
			 
			let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
			 
			s = s * 6378.137; //地球半径
			 
			s = Math.round(s * 10000) / 10000;
			 
			// 返回计算结果，单位是千米
			return s
			 
			// console.log("计算结果",s+'千米')
		 
		},
		
	},
	components: {
		star
	},
	watch: {
		// 这里监听vuex的餐厅列表数据
		// 如果数据有变化，那么就跟用户当前位置做对比
		store_homeCanteenList(nv) {
			this.canteenList = nv
			// console.log('用户位置')
			// console.log(this.userLocal.latitude, this.userLocal.longitude)
			// latitude: 39.85856
			// longitude: 116.28616
			
			// console.log(this.canteenList)
			// 判断一下是否拿到了用户的定位，
			if(this.store_userLocalInfo.latitude && this.store_userLocalInfo.longitude) {
				for (let i = 0; i<this.canteenList.length; i++) {
					
					// console.log('餐厅'+(i+1)+'的位置')
					// console.log(this.canteenList[i].latitude, this.canteenList[i].longitude)
					
					// 将用户位置、餐厅位置传入，计算举例
					let distance = this.distance(this.store_userLocalInfo.latitude, this.store_userLocalInfo.longitude, this.canteenList[i].latitude, this.canteenList[i].longitude)
					
					// 将计算结果添加到这个食堂对象中
					this.canteenList[i].distance = distance
					console.log('距离' + this.canteenList[i].distance)
				}
			}
		},
		
		// 这里监听用户位置的变化，如果用户位置有变化，那么也从新计算距离
		store_userLocalInfo(nv) {
			this.canteenList = this.store_homeCanteenList
			// console.log('用户位置')
			// console.log(this.userLocal.latitude, this.userLocal.longitude)
			// latitude: 39.85856
			// longitude: 116.28616
			
			// console.log(this.canteenList)
			// 判断一下是否拿到了用户的定位，
			if(nv.latitude && nv.longitude) {
				for (let i = 0; i<this.canteenList.length; i++) {
					
					// console.log('餐厅'+(i+1)+'的位置')
					// console.log(this.canteenList[i].latitude, this.canteenList[i].longitude)
					
					// 将用户位置、餐厅位置传入，计算举例
					let distance = this.distance(nv.latitude, nv.longitude, this.canteenList[i].latitude, this.canteenList[i].longitude)
					
					// 将计算结果添加到这个食堂对象中
					this.canteenList[i].distance = distance
					console.log('距离' + this.canteenList[i].distance)
				}
			}
		}
	},
	computed: {
		// vuex提供的辅助函数，拿到store/getters.js向外暴露的内容；
		...mapGetters([
			'store_homeCanteenList', // 餐厅列表
			'store_userLocalInfo' //用户位置
		])
	},
}
</script>

<style lang="stylus">
	.canteen-card-wrapper {
		width: 100%;
		.canteen-card-info {
			display: flex;
			padding: 30rpx;
			box-sizing: border-box;
			.canteen-pic {
				flex-basis: 130rpx;
				height: 130rpx;
				border: 1rpx solid #eee;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.canteen-card-text-group {
				position: relative;
				flex: 1;
				padding-left: 20rpx;
				box-sizing: border-box;
				.canteen-card-text-group-title {
					line-height: 1;
					color: #0F0808;
					font-size: 30rpx;
					font-weight: 700;
					margin-bottom: 12rpx;
				}
				.canteen-card-text-group-score {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					line-height: 1;
					margin-bottom: 36rpx;
					.score-number {
						font-size: 24rpx;
						color: #F46050;
						margin-right: 20rpx;
					}
					.score-count {
						font-size: 24rpx;
						color: #999;
					}
				}
				.label {
					display: flex;
					justify-content: flex-start;
					height: 30rpx;
					li {
						height: 100%;
						padding: 4rpx 20rpx;
						box-sizing: border-box;
						border-radius: 4rpx;
						border: 1px solid #a0a0a0;
						line-height: 1;
						margin-right: 10rpx;
						font-size: 20rpx;
						color: 999;
					}
				}
				.distance {
					position: absolute;
					right: 0;
					top: 0;
					font-size: 24rpx;
					color: #999;
				}
				
			}
		}
		.space-one {
			width: 100%;
			height: 1rpx;
			background-color: #eee;
		}
	}
</style>
