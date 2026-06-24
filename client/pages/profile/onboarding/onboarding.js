// pages/profile/onboarding/onboarding.js - 冷启动问卷 v2.0
const api = require('../../../utils/api')

Page({
  data: {
    step: 0,
    steps: [
      {
        title: '你有什么身体问题？',
        subtitle: '可多选，至少选一个',
        multi: true,
        options: [
          { key: '肩颈痛', label: '🦴 肩颈疼痛/僵硬', selected: false },
          { key: '腰背不适', label: '🫄 腰背不适', selected: false },
          { key: '体态差', label: '🧍 体态差（圆肩/驼背）', selected: false },
          { key: '脑雾', label: '🧠 脑雾/注意力差', selected: false },
          { key: '压力', label: '😰 压力大/焦虑', selected: false },
          { key: '睡眠差', label: '😴 睡眠差', selected: false },
          { key: '眼疲劳', label: '👀 眼睛疲劳', selected: false },
          { key: '久坐', label: '🏃 久坐不动', selected: false }
        ]
      },
      {
        title: '你能接受的运动时长？',
        subtitle: '选一个最贴切的',
        multi: false,
        options: [
          { key: '1-3min', label: '⏱️ 1-3分钟', desc: '微行动，随时能做', selected: false },
          { key: '5min', label: '⏱️ 5分钟', desc: '短练习，工作间隙就能完成', selected: false },
          { key: '10min', label: '⏱️ 10分钟', desc: '完整练习，系统改善', selected: false }
        ]
      },
      {
        title: '你的运动习惯？',
        subtitle: '没关系，从哪里开始都可以',
        multi: false,
        options: [
          { key: 'sedentary', label: '🛋️ 基本不动', desc: '从零开始，需要最简单的', selected: false },
          { key: 'occasional', label: '🚶 偶尔动动', desc: '想养成习惯，坚持不下去', selected: false },
          { key: 'active', label: '🏃 有运动习惯', desc: '想针对性地改善', selected: false }
        ]
      }
    ]
  },

  onOptionTap(e) {
    const { index } = e.currentTarget.dataset
    const steps = this.data.steps
    const step = steps[this.data.step]

    if (step.multi) {
      step.options[index].selected = !step.options[index].selected
    } else {
      step.options.forEach((opt, i) => { opt.selected = i === index })
    }

    this.setData({ steps })
  },

  onNext() {
    const step = this.data.steps[this.data.step]
    const selected = step.options.filter(o => o.selected)

    if (selected.length === 0) {
      wx.showToast({ title: step.multi ? '请至少选一个' : '请选择一个', icon: 'none' })
      return
    }

    if (this.data.step < this.data.steps.length - 1) {
      this.setData({ step: this.data.step + 1 })
    } else {
      this.submitOnboarding()
    }
  },

  onBack() {
    if (this.data.step > 0) {
      this.setData({ step: this.data.step - 1 })
    } else {
      wx.navigateBack()
    }
  },

  async submitOnboarding() {
    const steps = this.data.steps

    const problemTags = steps[0].options.filter(o => o.selected).map(o => o.key)
    const durationPref = steps[1].options.find(o => o.selected)?.key || '5min'
    const exerciseHabit = steps[2].options.find(o => o.selected)?.key || 'sedentary'

    try {
      await api.submitOnboarding({
        problem_tags: problemTags,
        duration_pref: durationPref,
        exercise_habit: exerciseHabit
      })
      wx.showToast({ title: '设置完成 🎉', icon: 'none' })
      setTimeout(() => {
        wx.switchTab({ url: '/pages/index/index' })
      }, 1000)
    } catch (err) {
      console.error('提交 onboarding 失败', err)
      wx.showToast({ title: '提交失败，请重试', icon: 'none' })
    }
  }
})
