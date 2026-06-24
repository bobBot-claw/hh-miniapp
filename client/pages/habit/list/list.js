// pages/habit/list/list.js - 习惯列表
const api = require('../../../utils/api')

Page({
  data: {
    habits: [],
    loading: true,
    templates: [
      { icon: '💧', name: '喝水 8 杯', category: '饮水' },
      { icon: '😴', name: '11点前睡觉', category: '睡眠' },
      { icon: '🏃', name: '运动 30 分钟', category: '运动' },
      { icon: '📖', name: '阅读 20 分钟', category: '学习' },
      { icon: '🧘', name: '冥想 10 分钟', category: '冥想' },
      { icon: '📝', name: '写日记', category: '反思' },
      { icon: '🚶', name: '走路 6000 步', category: '运动' },
      { icon: '🥗', name: '健康饮食', category: '饮食' },
      { icon: '🫁', name: '深呼吸练习', category: '冥想' },
      { icon: '📵', name: '放下手机 1 小时', category: '专注' }
    ]
  },

  onLoad() {
    this.loadHabits()
  },

  async loadHabits() {
    try {
      const res = await api.getHabits()
      this.setData({ habits: res.habits || [], loading: false })
    } catch (err) {
      console.error('加载习惯失败', err)
      this.setData({ loading: false })
    }
  },

  async onCheckin(e) {
    const { id, index } = e.currentTarget.dataset
    try {
      await api.checkinHabit(id)
      const habits = this.data.habits
      habits[index].todayChecked = true
      habits[index].streak = (habits[index].streak || 0) + 1
      this.setData({ habits })
      wx.showToast({ title: '打卡成功 ✅', icon: 'none' })
    } catch (err) {
      wx.showToast({ title: '打卡失败', icon: 'none' })
    }
  },

  onCreateHabit() {
    wx.navigateTo({ url: '/pages/habit/create/create' })
  },

  onHabitDetail(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/habit/detail/detail?id=${id}` })
  }
})
