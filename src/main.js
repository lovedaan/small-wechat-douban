import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    //  '^pages/home/main', '^pages/guide/main'
    pages: [ '^pages/guide/main'],
    window: {
      backgroundTextStyle: '#fff',
      navigationBarBackgroundColor: '#40586D',
      navigationBarTitleText: '豆瓣电影',
      navigationBarTextStyle: '#fff'
    },
    tabBar: {
      selectedColor: '#333',
      list: [
        {
          pagePath: 'pages/home/main',
          text: '主页',
          iconPath: '/static/images/board.png',
          selectedIconPath: '/static/images/board-actived.png'
        },
        {
          pagePath: 'pages/search/main',
          text: '搜索',
          iconPath: '/static/images/search.png',
          selectedIconPath: '/static/images/search-actived.png'
        },
        {
          pagePath: 'pages/profile/main',
          text: '我的',
          iconPath: '/static/images/profile.png',
          selectedIconPath: '/static/images/profile-actived.png'
        }
      ]
    }
  }
}
