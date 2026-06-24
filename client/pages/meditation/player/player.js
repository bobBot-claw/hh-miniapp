// pages/meditation/player/player.js - 冥想播放器 v2.0
const api = require('../../../utils/api')

Page({
  data: {
    meditation: null,
    isPlaying: false,
    progress: 0,
    currentTime: 0,
    totalTime: 0,
    completed: false,
    feedback: null
  },

  bgAudioManager: null,
  timer: null,

  onLoad(options) {
    if (options.id) {
      this.loadMeditation(options.id)
    }
    this.bgAudioManager = wx.getBackgroundAudioManager()
    this.bgAudioManager.onEnded(() => {
      this.onComplete()
    })
  },

  onUnload() {
    if (this.timer) clearInterval(this.timer)
    if (this.bgAudioManager) this.bgAudioManager.stop()
  },

  async loadMeditation(id) {
    try {
      // Mock: find meditation by id from mock data
      const app = getApp()
      const mockData = require('../../../utils/mock-data')
      const meditation = mockData.getMeditations().meditations.find(m => m.id === id || m.id === parseInt(id))
      if (meditation) {
        this.setData({
          meditation,
          totalTime: meditation.duration || 300
        })
      }
    } catch (err) {
      console.error('加载冥想失败', err)
    }
  },

  onPlay() {
    if (!this.data.meditation) return

    this.setData({ isPlaying: true })

    // Simulate audio playback with timer for mock mode
    if (this.data.totalTime > 0) {
      this.timer = setInterval(() => {
        const newTime = this.data.currentTime + 1
        const progress = (newTime / this.data.totalTime) * 100

        if (newTime >= this.data.totalTime) {
          clearInterval(this.timer)
          this.onComplete()
          return
        }

        this.setData({
          currentTime: newTime,
          progress: progress
        })
      }, 1000)
    }
  },

  onPause() {
    this.setData({ isPlaying: false })
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  },

  onTogglePlay() {
    if (this.data.isPlaying) {
      this.onPause()
    } else {
      this.onPlay()
    }
  },

  async onComplete() {
    if (this.timer) clearInterval(this.timer)
    this.setData({ isPlaying: false, progress: 100, completed: true })

    try {
      const res = await api.completeExercise(this.data.meditation.id, 'meditation')
      this.setData({ feedback: res.feedback })
    } catch (err) {
      // Show basic completion feedback
      this.setData({
        feedback: {
          encouragement: '冥想完成！内心更平静了 🧘',
          stat_gains: { balance: 3 }
        }
      })
    }
  },

  onCloseFeedback() {
    wx.navigateBack()
  },

  formatTime(seconds) {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }
})
