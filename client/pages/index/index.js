// pages/index/index.js - 首页 v2.0 - 分区横滑版
const api = require('../../utils/api')
const util = require('../../utils/util')

Page({
  data: {
    loading: true,
    greeting: '',
    timeIcon: '',
    primaryRecommend: null,
    userStats: null,
    categorySections: [],     // 前3个分类分区
    moreCategories: [],        // 更多抽屉里的分类
    showMore: false,
    meditationRecommend: null,
    hasProfile: false
  },

  onLoad() {
    this.initPage()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 })
    }
  },

  onPullDownRefresh() {
    this.initPage().then(() => wx.stopPullDownRefresh())
  },

  async initPage() {
    this.setData({ loading: true })
    const greeting = util.getGreeting()
    const tod = util.getTimeOfDay()
    const timeIcon = this.getTimeIcon(tod)
    this.setData({ greeting, timeIcon })

    try {
      const app = getApp()
      if (!app.globalData.token) await app.login()
      await this.loadProfile()
      if (this.data.hasProfile) await this.loadRecommendations()
    } catch (err) {
      console.error('首页加载失败', err)
      this.setData({ hasProfile: false, loading: false })
    }
  },

  getTimeIcon(tod) {
    const icons = { morning: '☀️', forenoon: '🌤️', noon: '🌞', afternoon: '⛅', evening: '🌙', night: '🌃' }
    return icons[tod] || '✨'
  },

  async loadProfile() {
    try {
      const profile = await api.getProfile()
      getApp().globalData.userProfile = profile
      this.setData({ hasProfile: !!profile })
    } catch (err) {
      this.setData({ hasProfile: false })
    }
  },

  async loadRecommendations() {
    try {
      const res = await api.getRecommendations()
      const stats = res.user_stats || null

      // 构建能力值面板数据
      if (stats && stats.posture !== undefined) {
        stats.abilities = [
          { key: 'posture', name: '体态', emoji: '🦴', value: stats.posture, color: '#7c6ff7' },
          { key: 'core', name: '核心', emoji: '💪', value: stats.core, color: '#00b894' },
          { key: 'flexibility', name: '柔韧', emoji: '🧘', value: stats.flexibility, color: '#0984e3' },
          { key: 'vitality', name: '活力', emoji: '⚡', value: stats.vitality, color: '#f39c12' },
          { key: 'mind_body', name: '平衡', emoji: '🧠', value: stats.mind_body, color: '#e84393' },
        ]
      }

      // 分类分区数据
      const sections = res.category_sections || []
      const topSections = sections.slice(0, 3)
      const moreSections = sections.slice(3)

      this.setData({
        primaryRecommend: res.primary || null,
        userStats: stats,
        categorySections: topSections,
        moreCategories: moreSections,
        meditationRecommend: res.meditation || null,
        loading: false
      })
    } catch (err) {
      console.error('加载推荐失败', err)
      this.setData({ primaryRecommend: null, categorySections: [], loading: false })
    }
  },

  onPrimaryTap() {
    const item = this.data.primaryRecommend
    if (!item) return
    wx.navigateTo({ url: `/pages/exercise/detail/detail?id=${item.id}` })
  },

  onCardTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/exercise/detail/detail?id=${id}` })
  },

  onMeditationTap() {
    const item = this.data.meditationRecommend
    if (!item) {
      wx.switchTab({ url: '/pages/meditation/list/list' })
      return
    }
    wx.navigateTo({ url: `/pages/meditation/player/player?id=${item.id}` })
  },

  onToggleDrawer() {
    this.setData({ showMore: !this.data.showMore })
  },

  onViewStats() {
    wx.navigateTo({ url: '/pages/profile/stats/stats' })
  },

  startOnboarding() {
    wx.navigateTo({ url: '/pages/profile/onboarding/onboarding' })
  }
})
