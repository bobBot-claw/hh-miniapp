// pages/profile/index/index.js - 我的（个人中心）v2.0
const api = require('../../../utils/api')

Page({
  data: {
    profile: null,
    stats: null,
    achievements: [],
    showOnboarding: false,
    loading: true
  },

  onLoad() {
    this.checkOnboarding()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 3 })
    }
    this.loadProfile()
  },

  async checkOnboarding() {
    try {
      const profile = await api.getProfile()
      if (!profile || !profile.problem_tags || profile.problem_tags.length === 0) {
        this.setData({ showOnboarding: true })
      }
    } catch (err) {
      console.error('检查引导状态失败', err)
    }
  },

  async loadProfile() {
    this.setData({ loading: true })
    try {
      const [profileRes, statsRes] = await Promise.all([
        api.getProfile(),
        api.getStats()
      ])
      this.setData({
        profile: profileRes.profile || profileRes,
        stats: statsRes.stats || statsRes,
        loading: false,
        showOnboarding: false
      })
      this.loadAchievements()
    } catch (err) {
      console.error('加载个人信息失败', err)
      this.setData({ loading: false })
    }
  },

  async loadAchievements() {
    try {
      const res = await api.getAchievements()
      this.setData({ achievements: res.achievements || [] })
    } catch (err) {
      console.error('加载成就失败', err)
    }
  },

  onStartOnboarding() {
    wx.navigateTo({ url: '/pages/profile/onboarding/onboarding' })
  },

  onViewStats() {
    wx.navigateTo({ url: '/pages/profile/stats/stats' })
  },

  onViewAchievements() {
    wx.navigateTo({ url: '/pages/profile/achievements/achievements' })
  },

  onViewWeeklyReport() {
    wx.navigateTo({ url: '/pages/profile/weekly-report/weekly-report' })
  },

  onSettings() {
    wx.navigateTo({ url: '/pages/profile/settings/settings' })
  }
})
