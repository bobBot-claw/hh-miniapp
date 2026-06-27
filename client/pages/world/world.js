// pages/world/world.js — 我的世界：12主题世界+插画收藏
const { WORLDS } = require('../../utils/actions')

Page({
  data: {
    worlds: [],
    totalRevealed: 0,
    selectedWorld: null,
    revealedEggs: [],
    lockedEggs: [],
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

    // 构建已揭示/未揭示的插画列表
    const revealedEggs = []
    const lockedEggs = []
    for (let i = 1; i <= world.total; i++) {
      const numStr = String(i).padStart(2, '0')
      if (i <= world.revealed) {
        revealedEggs.push({
          num: i,
          clearUrl: world.eggs && world.eggs[i-1]
            ? world.eggs[i-1].clearUrl
            : `/assets/eggs/${world.id}/clear_${numStr}.png`,
        })
      } else {
        lockedEggs.push({ num: i })
      }
    }

    this.setData({
      selectedWorld: world,
      revealedEggs,
      lockedEggs,
    })
  },

  closeGallery() {
    this.setData({ selectedWorld: null, revealedEggs: [], lockedEggs: [] })
  },

  previewEgg(e) {
    const url = e.currentTarget.dataset.url
    if (!url) return
    // 全屏预览插画
    wx.previewImage({
      current: url,
      urls: this.data.revealedEggs.map(egg => egg.clearUrl).filter(Boolean),
    })
  },

  goBack() {
    if (this.data.selectedWorld) {
      this.closeGallery()
    } else {
      wx.navigateBack()
    }
  },
})
