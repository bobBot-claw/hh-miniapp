// pages/index/index.js - 首页 v4.3.1 - 能力值雷达图修复
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

  onReady() {
    // 页面初次渲染完成后再画雷达图
    this._radarReady = true
    if (this.data.abilities.length) {
      this.drawRadarChart()
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
    // setData 后等 DOM 更新再画图
    setTimeout(() => { this.drawRadarChart() }, 300)
  },

  // ═══════════════════════════════════════════════
  // 雷达图绘制
  // ═══════════════════════════════════════════════

  drawRadarChart() {
    if (!this._radarReady) return
    const abilities = this.data.abilities
    if (!abilities || !abilities.length) return

    const query = wx.createSelectorQuery().in(this)
    query.select('#abilityRadar')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res || !res[0] || !res[0].node) {
          console.warn('Canvas node not found, retrying...')
          setTimeout(() => { this.drawRadarChart() }, 500)
          return
        }
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')

        // 获取 DPR
        let dpr = 2
        try { dpr = wx.getWindowInfo().pixelRatio || 2 } catch(e) {
          try { dpr = wx.getSystemInfoSync().pixelRatio || 2 } catch(e2) {}
        }

        const width = res[0].width
        const height = res[0].height

        canvas.width = width * dpr
        canvas.height = height * dpr
        ctx.scale(dpr, dpr)

        console.log('Radar canvas:', width, height, 'dpr:', dpr)
        this._renderRadar(ctx, width, height, abilities)
      })
  },

  _renderRadar(ctx, w, h, abilities) {
    const cx = w / 2
    const cy = h / 2
    const maxR = Math.min(cx, cy) - 30
    const n = abilities.length
    const angleStep = (Math.PI * 2) / n
    const startAngle = -Math.PI / 2  // 从正上方开始

    // 清空
    ctx.clearRect(0, 0, w, h)

    // ─── 1. 网格层（4圈） ───
    const gridLevels = [0.25, 0.5, 0.75, 1.0]
    gridLevels.forEach((level, li) => {
      const r = maxR * level
      ctx.beginPath()
      for (let i = 0; i <= n; i++) {
        const angle = startAngle + (i % n) * angleStep
        const x = cx + r * Math.cos(angle)
        const y = cy + r * Math.sin(angle)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.strokeStyle = li === 3 ? 'rgba(0,0,0,0.10)' : 'rgba(0,0,0,0.05)'
      ctx.lineWidth = 1
      ctx.stroke()
    })

    // ─── 2. 轴线 ───
    for (let i = 0; i < n; i++) {
      const angle = startAngle + i * angleStep
      const ex = cx + maxR * Math.cos(angle)
      const ey = cy + maxR * Math.sin(angle)
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(ex, ey)
      ctx.strokeStyle = 'rgba(0,0,0,0.06)'
      ctx.lineWidth = 1
      ctx.stroke()
    }

    // ─── 3. 数据多边形 ───
    // 确保至少有一点半径（0值时给 0.05 的最小半径，避免缩成一个点）
    const values = abilities.map(a => {
      const v = Math.min(a.value / 100, 1)
      return v < 0.05 ? 0.05 : v
    })

    // 填充
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

    // 径向渐变
    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR)
    gradient.addColorStop(0, 'rgba(124, 111, 247, 0.06)')
    gradient.addColorStop(0.6, 'rgba(124, 111, 247, 0.15)')
    gradient.addColorStop(1, 'rgba(124, 111, 247, 0.28)')
    ctx.fillStyle = gradient
    ctx.fill()

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
    ctx.strokeStyle = 'rgba(124, 111, 247, 0.55)'
    ctx.lineWidth = 2
    ctx.stroke()

    // ─── 4. 顶点圆点（带颜色） ───
    for (let i = 0; i < n; i++) {
      const angle = startAngle + i * angleStep
      const r = maxR * values[i]
      const x = cx + r * Math.cos(angle)
      const y = cy + r * Math.sin(angle)
      const color = abilities[i].color

      // 光晕
      ctx.beginPath()
      ctx.arc(x, y, 7, 0, Math.PI * 2)
      ctx.fillStyle = color + '30'
      ctx.fill()

      // 实心
      ctx.beginPath()
      ctx.arc(x, y, 4.5, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.fill()

      // 白心
      ctx.beginPath()
      ctx.arc(x, y, 1.8, 0, Math.PI * 2)
      ctx.fillStyle = '#ffffff'
      ctx.fill()
    }

    // ─── 5. 维度标签 + 数值 ───
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    for (let i = 0; i < n; i++) {
      const angle = startAngle + i * angleStep
      const labelR = maxR + 20
      const lx = cx + labelR * Math.cos(angle)
      const ly = cy + labelR * Math.sin(angle)

      // 名称
      ctx.font = '500 10px sans-serif'
      ctx.fillStyle = '#6b6b82'
      ctx.fillText(abilities[i].name, lx, ly - 6)

      // 数值
      ctx.font = 'bold 12px sans-serif'
      ctx.fillStyle = abilities[i].color
      ctx.fillText(String(abilities[i].value), lx, ly + 7)
    }

    // ─── 6. 中心综合分 ───
    const avg = Math.round(abilities.reduce((s, a) => s + a.value, 0) / n)

    // 中心圆底
    ctx.beginPath()
    ctx.arc(cx, cy, 22, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(124, 111, 247, 0.06)'
    ctx.fill()

    // 分数
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = 'bold 18px sans-serif'
    ctx.fillStyle = '#7c6ff7'
    ctx.fillText(String(avg), cx, cy - 2)

    // "综合"标签
    ctx.font = '500 8px sans-serif'
    ctx.fillStyle = '#a0a0b4'
    ctx.fillText('综合', cx, cy + 11)
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
