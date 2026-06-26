// pages/index/index.js - 首页 v7.0 — 极简·行动驱动
const api = require('../../utils/api')
const util = require('../../utils/util')
const { getRecommendedPlans, getPlanDetail } = require('../../utils/plans')
const { exercises, meditations } = require('../../utils/mock-data')

const ABILITY_COLORS = {
  posture: '#7c6ff7', core: '#00b894', flexibility: '#0984e3',
  vitality: '#f39c12', mind_body: '#e84393'
}

Page({
  data: {
    loading: true,
    primaryRecommend: null,
    activePlan: null,
    todayInfo: null,
    userStats: null,
    abilities: [],
    meditationRecommend: null,
    hasProfile: false,
    heroCollapsed: false,
    heroTitle: '准备开始',
    heroSub: '',
  },

  onLoad() { this.initPage() },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 })
    }
    this.loadActivePlan()
  },

  onPullDownRefresh() {
    this.initPage().then(() => wx.stopPullDownRefresh())
  },

  onHomeScroll(e) {
    const c = e.detail.scrollTop > 80
    if (c !== this.data.heroCollapsed) this.setData({ heroCollapsed: c })
  },

  async initPage() {
    this.setData({ loading: true })
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

  loadActivePlan() {
    const app = getApp()
    let activePlan = app.globalData.activePlan
    if (!activePlan) {
      try { activePlan = wx.getStorageSync('activePlan') || null; if (activePlan) app.globalData.activePlan = activePlan } catch(e) {}
    }
    if (!activePlan || !activePlan.planId) { this.setData({ activePlan: null, todayInfo: null }); this._updateHero(); return }

    const planDetail = getPlanDetail(activePlan.planId)
    if (!planDetail) { this.setData({ activePlan: null, todayInfo: null }); this._updateHero(); return }

    const completedDays = activePlan.completedDays || []
    const totalDays = planDetail.duration_days
    const progressPercent = Math.round((completedDays.length / totalDays) * 100)
    const currentDayNum = completedDays.length + 1

    let todayInfo = null, currentPhaseTitle = ''
    for (const phase of planDetail.phases) {
      for (const day of phase.daily) {
        if (day.day === currentDayNum) {
          currentPhaseTitle = phase.title
          todayInfo = {
            dayNum: currentDayNum,
            title: day.title,
            durationText: day.duration_text,
            phaseTitle: currentPhaseTitle,
          }
          break
        }
      }
      if (todayInfo) break
    }

    if (currentDayNum > totalDays) {
      this.setData({ activePlan: { ...activePlan, planTitle: planDetail.title, planGradient: planDetail.cover_gradient, totalDays, completedDays, progressPercent: 100, isCompleted: true }, todayInfo: null })
    } else {
      this.setData({ activePlan: { ...activePlan, planTitle: planDetail.title, planGradient: planDetail.cover_gradient, totalDays, completedDays, progressPercent, isCompleted: false }, todayInfo })
    }
    this._updateHero()
  },

  _updateHero() {
    const { activePlan, todayInfo, primaryRecommend } = this.data
    if (activePlan && !activePlan.isCompleted && todayInfo) {
      this.setData({ heroTitle: todayInfo.title, heroSub: `DAY ${todayInfo.dayNum} · ${todayInfo.durationText}` })
    } else if (activePlan && activePlan.isCompleted) {
      this.setData({ heroTitle: '今日已完成', heroSub: activePlan.planTitle })
    } else if (primaryRecommend) {
      this.setData({ heroTitle: primaryRecommend.title, heroSub: primaryRecommend.duration_text })
    } else {
      this.setData({ heroTitle: '准备开始', heroSub: '' })
    }
  },

  async loadProfile() {
    try {
      const profile = await api.getProfile()
      getApp().globalData.userProfile = profile
      this.setData({ hasProfile: !!profile })
    } catch (err) { this.setData({ hasProfile: false }) }
  },

  async loadRecommendations() {
    try {
      const res = await api.getRecommendations()
      this.setData({ userStats: res.user_stats || null })

      // 极简能力值 — 只需 key + color + value
      let rawData = []
      try { const sr = await api.getStats(); rawData = (sr.stats && sr.stats.abilities) || [] } catch(e) {}
      const abilities = ['posture','core','flexibility','vitality','mind_body'].map((key, i) => {
        const s = rawData.find(a => a.key === key) || rawData[i] || {}
        return { key, color: ABILITY_COLORS[key], value: s.value || 0 }
      })
      this.setData({ abilities })

      this.setData({
        primaryRecommend: res.primary || null,
        meditationRecommend: res.meditation || null,
        loading: false,
      })
      this._updateHero()
    } catch (err) {
      this.setData({ primaryRecommend: null, loading: false })
      this._updateHero()
    }
  },

  // 行动
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
    if (item) wx.navigateTo({ url: `/pages/exercise/detail/detail?id=${item.id}` })
  },
  onPlanContinue() {
    const p = this.data.activePlan
    if (p) wx.navigateTo({ url: `/pages/plan/detail/detail?id=${p.planId}` })
  },
  onPlanCompleteTap() {
    const p = this.data.activePlan
    if (p) wx.navigateTo({ url: `/pages/plan/detail/detail?id=${p.planId}` })
  },
  onCardTap(e) { wx.navigateTo({ url: `/pages/exercise/detail/detail?id=${e.currentTarget.dataset.id}` }) },
  onPlanTap(e) { wx.navigateTo({ url: `/pages/plan/detail/detail?id=${e.currentTarget.dataset.id}` }) },
  onViewAllPlans() { wx.navigateTo({ url: '/pages/plan/list/list' }) },
  onMeditationTap() { wx.switchTab({ url: '/pages/meditation/list/list' }) },
  onViewStats() { wx.navigateTo({ url: '/pages/profile/stats/stats' }) },
  startOnboarding() { wx.navigateTo({ url: '/pages/profile/onboarding/onboarding' }) },
})
