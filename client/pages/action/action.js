// pages/action/action.js — 行动中：倒计时+步骤引导
const { getCurrentAction } = require('../../utils/actions')

const DEPTH_LABELS = {
  light: '随时可做',
  medium: '需要一点空间',
  deep: '需要躺下或靠墙',
}

Page({
  data: {
    action: {},
    progress: 0,
    currentStep: 0,
    eggBlurUrl: '',
    totalSeconds: 180,
    elapsedSeconds: 0,
    depthLabel: '',
    topLeftTop: 0,
    topLeftLeft: 0,
  },

  _timer: null,

  onLoad(options) {
    this.calcTopBar()

    const action = getCurrentAction()
    const totalSeconds = action.duration || 180

    // 彩蛋模糊图
    let state = {}
    try { state = wx.getStorageSync('appState') || {} } catch(e) {}
    const worldId = state.currentWorld || 'forest'

    // 兼容旧格式 steps（字符串数组）和新格式（对象数组）
    const steps = (action.steps || []).map(s => {
      if (typeof s === 'string') return { text: s, hint: '' }
      return s
    })

    this.setData({
      action: { ...action, steps },
      totalSeconds,
      eggBlurUrl: `/assets/eggs/${worldId}/blur_01.png`,
      depthLabel: DEPTH_LABELS[action.depth] || '',
    })

    this.startCountdown()
  },

  calcTopBar() {
    try {
      const menu = wx.getMenuButtonBoundingClientRect()
      const sys = wx.getSystemInfoSync()
      const topLeftTop = menu.bottom + 12
      const topLeftLeft = sys.windowWidth - menu.right
      this.setData({ topLeftTop, topLeftLeft })
    } catch (e) {
      try {
        const sys = wx.getSystemInfoSync()
        this.setData({ topLeftTop: sys.statusBarHeight + 44 + 12, topLeftLeft: 16 })
      } catch (e2) {
        this.setData({ topLeftTop: 100, topLeftLeft: 16 })
      }
    }
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
        setTimeout(() => {
          wx.redirectTo({ url: '/pages/done/done' })
        }, 500)
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
