// pages/together/together.js — 共练：选行动+邀请好友
const { ACTIONS, SCENE_ACTIONS, TAG_ACTIONS } = require('../../utils/actions')

const DEPTH_LABELS = {
  light: '随时可做',
  medium: '需要空间',
  deep: '需要躺下',
}

// 问题轴行动 ID 列表
const PROBLEM_IDS = [
  'problem_dizzy', 'problem_energy', 'problem_core',
  'problem_posture', 'problem_neck', 'problem_eyes',
]

Page({
  data: {
    scene: '',
    actionList: [],
    selectedId: '',
    topBarTop: 0,
    topBarLeft: 0,
  },

  onLoad(options) {
    this.calcTopBar()
    // 从分享卡片进入时，预选对应行动
    const preselect = options.actionId || ''
    const scene = preselect ? (ACTIONS[preselect] ? ACTIONS[preselect].scene : '') : this.getDefaultScene()
    this.setData({ scene, selectedId: preselect })
    this.loadActions(scene)
  },

  calcTopBar() {
    try {
      const menu = wx.getMenuButtonBoundingClientRect()
      const sys = wx.getSystemInfoSync()
      this.setData({
        topBarTop: menu.bottom + 12,
        topBarLeft: sys.windowWidth - menu.right,
      })
    } catch (e) {
      try {
        const sys = wx.getSystemInfoSync()
        this.setData({ topBarTop: sys.statusBarHeight + 44 + 12, topBarLeft: 16 })
      } catch (e2) {
        this.setData({ topBarTop: 100, topBarLeft: 16 })
      }
    }
  },

  getDefaultScene() {
    const hour = new Date().getHours()
    if (hour >= 6 && hour < 11) return 'morning'
    if (hour >= 11 && hour < 20) return 'work'
    return 'night'
  },

  switchScene(e) {
    const scene = e.currentTarget.dataset.scene
    this.setData({ scene, selectedId: '' })
    this.loadActions(scene)
  },

  loadActions(scene) {
    let ids = []
    if (scene === 'problem') {
      ids = PROBLEM_IDS
    } else {
      ids = SCENE_ACTIONS[scene] || []
    }

    const actionList = ids.map(id => {
      const a = ACTIONS[id]
      if (!a) return null
      const minutes = Math.floor(a.duration / 60)
      const seconds = a.duration % 60
      return {
        ...a,
        durationText: seconds > 0 ? `${minutes}分${seconds}秒` : `${minutes}分钟`,
        depthLabel: DEPTH_LABELS[a.depth] || '',
      }
    }).filter(Boolean)

    this.setData({ actionList })
  },

  selectAction(e) {
    const id = e.currentTarget.dataset.id
    this.setData({ selectedId: id })
  },

  shareAction() {
    const selectedId = this.data.selectedId
    if (!selectedId) return
    // 微信小程序 shareAppMessage 触发分享
    // 注意：需要通过 button open-type="share" 或 onShareAppMessage
    // 这里使用 wx.navigateTo 进入 action 页面，action 页面触发分享
    wx.navigateTo({
      url: `/pages/action/action?actionId=${selectedId}&together=1`,
    })
  },

  // 支持从分享卡片直接进入
  onShareAppMessage() {
    const selectedId = this.data.selectedId
    const action = ACTIONS[selectedId]
    return {
      title: `一起做${action ? action.title : '这个行动'}？`,
      path: `/pages/together/together?actionId=${selectedId}`,
      imageUrl: '',
    }
  },

  goBack() {
    wx.navigateBack()
  },
})
