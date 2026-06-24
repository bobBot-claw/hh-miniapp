// pages/exercise/detail/detail.js - 运动详情
const api = require('../../../utils/api')

Page({
  data: {
    exercise: null,
    loading: true
  },

  onLoad(options) {
    if (options.id) {
      this.loadExercise(options.id)
    }
  },

  async loadExercise(id) {
    try {
      const res = await api.getExerciseDetail(id)
      this.setData({ exercise: res.exercise, loading: false })
    } catch (err) {
      console.error('加载运动详情失败', err)
      this.setData({ loading: false })
      wx.showToast({ title: '加载失败', icon: 'none' })
    }
  },

  onStartTap() {
    const id = this.data.exercise.id
    wx.navigateTo({ url: `/pages/exercise/player/player?id=${id}` })
  }
})
