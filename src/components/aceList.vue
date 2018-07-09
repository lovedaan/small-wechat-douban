<template>
    <div class="movie-list">
        <p>组件</p>
    </div>
</template>
<script type="text/javascript">
     export default {
        name: 'movie-list',
        props: {
            data: {
                type: Object,
                default: {}
            }
        },
        methods: {

        }
     }
</script>
<style type="text/css" lang="less">
    .movie-list{

    }
</style>