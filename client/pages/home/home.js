// pages/home/home.js — 慢慢变好 v0.7.1
const { getCurrentAction, getTomorrowAction } = require('../../utils/actions')

Page({
  data: {
    actionTitle: '',
    actionSub: '',
    ctaText: '开始',
    revealed: false,
    tomorrowHint: '',
    hasEgg: false,
    blurSrc: '',
    clearSrc: '',
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
      // 胶囊底部 + 间距 12px 作为按钮区域顶部
      const topBarTop = menu.bottom + 12
      // 右侧与胶囊右对齐
      const topBarRight = menu.right - menu.left > 0
        ? (wx.getSystemInfoSync().windowWidth - menu.right)
        : 16
      this.setData({ topBarTop, topBarRight })
    } catch (e) {
      // 降级：用状态栏高度推算
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

    this.setData({
      actionTitle: action.title,
      actionSub: action.subtitle,
      ctaText: revealed ? '看看世界' : '开始',
      revealed,
      tomorrowHint: tomorrow ? `明天是：${tomorrow.title}` : '',
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

  resetDay() {
    const app = getApp()
    app.saveAppState({ lastRevealDate: '', currentWorld: 'forest' })
    this.refresh()
  },
})
