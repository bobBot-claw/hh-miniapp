// pages/exercise/list/list.js - 运动分类列表 v2.0
const api = require('../../../utils/api')

Page({
  data: {
    categories: [],
    exercises: [],
    activeCategory: '',
    loading: true
  },

  onLoad(options) {
    if (options.category) {
      this.setData({ activeCategory: options.category })
    }
    this.loadCategories()
    this.loadExercises(this.data.activeCategory)
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 })
    }
  },

  async loadCategories() {
    try {
      const res = await api.getExerciseCategories()
      this.setData({ categories: res.categories || [] })
    } catch (err) {
      console.error('加载分类失败', err)
    }
  },

  async loadExercises(category) {
    this.setData({ loading: true })
    try {
      const res = await api.getExercises(category || '')
      const exerciseList = (res.exercises || []).map(ex => ({
        ...ex,
        duration_text: ex.duration_text || (ex.duration < 60 ? `${ex.duration}s` : `${Math.floor(ex.duration / 60)}min`)
      }))
      this.setData({ exercises: exerciseList, loading: false })
    } catch (err) {
      console.error('加载运动列表失败', err)
      this.setData({ exercises: [], loading: false })
    }
  },

  onCategoryTap(e) {
    const { key } = e.currentTarget.dataset
    const newCategory = key === this.data.activeCategory ? '' : key
    this.setData({ activeCategory: newCategory })
    this.loadExercises(newCategory)
  },

  onExerciseTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({ url: `/pages/exercise/detail/detail?id=${id}` })
  }
})
