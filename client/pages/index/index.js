// pages/index/index.js - 首页 v4.3 - 能力值雷达图
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
      // 数据加载后绘制雷达图
      this.drawRadarChart()
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
      this.drawRadarChart()
    }
  },

  // ═══════════════════════════════════════════════
  // 雷达图绘制 — Canvas 2D
  // ═══════════════════════════════════════════════

  drawRadarChart() {
    const abilities = this.data.abilities
    if (!abilities || !abilities.length) return

    const query = wx.createSelectorQuery()
    query.select('#abilityRadar')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res[0]) return
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')

        const dpr = wx.getWindowInfo().pixelRatio
        const width = res[0].width
        const height = res[0].height

        canvas.width = width * dpr
        canvas.height = height * dpr
        ctx.scale(dpr, dpr)

        this._renderRadar(ctx, width, height, abilities)
      })
  },

  _renderRadar(ctx, w, h, abilities) {
    const cx = w / 2          // 中心 x
    const cy = h / 2 - 8      // 中心 y (微上移，给 legend 留空间)
    const maxR = Math.min(cx, cy) - 24  // 最大半径
    const n = abilities.length // 维度数
    const angleStep = (Math.PI * 2) / n
    const startAngle = -Math.PI / 2  // 从正上方开始

    // 清空
    ctx.clearRect(0, 0, w, h)

    // ─── 1. 绘制网格层（3圈） ───
    const gridLevels = [0.25, 0.5, 0.75, 1.0]
    gridLevels.forEach((level, li) => {
      const r = maxR * level
      ctx.beginPath()
      for (let i = 0; i <= n; i++) {
        const angle = startAngle + i * angleStep
        const x = cx + r * Math.cos(angle)
        const y = cy + r * Math.sin(angle)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.strokeStyle = li === 3 ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.04)'
      ctx.lineWidth = 1
      ctx.stroke()
    })

    // ─── 2. 绘制轴线 ───
    for (let i = 0; i < n; i++) {
      const angle = startAngle + i * angleStep
      const ex = cx + maxR * Math.cos(angle)
      const ey = cy + maxR * Math.sin(angle)
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(ex, ey)
      ctx.strokeStyle = 'rgba(0,0,0,0.05)'
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // ─── 3. 绘制数据多边形（渐变填充） ───
    const values = abilities.map(a => Math.min(a.value / 100, 1)) // 归一化到 0~1

    // 外发光（数据区域的阴影效果）
    ctx.beginPath()
    for (let i = 0; i <= n; i++) {
      const idx = i % n
      const angle = startAngle + idx * angleStep
      const r = maxR * values[idx]
      const x = cx + r * Math.cos(angle)
      const y = cy + r * Math.sin(angle)
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.shadowColor = 'rgba(124, 111, 247, 0.2)'
    ctx.shadowBlur = 16
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 4

    // 渐变填充
    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR)
    gradient.addColorStop(0, 'rgba(124, 111, 247, 0.08)')
    gradient.addColorStop(0.7, 'rgba(124, 111, 247, 0.18)')
    gradient.addColorStop(1, 'rgba(124, 111, 247, 0.28)')
    ctx.fillStyle = gradient
    ctx.fill()

    // 重置阴影
    ctx.shadowColor = 'transparent'
    ctx.shadowBlur = 0

    // 描边
    ctx.beginPath()
    for (let i = 0; i <= n; i++) {
      const idx = i % n
      const angle = startAngle + idx * angleStep
      const r = maxR * values[idx]
      const x = cx + r * Math.cos(angle)
      const y = cy + r * Math.sin(angle)
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.strokeStyle = 'rgba(124, 111, 247, 0.6)'
    ctx.lineWidth = 2
    ctx.stroke()

    // ─── 4. 绘制顶点圆点（带颜色） ───
    for (let i = 0; i < n; i++) {
      const angle = startAngle + i * angleStep
      const r = maxR * values[i]
      const x = cx + r * Math.cos(angle)
      const y = cy + r * Math.sin(angle)
      const color = abilities[i].color

      // 外圈光晕
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, Math.PI * 2)
      ctx.fillStyle = color + '33'  // 20% opacity
      ctx.fill()

      // 实心圆
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.fill()

      // 白色内圈
      ctx.beginPath()
      ctx.arc(x, y, 2, 0, Math.PI * 2)
      ctx.fillStyle = '#fff'
      ctx.fill()
    }

    // ─── 5. 绘制维度标签 ───
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    for (let i = 0; i < n; i++) {
      const angle = startAngle + i * angleStep
      const labelR = maxR + 22
      const lx = cx + labelR * Math.cos(angle)
      const ly = cy + labelR * Math.sin(angle)

      // 名称
      ctx.font = '500 11px -apple-system, sans-serif'
      ctx.fillStyle = '#6b6b82'
      ctx.fillText(abilities[i].name, lx, ly - 7)

      // 数值
      ctx.font = 'bold 13px -apple-system, sans-serif'
      ctx.fillStyle = abilities[i].color
      ctx.fillText(String(abilities[i].value), lx, ly + 8)
    }

    // ─── 6. 中心综合分 ───
    const avg = Math.round(abilities.reduce((s, a) => s + a.value, 0) / n)

    // 中心圆底
    ctx.beginPath()
    ctx.arc(cx, cy, 28, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(124, 111, 247, 0.06)'
    ctx.fill()

    // 中心分数
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = 'bold 22px -apple-system, sans-serif'
    ctx.fillStyle = '#7c6ff7'
    ctx.fillText(String(avg), cx, cy - 2)

    // 中心标签
    ctx.font = '500 8px -apple-system, sans-serif'
    ctx.fillStyle = '#a0a0b4'
    ctx.fillText('综合', cx, cy + 12)
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
