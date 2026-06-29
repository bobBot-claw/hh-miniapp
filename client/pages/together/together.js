// pages/together/together.js — 全周计划：与 demo 屏5 完全一致

const WEEK_PLAN = [
  { dayLabel: '周一', title: '晨 起 一 杯 温 水', scene: '吃 · 喝 水', cost: '极 低 成 本' },
  { dayLabel: '周二', title: '午 餐 一 个 拳 头 蛋 白 质', scene: '吃 · 蛋 白 质', cost: '低 成 本' },
  { dayLabel: '周三', title: '快 走 / 爬 楼 15 分', scene: '动 · 每 日 出 汗', cost: '中 成 本' },
  { dayLabel: '周四', title: '晚 餐 选 原 型 食 物', scene: '吃 · 原 型 食 物', cost: '低 成 本' },
  { dayLabel: '周五', title: '一 组 力 竭 训 练', scene: '动 · 抗 阻 力 竭', cost: '中 成 本' },
  { dayLabel: '周六', title: '睡 前 1 小 时 调 暗 灯 光 + 手 机 放 客 厅', scene: '睡 · 暗 光 / 隔 离', cost: '低 成 本' },
  { dayLabel: '周日', title: '发 呆 10 分 钟 · 什 么 都 不 做', scene: '情 绪 · 留 白', cost: '极 低 成 本' },
]

Page({
  data: {
    weekDays: [],
  },

  onLoad() {
    const now = new Date()
    const jsDay = now.getDay()
    const todayIdx = jsDay === 0 ? 6 : jsDay - 1

    const weekDays = WEEK_PLAN.map((w, i) => ({
      idx: i,
      dayLabel: w.dayLabel,
      title: w.title,
      scene: w.scene,
      cost: w.cost,
      isToday: i === todayIdx,
    }))

    this.setData({ weekDays })
  },

  goBack() {
    wx.navigateBack()
  },
})
