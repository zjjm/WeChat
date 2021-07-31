Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    //导航栏
    list: [{
      //"text": "越唱吧",
      "pagePath": "/pages/ycb/ycb",
      "iconPath": "/images/ycb/tabbar/tabbar_icon_ycb_default.png",
      "selectedIconPath": "/images/ycb/tabbar/tabbar_icon_ycb_active.png",
        dot: true
      },
      {
        //"text": "越有味",
        "pagePath": "/pages/yyw/yyw",
        "iconPath": "/images/yyw/tabbar/tabbar_icon_yyw_default.png",
        "selectedIconPath": "/images/yyw/tabbar/tabbar_icon_yyw_active.png",
          dot: true
      },
      {
        //"text": "设置",
        "pagePath": "/pages/openapi/openapi",
        "iconPath": "/images/me/tabbar/tabbar_icon_me_default.png",
        "selectedIconPath": "/images/me/tabbar/tabbar_icon_me_active.png",
          dot: false
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      console.log(url)
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})