// pages/discover/index/index.js - 发现页（知识+冥想）
const api = require('../../../utils/api')

Page({
  data: {
    knowledge: [],
    meditations: [],
    loading: true
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 })
    }
    this.loadData()
  },

  async loadData() {
    this.setData({ loading: true })
    try {
      const [knowledgeRes, meditationsRes] = await Promise.all([
        api.getKnowledge(),
        api.getMeditations()
      ])
      this.setData({
        knowledge: knowledgeRes.knowledge || [],
        meditations: meditationsRes.meditations || [],
        loading: false
      })
    } catch (err) {
      console.error('加载发现页失败', err)
      this.setData({ loading: false })
    }
  },

  onKnowledgeTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/discover/index/index?id=${id}` })
  },

  onMeditationTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/meditation/player/player?id=${id}` })
  },

  onMeditationMore() {
    wx.navigateTo({ url: '/pages/meditation/list/list' })
  }
})
