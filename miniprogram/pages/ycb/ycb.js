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
  //轮播图
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'pages/ycb/ycb'
    }
  },
  data: {
    //搜索框
    inputShowed: false,
    inputVal: "",
    //轮播
    background: ['img-1', 'img-2', 'img-3', 'img-4'],
    //按钮默认颜色
    indicatorColor:'white',
    //按钮激活颜色
    indicatorActivecolor:'#C3D7DE',
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500
  },
  methods: {
      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function(options) {
        var list = [{
            name: "测试1",
            show: false,
            search: "测试1"
        }, {
            name: "测试2",
            show: false,
            search: "测试2"
        }]
        wx.setStorage({
            key: 'list',
            data: list
        })
        this.setData({
            list: list
        })
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
    
      /**
       * 生命周期函数--监听页面初次渲染完成
       */
      onReady:function() {
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: '#C0D3DB',
          animation: {
            duration: 200,
            timingFunc: 'easeIn'
          }
        })
      },

      /**
       * 生命周期函数--监听页面显示
       */
      onShow:function() {
        wx.hideTabBar({
            success: function() {
              console.log('success')  
              //app.onTabBar('user');
             }
        })
      },

      /**
       * 生命周期函数--监听页面隐藏
       */
      onHide:function() {

      },

  }
})