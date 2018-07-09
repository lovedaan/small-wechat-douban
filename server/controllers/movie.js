const rp = require('request-promise');

const baseURL = 'http://api.douban.com/v2/movie/';

const getMovie = async (start=0,count=10,type='top250') => {
    let data = await rp({
        uri: baseURL + type,
        qs: {
            start,
            count
        }
    });
    data = JSON.parse(data);
    return data;
}

//top250 接口
async function top250 (ctx, next) {
    const {start, count} = ctx.request.query;
    const data = await getMovie(start, count);
    ctx.state.data = {
        msg: '请求top250电影数据成功',
        list: data.subjects,
        total: data.total
    };
}

//正在热映 接口
async function inTheaters (ctx, next) {
    const {start, count} = ctx.request.query;
    const data = await getMovie(start, count, 'in_theaters');
    ctx.state.data = {
        msg: '请求正在热映电影数据成功',
        list: data.subjects,
        total: data.total
    };
}

//即将上映 接口
async function comingSoon (ctx, next) {
    const {start, count} = ctx.request.query;
    const data = await getMovie(start, count, 'coming_soon');
    ctx.state.data = {
        msg: '请求即将上映电影数据成功',
        list: data.subjects,
        total: data.total
    };
}

//北美票房 接口
async function usBox (ctx, next) {
    const data = await getMovie(null, null, 'us_box');
    ctx.state.data = {
        msg: '请求北美票房电影数据成功',
        list: data.subjects
    };
}

//电影详情 接口
async function subject (ctx, next) {
    const id = ctx.params.id;
    let data = await rp(`${baseURL}/subject/${id}`);
    data = JSON.parse(data);
    ctx.state.data = {
        msg: '请求电影详情数据成功',
        list: data
    };
}

//搜索 接口
async function search (ctx, next) {
    const {start, count, q} = ctx.request.query;
    const data = await getMovie(start, count, 'search?q=' + q);
    ctx.state.data = {
        msg: '搜索'+q+'电影数据成功',
        list: data.subjects,
        total: data.total
    };
}


module.exports = {
    top250,
    inTheaters,
    comingSoon,
    usBox,
    subject,
    search
}