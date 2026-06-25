// pages/index/index.js - 首页 v4.1 - 计划卡片放大 + 能力值模块
const api = require('../../utils/api')
const util = require('../../utils/util')
const { getRecommendedPlans, getPlanDetail } = require('../../utils/plans')
const { exercises, meditations } = require('../../utils/mock-data')

Page({
  data: {
    loading: true,
    greeting: '',
    primaryRecommend: null,
    activePlan: null,
    todayInfo: null,
    userStats: null,
    abilities: [],
    categorySections: [],
    moreCategories: [],
    showMore: false,
    meditationRecommend: null,
    hasProfile: false,
    planList: [],
  },

  onLoad() {
    this.initPage()
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 })
    }
    this.loadActivePlan()
  },

  onPullDownRefresh() {
    this.initPage().then(() => wx.stopPullDownRefresh())
  },

  async initPage() {
    this.setData({ loading: true })
    const greeting = util.getGreeting()
    this.setData({ greeting })

    this.loadPlans()
    this.loadActivePlan()

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

  loadPlans() {
    const profile = getApp().globalData.userProfile
    const problemTags = profile ? (profile.problem_tags || []) : []
    const planList = getRecommendedPlans(problemTags)
    this.setData({ planList })
  },

  loadActivePlan() {
    const app = getApp()
    let activePlan = app.globalData.activePlan

    if (!activePlan) {
      try {
        activePlan = wx.getStorageSync('activePlan') || null
        if (activePlan) app.globalData.activePlan = activePlan
      } catch (e) {}
    }

    if (!activePlan || !activePlan.planId) {
      this.setData({ activePlan: null, todayInfo: null })
      return
    }

    const planDetail = getPlanDetail(activePlan.planId)
    if (!planDetail) {
      this.setData({ activePlan: null, todayInfo: null })
      return
    }

    const completedDays = activePlan.completedDays || []
    const totalDays = planDetail.duration_days
    const progressPercent = Math.round((completedDays.length / totalDays) * 100)
    const currentDayNum = completedDays.length + 1

    let todayInfo = null
    let currentPhaseTitle = ''
    for (const phase of planDetail.phases) {
      for (const day of phase.daily) {
        if (day.day === currentDayNum) {
          currentPhaseTitle = phase.title
          const exerciseNames = day.exercises.map(eid => {
            const ex = exercises.find(e => e.id === eid)
            return ex ? ex.title : eid
          })
          const meditationName = day.meditation
            ? (meditations.find(m => m.id === day.meditation) || {}).title || null
            : null
          todayInfo = {
            dayNum: currentDayNum,
            title: day.title,
            durationText: day.duration_text,
            exerciseNames,
            meditationName,
            phaseTitle: currentPhaseTitle,
          }
          break
        }
      }
      if (todayInfo) break
    }

    if (currentDayNum > totalDays) {
      this.setData({
        activePlan: {
          ...activePlan,
          planTitle: planDetail.title,
          planGradient: planDetail.cover_gradient,
          totalDays,
          completedDays,
          progressPercent: 100,
          isCompleted: true,
        },
        todayInfo: null,
      })
      return
    }

    this.setData({
      activePlan: {
        ...activePlan,
        planTitle: planDetail.title,
        planGradient: planDetail.cover_gradient,
        totalDays,
        completedDays,
        progressPercent,
        isCompleted: false,
      },
      todayInfo,
    })
  },

  async loadProfile() {
    try {
      const profile = await api.getProfile()
      getApp().globalData.userProfile = profile
      this.setData({ hasProfile: !!profile })
      this.loadPlans()
    } catch (err) {
      this.setData({ hasProfile: false })
    }
  },

  async loadRecommendations() {
    try {
      const res = await api.getRecommendations()
      const stats = res.user_stats || null
      this.setData({ userStats: stats })

      // 加载能力值
      await this.loadAbilities()

      const sections = res.category_sections || []
      this.setData({
        primaryRecommend: res.primary || null,
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

  async loadAbilities() {
    try {
      const res = await api.getStats()
      const abilities = (res.stats && res.stats.abilities) || []
      this.setData({ abilities })
    } catch (err) {
      // 默认能力值
      this.setData({
        abilities: [
          { key: 'posture', name: '体态健康', value: 0, color: '#7c6ff7', level: 0 },
          { key: 'core', name: '核心稳定', value: 0, color: '#00b894', level: 0 },
          { key: 'flexibility', name: '柔韧性', value: 0, color: '#0984e3', level: 0 },
          { key: 'vitality', name: '活力值', value: 0, color: '#f39c12', level: 0 },
          { key: 'mind_body', name: '身心平衡', value: 0, color: '#e84393', level: 0 },
        ]
      })
    }
  },

  // === 事件处理 ===

  onPrimaryTap() {
    const item = this.data.primaryRecommend
    if (!item) return
    wx.navigateTo({ url: `/pages/exercise/detail/detail?id=${item.id}` })
  },

  onPlanContinue() {
    const activePlan = this.data.activePlan
    if (!activePlan) return
    wx.navigateTo({ url: `/pages/plan/detail/detail?id=${activePlan.planId}` })
  },

  onPlanCompleteTap() {
    const activePlan = this.data.activePlan
    if (!activePlan) return
    wx.navigateTo({ url: `/pages/plan/detail/detail?id=${activePlan.planId}` })
  },

  onCardTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/exercise/detail/detail?id=${id}` })
  },

  onPlanTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/plan/detail/detail?id=${id}` })
  },

  onViewAllPlans() {
    wx.navigateTo({ url: '/pages/plan/list/list' })
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
