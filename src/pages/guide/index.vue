<template>
  <div class="container">
      <swiper class="bannerBox" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
        <block v-for="(item, index) of imgUrls" :key="index">
          <swiper-item class="swiper-item">
            <image :src="item.images.large" class="slide-image" />
             <button @click="bingTapGoPage" v-if="index===2" class="btn-layout">立即体验</button>
          </swiper-item>
        </block>
      </swiper>
  </div>
</template>

<script>
import {request, setStorage, getStorage} from '@/utils/index.js';
export default {
  components: {
  },

  data () {
    return {
      imgUrls: [],
      indicatorDots: true,
      autoplay: false,
      interval: 5000,
      duration: 1000
    }
  },
  methods: {
    bingTapGoPage() {
      wx.switchTab({
        url: '../home/main'
      })
    },
    fetchData() {
      request({
        url: 'coming_soon',
        data: {
          start: 0,
          count: 3
        }
      }).then(res => {
        this.imgUrls = res.data.list;
        setStorage('layoutList', res.data.list);
      })
    }
  },
  created () {
    let layoutList = getStorage('layoutList');
    if(!layoutList){
      this.fetchData();
    }else{
      this.imgUrls = layoutList;
    }
  }
}
</script>

<style lang="less">
  .bannerBox{
     position: fixed;
     left: 0;
     top: 0;
     width: 100%;
     height: 100%;
     .swiper-item{
        width: 100%;
        height: 100px;
        .slide-image{
          width: 100%;
          height: 100%;
        }
        .btn-layout{
          position: absolute;
          bottom: 200rpx;
          left: 50%;
          transform:translateX(-50%);
          border: none;
          border-radius:12rpx;
          width: 300rpx;
          height: 100rpx;
          line-height:100rpx;
          text-align: center;
          color:#fff;
          background:yellowgreen;
        }
     }
  }
</style>
