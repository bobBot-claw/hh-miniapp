// pages/home/home.js — 慢慢变好 v0.7
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
  },

  onLoad() {
    this.refresh()
  },

  onShow() {
    this.refresh()
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
