// pages/profile/stats/stats.js - 能力值详情 v2.0
const api = require('../../../utils/api')

Page({
  data: {
    stats: null,
    abilities: [],
    loading: true
  },

  onLoad() {
    this.loadStats()
  },

  async loadStats() {
    try {
      const res = await api.getStats()
      const stats = res.stats || res
      this.setData({
        stats,
        abilities: stats.abilities || [],
        loading: false
      })
    } catch (err) {
      console.error('加载能力值失败', err)
      this.setData({ loading: false })
    }
  }
})
