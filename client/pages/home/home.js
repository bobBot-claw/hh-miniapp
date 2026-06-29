// pages/home/home.js — 慢慢变好 · 七日微光计划 — 含夜间模式

const WEEK_PLAN = [
  { day: 0, label: '周 一', title: '晨 起 一 杯 温 水', sub: '极 低 成 本', scene: '吃 · 喝 水', know: { tag: '吃 · 喝 水', text: '晨起喝水能降低血液粘稠度 · 你为今天的心血管减负了一次' } },
  { day: 1, label: '周 二', title: '午 餐 一 个 拳 头 蛋 白 质', sub: '低 成 本', scene: '吃 · 蛋 白 质', know: { tag: '吃 · 蛋 白 质', text: '早上蛋白质优先 · 上午的血糖比昨天平稳 · 你今天不容易困' } },
  { day: 2, label: '周 三', title: '快 走 / 爬 楼 15 分', sub: '中 成 本', scene: '动 · 每 日 出 汗', know: { tag: '动 · 每 日 出 汗', text: '快走后肌肉会释放鸢尾素 · 这种激素能穿过血脑屏障 · 改善记忆力' } },
  { day: 3, label: '周 四', title: '晚 餐 选 原 型 食 物', sub: '低 成 本', scene: '吃 · 原 型 食 物', know: { tag: '吃 · 原 型 食 物', text: '原型食物的饱腹感比加工食品多30% · 你今天少吃了却不饿' } },
  { day: 4, label: '周 五', title: '一 组 力 竭 训 练', sub: '中 成 本', scene: '动 · 抗 阻 力 竭', know: { tag: '动 · 抗 阻 力 竭', text: '力竭训练后48小时基础代谢仍升高 · 你在休息时也在消耗' } },
  { day: 5, label: '周 六', title: '睡 前 1 小 时 调 暗 灯 光 + 手 机 放 客 厅', sub: '低 成 本', scene: '睡 · 暗 光 / 隔 离', know: { tag: '睡 · 暗 光 / 隔 离', text: '暗光环境让褪黑素提前分泌30% · 你今晚会比平时早困' } },
  { day: 6, label: '周 日', title: '发 呆 10 分 钟 · 什 么 都 不 做', sub: '极 低 成 本', scene: '情 绪 · 留 白', know: { tag: '情 绪 · 留 白', text: '主动发呆能降低杏仁核活跃度 · 你的焦虑不是少了 · 是被看见了' } },
]

const NIGHT_WORDS = [
  '今天已经做得很好了，\n剩下的交给睡眠。',
  '白天你照顾了世界，\n现在轮到身体照顾你。',
  '身体有自己的时钟，\n你准时了，它便开始修复。',
  '节律不是自律，是身体的语言。\n你在听。',
  '早睡的每一分钟，\n都是对明天自己的投资。',
  '生物钟不会骗人，\n你给它规律，它给你精力。',
  '大脑不需要思考了，\n交给呼吸就好。',
  '此时此刻，什么都不用做，\n躺着就是贡献。',
  '发呆是白天的事，\n现在只需闭上眼睛。',
  '没有电话、没有消息、没有任务——\n只有你和夜色。',
  '该睡了。',
  '夜已深，身已静。',
  '关机，交给梦。',
  '今日终。',
]

Page({
  data: {
    isNight: false,
    nightWord: '',
    nightTime: '',
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
    const now = new Date()
    const hour = now.getHours()
    const isNight = hour >= 23 || hour < 5

    if (isNight) {
      const h = String(hour).padStart(2, '0')
      const m = String(now.getMinutes()).padStart(2, '0')
      // 基于日期的随机，同一天显示同一句
      const seed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate()
      const idx = seed % NIGHT_WORDS.length
      this.setData({
        isNight: true,
        nightTime: h + ':' + m,
        nightWord: NIGHT_WORDS[idx],
      })
      return
    }

    let state = {}
    try { state = wx.getStorageSync('appState') || {} } catch(e) {}

    const jsDay = now.getDay()
    const dayIdx = jsDay === 0 ? 6 : jsDay - 1

    const weekNum = state.weekNum || 1
    const mt = now.getMonth() + 1
    const d = now.getDate()
    const dateText = mt + ' 月 ' + d + ' 日'

    const today = WEEK_PLAN[dayIdx]
    const weekDone = state.weekDone || []
    const weekDays = WEEK_PLAN.map((w, i) => ({
      idx: i,
      label: w.label,
      state: weekDone.includes(i) ? 'done' : (i === dayIdx ? 'now' : ''),
    }))

    this.setData({
      isNight: false,
      weekNum,
      dateText,
      actionTitle: today.title,
      actionSub: today.sub,
      sceneLabel: today.scene,
      doneCount: weekDone.length,
      weekDays,
      knowCards: (state.knowCards || []).map(idx => WEEK_PLAN[idx].know),
      dayIdx,
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
