// pages/action/action.js — 行动+认知卡片：与 demo 完全一致

const WEEK_PLAN = [
  { label: '周 一', title: '晨 起 一 杯 温 水', scene: '吃 · 喝 水',
    knowTitle: '晨起一杯温水 · 收工', knowText: '晨起喝水能降低血液粘稠度 · 你为今天的心血管减负了一次', knowEm: '你今天的血比昨天稀了一点' },
  { label: '周 二', title: '午 餐 一 个 拳 头 蛋 白 质', scene: '吃 · 蛋 白 质',
    knowTitle: '午餐一个拳头蛋白质 · 收工', knowText: '早上蛋白质优先 · 上午的血糖比昨天平稳 · 你今天不容易困', knowEm: '你今天的脑子比昨天好使了一点' },
  { label: '周 三', title: '快 走 / 爬 楼 15 分', scene: '动 · 每 日 出 汗',
    knowTitle: '快 走 15 分 · 收 工', knowText: '快走后肌肉会释放鸢尾素 · 这种激素能穿过血脑屏障 · 改善记忆力', knowEm: '你今天的脑子比昨天好使了一点' },
  { label: '周 四', title: '晚 餐 选 原 型 食 物', scene: '吃 · 原 型 食 物',
    knowTitle: '晚餐选原型食物 · 收工', knowText: '原型食物的饱腹感比加工食品多30% · 你今天少吃了却不饿', knowEm: '你今天少吃了 · 但不觉得亏' },
  { label: '周 五', title: '一 组 力 竭 训 练', scene: '动 · 抗 阻 力 竭',
    knowTitle: '力竭训练 · 收工', knowText: '力竭训练后48小时基础代谢仍升高 · 你在休息时也在消耗', knowEm: '你现在坐着也在比昨天多烧' },
  { label: '周 六', title: '睡 前 1 小 时 调 暗 灯 光 + 手 机 放 客 厅', scene: '睡 · 暗 光 / 隔 离',
    knowTitle: '暗光隔离 · 收工', knowText: '暗光环境让褪黑素提前分泌30% · 你今晚会比平时早困', knowEm: '你今晚可能比昨天早困半小时' },
  { label: '周 日', title: '发 呆 10 分 钟 · 什 么 都 不 做', scene: '情 绪 · 留 白',
    knowTitle: '发呆10分钟 · 收工', knowText: '主动发呆能降低杏仁核活跃度 · 你的焦虑不是少了 · 是被看见了', knowEm: '你的焦虑没少 · 但它知道你看见了' },
]

Page({
  data: {
    weekNum: 1,
    dayLabel: '',
    actionTitle: '',
    actionSub: '',
    sceneLabel: '',
    showCognize: false,
    cognizeTitle: '',
    cognizeText: '',
    cognizeEm: '',
  },

  onLoad() {
    let state = {}
    try { state = wx.getStorageSync('appState') || {} } catch(e) {}

    const now = new Date()
    const jsDay = now.getDay()
    const dayIdx = jsDay === 0 ? 6 : jsDay - 1

    const today = WEEK_PLAN[dayIdx]
    this.setData({
      weekNum: state.weekNum || 1,
      dayLabel: today.label,
      actionTitle: today.title,
      actionSub: '',
      sceneLabel: today.scene,
      dayIdx,
      cognizeTitle: today.knowTitle,
      cognizeText: today.knowText,
      cognizeEm: today.knowEm,
    })
  },

  completeAction() {
    // 标记今天完成
    let state = {}
    try { state = wx.getStorageSync('appState') || {} } catch(e) {}

    const weekDone = state.weekDone || []
    if (!weekDone.includes(this.data.dayIdx)) {
      weekDone.push(this.data.dayIdx)
    }

    // 保存认知卡片
    const knowCards = state.knowCards || []
    if (!knowCards.includes(this.data.dayIdx)) {
      knowCards.push(this.data.dayIdx)
    }

    state.weekDone = weekDone
    state.knowCards = knowCards
    try { wx.setStorageSync('appState', state) } catch(e) {}

    this.setData({ showCognize: true })
  },

  goHome() {
    wx.reLaunch({ url: '/pages/home/home' })
  },

  goBack() {
    wx.navigateBack()
  },
})
