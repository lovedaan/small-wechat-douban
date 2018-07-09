<template>
  <div class="movie-details" v-if="list.year">
      <image :src="list.images && list.images.large" class="page-bg" />
      <div class="details-content">
          <div class="poster">
             <image :src="list.images && list.images.large" class="poster-bg" />
             <p>{{list.title}}（{{list.year}}）</p>
             <div class="info">
                <p>评分：{{list.rating && list.rating.average}}</p>
                <p>导演：<span v-if="list.directors" v-for="(d, index) in list.directors" :key="index">{{d.name}} </span></p>
                <p>主演：<span v-if="list.casts" v-for="(n, index) in list.casts" :key="index">{{n.name}} </span></p>
            </div>
          </div>
          <div class="summary">
             <div class="title">简介</div>
             <p>{{list.summary}}</p>
          </div>
      </div>
  </div>
</template>

<script>
import {request} from '@/utils';
export default {
  components: {
  },

  data () {
    return {
        id: '',
        list: {}
    }
  },
  methods: {
    fetchData() {
       request({
         url: 'subject/' + this.id
       }).then(res => {
         console.log(res);
         this.list = res.data.list;
       })
    }
  },
  created () {

  },
  onLoad(options) {
    this.id = options.id;
    console.log(this.id);
    this.list = {};
    this.fetchData();
  }
}
</script>

<style lang="less">
page{
  height: 100%;
}
  .movie-details{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .page-bg{
      width: 100%;
      height: 100%;
    }
    .details-content{
       position: absolute;
       left: 0;
       top: 0;
       width: 100%;
       height: 100%;
       overflow-y: scroll;
       background:rgba(255,255,255,0.7);
       padding:20rpx;
       box-sizing:border-box;
       .poster{
         text-align: center;
         padding: 20rpx 140rpx;
         .poster-bg{
           width: 100%;
           height: 600rpx;
         }
         p{
          color:#000;
          font-size:36rpx;
          padding: 10rpx 0;
         }
         .info{
           text-align: left;
           p{
             color:#888;
             font-size:28rpx;
             margin-bottom:25rpx;
           }
         }
       }
       .summary{
        padding: 30rpx;
         .title{
           color:#000;
           font-size:40rpx;
           margin-bottom:20rpx;
         }
         p{
           color:#888;
           font-size:22rpx;
           line-height:30rpx;
           text-indent:2em;
         }
       }
    }
  }
</style>
