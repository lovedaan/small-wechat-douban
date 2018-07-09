<template>
    <div class="movieItem">
        <div class="movie-title">
            <span class="title-left">{{title.title}}</span>
            <span class="title-right" @click="bindGoMorePage">更多</span>
        </div>
        <scroll-view class="scrollBox" :scroll-x="lock" style="width: 100%">
            <div class="scroll-item" v-for="(item, index) in data" :key="index" @click="selectScrollItem(item.id)">
                <image :src="item.images.large" mode="aspectFill" />
                <p>{{item.title}}</p>
            </div>
        </scroll-view>
    </div>
</template>
<script type="text/javascript">
     export default {
        name: 'item',
        props: {
            title: {
                type: Object,
                default: {}
            },
            data: {
                type: Array,
                default: []
            },
            lock: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            selectScrollItem(id) {
                const url = '../details/main?id=' + id;
                wx.navigateTo({ url });
            },
            bindGoMorePage() {
                const url = '../list/main?type=' + this.title.type;
                wx.navigateTo({ url });
            }
        }
     }
</script>
<style type="text/css" lang="less">
    .movieItem{
        width: 100%;
        background:#fff;
        margin-top:30rpx;
        padding:20rpx;
        .movie-title{
            height: 80rpx;
            position: relative;
            span{
                position: absolute;
                top: 0;
                height: 60rpx;
                line-height:60rpx;
                font-size:30rpx;
            }
            .title-left{
                left: 0;
            }
            .title-right{
                width: 80rpx;
                right: 20rpx;
            }
        }
        .scrollBox{
            white-space: nowrap;
            .scroll-item{
                display:inline-block;
                width: 200rpx;
                margin-right:30rpx;
                image{
                    width: 100%;
                    height: 280rpx;
                }
                p{
                    width: 100%;
                    font-size:26rpx;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
</style>