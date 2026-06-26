// pages/index/index.js - 首页 v6.0 — 五力能量球+超级沉浸背景
const api = require('../../utils/api')
const util = require('../../utils/util')
const { getRecommendedPlans, getPlanDetail } = require('../../utils/plans')
const { exercises, meditations } = require('../../utils/mock-data')

// 能力值默认配置
const ABILITY_CONFIG = [
  { key: 'posture',     name: '体态健康', emoji: '🦴', color: '#7c6ff7' },
  { key: 'core',        name: '核心稳定', emoji: '💪', color: '#00b894' },
  { key: 'flexibility', name: '柔韧性',   emoji: '🧘', color: '#0984e3' },
  { key: 'vitality',    name: '活力值',   emoji: '⚡', color: '#f39c12' },
  { key: 'mind_body',   name: '身心平衡', emoji: '🧠', color: '#e84393' },
]

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
    heroCollapsed: false,
    heroTitle: '',
    heroSub: '',
    coachPoseIdx: 0,
  },

  _coachTimer: null,

  onLoad() {
    this.initPage()
    this._startCoachAnimation()
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

  onHide() {
    this._stopCoachAnimation()
  },

  onUnload() {
    this._stopCoachAnimation()
  },

  _startCoachAnimation() {
    this._coachTimer = setInterval(() => {
      const next = this.data.coachPoseIdx === 0 ? 1 : 0
      this.setData({ coachPoseIdx: next })
    }, 3000)
  },

  _stopCoachAnimation() {
    if (this._coachTimer) {
      clearInterval(this._coachTimer)
      this._coachTimer = null
    }
  },

  onHomeScroll(e) {
    const scrollTop = e.detail.scrollTop
    const collapsed = scrollTop > 100
    if (collapsed !== this.data.heroCollapsed) {
      this.setData({ heroCollapsed: collapsed })
    }
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
      this._updateHeroInfo()
      return
    }

    const planDetail = getPlanDetail(activePlan.planId)
    if (!planDetail) {
      this.setData({ activePlan: null, todayInfo: null })
      this._updateHeroInfo()
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
          ...activePlan, planTitle: planDetail.title,
          planGradient: planDetail.cover_gradient,
          totalDays, completedDays, progressPercent: 100, isCompleted: true,
        },
        todayInfo: null,
      })
      this._updateHeroInfo()
      return
    }

    this.setData({
      activePlan: {
        ...activePlan, planTitle: planDetail.title,
        planGradient: planDetail.cover_gradient,
        totalDays, completedDays, progressPercent, isCompleted: false,
      },
      todayInfo,
    })
    this._updateHeroInfo()
  },

  _updateHeroInfo() {
    const { activePlan, todayInfo, primaryRecommend } = this.data

    if (activePlan && !activePlan.isCompleted && todayInfo) {
      this.setData({
        heroTitle: todayInfo.title,
        heroSub: `DAY ${todayInfo.dayNum} · ${todayInfo.durationText}`,
      })
    } else if (activePlan && activePlan.isCompleted) {
      this.setData({ heroTitle: '今日已完成', heroSub: `${activePlan.planTitle} 全部完成` })
    } else if (primaryRecommend) {
      this.setData({ heroTitle: primaryRecommend.title, heroSub: primaryRecommend.duration_text })
    } else {
      this.setData({ heroTitle: '准备开始', heroSub: '找到适合你的训练' })
    }
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

      await this.loadAbilities()

      const sections = res.category_sections || []
      this.setData({
        primaryRecommend: res.primary || null,
        categorySections: sections.slice(0, 3),
        moreCategories: sections.slice(3),
        meditationRecommend: res.meditation || null,
        loading: false,
      })
      this._updateHeroInfo()
    } catch (err) {
      console.error('加载推荐失败', err)
      this.setData({ primaryRecommend: null, categorySections: [], loading: false })
      this._updateHeroInfo()
    }
  },

  // ═══════════════════════════════════════════════
  // 能力值 → 能量球数据
  // ═══════════════════════════════════════════════

  async loadAbilities() {
    let rawData = []
    try {
      const res = await api.getStats()
      rawData = (res.stats && res.stats.abilities) || []
    } catch (err) {
      rawData = []
    }

    // 合并配置 + 计算能量球参数
    const abilities = ABILITY_CONFIG.map((cfg, i) => {
      const serverData = rawData.find(a => a.key === cfg.key) || rawData[i] || {}
      const value = serverData.value || 0
      const ratio = Math.min(value / 100, 1) // 0~1

      // 球体大小：最小60rpx，最大120rpx，按值比例
      const orbSize = Math.round(60 + ratio * 60)
      // 光晕大小：与球体成正比
      const glowSize = Math.round(15 + ratio * 30)
      // 脉冲速度：值越高越快（越有活力）
      const pulseSpeed = (4 - ratio * 2).toFixed(1) // 4s~2s

      return {
        ...cfg,
        value,
        level: serverData.level || 0,
        orbSize,
        glowSize,
        pulseSpeed,
      }
    })

    this.setData({ abilities })
  },

  // === 事件 ===

  onHeroStart() {
    const { activePlan, primaryRecommend } = this.data
    if (activePlan && !activePlan.isCompleted) {
      wx.navigateTo({ url: `/pages/plan/detail/detail?id=${activePlan.planId}` })
    } else if (primaryRecommend) {
      wx.navigateTo({ url: `/pages/exercise/detail/detail?id=${primaryRecommend.id}` })
    }
  },

  onPrimaryTap() {
    const item = this.data.primaryRecommend
    if (!item) return
    wx.navigateTo({ url: `/pages/exercise/detail/detail?id=${item.id}` })
  },

  onPlanContinue() {
    const p = this.data.activePlan
    if (!p) return
    wx.navigateTo({ url: `/pages/plan/detail/detail?id=${p.planId}` })
  },

  onPlanCompleteTap() {
    const p = this.data.activePlan
    if (!p) return
    wx.navigateTo({ url: `/pages/plan/detail/detail?id=${p.planId}` })
  },

  onCardTap(e) {
    wx.navigateTo({ url: `/pages/exercise/detail/detail?id=${e.currentTarget.dataset.id}` })
  },

  onPlanTap(e) {
    wx.navigateTo({ url: `/pages/plan/detail/detail?id=${e.currentTarget.dataset.id}` })
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

  startOnboarding() {
    wx.navigateTo({ url: '/pages/profile/onboarding/onboarding' })
  }
})
