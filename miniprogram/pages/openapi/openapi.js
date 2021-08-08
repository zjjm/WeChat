
const app = getApp()

Page({
})

Component({
  data: {
    avatarUrl: '',
    userInfo: {},
    hasUserInfo: false,
    logged: false,
    takeSession: false,
    requestResult: '',
    //弹窗部分
    dialogShow: false,
    showSuccessDialog: false,
    showFailDialog: false,
    oneButton: [{text: '确定'}],

    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') // 如需尝试获取用户信息可改为false
  },
  methods:{
    onLoad: function() {
      if (wx.getUserProfile) {
        this.setData({
          canIUseGetUserProfile: true,
        })
      }
    },
    getUserProfile() {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          this.setData({
            avatarUrl: res.userInfo.avatarUrl,
            userInfo: res.userInfo,
            hasUserInfo: true,
          })
        }
      })
    },
    onGetUserInfo: function(e) {
      if (!this.data.logged && e.detail.userInfo) {
        this.setData({
          logged: true,
          avatarUrl: e.detail.userInfo.avatarUrl,
          userInfo: e.detail.userInfo,
          hasUserInfo: true,
        })
      }
    },
    //登录成功弹窗
    SuccessDialog(e) {
        this.setData({
            dialogShow: false,
            showSuccessDialog: false
        })
        wx.switchTab({
          url: '../ycb/ycb',
        })
    },
    //登录失败弹窗
    FailDialog(e) {
      this.setData({
          dialogShow: false,
          showFailDialog: false
      })
      wx.switchTab({
        url: '../ycb/ycb',
      })
    },
    onGetOpenid: function() {
      // 调用云函数
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          console.log('[云函数] [login] user openid: ', res.result.openid)
          app.globalData.openid = res.result.openid
          this.setData({
            showSuccessDialog: true
          })
        },
        fail: err => {
          console.error('[云函数] [login] 调用失败', err)
          this.setData({
            showFailDialog: true
          })
        }
      })
    },
  },
  
  pageLifetimes: {
    //导航栏指定
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 2
        })
      }
    }
  }
})