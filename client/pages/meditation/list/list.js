// pages/meditation/list/list.js - 冥想列表 v2.0
const api = require('../../../utils/api')

Page({
  data: {
    meditations: [],
    filteredList: [],
    activeTag: 'all',
    tags: [
      { key: 'all', label: '全部' },
      { key: 'breathing', label: '呼吸' },
      { key: 'body_scan', label: '身体扫描' },
      { key: 'mindfulness', label: '正念' },
      { key: 'sleep', label: '助眠' },
      { key: 'focus', label: '专注' }
    ],
    loading: true
  },

  onLoad() {
    this.loadMeditations()
  },

  async loadMeditations() {
    try {
      const res = await api.getMeditations()
      const meditations = res.meditations || []
      this.setData({
        meditations,
        filteredList: meditations,
        loading: false
      })
    } catch (err) {
      console.error('加载冥想列表失败', err)
      this.setData({ loading: false })
    }
  },

  onTagTap(e) {
    const tag = e.currentTarget.dataset.tag
    const filtered = tag === 'all'
      ? this.data.meditations
      : this.data.meditations.filter(m => m.category === tag || (m.tags && m.tags.includes(tag)))
    this.setData({ activeTag: tag, filteredList: filtered })
  },

  onMeditationTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/meditation/player/player?id=${id}` })
  }
})
