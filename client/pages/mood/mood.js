// pages/mood/mood.js — 微光契约：与 demo 屏2 完全一致

Page({
  data: {
    reward: '',
    selectedPill: '',
  },

  onRewardInput(e) {
    this.setData({ reward: e.detail.value, selectedPill: '' })
  },

  selectPill(e) {
    const val = e.currentTarget.dataset.val
    this.setData({ selectedPill: val, reward: val })
  },

  signContract() {
    let state = {}
    try { state = wx.getStorageSync('appState') || {} } catch(e) {}
    state.contractReward = this.data.reward
    state.contractSigned = true
    try { wx.setStorageSync('appState', state) } catch(e) {}
    wx.reLaunch({ url: '/pages/home/home' })
  },

  goBack() {
    wx.navigateBack()
  },
})
