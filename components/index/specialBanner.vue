<template>
  <div class="banner-container">
    <swiper :style="{width: '100%', height: '100%'}" 
      :indicator-dots="swiperConfig.indicatorDots" 
      :indicator-color="swiperConfig.indicatorColor" 
      :indicator-active-color="swiperConfig.indicatorActiveColor"
      :autoplay="swiperConfig.autoplay" 
      :interval="swiperConfig.interval" 
      :duration="swiperConfig.duration" 
      :circular="swiperConfig.circular"
      :previous-margin="swiperConfig.previousMargin"
      :next-margin="swiperConfig.nextMargin"
      @change="swiperChange" 
      @animationfinish="animationfinish">
      <swiper-item v-for="(item, i) in bannerList" :key="i">
		<!-- 1.当前展示为第1项时，bannerList最后一项和第二项的justifyContent值分别为flex-end和flex-start，其余项值为center -->
		<!-- 2.当前展示为最后一项时，bannerList倒数第2项和第1项的justifyContent值分别为flex-end和flex-start，其余项值为center -->
		<!-- 3.当前展示为其他项（非第1和最后1项）时，bannerList当前项的前1项和后1项的justifyContent值分别为flex-end和flex-start，其余项值为center -->
		<!-- 4.padding值也需要根据不同项设定不同值，但理同justifyContent -->
        <div class="image-container" 
			:class="[curIndex===0?((i===listLen-1)?'item-left':(i===1?'item-right':'item-center')):(curIndex===listLen-1?(i===0?'item-right':(i===listLen-2?'item-left':'item-center')):(i===curIndex-1?'item-left':(i===curIndex+1?'item-right':'item-center')))]">
          <image :src="item.bannerImgUrl" 
            class="slide-image" 
            :style="{
              transform: curIndex===i?'scale(' + scaleX + ',' + scaleY + ')':'scale(1,1)',
              transitionDuration: '.3s',
              transitionTimingFunction: 'ease'
            }" 
            @click="openBannerDetail(item.id)"/>
        </div>
      </swiper-item>
    </swiper>
	<!-- 轮播点 -->
	<ul class='jk-lbd'>
		<li v-for="(item,index) in bannerList"
			:key="index"
			:class="jkLunBoDian===index?'jk-lbd-current':''">
		</li>
	</ul>
  </div>
</template>
<script>

	// 后台返回的banner数据结构
	// bannerImgUrl: "I/V/a255156c-215.jpg"
	// bannerJumpType: 0
	// bannerJumpUrl: ""
	// bannerType: 1
	// createTime: "1970-01-01 00:00:00"
	// dataSort: 0
	// description: "广告轮播图发布↵"
	// id: 1
	// isDelete: 0
	// sourceName: "15.jpg"
	// status: 1
	// updateTime: "2020-02-21 14:52:35"
	
export default {
  props: {
	bannerList: {
		type: Array,
		default () {
			return []
		}
	},
	swiperConfig: {
		type: Object,
		default () {
			return {
				indicatorDots: true,
				indicatorColor: 'rgba(255, 255, 255, .4)',
				indicatorActiveColor: 'rgba(255, 255, 255, 1)',
				autoplay: false,
				interval: 3000,
				duration: 300,
				circular: true,
				previousMargin: '58rpx', // 左右banner露出的尺寸
				nextMargin: '58rpx'
			}
		}
	},
	scaleX: {
		type: String,
		default: (634 / 550).toFixed(4)
	},
	scaleY: {
		type: String,
		default: (378 / 328).toFixed(4)
	}
  },
  computed:{
		listLen () {
			return this.bannerList.length
		}
  },
  data () {
    return {
      curIndex: 0,
      descIndex: 0,
      isDescAnimating: false,
	  // 轮播点修改
	  jkLunBoDian: 0
    }
  },
  methods: {
    swiperChange (e) {
	  this.jkLunBoDian = e.detail.current
      const that = this
      this.curIndex = e.mp.detail.current
      this.isDescAnimating = true
      let timer = setTimeout(function () {
        that.descIndex = e.mp.detail.current
        clearTimeout(timer)
      }, 150)
    },
    animationfinish (e) {
      this.isDescAnimating = false
    },
    openBannerDetail (id) {
			console.log(id)
			uni.navigateTo({
				  // 跳转路径
					url: '../../pages/banner-detail/banner-detail?id='+id
			});
    }
  }
}
</script>
<style lang="scss" scoped>
.banner-container {
  width: 100vw;
  height: 100%;
  .image-container {
		box-sizing: border-box;
		width: 100%;
		height: 200rpx;
		display: flex;
		.slide-image {
			width: 600rpx;
			height: 100%;
			z-index: 200;
		}
  }
  .item-left {
		justify-content: flex-end;
		padding: 20rpx 0rpx 0 0;
  }
  .item-right {
		justify-content: flex-start;
		padding: 20rpx 0 0 0rpx;
  }
  .item-center {
		justify-content: center;
		padding: 20rpx 0 0 0;
  }
  @keyframes descAnimation {
    0% {
      opacity: 1;
    }
    25% {
      opacity: .5;
    }
    50% {
      opacity: 0;
    }
    75% {
      opacity: .5;
    }
    100% {
      opacity: 1;
    }
  }
  @-webkit-keyframes descAnimation {
    0% {
      opacity: 1;
    }
    25% {
      opacity: .5;
    }
    50% {
      opacity: 0;
    }
    75% {
      opacity: .5;
    }
    100% {
      opacity: 1;
    }
  }
  .hideAndShowDesc {
    animation: descAnimation .3s ease 1;
    -webkit-animation: descAnimation .3s ease 1;
  }
}
.jk-lbd {
	margin: 0 auto;
	list-style: none;
	display: flex;
	justify-content: center;
	margin-top: 10rpx;
	li {
		display: inline-block;
		width: 20rpx;
		height: 4rpx;
		border-radius: 4rpx;
		background-color: #BFBFBF;
		margin-right: 12rpx;
	}
	li:last-of-type {
		margin-right: 0;
	}
	.jk-lbd-current {
		background-color: #0177BF;
	}
}
</style>
