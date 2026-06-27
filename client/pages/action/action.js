// pages/action/action.js — 行动中 v0.8
const { ACTIONS, getCurrentAction } = require('../../utils/actions')

const DEPTH_LABELS = { light: '随时', medium: '要空间', deep: '要躺下' }
const PHASE_TEXT = { warmup: '热身', work: '训练', rest: '间歇', cooldown: '放松' }

Page({
  data: {
    action: {}, progress: 0, currentStep: 0, currentPhase: 'warmup', phaseText: '热身',
    eggBlurUrl: '', totalSeconds: 180, elapsedSeconds: 0, depthLabel: '',
    topLeftTop: 0, topLeftLeft: 0,
    together: false, countdown: 0, countingDown: false,
  },
  _timer: null,

  onLoad(options) {
    this.calcTopBar()
    let action = (options.actionId && ACTIONS[options.actionId]) ? ACTIONS[options.actionId] : getCurrentAction()
    const together = options.together === '1'
    let state = {}; try { state = wx.getStorageSync('appState') || {} } catch(e) {}
    const steps = (action.steps||[]).map(s => typeof s === 'string' ? {text:s,hint:'',phase:'work'} : {phase:'work',hint:'',...s})
    const firstPhase = steps[0] ? steps[0].phase : 'warmup'
    this.setData({ action:{...action,steps}, totalSeconds:action.duration||180, eggBlurUrl:`/assets/eggs/${state.currentWorld||'forest'}/blur_01.png`, depthLabel:DEPTH_LABELS[action.depth]||'', currentPhase:firstPhase, phaseText:PHASE_TEXT[firstPhase]||'训练', together })
    together ? this.startTogetherCountdown() : this.startCountdown()
  },

  startTogetherCountdown() {
    this.setData({ countingDown: true, countdown: 3 }); let c = 3
    const cd = setInterval(() => { c--; if (c<=0) { clearInterval(cd); this.setData({countingDown:false}); this.startCountdown() } else { this.setData({countdown:c}) } }, 1000)
  },

  onShareAppMessage() {
    const a = this.data.action
    return { title: `一起做${a.title||'这个'}？`, path: `/pages/together/together?actionId=${a.id}` }
  },

  calcTopBar() {
    try { const m = wx.getMenuButtonBoundingClientRect(); this.setData({topLeftTop:m.bottom+12, topLeftLeft:wx.getSystemInfoSync().windowWidth-m.right}) }
    catch(e) { try { this.setData({topLeftTop:wx.getSystemInfoSync().statusBarHeight+56, topLeftLeft:16}) } catch(e2) { this.setData({topLeftTop:100,topLeftLeft:16}) } }
  },

  onUnload() { if (this._timer) { clearInterval(this._timer); this._timer = null } },

  startCountdown() {
    const total = this.data.totalSeconds, steps = this.data.action.steps||[]
    const stepInterval = steps.length > 0 ? Math.floor(total/steps.length) : total
    this._timer = setInterval(() => {
      const elapsed = this.data.elapsedSeconds+1, progress = Math.min((elapsed/total)*100,100)
      const currentStep = Math.min(Math.floor(elapsed/stepInterval), steps.length-1)
      const currentPhase = steps[currentStep] ? steps[currentStep].phase : 'work'
      this.setData({ elapsedSeconds:elapsed, progress, currentStep, currentPhase, phaseText:PHASE_TEXT[currentPhase]||'训练' })
      if (elapsed >= total) { clearInterval(this._timer); this._timer=null; const t=this.data.together?'&together=1':''; setTimeout(()=>wx.redirectTo({url:`/pages/done/done?actionId=${this.data.action.id}${t}`}),500) }
    }, 1000)
  },

  endEarly() { if(this._timer){clearInterval(this._timer);this._timer=null} wx.navigateBack() },
  goBack() { this.endEarly() },
})
