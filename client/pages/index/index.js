// pages/index/index.js - 首页 v3.2 - 精简+悬浮TabBar
const api = require('../../utils/api')
const util = require('../../utils/util')

Page({
  data: {
    loading: true,
    greeting: '',
    primaryRecommend: null,
    userStats: null,
    weekStats: null,
    categorySections: [],
    moreCategories: [],
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
    this.setData({ greeting })

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

      if (stats) {
        const weekStats = [
          { key: 'streak', label: '连续', value: stats.streak || 0, unit: '天', compare: stats.streak > 0 ? `比上周+${Math.min(stats.streak, 3)}天` : '开始你的连续' },
          { key: 'duration', label: '总时长', value: stats.total_minutes || 0, unit: 'min', compare: '本周运动' },
          { key: 'count', label: '已运动', value: stats.total_exercises || 0, unit: '次', compare: '继续保持' },
        ]
        this.setData({ weekStats })
      }

      const sections = res.category_sections || []
      this.setData({
        primaryRecommend: res.primary || null,
        userStats: stats,
        categorySections: sections.slice(0, 3),
        moreCategories: sections.slice(3),
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
    wx.switchTab({ url: '/pages/meditation/list/list' })
  },

  onToggleDrawer() {
    this.setData({ showMore: !this.data.showMore })
  },

  onViewStats() {
    wx.navigateTo({ url: '/pages/profile/stats/stats' })
  },

  onProfileTap() {
    wx.switchTab({ url: '/pages/profile/index/index' })
  },

  startOnboarding() {
    wx.navigateTo({ url: '/pages/profile/onboarding/onboarding' })
  }
})
