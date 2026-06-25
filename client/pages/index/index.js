// pages/index/index.js - 首页 v4.0 - 活跃计划替换今日训练
const api = require('../../utils/api')
const util = require('../../utils/util')
const { getRecommendedPlans, getPlanDetail } = require('../../utils/plans')
const { exercises, meditations } = require('../../utils/mock-data')

Page({
  data: {
    loading: true,
    greeting: '',
    // 原始今日训练（无活跃计划时显示）
    primaryRecommend: null,
    // 活跃计划（有计划时替换今日训练）
    activePlan: null,
    todayInfo: null, // 当天训练的富化信息
    // 其他
    userStats: null,
    weekStats: null,
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
    // 每次显示都刷新活跃计划（从详情页回来可能已完成一天）
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

    // 找到当天信息
    let todayInfo = null
    let currentPhaseTitle = ''
    for (const phase of planDetail.phases) {
      for (const day of phase.daily) {
        if (day.day === currentDayNum) {
          currentPhaseTitle = phase.title
          // 富化练习名称
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

    // 计划已完成
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
    // 查看完成的计划
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
