
const baseURL = 'https://noyg2dnb.qcloud.la/weapp/';

function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function request(opts) {
    return new Promise((resolve, reject) => {
        let isLoading = opts.isLoading === false ? false : true;
        if(isLoading){
            wx.showLoading({
              title: '加载中...',
              mask: true
          });
        }

        wx.request({
            url: baseURL + opts.url,
            method: opts.type || 'get',
            data: opts.data,
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function(res) {
                resolve(res.data);
                if(isLoading){
                  wx.hideLoading();
                }
            },
            fail: function (err) {
                reject(err);
                if(isLoading){
                  wx.hideLoading();
                }
            }
        })
    })
}

export function setStorage (key,data) {
   let time = new Date().getTime();
   let DATA = {
     time,
     data
   };
   wx.setStorageSync(key,DATA);
}

export function getStorage (key) {
   let data = wx.getStorageSync(key);
   if(data){
      let nowTime = new Date().getTime();
      //大于一小时就失效了
      if(nowTime - data.time > 3600000){
        return false;
      }else{
        return data.data;
      }
   }else{
     return false;
   }
}

export default {
  formatNumber,
  formatTime,
  request,
  setStorage,
  getStorage,
  baseURL
}
