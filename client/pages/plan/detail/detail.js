const { getPlanDetail } = require('../../../utils/plans')
const { exercises, meditations } = require('../../../utils/mock-data')

Page({
  data: {
    plan: null,
    currentPhaseIndex: 0,
    currentDayIndex: 0,
    enrichedPhases: [],
    started: false,
    completedDays: [],
    totalProgress: 0,
    totalDays: 0,
  },

  onLoad(options) {
    const plan = getPlanDetail(options.id)
    if (!plan) return

    // 富化阶段数据
    const enrichedPhases = plan.phases.map(phase => ({
      ...phase,
      daily: phase.daily.map(day => ({
        ...day,
        exerciseList: day.exercises.map(eid => {
          const ex = exercises.find(e => e.id === eid)
          return ex || { id: eid, title: eid, duration: 0, category: 'micro', difficulty: '入门' }
        }),
        meditationItem: day.meditation
          ? meditations.find(m => m.id === day.meditation) || null
          : null,
      }))
    }))

    // 总天数
    const totalDays = plan.phases.reduce((sum, p) => sum + p.daily.length, 0)

    // 检查是否已开始
    const activePlan = wx.getStorageSync('activePlan') || null
    const isStarted = activePlan && activePlan.planId === plan.id

    let completedDays = []
    let currentPhaseIndex = 0
    let currentDayIndex = 0

    if (isStarted) {
      completedDays = activePlan.completedDays || []
      // 找到当前应该在哪天
      const nextDay = completedDays.length + 1
      for (let pi = 0; pi < enrichedPhases.length; pi++) {
        const phase = enrichedPhases[pi]
        for (let di = 0; di < phase.daily.length; di++) {
          if (phase.daily[di].day === nextDay) {
            currentPhaseIndex = pi
            currentDayIndex = di
          }
        }
      }
    }

    const totalProgress = totalDays > 0 ? Math.round((completedDays.length / totalDays) * 100) : 0

    this.setData({
      plan,
      enrichedPhases,
      totalDays,
      started: isStarted,
      completedDays,
      totalProgress,
      currentPhaseIndex,
      currentDayIndex,
    })
  },

  onPhaseTap(e) {
    const idx = e.currentTarget.dataset.index
    this.setData({ currentPhaseIndex: idx, currentDayIndex: 0 })
  },

  onDayTap(e) {
    const idx = e.currentTarget.dataset.index
    this.setData({ currentDayIndex: idx })
  },

  onStartPlan() {
    if (this.data.started) {
      // 已开始 — 跳到当天第一个练习
      this.goToCurrentDayExercise()
      return
    }

    // 保存到 storage
    const activePlan = {
      planId: this.data.plan.id,
      completedDays: [],
      startedAt: Date.now(),
    }
    wx.setStorageSync('activePlan', activePlan)

    // 同步到 globalData
    const app = getApp()
    app.globalData.activePlan = activePlan

    this.setData({ started: true, completedDays: [], totalProgress: 0 })
    wx.showToast({ title: '计划已开始', icon: 'success' })
  },

  onExerciseTap(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/exercise/detail/detail?id=${id}` })
  },

  onMeditationTap(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/meditation/player/player?id=${id}` })
  },

  goToCurrentDayExercise() {
    const phase = this.data.enrichedPhases[this.data.currentPhaseIndex]
    if (!phase) return
    const day = phase.daily[this.data.currentDayIndex]
    if (!day || !day.exerciseList.length) return
    const exId = day.exerciseList[0].id
    wx.navigateTo({ url: `/pages/exercise/detail/detail?id=${exId}` })
  },

  // 标记当天完成（从运动完成页回调）
  onMarkDayComplete() {
    const currentPhase = this.data.enrichedPhases[this.data.currentPhaseIndex]
    const currentDay = currentPhase.daily[this.data.currentDayIndex]
    if (!currentDay) return

    const dayNum = currentDay.day
    if (this.data.completedDays.includes(dayNum)) return

    const completedDays = [...this.data.completedDays, dayNum]
    const totalProgress = Math.round((completedDays.length / this.data.totalDays) * 100)

    // 更新 storage
    const activePlan = wx.getStorageSync('activePlan') || {}
    activePlan.completedDays = completedDays
    wx.setStorageSync('activePlan', activePlan)
    getApp().globalData.activePlan = activePlan

    // 自动前进到下一天
    let nextPhaseIndex = this.data.currentPhaseIndex
    let nextDayIndex = this.data.currentDayIndex + 1
    if (nextDayIndex >= currentPhase.daily.length) {
      nextPhaseIndex++
      nextDayIndex = 0
    }
    if (nextPhaseIndex < this.data.enrichedPhases.length) {
      this.setData({
        completedDays,
        totalProgress,
        currentPhaseIndex: nextPhaseIndex,
        currentDayIndex: nextDayIndex,
      })
    } else {
      // 计划完成！
      this.setData({ completedDays, totalProgress: 100 })
      wx.showToast({ title: '恭喜完成计划！', icon: 'success' })
    }
  },
})
