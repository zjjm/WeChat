Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    //导航栏
    list: [{
      "text": "越唱吧",
      "pagePath": "/pages/ycb/ycb",
      "iconPath": "/images/toolbar/tabbar_icon_theatre_default.png",
      "selectedIconPath": "/images/toolbar/tabbar_icon_theatre_active.png",
        dot: true
      },
      {
        "text": "越有味",
        "pagePath": "/pages/yyw/yyw",
        "iconPath": "/images/toolbar/tabbar_icon_food_default.png",
        "selectedIconPath": "/images/toolbar/tabbar_icon_food_active.png",
          dot: true
      },
      {
        "text": "设置",
        "pagePath": "/pages/openapi/openapi",
        "iconPath": "/images/toolbar/tabbar_icon_setting_default.png",
        "selectedIconPath": "/images/toolbar/tabbar_icon_setting_active.png",
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