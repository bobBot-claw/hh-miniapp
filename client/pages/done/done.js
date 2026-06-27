// pages/done/done.js — 完成后 v0.8
const { ACTIONS, WORLDS, getCurrentAction } = require('../../utils/actions')

Page({
  data: { revealed:false, eggClearUrl:'', worldName:'', eggIndex:1, feeling:'', benefit:'', together:false, actionTitle:'' },

  onLoad(options) {
    let state = {}; try { state = wx.getStorageSync('appState')||{} } catch(e) {}
    const worldId = state.currentWorld||'forest'
    const world = WORLDS.find(w=>w.id===worldId)||WORLDS[0]
    const progress = state.worldProgress||{}
    const revealedCount = (progress[worldId]||0)+1
    const action = (options.actionId&&ACTIONS[options.actionId]) ? ACTIONS[options.actionId] : getCurrentAction()
    const together = options.together==='1'
    state.lastRevealDate = this.getTodayKey(); state.worldProgress = {...progress,[worldId]:revealedCount}
    try { wx.setStorageSync('appState',state) } catch(e) {}
    this.setData({ worldName:world.name, eggIndex:revealedCount, eggClearUrl:world.eggs.length>0?world.eggs[Math.min(revealedCount-1,world.eggs.length-1)].clearUrl:'', feeling:action?action.feeling:'', benefit:action?action.benefit:'', together, actionTitle:action?action.title:'' })
    setTimeout(()=>this.setData({revealed:true}),100)
  },

  getTodayKey() { const d=new Date(); return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}` },
  onShareAppMessage() { return { title:`我刚做完了${this.data.actionTitle||'今天的行动'}`, path:'/pages/together/together' } },
  goWorld() { wx.redirectTo({url:'/pages/world/world'}) },
  goHome() { wx.reLaunch({url:'/pages/home/home'}) },
})
