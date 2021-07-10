//index.js
const app = getApp()
 
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
  },
  data: {
    //搜索框
    inputShowed: false,
    inputVal: ""
  },
  methods: {
      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function() {
        this.setData({
          search: this.search.bind(this)
        })
      },
      //搜索
      search: function (value) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([{text: '搜索结果', value: 1}, {text: '搜索结果2', value: 2}])
              }, 200)
          })
      },
      selectResult: function (e) {
          console.log('select result', e.detail)
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
