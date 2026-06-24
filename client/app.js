// app.js - HH小程序入口 v2.0 (含本地 Mock 数据用于预览)
const mockData = require('./utils/mock-data')

App({
  onLaunch() {
    this.getSystemInfo()
    // Mock 模式：不需要真实登录
    this.globalData.token = 'mock-token'
    this.globalData.userInfo = mockData.mockUser
    this.globalData.userProfile = mockData.defaultProfile
  },

  globalData: {
    userInfo: null,
    userProfile: null,
    systemInfo: null,
    apiBase: 'https://api.hh-miniapp.com',
    token: null,
    useMock: true  // 设为 false 连接真实后端
  },

  getSystemInfo() {
    try {
      const systemInfo = wx.getSystemInfoSync()
      this.globalData.systemInfo = systemInfo
    } catch (e) {
      console.error('获取系统信息失败', e)
    }
  },

  // 微信登录（真实环境用）
  login() {
    if (this.globalData.useMock) {
      return Promise.resolve(mockData.mockUser)
    }
    return new Promise((resolve, reject) => {
      wx.login({
        success: (res) => {
          if (res.code) {
            wx.request({
              url: `${this.globalData.apiBase}/api/auth/login`,
              method: 'POST',
              data: { code: res.code },
              success: (resp) => {
                if (resp.statusCode === 200) {
                  const { token, userInfo } = resp.data
                  this.globalData.token = token
                  this.globalData.userInfo = userInfo
                  wx.setStorageSync('token', token)
                  resolve(userInfo)
                } else {
                  reject(new Error('登录失败'))
                }
              },
              fail: reject
            })
          } else {
            reject(new Error('wx.login 失败'))
          }
        },
        fail: reject
      })
    })
  },

  // 封装请求方法（Mock 模式下返回本地数据）
  request(options) {
    if (this.globalData.useMock) {
      return this.mockRequest(options)
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.globalData.apiBase}${options.url}`,
        method: options.method || 'GET',
        data: options.data || {},
        header: {
          'Authorization': `Bearer ${this.globalData.token}`,
          'Content-Type': 'application/json',
          ...options.header
        },
        success: (res) => {
          if (res.statusCode === 401) {
            this.login().then(() => {
              this.request(options).then(resolve).catch(reject)
            })
          } else if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(res.data)
          } else {
            reject(res)
          }
        },
        fail: reject
      })
    })
  },

  // Mock 请求处理
  mockRequest(options) {
    const url = options.url
    const method = options.method || 'GET'

    return new Promise((resolve) => {
      // 模拟网络延迟
      setTimeout(() => {

        // 推荐接口
        if (url === '/api/recommendations' && method === 'GET') {
          resolve(mockData.getHomepageRecommendations())
        }
        // 运动分类
        else if (url === '/api/exercises/categories' && method === 'GET') {
          resolve(mockData.getCategories())
        }
        // 运动列表
        else if (url.startsWith('/api/exercises?') || (url === '/api/exercises' && method === 'GET')) {
          const category = options.data?.category || ''
          resolve(mockData.getExercises(category))
        }
        // 运动详情
        else if (url.match(/\/api\/exercises\/ex_/)) {
          const id = url.split('/').pop()
          resolve(mockData.getExerciseDetail(id))
        }
        // 冥想列表
        else if (url.startsWith('/api/meditations') && method === 'GET') {
          resolve(mockData.getMeditations())
        }
        // 冥想详情
        else if (url.match(/\/api\/meditations\/med_/)) {
          const id = url.split('/').pop()
          resolve(mockData.getMeditationDetail(id))
        }
        // 知识列表
        else if (url.startsWith('/api/knowledge') && method === 'GET') {
          resolve(mockData.getKnowledge())
        }
        // 能力值
        else if (url === '/api/stats' && method === 'GET') {
          resolve(mockData.getStats())
        }
        // 成就
        else if (url === '/api/stats/achievements' && method === 'GET') {
          resolve(mockData.getAchievements())
        }
        // 周报
        else if (url === '/api/stats/weekly-report' && method === 'GET') {
          resolve(mockData.getWeeklyReport())
        }
        // 完成反馈
        else if (url === '/api/feedback/complete' && method === 'POST') {
          resolve(mockData.getFeedback(options.data))
        }
        // 用户画像
        else if (url === '/api/user/profile' && method === 'GET') {
          resolve(this.globalData.userProfile)
        }
        // 更新画像
        else if (url === '/api/user/profile' && method === 'PUT') {
          this.globalData.userProfile = { ...this.globalData.userProfile, ...options.data }
          resolve({ ok: true })
        }
        // onboarding
        else if (url === '/api/user/onboarding' && method === 'POST') {
          this.globalData.userProfile = {
            ...this.globalData.userProfile,
            problem_tags: options.data.problem_tags,
            duration_pref: options.data.duration_pref,
            exercise_habit: options.data.exercise_habit,
          }
          resolve({ ok: true })
        }
        // 行为日志
        else if (url === '/api/behaviors' && method === 'POST') {
          resolve({ ok: true })
        }
        // 行为统计
        else if (url === '/api/behaviors/stats' && method === 'GET') {
          resolve(mockData.getBehaviorStats())
        }
        // AI 文案
        else if (url === '/api/ai/daily-text' && method === 'POST') {
          resolve({ text: mockData.getDailyText() })
        }
        // 运动推荐
        else if (url.startsWith('/api/recommendations/exercises') && method === 'GET') {
          resolve({ items: mockData.getExercises(options.data?.category || '').exercises.slice(0, 5) })
        }
        else {
          resolve({})
        }
      }, 200)
    })
  }
})
