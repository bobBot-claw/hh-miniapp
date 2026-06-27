// app.js — 慢慢变好 v0.7
App({
  onLaunch() {
    this.getSystemInfo()
    this.initAppState()
  },

  globalData: {
    systemInfo: null,
    appState: null,
  },

  getSystemInfo() {
    try {
      this.globalData.systemInfo = wx.getSystemInfoSync()
    } catch (e) {
      console.error('获取系统信息失败', e)
    }
  },

  initAppState() {
    // 读取本地持久化状态
    try {
      this.globalData.appState = wx.getStorageSync('appState') || {}
    } catch (e) {
      this.globalData.appState = {}
    }
  },

  saveAppState(data) {
    this.globalData.appState = { ...this.globalData.appState, ...data }
    try {
      wx.setStorageSync('appState', this.globalData.appState)
    } catch (e) {
      console.error('保存状态失败', e)
    }
  },
})
