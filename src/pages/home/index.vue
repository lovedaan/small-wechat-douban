<template>
  <div class="home">
      <!-- 轮播图 -->
      <swiper class="home-banner" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular">
        <block v-for="(item, index) of bannerList" :key="index">
          <swiper-item class="swiper-item">
            <image :src="item.images.large" mode="aspectFill" class="slide-image" />
          </swiper-item>
        </block>
      </swiper>
      <!-- 正在上映 -->
      <movieItem v-for="(item, index) in data" :key="index" :title="titleArray[index]" :data="item.data.list" />
  </div>
</template>

<script>
import {request, setStorage, getStorage} from '@/utils/index.js';
import movieItem from '@/components/movie-item.vue';
export default {
  components: {
    movieItem
  },

  data () {
    return {
      bannerList: [],
      indicatorDots: true,
      circular: true,
      autoplay: false,
      interval: 5000,
      duration: 1000,
      data: [],
      titleArray: [{
        title: '正在热映',
        type: 'in_theaters'
      },{
        title: '即将上映',
        type: 'coming_soon'
      },{
        title: 'top250',
        type: 'top250'
      },{
        title: '北美票房榜',
        type: 'us_box'
      }]
    }
  },
  methods: {
    fetchMovieData(type) {
       return request({
         url: type,
         data: {
          start: 0,
          count: 15
         }
       });
    }
  },
  created () {
    /*this.fetchMovieData('us_box').then(res => {
      console.log(res);
    })*/
    let movieList = getStorage('movieList');
    if(!movieList){
        Promise.all([this.fetchMovieData('in_theaters'), this.fetchMovieData('coming_soon'), this.fetchMovieData('top250'), this.fetchMovieData('us_box')]).then(res => {
          this.bannerList =res[0].data.list.slice(0,8);
          let movies = res.slice();
          movies[3].data.list = movies[3].data.list.map(item => {
            return item.subject;
          });
          this.data = movies;
          setStorage('movieList',movies);
      });
    }else{
      this.bannerList =movieList[0].data.list.slice(0,8);
      this.data = movieList.slice();
    }

  }
}
</script>

<style lang="less">
    .home{
      height: 100%;
      background:#F8F9FB;
        .home-banner{
            width: 100%;
            height: 400rpx;
            background:#fff;
            .swiper-item{
              width: 100%;
              height: 100%;
              .slide-image{
                width: 100%;
                height: 100%;
              }
            }
        }
    }
</style>
