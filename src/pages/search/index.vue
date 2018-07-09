<template>
  <div class="search">
      <div class="search-bar">
          <input type="text" placeholder="请在此输入搜素内容" class="search-text" confirm-type="搜索" focus="true" @confirm="enterFetch" />
      </div>
      <div class="seach-result">
          <div class="scroll-content">
              <div class="search-item" v-for="(item, index) in list" :key="index" @click="goDetailPage(item.id)">
                 <div class="left"><img :src="item.images.large" mode="aspectFill" alt="" /></div>
                 <div class="right">
                    <p class="title">{{item.title}}</p>
                    <p>{{item.original_title}}({{item.year}})</p>
                    <p class="directors">导演：<span v-for="(d,idx) in item.directors" :key="idx">{{d.name}} </span></p>
                 </div>
                 <p class="average">{{item.rating.average}}</p>
              </div>

              <div class="search-tips">
                 <div class="loading" v-if="isEnd">
                    <img src="/static/images/loading.gif" alt="" />
                    <span>玩命加载中...</span>
                 </div>
                 <p v-else>没有更多内容了</p>
              </div>
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
      isEnd: false,
      page: 1,
      list: [],
      searchText: ''
    }
  },

  created () {

  },
  methods: {
    enterFetch(e) {
      console.log(e.target.value);
      this.searchText = e.target.value;
      this.isEnd = true;
      request({
        url: 'search',
        isLoading:false,
        data: {
          start: 0,
          count: 10,
          q: e.target.value
        }
      }).then(res => {
        console.log(res);
        this.list = res.data.list;
      })
    },
    goDetailPage(id) {
      const url = '../details/main?id=' + id;
      wx.navigateTo({ url });
    },
    moreData() {
      if(!this.isEnd){
        return;
      }
      let start = (this.page - 1) * 10;
      request({
        url: 'search',
        isLoading:false,
        data: {
          start,
          count: 10,
          q: this.searchText
        }
      }).then(res => {
        console.log(res);
        if(res.data.list.length){
          this.list = this.list.concat(res.data.list);
        }else{
           this.isEnd = false;
        }
      })
    }
  },
  onReachBottom() {
    console.log('滚动到底部了');
    this.isEnd = true;
    this.page++;
    this.moreData();
  }
}
</script>

<style lang="less">
 page{
  height: 100%;
 }
  .search{
    width: 100%;
    height: 100%;
    background:#fff;
    .search-bar{
      padding: 0 100rpx;
      border-bottom: 1px solid #ccc;
       .search-text{
         color:#666666;
         font-size:28rpx;
         border:none;
         width: 100%;
         height: 90rpx;
         line-height:90rpx;
       }
    }
    .seach-result{
      width: 100%;
      height: 100%;
      .scroll-content{
        width: 100%;
        height: 100%;
        .search-item{
          padding:20rpx;
          border-bottom: 1px solid #ccc;
          display: flex;
          position: relative;
          .left{
            flex: 0 0 200rpx;
            width: 200rpx;
            margin-right:20rpx;
            img{
              width: 200rpx;
              height: 300rpx;
            }
          }
          .right{
            flex:1;
            overflow: hidden;
            p{
               font-size: 28rpx;
               color:#c1c1c1;
               width: 100%;
               overflow: hidden;
               text-overflow:ellipsis;
               white-space: nowrap;
               margin-bottom:30rpx;
            }
            .title{
              font-size:40rpx;
              color:#000;
              padding: 10rpx 0;
            }
            .directors{
              color:#9D9D9D;
              font-size:32rpx;
            }
          }
          .average{
            position: absolute;
            right: 30rpx;
            background:#F76E59;
            color:#fff;
            text-align: center;
            padding: 10rpx 15rpx;
            border-radius:50rpx;
            font-size:24rpx;
            top:30rpx;
          }
        }
      }
    }
    .search-tips{
      padding: 25rpx 0 15rpx;
      .loading{
        padding: 10rpx 0;
        text-align: center;
        img{
          width: 50rpx;
          height: 50rpx;
          margin-right:20rpx;
          vertical-align:middle;
        }
        span{
          font-size:24rpx;
          color:#ccc;
          vertical-align:middle;
        }
      }
      p{
        text-align: center;
        font-size: 24rpx;
        color:#ccc;
      }
    }
  }
</style>
