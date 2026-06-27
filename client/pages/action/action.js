// pages/action/action.js — 行动中：倒计时+步骤引导
const { ACTIONS, getCurrentAction, getActionByTime } = require('../../utils/actions')

Page({
  data: {
    action: {},
    progress: 0,
    currentStep: 0,
    eggBlurUrl: '',
    totalSeconds: 120,
    elapsedSeconds: 0,
  },

  _timer: null,

  onLoad(options) {
    // 获取当前行动
    const action = getCurrentAction()
    const totalSeconds = action.duration || 120

    // 彩蛋模糊图
    let state = {}
    try { state = wx.getStorageSync('appState') || {} } catch(e) {}
    const worldId = state.currentWorld || 'forest'

    this.setData({
      action,
      totalSeconds,
      eggBlurUrl: `/assets/eggs/${worldId}/blur_01.png`,
    })

    this.startCountdown()
  },

  onUnload() {
    if (this._timer) {
      clearInterval(this._timer)
      this._timer = null
    }
  },

  startCountdown() {
    const total = this.data.totalSeconds
    const steps = this.data.action.steps || []
    const stepInterval = steps.length > 0 ? Math.floor(total / steps.length) : total

    this._timer = setInterval(() => {
      const elapsed = this.data.elapsedSeconds + 1
      const progress = Math.min((elapsed / total) * 100, 100)
      const currentStep = Math.min(Math.floor(elapsed / stepInterval), steps.length - 1)

      this.setData({ elapsedSeconds: elapsed, progress, currentStep })

      if (elapsed >= total) {
        clearInterval(this._timer)
        this._timer = null
        // 跳转揭示页
        setTimeout(() => {
          wx.redirectTo({ url: '/pages/done/done' })
        }, 300)
      }
    }, 1000)
  },

  endEarly() {
    if (this._timer) {
      clearInterval(this._timer)
      this._timer = null
    }
    wx.navigateBack()
  },

  goBack() {
    this.endEarly()
  },
})
