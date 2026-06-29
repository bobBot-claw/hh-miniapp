// pages/world/world.js — 渐进微调：与 demo 屏4 完全一致

Page({
  data: {
    weekNum: 1,
    sweatCount: 0,
    knowCount: 0,
    avgPerWeek: 0,
  },

  onLoad() { this.refresh() },
  onShow() { this.refresh() },

  refresh() {
    let state = {}
    try { state = wx.getStorageSync('appState') || {} } catch(e) {}

    const weekNum = state.weekNum || 1
    const weekDone = state.weekDone || []
    const knowCards = state.knowCards || []
    const sweatCount = weekDone.length
    const knowCount = knowCards.length
    const avgPerWeek = weekNum > 0 ? (sweatCount / weekNum).toFixed(1) : 0

    this.setData({ weekNum, sweatCount, knowCount, avgPerWeek })
  },

  goBack() {
    wx.navigateBack()
  },
})
