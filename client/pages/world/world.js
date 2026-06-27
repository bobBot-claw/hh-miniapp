// pages/world/world.js — 治愈世界：12主题世界网格
const { WORLDS } = require('../../utils/actions')

Page({
  data: {
    worlds: [],
    totalRevealed: 0,
  },

  onLoad() {
    this.loadWorlds()
  },

  onShow() {
    this.loadWorlds()
  },

  loadWorlds() {
    let state = {}
    try { state = wx.getStorageSync('appState') || {} } catch(e) {}
    const progress = state.worldProgress || {}
    const currentWorldId = state.currentWorld || 'forest'

    const worlds = WORLDS.map(w => ({
      ...w,
      revealed: progress[w.id] || 0,
      active: w.id === currentWorldId && !w.locked,
    }))

    const totalRevealed = worlds.reduce((sum, w) => sum + w.revealed, 0)

    this.setData({ worlds, totalRevealed })
  },

  onWorldTap(e) {
    const id = e.currentTarget.dataset.id
    const world = this.data.worlds.find(w => w.id === id)
    if (!world || world.locked) return

    // 切换当前世界
    let state = {}
    try { state = wx.getStorageSync('appState') || {} } catch(e) {}
    state.currentWorld = id
    try { wx.setStorageSync('appState', state) } catch(e) {}

    // 回主页
    wx.reLaunch({ url: '/pages/home/home' })
  },

  goBack() {
    wx.navigateBack()
  },
})
