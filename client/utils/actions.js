// utils/actions.js — 慢慢变好 v0.7 — 行动库 + 治愈世界 + 彩蛋插画

// ═══════════════════════════════════════
// 15 个行动（9 时间轴 + 6 问题轴）
// ═══════════════════════════════════════

const ACTIONS = {
  // ── 晨间 ──
  morning_light: {
    id: 'morning_light',
    title: '今天见光',
    subtitle: '走到窗边 · 让光进来',
    duration: 120,
    scene: 'morning',
    steps: [
      '走到窗边，拉开窗帘',
      '面向窗外，让光照在脸上',
      '闭眼，感受皮肤微暖',
      '深呼吸 3 次',
    ],
    feeling: '眼睛接触自然光 · 皮肤微暖',
  },
  morning_breath: {
    id: 'morning_breath',
    title: '晨间呼吸',
    subtitle: '4 秒吸 · 7 秒停 · 8 秒呼',
    duration: 60,
    scene: 'morning',
    steps: [
      '鼻子吸气 4 秒',
      '屏住呼吸 7 秒',
      '嘴巴呼气 8 秒',
      '重复 4 轮',
    ],
    feeling: '心率放缓 · 肩膀松下来',
  },
  morning_neck: {
    id: 'morning_neck',
    title: '颈侧屈',
    subtitle: '耳朵找肩膀 · 慢慢来',
    duration: 60,
    scene: 'morning',
    steps: [
      '右耳慢慢靠向右肩',
      '保持 15 秒，感受左侧拉伸',
      '换边，左耳靠左肩',
      '每边 2 次',
    ],
    feeling: '脖子侧面松开 · 头没那么沉',
  },

  // ── 工间 ──
  work_stand: {
    id: 'work_stand',
    title: '站起来',
    subtitle: '30 秒就好 · 站起来再说',
    duration: 30,
    scene: 'work',
    steps: [
      '推椅子，站起来',
      '伸直双腿，重心均匀',
      '踮脚 3 次',
      '坐回去，继续',
    ],
    feeling: '血液回流 · 腿不麻了',
  },
  work_shoulder: {
    id: 'work_shoulder',
    title: '肩部环绕',
    subtitle: '画圈 · 前后各 5 圈',
    duration: 60,
    scene: 'work',
    steps: [
      '双肩向上耸起',
      '向后画大圈，5 圈',
      '向前画大圈，5 圈',
      '放下肩膀，深呼吸',
    ],
    feeling: '肩胛骨附近松了 · 手臂变轻',
  },
  work_eyes: {
    id: 'work_eyes',
    title: '20-20-20 眼休',
    subtitle: '看 20 英尺外 · 20 秒',
    duration: 20,
    scene: 'work',
    steps: [
      '视线离开屏幕',
      '找窗外或远处一点',
      '盯着看 20 秒',
      '眨眼 5 次',
    ],
    feeling: '眼眶湿润 · 焦距变松',
  },

  // ── 夜间 ──
  night_write: {
    id: 'night_write',
    title: '写一行字',
    subtitle: '写什么都行 · 写完就放下',
    duration: 120,
    scene: 'night',
    steps: [
      '拿出纸笔或手机备忘录',
      '写 1 行字，什么都行',
      '不用写好，写完就行',
      '放下，不回看',
    ],
    feeling: '脑子里少了一圈 · 呼吸变长',
  },
  night_hip: {
    id: 'night_hip',
    title: '髋部前屈',
    subtitle: '站着弯腰 · 膝盖微弯',
    duration: 90,
    scene: 'night',
    steps: [
      '站立，双脚与肩同宽',
      '膝盖微弯，上身前屈',
      '手臂自然下垂，保持 30 秒',
      '慢慢起身，重复 2 次',
    ],
    feeling: '后腰和腿后侧拉长 · 站直轻松了',
  },
  night_breath: {
    id: 'night_breath',
    title: '夜间呼吸',
    subtitle: '4 秒吸 · 7 秒停 · 8 秒呼',
    duration: 60,
    scene: 'night',
    steps: [
      '躺下或靠枕头坐好',
      '鼻子吸气 4 秒',
      '屏住 7 秒，嘴巴呼气 8 秒',
      '重复 4 轮',
    ],
    feeling: '身体变沉 · 困意来了',
  },

  // ── 问题轴 ──
  problem_dizzy: {
    id: 'problem_dizzy',
    title: '起身不晕',
    subtitle: '踝泵 · 站起来不眼前发黑',
    duration: 30,
    scene: 'problem',
    steps: [
      '坐着，脚掌上下勾压',
      '每只脚 10 次',
      '慢慢站起来',
      '站稳 5 秒',
    ],
    feeling: '眼前不黑了 · 头不晕',
  },
  problem_energy: {
    id: 'problem_energy',
    title: '快速回血',
    subtitle: '冷水洗腕 · 30 秒回血',
    duration: 30,
    scene: 'problem',
    steps: [
      '去洗手间',
      '冷水冲手腕内侧 15 秒',
      '冷水拍后颈 5 秒',
      '深呼吸 3 次',
    ],
    feeling: '脑子清醒 · 下午不困了',
  },
  problem_core: {
    id: 'problem_core',
    title: '死虫式',
    subtitle: '躺下 · 手脚对伸 · 核心稳了',
    duration: 60,
    scene: 'problem',
    steps: [
      '仰卧，双臂朝天，双腿屈膝 90°',
      '左臂向后伸，右腿向前伸',
      '回到起始，换边',
      '每边 5 次',
    ],
    feeling: '肚子收紧 · 腰不空了',
  },
  problem_posture: {
    id: 'problem_posture',
    title: '靠墙天使',
    subtitle: '贴墙抬手 · 打开胸腔',
    duration: 60,
    scene: 'problem',
    steps: [
      '背靠墙，脚跟、臀、肩、头贴墙',
      '双臂贴墙抬起，肘弯 90°',
      '手臂沿墙慢慢上推',
      '收回，重复 8 次',
    ],
    feeling: '胸腔打开 · 肩膀自动后收',
  },
  problem_neck: {
    id: 'problem_neck',
    title: '颈后缩',
    subtitle: '下巴后收 · 颈椎归位',
    duration: 30,
    scene: 'problem',
    steps: [
      '坐直，目视前方',
      '下巴水平向后缩',
      '做出双下巴的感觉',
      '保持 5 秒，重复 6 次',
    ],
    feeling: '脖子后面拉紧 · 头回正了',
  },
  problem_eyes: {
    id: 'problem_eyes',
    title: '完全眨眼',
    subtitle: '用力闭眼 · 慢慢睁开',
    duration: 20,
    scene: 'problem',
    steps: [
      '用力闭紧眼睛 3 秒',
      '慢慢睁开，眼球转一圈',
      '再用力闭紧 3 秒',
      '睁眼，眨 5 次',
    ],
    feeling: '眼眶湿润 · 不干涩了',
  },
}

// 时段映射
const SCENE_ACTIONS = {
  morning: ['morning_light', 'morning_breath', 'morning_neck'],
  work: ['work_stand', 'work_shoulder', 'work_eyes'],
  night: ['night_write', 'night_hip', 'night_breath'],
}

// 获取当前时段
function getCurrentScene() {
  const hour = new Date().getHours()
  if (hour >= 6 && hour < 11) return 'morning'
  if (hour >= 11 && hour < 20) return 'work'
  return 'night'
}

// 根据日期获取轮换索引
function getDayIndex(date) {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date - start
  const dayOfYear = Math.floor(diff / 86400000)
  return dayOfYear
}

// 获取当前行动（每天 1 个，根据时段轮换）
function getCurrentAction() {
  const scene = getCurrentScene()
  const sceneActions = SCENE_ACTIONS[scene]
  const index = getDayIndex(new Date()) % sceneActions.length
  return ACTIONS[sceneActions[index]]
}

// 获取明天的行动预告
function getTomorrowAction() {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const tomorrowHour = tomorrow.getHours()

  // 预告时取最可能时段：用当前时段的明天版本
  const scene = getCurrentScene()
  const sceneActions = SCENE_ACTIONS[scene]
  const index = getDayIndex(tomorrow) % sceneActions.length
  return ACTIONS[sceneActions[index]]
}

// ═══════════════════════════════════════
// 12 个主题世界 + 彩蛋插画
// ═══════════════════════════════════════

// 插画实际文件需放入 client/assets/eggs/{worldId}/
// 每世界 30 张 × 2 版（blur + clear）
// 未就绪时页面使用 CSS 渐变 fallback

const WORLDS = [
  {
    id: 'forest',
    name: '春之森林',
    iconType: 'forest',
    locked: false,
    total: 30,
    eggs: Array.from({ length: 30 }, (_, i) => ({
      blurUrl: `/assets/eggs/forest/blur_${String(i + 1).padStart(2, '0')}.png`,
      clearUrl: `/assets/eggs/forest/clear_${String(i + 1).padStart(2, '0')}.png`,
    })),
  },
  {
    id: 'sea',
    name: '夏之海边',
    iconType: 'sea',
    locked: false,
    total: 30,
    eggs: Array.from({ length: 30 }, (_, i) => ({
      blurUrl: `/assets/eggs/sea/blur_${String(i + 1).padStart(2, '0')}.png`,
      clearUrl: `/assets/eggs/sea/clear_${String(i + 1).padStart(2, '0')}.png`,
    })),
  },
  {
    id: 'window',
    name: '秋之窗边',
    iconType: 'window',
    locked: false,
    total: 30,
    eggs: Array.from({ length: 30 }, (_, i) => ({
      blurUrl: `/assets/eggs/window/blur_${String(i + 1).padStart(2, '0')}.png`,
      clearUrl: `/assets/eggs/window/clear_${String(i + 1).padStart(2, '0')}.png`,
    })),
  },
  {
    id: 'warm',
    name: '冬之暖屋',
    iconType: 'warm',
    locked: false,
    total: 30,
    eggs: Array.from({ length: 30 }, (_, i) => ({
      blurUrl: `/assets/eggs/warm/blur_${String(i + 1).padStart(2, '0')}.png`,
      clearUrl: `/assets/eggs/warm/clear_${String(i + 1).padStart(2, '0')}.png`,
    })),
  },
  {
    id: 'tea',
    name: '茶与书',
    iconType: 'tea',
    locked: false,
    total: 30,
    eggs: Array.from({ length: 30 }, (_, i) => ({
      blurUrl: `/assets/eggs/tea/blur_${String(i + 1).padStart(2, '0')}.png`,
      clearUrl: `/assets/eggs/tea/clear_${String(i + 1).padStart(2, '0')}.png`,
    })),
  },
  {
    id: 'night',
    name: '夜与星',
    iconType: 'night',
    locked: false,
    total: 30,
    eggs: Array.from({ length: 30 }, (_, i) => ({
      blurUrl: `/assets/eggs/night/blur_${String(i + 1).padStart(2, '0')}.png`,
      clearUrl: `/assets/eggs/night/clear_${String(i + 1).padStart(2, '0')}.png`,
    })),
  },
  // ── 扩展世界（锁定，后续版本开放）──
  {
    id: 'garden',
    name: '秘密花园',
    iconType: 'default',
    locked: true,
    total: 30,
    eggs: [],
  },
  {
    id: 'mountain',
    name: '山间远行',
    iconType: 'default',
    locked: true,
    total: 30,
    eggs: [],
  },
  {
    id: 'rain',
    name: '雨天漫步',
    iconType: 'default',
    locked: true,
    total: 30,
    eggs: [],
  },
  {
    id: 'sunrise',
    name: '日出之约',
    iconType: 'default',
    locked: true,
    total: 30,
    eggs: [],
  },
  {
    id: 'snow',
    name: '雪地静音',
    iconType: 'default',
    locked: true,
    total: 30,
    eggs: [],
  },
  {
    id: 'star',
    name: '星河长明',
    iconType: 'default',
    locked: true,
    total: 30,
    eggs: [],
  },
]

// ═══════════════════════════════════════
// 导出
// ═══════════════════════════════════════

module.exports = {
  ACTIONS,
  WORLDS,
  SCENE_ACTIONS,
  getCurrentScene,
  getCurrentAction,
  getTomorrowAction,
}
