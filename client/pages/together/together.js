// pages/together/together.js — 共练
const { ACTIONS, SCENE_ACTIONS } = require('../../utils/actions')

const DEPTH_LABELS = { light: '随时可做', medium: '需空间', deep: '需躺下' }
const PROBLEM_IDS = ['problem_dizzy','problem_energy','problem_core','problem_posture','problem_neck','problem_eyes']

Page({
  data: { scene: '', actionList: [], selectedId: '', topBarTop: 0, topBarLeft: 0 },

  onLoad(options) {
    this.calcTopBar()
    const preselect = options.actionId || ''
    const scene = preselect ? (ACTIONS[preselect] ? ACTIONS[preselect].scene : '') : this.getDefaultScene()
    this.setData({ scene, selectedId: preselect })
    this.loadActions(scene)
  },

  calcTopBar() {
    try {
      const menu = wx.getMenuButtonBoundingClientRect()
      this.setData({ topBarTop: menu.bottom + 12, topBarLeft: wx.getSystemInfoSync().windowWidth - menu.right })
    } catch (e) {
      try { this.setData({ topBarTop: wx.getSystemInfoSync().statusBarHeight + 56, topBarLeft: 16 }) } catch(e2) { this.setData({ topBarTop: 100, topBarLeft: 16 }) }
    }
  },

  getDefaultScene() {
    const h = new Date().getHours()
    if (h >= 6 && h < 11) return 'morning'
    if (h >= 11 && h < 20) return 'work'
    return 'night'
  },

  switchScene(e) { this.setData({ scene: e.currentTarget.dataset.scene, selectedId: '' }); this.loadActions(this.data.scene) },

  loadActions(scene) {
    const ids = scene === 'problem' ? PROBLEM_IDS : (SCENE_ACTIONS[scene] || [])
    const actionList = ids.map(id => { const a = ACTIONS[id]; if (!a) return null; const m = Math.floor(a.duration/60), s = a.duration%60; return { ...a, durationText: s ? `${m}分${s}秒` : `${m}分钟`, depthLabel: DEPTH_LABELS[a.depth]||'' } }).filter(Boolean)
    this.setData({ actionList })
  },

  selectAction(e) { this.setData({ selectedId: e.currentTarget.dataset.id }) },

  shareAction() {
    if (!this.data.selectedId) return
    wx.navigateTo({ url: `/pages/action/action?actionId=${this.data.selectedId}&together=1` })
  },

  onShareAppMessage() {
    const a = ACTIONS[this.data.selectedId]
    return { title: `一起做${a?a.title:'这个'}？`, path: `/pages/together/together?actionId=${this.data.selectedId}` }
  },

  goBack() { wx.navigateBack() },
})
