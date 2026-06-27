// pages/done/done.js — 完成后：揭示彩蛋
const { WORLDS, getCurrentAction } = require('../../utils/actions')

Page({
  data: {
    revealed: false,
    eggClearUrl: '',
    worldName: '',
    eggIndex: 1,
    feeling: '',
    benefit: '',
  },

  onLoad() {
    let state = {}
    try { state = wx.getStorageSync('appState') || {} } catch(e) {}

    const worldId = state.currentWorld || 'forest'
    const world = WORLDS.find(w => w.id === worldId) || WORLDS[0]
    const progress = state.worldProgress || {}
    const revealedCount = (progress[worldId] || 0) + 1
    const eggIndex = revealedCount

    // 获取当前行动的 feeling 和 benefit
    const action = getCurrentAction()

    // 更新状态
    const todayKey = this.getTodayKey()
    state.lastRevealDate = todayKey
    state.worldProgress = { ...progress, [worldId]: revealedCount }
    try { wx.setStorageSync('appState', state) } catch(e) {}

    this.setData({
      worldName: world.name,
      eggIndex,
      eggClearUrl: world.eggs.length > 0
        ? world.eggs[Math.min(eggIndex - 1, world.eggs.length - 1)].clearUrl
        : '',
      feeling: action ? action.feeling : '',
      benefit: action ? action.benefit : '',
    })

    // 延迟揭示
    setTimeout(() => {
      this.setData({ revealed: true })
    }, 100)
  },

  getTodayKey() {
    const d = new Date()
    return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
  },

  goWorld() {
    wx.redirectTo({ url: '/pages/world/world' })
  },

  goHome() {
    wx.reLaunch({ url: '/pages/home/home' })
  },
})
