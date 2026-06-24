// pages/exercise/player/player.js - 跟练播放器 v2.0 (含 Mock 降级)
const api = require('../../../utils/api')

Page({
  data: {
    exercise: null,
    loading: true,
    playing: false,
    currentTime: 0,
    duration: 0,
    completed: false,
    feedback: null,
    hasVideo: false,  // 是否有真实视频
    mockPlaying: false, // mock 模拟播放
    mockProgress: 0,
    countDown: 0,
    timerPhase: 'ready' // ready / countdown / playing / done
  },

  videoContext: null,
  mockTimer: null,

  onLoad(options) {
    if (options.id) {
      this.loadExercise(options.id)
    }
  },

  onUnload() {
    if (this.mockTimer) clearInterval(this.mockTimer)
  },

  async loadExercise(id) {
    try {
      const res = await api.getExerciseDetail(id)
      const exercise = res.exercise
      const hasVideo = !!(exercise.video_url && exercise.video_url.length > 5)
      this.setData({
        exercise,
        duration: exercise.duration || 300,
        loading: false,
        hasVideo,
        countDown: hasVideo ? 0 : 3
      })
      if (hasVideo) {
        this.videoContext = wx.createVideoContext('exerciseVideo')
      }
    } catch (err) {
      console.error('加载运动失败', err)
      this.setData({ loading: false })
    }
  },

  // === 真实视频事件 ===
  onVideoPlay() {
    this.setData({ playing: true })
  },

  onVideoPause() {
    this.setData({ playing: false })
  },

  onVideoEnded() {
    this.setData({ playing: false, completed: true })
    this.completeExercise()
  },

  onVideoTimeUpdate(e) {
    this.setData({ currentTime: Math.floor(e.detail.currentTime) })
  },

  onPlayPauseTap() {
    if (this.data.playing) {
      this.videoContext.pause()
    } else {
      this.videoContext.play()
    }
  },

  // === Mock 模式：动画计时器 ===
  onStartMock() {
    this.setData({ timerPhase: 'countdown', countDown: 3 })
    const countdownTimer = setInterval(() => {
      const newCount = this.data.countDown - 1
      if (newCount <= 0) {
        clearInterval(countdownTimer)
        this.startMockPlay()
      } else {
        this.setData({ countDown: newCount })
      }
    }, 1000)
  },

  startMockPlay() {
    this.setData({ timerPhase: 'playing', mockPlaying: true, playing: true })
    const totalDuration = Math.min(this.data.duration, 30) // mock 模式最多 30 秒模拟
    let elapsed = 0

    this.mockTimer = setInterval(() => {
      elapsed += 1
      const progress = (elapsed / totalDuration) * 100

      if (elapsed >= totalDuration) {
        clearInterval(this.mockTimer)
        this.setData({
          mockPlaying: false,
          playing: false,
          completed: true,
          mockProgress: 100,
          currentTime: this.data.duration
        })
        this.completeExercise()
        return
      }

      this.setData({
        currentTime: elapsed,
        mockProgress: progress
      })
    }, 1000)
  },

  onPauseMock() {
    if (this.mockTimer) {
      clearInterval(this.mockTimer)
      this.mockTimer = null
    }
    this.setData({ mockPlaying: false, playing: false })
  },

  onResumeMock() {
    this.startMockPlay()
  },

  // === 通用 ===
  async completeExercise() {
    if (!this.data.exercise) return
    try {
      const res = await api.completeExercise(this.data.exercise.id, this.data.duration, true)
      this.setData({ feedback: res.feedback })
    } catch (err) {
      console.error('完成反馈失败', err)
      this.setData({
        feedback: {
          encouragement: '太棒了！你完成了一次运动 💪',
          body_hint: '保持呼吸节奏，感受身体的变化',
          stat_gains: [
            { stat: 'posture', label: '🦴 体态健康', gain: 3 },
            { stat: 'vitality', label: '⚡ 活力值', gain: 2 }
          ]
        }
      })
    }
  },

  onDoneTap() {
    if (!this.data.completed && this.data.exercise) {
      api.completeExercise(this.data.exercise.id, this.data.currentTime, false)
    }
    wx.navigateBack()
  },

  onDoAnotherTap() {
    wx.navigateBack()
  },

  formatTime(seconds) {
    const min = Math.floor(seconds / 60)
    const sec = Math.floor(seconds % 60)
    return `${min}:${sec.toString().padStart(2, '0')}`
  }
})
