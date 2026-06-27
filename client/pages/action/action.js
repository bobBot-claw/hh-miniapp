// pages/action/action.js — 行动中：倒计时+步骤引导（v0.8 共练版）
const { ACTIONS, getCurrentAction } = require('../../utils/actions')

const DEPTH_LABELS = {
  light: '随时可做',
  medium: '需要一点空间',
  deep: '需要躺下或靠墙',
}

const PHASE_TEXT = {
  warmup: '热身',
  work: '训练',
  rest: '间歇',
  cooldown: '放松',
}

Page({
  data: {
    action: {},
    progress: 0,
    currentStep: 0,
    currentPhase: 'warmup',
    phaseText: '热身',
    eggBlurUrl: '',
    totalSeconds: 180,
    elapsedSeconds: 0,
    depthLabel: '',
    topLeftTop: 0,
    topLeftLeft: 0,
    // 共练模式
    together: false,
    partnerReady: false,
    // 3秒倒计时
    countdown: 0,
    countingDown: false,
  },

  _timer: null,

  onLoad(options) {
    this.calcTopBar()

    // 支持从共练页面进入：指定 actionId
    let action
    if (options.actionId && ACTIONS[options.actionId]) {
      action = ACTIONS[options.actionId]
    } else {
      action = getCurrentAction()
    }

    const together = options.together === '1'
    const totalSeconds = action.duration || 180

    // 彩蛋模糊图
    let state = {}
    try { state = wx.getStorageSync('appState') || {} } catch(e) {}
    const worldId = state.currentWorld || 'forest'

    // 兼容旧格式 steps
    const steps = (action.steps || []).map(s => {
      if (typeof s === 'string') return { text: s, hint: '', phase: 'work' }
      return { phase: 'work', hint: '', ...s }
    })

    const firstPhase = steps.length > 0 ? steps[0].phase : 'warmup'

    this.setData({
      action: { ...action, steps },
      totalSeconds,
      eggBlurUrl: `/assets/eggs/${worldId}/blur_01.png`,
      depthLabel: DEPTH_LABELS[action.depth] || '',
      currentPhase: firstPhase,
      phaseText: PHASE_TEXT[firstPhase] || '训练',
      together,
    })

    if (together) {
      // 共练模式：3-2-1 倒计时后开始
      this.startTogetherCountdown()
    } else {
      this.startCountdown()
    }
  },

  // 共练 3-2-1 倒计时
  startTogetherCountdown() {
    this.setData({ countingDown: true, countdown: 3 })
    let count = 3
    const cd = setInterval(() => {
      count--
      if (count <= 0) {
        clearInterval(cd)
        this.setData({ countingDown: false, partnerReady: true })
        this.startCountdown()
      } else {
        this.setData({ countdown: count })
      }
    }, 1000)
  },

  // 分享给好友一起练
  onShareAppMessage() {
    const action = this.data.action
    return {
      title: `一起做${action.title || '这个行动'}？`,
      path: `/pages/together/together?actionId=${action.id}`,
    }
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
      const currentPhase = steps[currentStep] ? steps[currentStep].phase : 'work'

      this.setData({
        elapsedSeconds: elapsed,
        progress,
        currentStep,
        currentPhase,
        phaseText: PHASE_TEXT[currentPhase] || '训练',
      })

      if (elapsed >= total) {
        clearInterval(this._timer)
        this._timer = null
        const togetherParam = this.data.together ? '&together=1' : ''
        setTimeout(() => {
          wx.redirectTo({ url: `/pages/done/done?actionId=${this.data.action.id}${togetherParam}` })
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
