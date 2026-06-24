// utils/api.js - API 请求封装 v2.0
const app = getApp()

const api = {
  // 认证
  login(code) {
    return app.request({ url: '/api/auth/login', method: 'POST', data: { code } })
  },

  // 用户画像
  getProfile() {
    return app.request({ url: '/api/user/profile' })
  },

  updateProfile(data) {
    return app.request({ url: '/api/user/profile', method: 'PUT', data })
  },

  submitOnboarding(data) {
    return app.request({ url: '/api/user/onboarding', method: 'POST', data })
  },

  // 推荐
  getRecommendations() {
    return app.request({ url: '/api/recommendations' })
  },

  getExerciseRecommendations(category, limit) {
    const params = {}
    if (category) params.category = category
    if (limit) params.limit = limit
    return app.request({ url: '/api/recommendations/exercises', data: params })
  },

  // 运动内容
  getExerciseCategories() {
    return app.request({ url: '/api/exercises/categories' })
  },

  getExercises(category) {
    const params = {}
    if (category) params.category = category
    return app.request({ url: '/api/exercises', data: params })
  },

  getExerciseDetail(id) {
    return app.request({ url: `/api/exercises/${id}` })
  },

  // 健康知识
  getKnowledge(params) {
    return app.request({ url: '/api/knowledge', data: params })
  },

  getKnowledgeDetail(id) {
    return app.request({ url: `/api/knowledge/${id}` })
  },

  // 冥想
  getMeditations(params) {
    return app.request({ url: '/api/meditations', data: params })
  },

  getMeditationDetail(id) {
    return app.request({ url: `/api/meditations/${id}` })
  },

  // 能力值与统计
  getStats() {
    return app.request({ url: '/api/stats' })
  },

  getAchievements() {
    return app.request({ url: '/api/stats/achievements' })
  },

  getWeeklyReport() {
    return app.request({ url: '/api/stats/weekly-report' })
  },

  // 即时反馈
  completeExercise(exerciseId, durationCompleted, completed) {
    return app.request({
      url: '/api/feedback/complete',
      method: 'POST',
      data: { exercise_id: exerciseId, duration_completed: durationCompleted, completed }
    })
  },

  // 行为
  reportBehavior(data) {
    return app.request({ url: '/api/behaviors', method: 'POST', data })
  },

  getBehaviorStats() {
    return app.request({ url: '/api/behaviors/stats' })
  },

  // AI 生成
  getDailyText() {
    return app.request({ url: '/api/ai/daily-text', method: 'POST' })
  }
}

module.exports = api
