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
  },

  onLoad(options) {
    const plan = getPlanDetail(options.id)
    if (!plan) return

    // 富化阶段数据：把 exercise/meditation ID 替换为实际内容
    const enrichedPhases = plan.phases.map(phase => ({
      ...phase,
      daily: phase.daily.map(day => ({
        ...day,
        exerciseList: day.exercises.map(eid => {
          const ex = exercises.find(e => e.id === eid)
          return ex || { id: eid, title: eid, duration: 0 }
        }),
        meditationItem: day.meditation
          ? meditations.find(m => m.id === day.meditation) || null
          : null,
      }))
    }))

    this.setData({ plan, enrichedPhases })
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
    this.setData({ started: true })
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
})
