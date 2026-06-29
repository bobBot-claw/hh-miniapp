// pages/done/done.js — 完成：认知卡片确认页（备用）
const WEEK_PLAN = [
  { knowTitle: '晨起一杯温水 · 收工', knowText: '晨起喝水能降低血液粘稠度 · 你为今天的心血管减负了一次', knowEm: '你今天的血比昨天稀了一点' },
  { knowTitle: '午餐一个拳头蛋白质 · 收工', knowText: '早上蛋白质优先 · 上午的血糖比昨天平稳 · 你今天不容易困', knowEm: '你今天的脑子比昨天好使了一点' },
  { knowTitle: '快 走 15 分 · 收 工', knowText: '快走后肌肉会释放鸢尾素 · 这种激素能穿过血脑屏障 · 改善记忆力', knowEm: '你今天的脑子比昨天好使了一点' },
  { knowTitle: '晚餐选原型食物 · 收工', knowText: '原型食物的饱腹感比加工食品多30% · 你今天少吃了却不饿', knowEm: '你今天少吃了 · 但不觉得亏' },
  { knowTitle: '力竭训练 · 收工', knowText: '力竭训练后48小时基础代谢仍升高 · 你在休息时也在消耗', knowEm: '你现在坐着也在比昨天多烧' },
  { knowTitle: '暗光隔离 · 收工', knowText: '暗光环境让褪黑素提前分泌30% · 你今晚会比平时早困', knowEm: '你今晚可能比昨天早困半小时' },
  { knowTitle: '发呆10分钟 · 收工', knowText: '主动发呆能降低杏仁核活跃度 · 你的焦虑不是少了 · 是被看见了', knowEm: '你的焦虑没少 · 但它知道你看见了' },
]

Page({
  data: {
    cognizeTitle: '',
    cognizeText: '',
    cognizeEm: '',
  },

  onLoad() {
    const now = new Date()
    const jsDay = now.getDay()
    const dayIdx = jsDay === 0 ? 6 : jsDay - 1
    const today = WEEK_PLAN[dayIdx]
    this.setData({
      cognizeTitle: today.knowTitle,
      cognizeText: today.knowText,
      cognizeEm: today.knowEm,
    })
  },

  goHome() {
    wx.reLaunch({ url: '/pages/home/home' })
  },
})
