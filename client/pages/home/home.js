// pages/home/home.js — 慢慢变好 v0.7 demo 风格
const { getCurrentAction, getTomorrowAction } = require('../../utils/actions')

Page({
  data: {
    actionTitle: '',
    actionSub: '',
    ctaText: '开 始',
    revealed: false,
    eggUrl: '/assets/eggs/warm/blur_01.png',
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
      this.setData({
        topBarTop: menu.bottom + 12,
        topBarRight: wx.getSystemInfoSync().windowWidth - menu.right
      })
    } catch (e) {
      try {
        this.setData({ topBarTop: wx.getSystemInfoSync().statusBarHeight + 56, topBarRight: 16 })
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

    // demo 风格：标题字间距用空格
    const actionTitle = this.spaceText(action.title || '今 天 见 光')
    const actionSub = this.spaceText(action.subtitle || '走 到 窗 边 · 让 光 进 来')

    this.setData({
      actionTitle,
      actionSub,
      ctaText: revealed ? '看 世 界' : '开 始',
      revealed,
      eggUrl: '/assets/eggs/warm/blur_01.png',
    })
  },

  // 给文字加空格（demo 风格的 letter-spacing 视觉效果）
  spaceText(str) {
    if (!str) return ''
    // 如果已经有空格就不重复加
    if (str.includes(' ')) return str
    return str.split('').join(' ')
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
