// pages/mood/mood.js — 情绪天气：5天气+1词
Page({
  data: {
    weathers: [
      { id: 'sunny', name: '晴' },
      { id: 'cloudy', name: '多云' },
      { id: 'rainy', name: '小雨' },
      { id: 'stormy', name: '雷阵雨' },
      { id: 'after', name: '雨后' },
    ],
    selectedWeather: '',
    word: '',
  },

  onLoad() {
    // 读取今日情绪
    let state = {}
    try { state = wx.getStorageSync('appState') || {} } catch(e) {}
    const todayKey = this.getTodayKey()
    const mood = state.moods && state.moods[todayKey]
    if (mood) {
      this.setData({ selectedWeather: mood.weather, word: mood.word || '' })
    }
  },

  selectWeather(e) {
    this.setData({ selectedWeather: e.currentTarget.dataset.id })
  },

  onWordInput(e) {
    this.setData({ word: e.detail.value })
  },

  saveMood() {
    if (!this.data.selectedWeather) return

    const todayKey = this.getTodayKey()
    let state = {}
    try { state = wx.getStorageSync('appState') || {} } catch(e) {}

    if (!state.moods) state.moods = {}
    state.moods[todayKey] = {
      weather: this.data.selectedWeather,
      word: this.data.word,
    }

    try { wx.setStorageSync('appState', state) } catch(e) {}

    wx.navigateBack()
  },

  goBack() {
    wx.navigateBack()
  },

  getTodayKey() {
    const d = new Date()
    return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
  },
})
