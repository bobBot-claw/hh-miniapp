// pages/index/index.js - 首页（今日行动）v2.0
const api = require('../../utils/api')
const util = require('../../utils/util')

Page({
  data: {
    loading: true,
    greeting: '',
    timeIcon: '',
    dailyText: '',
    primaryRecommend: null,
    alternatives: [],
    recommendCards: [],
    meditationRecommend: null,
    userStats: null,
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
    this.initPage().then(() => {
      wx.stopPullDownRefresh()
    })
  },

  async initPage() {
    this.setData({ loading: true })

    const greeting = util.getGreeting()
    const tod = util.getTimeOfDay()
    const timeIcon = this.getTimeIcon(tod)
    this.setData({ greeting, timeIcon })

    try {
      const app = getApp()
      if (!app.globalData.token) {
        await app.login()
      }
      await this.loadProfile()
      if (this.data.hasProfile) {
        await this.loadRecommendations()
      }
    } catch (err) {
      console.error('首页加载失败', err)
      this.setData({ hasProfile: false, loading: false })
    }
  },

  getTimeIcon(tod) {
    const icons = {
      morning: '☀️', forenoon: '🌤️', noon: '🌞',
      afternoon: '⛅', evening: '🌙', night: '🌃'
    }
    return icons[tod] || '✨'
  },

  async loadProfile() {
    try {
      const profile = await api.getProfile()
      getApp().globalData.userProfile = profile
      this.setData({ hasProfile: !!profile })
    } catch (err) {
      console.error('加载画像失败', err)
      this.setData({ hasProfile: false })
    }
  },

  async loadRecommendations() {
    try {
      const res = await api.getRecommendations()
      this.setData({
        primaryRecommend: res.primary || null,
        alternatives: res.alternatives || [],
        recommendCards: res.recommend_cards || [],
        meditationRecommend: res.meditation || null,
        dailyText: res.daily_text || this.getDefaultDailyText(),
        userStats: res.user_stats || null,
        loading: false
      })
    } catch (err) {
      console.error('加载推荐失败', err)
      this.setData({
        primaryRecommend: null,
        alternatives: [],
        recommendCards: [],
        loading: false,
        dailyText: this.getDefaultDailyText()
      })
    }
  },

  getDefaultDailyText() {
    const tod = util.getTimeOfDay()
    const texts = {
      morning: '早安！新的一天，从动一下开始',
      forenoon: '工作了一会儿了，肩颈还好吗？',
      noon: '午休时间，活动一下下午更有精神',
      afternoon: '下午了，动一下赶走困倦',
      evening: '忙碌了一天，放松一下身体吧',
      night: '夜深了，做个简单的睡前放松'
    }
    return texts[tod] || '动一下，比不动强'
  },

  // 点击主推荐
  onPrimaryTap() {
    const item = this.data.primaryRecommend
    if (!item) return
    wx.navigateTo({ url: `/pages/exercise/detail/detail?id=${item.id}` })
  },

  // 点击推荐卡片
  onCardTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/exercise/detail/detail?id=${id}` })
  },

  // 点击备选
  onAltTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/exercise/detail/detail?id=${id}` })
  },

  // 点击冥想
  onMeditationTap() {
    const item = this.data.meditationRecommend
    if (!item) {
      wx.switchTab({ url: '/pages/meditation/list/list' })
      return
    }
    wx.navigateTo({ url: `/pages/meditation/player/player?id=${item.id}` })
  },

  // 开始 onboarding
  startOnboarding() {
    wx.navigateTo({ url: '/pages/profile/onboarding/onboarding' })
  }
})
