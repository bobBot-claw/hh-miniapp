Component({
  data: {
    selected: 0,
    list: [
      { pagePath: '/pages/index/index', text: '首页' },
      { pagePath: '/pages/exercise/list/list', text: '运动' },
      { pagePath: '/pages/meditation/list/list', text: '静养' },
      { pagePath: '/pages/profile/index/index', text: '我的' },
    ]
  },
  methods: {
    switchTab(e) {
      const idx = e.currentTarget.dataset.index
      const url = this.data.list[idx].pagePath
      wx.switchTab({ url })
    }
  }
})
