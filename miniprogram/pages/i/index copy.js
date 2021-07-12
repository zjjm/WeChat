//index.js
const app = getApp()
 
Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  },
  data: {
    //搜索框
    inputShowed: false,
    inputVal: "",
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    hasUserInfo: false,
    logged: false,
    takeSession: false,
    requestResult: '',
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') // 如需尝试获取用户信息可改为false
  },
  methods: {
      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function() {
        this.setData({
          search: this.search.bind(this)
        })
        if (!wx.cloud) {
          wx.redirectTo({
            url: '../chooseLib/chooseLib',
          })
          return
        }
        if (wx.getUserProfile) {
          this.setData({
            canIUseGetUserProfile: true,
          })
        }
      },
      //键盘输入时实时调用搜索方法
  input(e) {
    // console.log(e)
    this.search(e.detail.value)
},
//点击完成按钮时触发
confirm(e) {
    this.search(e.detail.value)
},
search(key) {
    var that = this;
    //从本地缓存中异步获取指定 key 的内容
    var list = wx.getStorage({
        key: 'list',
        //从Storage中取出存储的数据
        success: function (res) {
            // console.log(res)
            if (key == '') { //用户没有输入时全部显示
                that.setData({
                    list: res.data
                })
                return;
            }
            var arr = []; //临时数组，用于存放匹配到的数组
            for (let i in res.data) {
                res.data[i].show = false; //所有数据隐藏
                if (res.data[i].search.indexOf(key) >= 0) {
                    res.data[i].show = true; //让匹配到的数据显示
                    arr.push(res.data[i])
                }
            }
            if (arr.length == 0) {
                that.setData({
                    list: [{
                        show: true,
                        name: '没有相关数据！'
                    }]
                })
            } else {
                that.setData({
                    list: arr
                })
            }
        },
    })
},
//搜索
/*
search: function (value) {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve([{text: '搜索结果', value: 1}, {text: '搜索结果2', value: 2}])
        }, 200)
    })
},*/
selectResult: function (e) {
    console.log('select result', e.detail)
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

onGetOpenid: function() {
  // 调用云函数
  wx.cloud.callFunction({
    name: 'login',
    data: {},
    success: res => {
      console.log('[云函数] [login] user openid: ', res.result.openid)
      app.globalData.openid = res.result.openid
      wx.navigateTo({
        url: '../userConsole/userConsole',
      })
    },
    fail: err => {
      console.error('[云函数] [login] 调用失败', err)
      wx.navigateTo({
        url: '../deployFunctions/deployFunctions',
      })
    }
  })
},

// 上传图片
doUpload: function () {
  // 选择图片
  wx.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: function (res) {
      wx.showLoading({
        title: '上传中',
      })

      const filePath = res.tempFilePaths[0]
      
      // 上传图片
      const cloudPath = `my-image${filePath.match(/\.[^.]+?$/)[0]}`
      wx.cloud.uploadFile({
        cloudPath,
        filePath,
        success: res => {
          console.log('[上传文件] 成功：', res)

          app.globalData.fileID = res.fileID
          app.globalData.cloudPath = cloudPath
          app.globalData.imagePath = filePath
          
          wx.navigateTo({
            url: '../storageConsole/storageConsole'
          })
        },
        fail: e => {
          console.error('[上传文件] 失败：', e)
          wx.showToast({
            icon: 'none',
            title: '上传失败',
          })
        },
        complete: () => {
          wx.hideLoading()
        }
      })
    },
    fail: e => {
      console.error(e)
    }
  })
},
      /**
       * 生命周期函数--监听页面初次渲染完成
       */
      onReady:function() {

      },

      /**
       * 生命周期函数--监听页面显示
       */
      onShow:function() {

      },

      /**
       * 生命周期函数--监听页面隐藏
       */
      onHide:function() {

      },

  }
})