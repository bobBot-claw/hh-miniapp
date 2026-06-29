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

// 节气安眠文案（四立）
const SOLAR_WORDS = {
  lichun: '春夜宜安眠，万物在生长，你也是。',
  lixia: '夏夜风轻，适合把烦闷交给月亮。',
  liqiu: '秋夜渐凉，早睡是对身体的温柔。',
  lidong: '冬夜漫长，正好多睡一会儿。',
}

// 判断当天是否为四立节气（基于寿星万年历算法，误差±1天内）
function getSolarTerm(year, termIdx) {
  // 24节气对应的世纪常数 C
  const C = [
    3.87, 18.73, 5.63, 20.59, 4.15, 20.10,   // 小寒~谷雨
    5.52, 21.15, 6.18, 21.95, 7.20, 23.00,   // 立夏~大暑
    7.50, 23.23, 8.08, 23.72, 7.95, 23.63,   // 立秋~霜降
    8.15, 23.85, 7.85, 23.48, 7.60, 23.08,   // 立冬~冬至
  ]
  const Y = year % 100
  const L = Math.floor(Y / 4)
  const day = Math.floor(Y * 0.2422 + C[termIdx]) - L
  return day
}

function checkSolarTerms(now) {
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const date = now.getDate()
  // 四立对应的 termIdx: 立春=2, 立夏=6, 立秋=12, 立冬=18
  const terms = [
    { key: 'lichun', idx: 2, month: 2 },
    { key: 'lixia', idx: 6, month: 5 },
    { key: 'liqiu', idx: 12, month: 8 },
    { key: 'lidong', idx: 18, month: 11 },
  ]
  for (const t of terms) {
    if (month === t.month) {
      const day = getSolarTerm(year, t.idx)
      if (date === day || date === day - 1 || date === day + 1) {
        return SOLAR_WORDS[t.key]
      }
    }
  }
  return null
}

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
      // 节气文案优先，否则基于日期随机选一句
      const solarWord = checkSolarTerms(now)
      let nightWord = solarWord
      if (!nightWord) {
        const seed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate()
        nightWord = NIGHT_WORDS[seed % NIGHT_WORDS.length]
      }
      this.setData({
        isNight: true,
        nightTime: h + ':' + m,
        nightWord,
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
