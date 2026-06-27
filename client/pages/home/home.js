// pages/home/home.js — 慢慢变好 v0.8
const { getCurrentAction, getTomorrowAction } = require('../../utils/actions')

Page({
  data: {
    actionTitle: '',
    actionSub: '',
    durationText: '',
    ctaText: '开始',
    revealed: false,
    tomorrowHint: '',
    hasEgg: false,
    // 右上角按钮位置（避开胶囊）
    topBarTop: 0,
    topBarRight: 0,
  },

  onLoad() {
    this.calcTopBar()
    this.refresh()
  },

  onShow() {
    this.refresh()
  },

  calcTopBar() {
    try {
      const menu = wx.getMenuButtonBoundingClientRect()
      const topBarTop = menu.bottom + 12
      const topBarRight = menu.right - menu.left > 0
        ? (wx.getSystemInfoSync().windowWidth - menu.right)
        : 16
      this.setData({ topBarTop, topBarRight })
    } catch (e) {
      try {
        const sys = wx.getSystemInfoSync()
        const topBarTop = sys.statusBarHeight + 44 + 12
        this.setData({ topBarTop, topBarRight: 16 })
      } catch (e2) {
        this.setData({ topBarTop: 100, topBarRight: 16 })
      }
    }
  },

  refresh() {
    const app = getApp()
    const state = app.globalData.appState || {}
    const today = new Date().toISOString().slice(0, 10)
    const revealed = state.lastRevealDate === today

    const action = getCurrentAction()
    const tomorrow = revealed ? getTomorrowAction() : null

    // 格式化时长
    const minutes = Math.floor(action.duration / 60)
    const seconds = action.duration % 60
    const durationText = seconds > 0 ? `${minutes} 分 ${seconds} 秒` : `${minutes} 分钟`

    this.setData({
      actionTitle: action.title,
      actionSub: action.subtitle,
      durationText,
      ctaText: revealed ? '看看世界' : '开始',
      revealed,
      tomorrowHint: tomorrow ? `明天：${tomorrow.title}` : '',
    })
  },

  startAction() {
    if (this.data.revealed) {
      wx.navigateTo({ url: '/pages/world/world' })
    } else {
      wx.navigateTo({ url: '/pages/action/action' })
    }
  },

  goWorld() {
    wx.navigateTo({ url: '/pages/world/world' })
  },

  goMood() {
    wx.navigateTo({ url: '/pages/mood/mood' })
  },

  goTogether() {
    wx.navigateTo({ url: '/pages/together/together' })
  },

  resetDay() {
    const app = getApp()
    app.saveAppState({ lastRevealDate: '', currentWorld: 'forest' })
    this.refresh()
  },
})
