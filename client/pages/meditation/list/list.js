// pages/meditation/list/list.js - 静养模块（冥想练习）v2.0
const api = require('../../../utils/api')

Page({
  data: {
    meditations: [],
    filteredList: [],
    activeTag: 'all',
    tags: [
      { key: 'all', label: '全部' },
      { key: 'breath', label: '呼吸' },
      { key: 'body_scan', label: '身体扫描' },
      { key: 'mindfulness', label: '正念' },
      { key: 'dynamic', label: '动态冥想' },
      { key: 'sleep', label: '助眠' }
    ],
    loading: true
  },

  onLoad() {
    this.loadMeditations()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 })
    }
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
      : this.data.meditations.filter(m => m.category === tag)
    this.setData({ activeTag: tag, filteredList: filtered })
  },

  onMeditationTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/meditation/player/player?id=${id}` })
  }
})
