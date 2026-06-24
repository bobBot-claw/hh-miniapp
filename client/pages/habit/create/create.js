// pages/habit/create/create.js
const api = require('../../../utils/api')

Page({
  data: {
    templates: [
      { icon: '💧', name: '喝水 8 杯', category: '饮水', schedule: 'all_day' },
      { icon: '😴', name: '11点前睡觉', category: '睡眠', schedule: 'evening' },
      { icon: '🏃', name: '运动 30 分钟', category: '运动', schedule: 'morning' },
      { icon: '📖', name: '阅读 20 分钟', category: '学习', schedule: 'evening' },
      { icon: '🧘', name: '冥想 10 分钟', category: '冥想', schedule: 'morning' },
      { icon: '📝', name: '写日记', category: '反思', schedule: 'evening' },
      { icon: '🚶', name: '走路 6000 步', category: '运动', schedule: 'all_day' },
      { icon: '🥗', name: '健康饮食', category: '饮食', schedule: 'all_day' },
      { icon: '🫁', name: '深呼吸练习', category: '冥想', schedule: 'morning' },
      { icon: '📵', name: '放下手机 1 小时', category: '专注', schedule: 'evening' }
    ],
    selected: -1,
    customName: '',
    customIcon: '⭐'
  },

  onSelectTemplate(e) {
    const index = e.currentTarget.dataset.index
    this.setData({ selected: index, customName: '' })
  },

  onCustomInput(e) {
    this.setData({ customName: e.detail.value, selected: -1 })
  },

  async onCreate() {
    let habit
    if (this.data.selected >= 0) {
      habit = this.data.templates[this.data.selected]
    } else if (this.data.customName) {
      habit = { name: this.data.customName, icon: this.data.customIcon, schedule: 'all_day', category: '自定义' }
    } else {
      wx.showToast({ title: '请选择或输入习惯', icon: 'none' })
      return
    }

    try {
      await api.createHabit(habit)
      wx.showToast({ title: '创建成功 ✅', icon: 'none' })
      setTimeout(() => wx.navigateBack(), 1000)
    } catch (err) {
      wx.showToast({ title: '创建失败', icon: 'none' })
    }
  }
})
