const app = getApp()

Page({
  data: {
  },
  /*
  show() {
    if(typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setDat({
          activeIndex:1
        })
      }
  },*/
  onLoad: function (options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }

    console.group('数据库"实时数据推送"文档')
    console.log('https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database/realtime.html')
    console.groupEnd()
  },
})
Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
    }
  }
})