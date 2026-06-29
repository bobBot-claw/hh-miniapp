// pages/home/home.js — 慢慢变好 · 七日微光计划 — 与 demo 完全一致

const WEEK_PLAN = [
  { day: 0, label: '周 一', title: '晨 起 一 杯 温 水', sub: '极 低 成 本', scene: '吃 · 喝 水', know: { tag: '吃 · 喝 水', text: '晨起喝水能降低血液粘稠度 · 你为今天的心血管减负了一次' } },
  { day: 1, label: '周 二', title: '午 餐 一 个 拳 头 蛋 白 质', sub: '低 成 本', scene: '吃 · 蛋 白 质', know: { tag: '吃 · 蛋 白 质', text: '早上蛋白质优先 · 上午的血糖比昨天平稳 · 你今天不容易困' } },
  { day: 2, label: '周 三', title: '快 走 / 爬 楼 15 分', sub: '中 成 本', scene: '动 · 每 日 出 汗', know: { tag: '动 · 每 日 出 汗', text: '快走后肌肉会释放鸢尾素 · 这种激素能穿过血脑屏障 · 改善记忆力' } },
  { day: 3, label: '周 四', title: '晚 餐 选 原 型 食 物', sub: '低 成 本', scene: '吃 · 原 型 食 物', know: { tag: '吃 · 原 型 食 物', text: '原型食物的饱腹感比加工食品多30% · 你今天少吃了却不饿' } },
  { day: 4, label: '周 五', title: '一 组 力 竭 训 练', sub: '中 成 本', scene: '动 · 抗 阻 力 竭', know: { tag: '动 · 抗 阻 力 竭', text: '力竭训练后48小时基础代谢仍升高 · 你在休息时也在消耗' } },
  { day: 5, label: '周 六', title: '睡 前 1 小 时 调 暗 灯 光 + 手 机 放 客 厅', sub: '低 成 本', scene: '睡 · 暗 光 / 隔 离', know: { tag: '睡 · 暗 光 / 隔 离', text: '暗光环境让褪黑素提前分泌30% · 你今晚会比平时早困' } },
  { day: 6, label: '周 日', title: '发 呆 10 分 钟 · 什 么 都 不 做', sub: '极 低 成 本', scene: '情 绪 · 留 白', know: { tag: '情 绪 · 留 白', text: '主动发呆能降低杏仁核活跃度 · 你的焦虑不是少了 · 是被看见了' } },
]

Page({
  data: {
    weekNum: 1,
    dateText: '',
    actionTitle: '',
    actionSub: '',
    sceneLabel: '',
    doneCount: 0,
    weekDays: [],
    knowCards: [],
  },

  onLoad() { this.refresh() },
  onShow() { this.refresh() },

  refresh() {
    let state = {}
    try { state = wx.getStorageSync('appState') || {} } catch(e) {}

    const now = new Date()
    const jsDay = now.getDay() // 0=Sun
    const dayIdx = jsDay === 0 ? 6 : jsDay - 1 // 0=Mon

    const weekNum = state.weekNum || 1

    const m = now.getMonth() + 1
    const d = now.getDate()
    const dateText = `${m} 月 ${d} 日`

    const today = WEEK_PLAN[dayIdx]
    const actionTitle = today.title
    const actionSub = today.sub
    const sceneLabel = today.scene

    const weekDone = state.weekDone || []
    const weekDays = WEEK_PLAN.map((w, i) => ({
      idx: i,
      label: w.label,
      state: weekDone.includes(i) ? 'done' : (i === dayIdx ? 'now' : ''),
    }))
    const doneCount = weekDone.length

    const knowCards = (state.knowCards || []).map(idx => WEEK_PLAN[idx].know)

    this.setData({
      weekNum, dateText, actionTitle, actionSub, sceneLabel,
      doneCount, weekDays, knowCards, dayIdx,
    })
  },

  startAction() {
    wx.navigateTo({ url: '/pages/action/action' })
  },

  openContract() {
    wx.navigateTo({ url: '/pages/mood/mood' })
  },

  goWorld() {
    wx.navigateTo({ url: '/pages/world/world' })
  },

  goWeekPlan() {
    wx.navigateTo({ url: '/pages/together/together' })
  },
})
