//app.js
App({
  onLaunch: function () {
    wx.loadFontFace({
        family: '方正字迹-海体正楷 简',
        global: true,
        source: 'url("https://music-0gtd2khj7f8707a2-1257133085.tcloudbaseapp.com/font/%E6%96%B9%E6%AD%A3%E5%AD%97%E8%BF%B9-%E6%B5%B7%E4%BD%93%E6%AD%A3%E6%A5%B7%20%E7%AE%80%20%E5%B8%B8%E8%A7%84.TTF")'
      })
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    this.globalData = {}
  }
})
