// utils/mock-data.js - 本地 Mock 数据（预览用）

const exercises = [
  // ⚡ 微行动
  { id: 'ex_micro_01', title: '站起来活动一下', subtitle: '只要1分钟，比不动强100倍', emoji: '⚡', cover_gradient: 'linear-gradient(135deg, #fdcb6e, #f39c12)', category: 'micro', category_label: '微行动', target_body: ['全身'], problem_tags: ['久坐'], difficulty: '零门槛', duration: 60, duration_text: '1min', scene: ['工作间隙', '随时'], position_type: '站姿', play_count: 2341 },
  { id: 'ex_micro_02', title: '转转脖子', subtitle: '缓解颈部僵硬', emoji: '🔄', cover_gradient: 'linear-gradient(135deg, #ffeaa7, #fdcb6e)', category: 'micro', category_label: '微行动', target_body: ['肩颈'], problem_tags: ['肩颈痛'], difficulty: '零门槛', duration: 60, duration_text: '1min', scene: ['工作间隙', '随时'], position_type: '坐姿可做', play_count: 1876 },
  { id: 'ex_micro_03', title: '伸个懒腰', subtitle: '全身舒展', emoji: '🤸', cover_gradient: 'linear-gradient(135deg, #55efc4, #00b894)', category: 'micro', category_label: '微行动', target_body: ['全身'], problem_tags: ['久坐'], difficulty: '零门槛', duration: 30, duration_text: '30s', scene: ['工作间隙', '随时'], position_type: '站姿', play_count: 1567 },
  { id: 'ex_micro_05', title: '深呼吸3次', subtitle: '1分钟呼吸重置', emoji: '🫁', cover_gradient: 'linear-gradient(135deg, #74b9ff, #0984e3)', category: 'micro', category_label: '微行动', target_body: ['全身'], problem_tags: ['压力', '脑雾'], difficulty: '零门槛', duration: 60, duration_text: '1min', scene: ['随时'], position_type: '任何姿势', play_count: 1234 },

  // 🆘 久坐急救
  { id: 'ex_aid_01', title: '肩颈拉伸4步', subtitle: '3分钟缓解肩颈僵硬', emoji: '🆘', cover_gradient: 'linear-gradient(135deg, #ff7675, #d63031)', category: 'first_aid', category_label: '久坐急救', target_body: ['肩颈', '颈部'], problem_tags: ['肩颈痛', '久坐'], difficulty: '入门', duration: 180, duration_text: '3min', scene: ['工作间隙'], position_type: '坐姿可做', play_count: 3456 },
  { id: 'ex_aid_02', title: '腰背放松3式', subtitle: '久坐腰痛快速缓解', emoji: '🆘', cover_gradient: 'linear-gradient(135deg, #e17055, #d63031)', category: 'first_aid', category_label: '久坐急救', target_body: ['腰背'], problem_tags: ['久坐', '腰背不适'], difficulty: '入门', duration: 180, duration_text: '3min', scene: ['工作间隙'], position_type: '坐姿可做', play_count: 2789 },
  { id: 'ex_aid_05', title: '全身快速唤醒', subtitle: '坐久了动一下全身', emoji: '🆘', cover_gradient: 'linear-gradient(135deg, #fdcb6e, #e17055)', category: 'first_aid', category_label: '久坐急救', target_body: ['全身'], problem_tags: ['久坐', '脑雾'], difficulty: '入门', duration: 300, duration_text: '5min', scene: ['工作间隙', '午休'], position_type: '站姿', play_count: 2134 },

  // 🧍 体态改善
  { id: 'ex_posture_01', title: '圆肩矫正跟练', subtitle: '打开胸腔，改善圆肩', emoji: '🧍', cover_gradient: 'linear-gradient(135deg, #7c6ff7, #9d93fa)', category: 'posture', category_label: '体态改善', target_body: ['肩颈', '胸部'], problem_tags: ['体态差', '圆肩'], difficulty: '初级', duration: 300, duration_text: '5min', scene: ['晨起', '工作间隙'], position_type: '站姿', play_count: 1987 },
  { id: 'ex_posture_02', title: '驼背改善跟练', subtitle: '挺起来，告别驼背', emoji: '🧍', cover_gradient: 'linear-gradient(135deg, #5b4fd4, #7c6ff7)', category: 'posture', category_label: '体态改善', target_body: ['背部', '肩颈'], problem_tags: ['体态差', '驼背'], difficulty: '初级', duration: 420, duration_text: '7min', scene: ['晨起', '工作间隙'], position_type: '站姿', play_count: 1678 },
  { id: 'ex_posture_03', title: '脖子前倾矫正', subtitle: '找回你的天鹅颈', emoji: '🧍', cover_gradient: 'linear-gradient(135deg, #9d93fa, #b8b0ff)', category: 'posture', category_label: '体态改善', target_body: ['肩颈', '颈部'], problem_tags: ['体态差', '脖子前倾'], difficulty: '初级', duration: 300, duration_text: '5min', scene: ['晨起', '工作间隙'], position_type: '站姿', play_count: 1456 },

  // ☀️ 活力唤醒
  { id: 'ex_energy_01', title: '晨间唤醒操', subtitle: '用运动开启新的一天', emoji: '☀️', cover_gradient: 'linear-gradient(135deg, #ffeaa7, #f39c12)', category: 'energy', category_label: '活力唤醒', target_body: ['全身'], problem_tags: ['脑雾', '久坐'], difficulty: '入门', duration: 180, duration_text: '3min', scene: ['晨起'], position_type: '站姿', play_count: 2567 },
  { id: 'ex_energy_02', title: '办公室活力操', subtitle: '下午犯困？动起来', emoji: '☀️', cover_gradient: 'linear-gradient(135deg, #f39c12, #e17055)', category: 'energy', category_label: '活力唤醒', target_body: ['全身'], problem_tags: ['脑雾', '久坐'], difficulty: '入门', duration: 300, duration_text: '5min', scene: ['午休', '工作间隙'], position_type: '站姿', play_count: 1890 },

  // 😌 压力释放
  { id: 'ex_stress_01', title: '拍打放松', subtitle: '拍走身体里的紧张', emoji: '😌', cover_gradient: 'linear-gradient(135deg, #a29bfe, #6c5ce7)', category: 'stress', category_label: '压力释放', target_body: ['全身'], problem_tags: ['压力'], difficulty: '入门', duration: 180, duration_text: '3min', scene: ['工作间隙', '睡前'], position_type: '站姿', play_count: 1678 },
  { id: 'ex_stress_02', title: '抖动放松', subtitle: '像狗甩水一样放松', emoji: '😌', cover_gradient: 'linear-gradient(135deg, #fd79a8, #e84393)', category: 'stress', category_label: '压力释放', target_body: ['全身'], problem_tags: ['压力'], difficulty: '入门', duration: 180, duration_text: '3min', scene: ['工作间隙', '睡前'], position_type: '站姿', play_count: 1234 },

  // 💪 核心稳定
  { id: 'ex_core_01', title: '核心激活', subtitle: '唤醒沉睡的核心肌群', emoji: '💪', cover_gradient: 'linear-gradient(135deg, #00b894, #55efc4)', category: 'core', category_label: '核心稳定', target_body: ['核心', '腰腹'], problem_tags: ['体态差', '腰背不适'], difficulty: '初级', duration: 300, duration_text: '5min', scene: ['晨起', '午休'], position_type: '需要垫子', play_count: 1456 },
  { id: 'ex_core_03', title: '死虫鸟狗式跟练', subtitle: '最安全的核心训练', emoji: '💪', cover_gradient: 'linear-gradient(135deg, #55efc4, #00b894)', category: 'core', category_label: '核心稳定', target_body: ['核心', '腰背'], problem_tags: ['腰背不适', '体态差'], difficulty: '初级', duration: 300, duration_text: '5min', scene: ['晨起', '午休'], position_type: '需要垫子', play_count: 876 },

  // 🧘 柔韧性
  { id: 'ex_flex_01', title: '全身拉伸', subtitle: '从头到脚的拉伸', emoji: '🧘', cover_gradient: 'linear-gradient(135deg, #74b9ff, #0984e3)', category: 'flexibility', category_label: '柔韧性', target_body: ['全身'], problem_tags: ['久坐', '柔韧差'], difficulty: '初级', duration: 420, duration_text: '7min', scene: ['晨起', '睡前'], position_type: '需要垫子', play_count: 1890 },
  { id: 'ex_flex_02', title: '髋部打开', subtitle: '久坐族的髋部释放', emoji: '🧘', cover_gradient: 'linear-gradient(135deg, #0984e3, #6c5ce7)', category: 'flexibility', category_label: '柔韧性', target_body: ['髋部'], problem_tags: ['久坐'], difficulty: '初级', duration: 300, duration_text: '5min', scene: ['晨起', '睡前'], position_type: '需要垫子', play_count: 1234 },

  // 🌙 睡前放松
  { id: 'ex_sleep_01', title: '睡前拉伸', subtitle: '温和拉伸助入睡', emoji: '🌙', cover_gradient: 'linear-gradient(135deg, #2d2d52, #4a4a8a)', category: 'sleep', category_label: '睡前放松', target_body: ['全身'], problem_tags: ['睡眠差'], difficulty: '入门', duration: 300, duration_text: '5min', scene: ['睡前'], position_type: '需要垫子', play_count: 2345 },
  { id: 'ex_sleep_03', title: '呼吸放松', subtitle: '用呼吸帮助入睡', emoji: '🌙', cover_gradient: 'linear-gradient(135deg, #16213e, #0f3460)', category: 'sleep', category_label: '睡前放松', target_body: ['全身'], problem_tags: ['睡眠差', '压力'], difficulty: '入门', duration: 300, duration_text: '5min', scene: ['睡前'], position_type: '任何姿势', play_count: 1567 },
]

const meditations = [
  { id: 'med_001', title: '4-7-8呼吸法', subtitle: '快速平静神经系统的呼吸技巧', emoji: '🫁', cover_gradient: 'linear-gradient(135deg, #7c6ff7, #9d93fa)', category: 'breath', category_label: '呼吸练习', difficulty: '入门', duration: 180, duration_text: '3min', scene: ['工作间隙', '睡前'], play_count: 1243 },
  { id: 'med_002', title: '箱式呼吸', subtitle: '海豹突击队用的减压呼吸', emoji: '🫁', cover_gradient: 'linear-gradient(135deg, #5b4fd4, #7c6ff7)', category: 'breath', category_label: '呼吸练习', difficulty: '入门', duration: 300, duration_text: '5min', scene: ['晨起', '工作间隙'], play_count: 876 },
  { id: 'med_004', title: '运动后身体扫描', subtitle: '觉察运动后的身体变化', emoji: '🧘', cover_gradient: 'linear-gradient(135deg, #4ecdc4, #44b09e)', category: 'body_scan', category_label: '身体扫描', difficulty: '入门', duration: 300, duration_text: '5min', scene: ['运动后'], play_count: 678 },
  { id: 'med_006', title: '3分钟正念冥想', subtitle: '回到当下', emoji: '🌿', cover_gradient: 'linear-gradient(135deg, #55efc4, #00b894)', category: 'mindfulness', category_label: '正念冥想', difficulty: '入门', duration: 180, duration_text: '3min', scene: ['晨起', '工作间隙'], play_count: 987 },
  { id: 'med_007', title: '行走冥想', subtitle: '把走路变成冥想', emoji: '🚶', cover_gradient: 'linear-gradient(135deg, #00b894, #00cec9)', category: 'dynamic', category_label: '动态冥想', difficulty: '入门', duration: 300, duration_text: '5min', scene: ['晨起'], play_count: 345 },
  { id: 'med_008', title: '伸展冥想', subtitle: '冥想和伸展的结合', emoji: '🤸', cover_gradient: 'linear-gradient(135deg, #74b9ff, #0984e3)', category: 'dynamic', category_label: '动态冥想', difficulty: '入门', duration: 300, duration_text: '5min', scene: ['晨起', '午休'], play_count: 567 },
]

const knowledge = [
  { id: 'know_01', title: '为什么久坐腰痛？', content: '久坐时，腰椎承受的压力是站立的1.5倍。腰部肌肉长时间不活动，导致肌肉无力、韧带松弛，椎间盘压力增大，引发腰痛。建议每坐1小时站起来活动3-5分钟。', category: 'science', category_label: '身体科普', problem_tags: ['久坐', '腰背不适'], read_count: 3456 },
  { id: 'know_02', title: '3个动作告别圆肩', content: '圆肩的根本原因是胸肌过紧+背部肌群过弱。1) 门框拉伸打开胸腔 2) 肩胛骨后缩训练 3) YTWL背部激活。每天5分钟，2周见效。', category: 'tip', category_label: '行动贴士', problem_tags: ['体态差', '圆肩'], read_count: 2789 },
  { id: 'know_03', title: '拉伸不是越痛越好', content: '正确拉伸应该是"有感觉但不疼"。如果感到刺痛或灼烧感，说明拉伸过度了。每次拉伸保持15-30秒，配合深呼吸，让肌肉慢慢放松。', category: 'myth', category_label: '常见误区', problem_tags: ['久坐', '体态差'], read_count: 1987 },
  { id: 'know_04', title: '脖子前倾正在伤害你', content: '头每前倾2.5cm，颈椎额外承受4-5kg压力。前倾15cm等于脖子上挂了一个7岁小孩！改善方法：下巴微收练习+靠墙站立。', category: 'science', category_label: '身体科普', problem_tags: ['体态差', '脖子前倾', '肩颈痛'], read_count: 2345 },
  { id: 'know_05', title: '1分钟运动也有用', content: '研究表明，即使1分钟的轻度活动，也能改善血糖水平、提升注意力和情绪。比不动强100倍不是夸张，是科学。', category: 'tip', category_label: '行动贴士', problem_tags: ['久坐', '脑雾'], read_count: 1678 },
]

const defaultProfile = {
  problem_tags: ['肩颈痛', '久坐', '体态差'],
  duration_pref: '5min',
  exercise_habit: 'occasional',
  feature_weights: { exercise: 0.7, knowledge: 0.15, meditation: 0.15 },
  persistence_score: 45,
  usage_pattern: 'random',
}

const mockUser = {
  id: 'mock-user-001',
  nickname: 'Dayong',
  avatar_url: ''
}

// ===== AI 智能推荐理由生成 =====
const reasonTemplates = {
  posture_neck: [
    { reason: '你标记了肩颈痛，这个练习精准针对', icon: '🎯', tag: '精准匹配' },
    { reason: '连续3天没活动肩颈了', icon: '📊', tag: '进度追踪' },
  ],
  sitting: [
    { reason: '久坐超过2小时，身体在求救', icon: '⏰', tag: '久坐提醒' },
    { reason: '坐久了髋部紧绷，需要释放', icon: '💡', tag: '痛点发现' },
  ],
  brain_fog: [
    { reason: '下午2-4点最易脑雾，动一下清醒', icon: '🧠', tag: '时段优化' },
    { reason: '运动后专注力提升40%', icon: '📈', tag: '科学依据' },
  ],
  morning: [
    { reason: '晨起5分钟，全天精力更充沛', icon: '☀️', tag: '时段推荐' },
    { reason: '早上运动的人坚持率更高', icon: '📊', tag: '习惯科学' },
  ],
  stress: [
    { reason: '今天周三，压力高峰期', icon: '📉', tag: '压力指数' },
    { reason: '抖动放松已被证实能快速减压', icon: '🔬', tag: '科学验证' },
  ],
  sleep: [
    { reason: '睡前3小时轻度运动助眠', icon: '🌙', tag: '睡眠科学' },
    { reason: '你的睡眠评分偏低，试试这个', icon: '📊', tag: '健康分析' },
  ],
  season_summer: [
    { reason: '夏季空调房久坐更伤肩颈', icon: '🌡️', tag: '季节提醒' },
    { reason: '夏天湿气重，拉伸排湿', icon: '🍃', tag: '季节养生' },
  ],
  core_weak: [
    { reason: '你的核心稳定只有35，需要加强', icon: '📊', tag: '能力分析' },
    { reason: '核心弱是腰痛的根源', icon: '💡', tag: '根因发现' },
  ],
}

function pickReason(templateKey) {
  const templates = reasonTemplates[templateKey] || reasonTemplates.sitting
  return templates[Math.floor(Math.random() * templates.length)]
}

// ===== 导出函数 =====

function getHomepageRecommendations() {
  const hour = new Date().getHours()
  const month = new Date().getMonth() + 1
  let primaryIdx = 5
  let dailyText = '动一下，比不动强 💪'

  if (hour >= 5 && hour < 9) {
    primaryIdx = 12; dailyText = '早安！新的一天，从动一下开始 ☀️'
  } else if (hour >= 9 && hour < 12) {
    primaryIdx = 5; dailyText = '工作了一会儿了，肩颈还好吗？'
  } else if (hour >= 12 && hour < 14) {
    primaryIdx = 13; dailyText = '午休时间，活动一下下午更有精神'
  } else if (hour >= 14 && hour < 18) {
    primaryIdx = 0; dailyText = '下午了，动一下赶走困倦'
  } else if (hour >= 18 && hour < 22) {
    primaryIdx = 19; dailyText = '忙碌了一天，放松一下身体吧 🌙'
  } else {
    primaryIdx = 20; dailyText = '夜深了，做个简单的睡前放松'
  }

  // 生成 AI 推荐卡片列表（带推荐理由）
  const recommendCards = [
    { ...exercises[5], reason: pickReason('posture_neck'), card_height: 'tall' },    // 肩颈拉伸
    { ...exercises[8], reason: pickReason('posture_neck'), card_height: 'short' },   // 圆肩矫正
    { ...exercises[1], reason: pickReason('sitting'), card_height: 'short' },        // 转转脖子
    { ...exercises[16], reason: pickReason('core_weak'), card_height: 'tall' },      // 核心激活
    { ...exercises[6], reason: pickReason('sitting'), card_height: 'tall' },         // 腰背放松
    { ...exercises[14], reason: pickReason('stress'), card_height: 'short' },        // 拍打放松
    { ...exercises[19], reason: pickReason('sleep'), card_height: 'short' },         // 全身拉伸
    { ...exercises[10], reason: pickReason('posture_neck'), card_height: 'tall' },   // 脖子前倾
    { ...exercises[12], reason: pickReason('morning'), card_height: 'short' },       // 晨间唤醒
    { ...exercises[0], reason: pickReason('brain_fog'), card_height: 'short' },      // 站起来活动
  ]

  return {
    primary: exercises[primaryIdx],
    alternatives: [
      exercises[2],
      exercises[4],
    ],
    recommend_cards: recommendCards,
    meditation: meditations[0],
    daily_text: dailyText,
    user_stats: {
      posture: 58,
      core: 35,
      flexibility: 42,
      vitality: 72,
      mind_body: 28,
      streak: 3
    }
  }
}

function getCategories() {
  return {
    categories: [
      { key: 'micro', label: '微行动', emoji: '⚡', description: '1-2分钟，随时能做' },
      { key: 'first_aid', label: '久坐急救', emoji: '🆘', description: '3-5分钟，快速缓解' },
      { key: 'posture', label: '体态改善', emoji: '🧍', description: '5-10分钟，系统改善' },
      { key: 'energy', label: '活力唤醒', emoji: '☀️', description: '3-5分钟，赶走困倦' },
      { key: 'stress', label: '压力释放', emoji: '😌', description: '3-5分钟，释放紧张' },
      { key: 'core', label: '核心稳定', emoji: '💪', description: '5-10分钟，强化核心' },
      { key: 'flexibility', label: '柔韧性', emoji: '🧘', description: '5-10分钟，打开身体' },
      { key: 'sleep', label: '睡前放松', emoji: '🌙', description: '5-10分钟，助眠放松' },
    ]
  }
}

function getExercises(category) {
  const filtered = category ? exercises.filter(e => e.category === category) : exercises
  return { exercises: filtered, total: filtered.length }
}

function getExerciseDetail(id) {
  const ex = exercises.find(e => e.id === id)
  return { exercise: ex || exercises[0] }
}

function getMeditations() {
  return { meditations, total: meditations.length }
}

function getMeditationDetail(id) {
  const med = meditations.find(m => m.id === id)
  return { meditation: med || meditations[0] }
}

function getKnowledge() {
  return { knowledge, total: knowledge.length }
}

function getStats() {
  return {
    stats: {
      abilities: [
        { key: 'posture', name: '体态健康', emoji: '🦴', value: 58, color: '#7c6ff7', level: 2 },
        { key: 'core', name: '核心稳定', emoji: '💪', value: 35, color: '#00b894', level: 1 },
        { key: 'flexibility', name: '柔韧性', emoji: '🧘', value: 42, color: '#0984e3', level: 1 },
        { key: 'vitality', name: '活力值', emoji: '⚡', value: 72, color: '#f39c12', level: 3 },
        { key: 'mind_body', name: '身心平衡', emoji: '🧠', value: 28, color: '#e84393', level: 1 },
      ],
      level: 5,
      total_exercises: 12,
      total_minutes: 47,
      streak: 3,
    }
  }
}

function getAchievements() {
  return {
    achievements: [
      { id: 'ach_01', emoji: '🚀', name: '迈出第一步', type: 'daily_first', description: '今天第一次运动！', unlocked_at: '2026-06-24T08:00:00Z' },
      { id: 'ach_02', emoji: '🔥', name: '三天成习', type: 'streak', description: '连续3天运动！', unlocked_at: '2026-06-24T08:00:00Z' },
      { id: 'ach_03', emoji: '🆘', name: '久坐杀手', type: 'category_first', description: '首次完成久坐急救', unlocked_at: '2026-06-22T08:00:00Z' },
      { id: 'ach_04', emoji: '⏱️', name: '60分钟达成', type: 'total_min', description: '累计运动60分钟', unlocked_at: '2026-06-23T08:00:00Z' },
    ]
  }
}

function getWeeklyReport() {
  return {
    report: {
      total_duration: 47,
      duration_change: 15,
      exercise_count: 8,
      meditation_count: 2,
      active_days: 5,
      stats: { posture_score: 58, core_score: 35, flexibility_score: 42, vitality_score: 72, mind_body_score: 28 }
    }
  }
}

function getFeedback(data) {
  const exerciseId = data?.exercise_id || 'ex_aid_01'
  const ex = exercises.find(e => e.id === exerciseId) || exercises[5]
  const category = ex.category

  const statMap = {
    micro: { primary: 'vitality_score', primaryLabel: '⚡ 活力值', primaryGain: 1, secondary: null },
    first_aid: { primary: 'posture_score', primaryLabel: '🦴 体态健康', primaryGain: 3, secondary: 'vitality_score', secondaryLabel: '⚡ 活力值', secondaryGain: 1 },
    posture: { primary: 'posture_score', primaryLabel: '🦴 体态健康', primaryGain: 4, secondary: 'flexibility_score', secondaryLabel: '🧘 柔韧性', secondaryGain: 1 },
    energy: { primary: 'vitality_score', primaryLabel: '⚡ 活力值', primaryGain: 3, secondary: 'mind_body_score', secondaryLabel: '🧠 身心平衡', secondaryGain: 1 },
    stress: { primary: 'mind_body_score', primaryLabel: '🧠 身心平衡', primaryGain: 3, secondary: 'vitality_score', secondaryLabel: '⚡ 活力值', secondaryGain: 1 },
    core: { primary: 'core_score', primaryLabel: '💪 核心稳定', primaryGain: 4, secondary: 'posture_score', secondaryLabel: '🦴 体态健康', secondaryGain: 1 },
    flexibility: { primary: 'flexibility_score', primaryLabel: '🧘 柔韧性', primaryGain: 4, secondary: 'posture_score', secondaryLabel: '🦴 体态健康', secondaryGain: 1 },
    sleep: { primary: 'mind_body_score', primaryLabel: '🧠 身心平衡', primaryGain: 3, secondary: 'flexibility_score', secondaryLabel: '🧘 柔韧性', secondaryGain: 1 },
  }

  const mapping = statMap[category] || statMap.micro
  const statGains = [{ stat: mapping.primary, label: mapping.primaryLabel, gain: mapping.primaryGain }]
  if (mapping.secondary) {
    statGains.push({ stat: mapping.secondary, label: mapping.secondaryLabel, gain: mapping.secondaryGain })
  }

  const bodyParts = ex.target_body || ['全身']
  const bodyHint = `你的${bodyParts.join('、')}今天第1次活动了 ✨`

  let encouragement = '太棒了！'
  if (category === 'micro') encouragement = '虽然只做了1分钟，但比不动强100倍 💪'
  else encouragement = '坚持就是改变！你的身体在感谢你 🎉'

  return {
    feedback: {
      body_hint: bodyHint,
      stat_gains: statGains,
      achievement: data?.completed ? { type: 'daily_first', title: '迈出第一步', description: '今天第一次运动！' } : null,
      encouragement
    }
  }
}

function getBehaviorStats() {
  return {
    stats: {
      total_exercises: 12,
      total_duration: 47,
      total_meditations: 2,
      streak_days: 3,
      most_frequent_category: 'first_aid'
    }
  }
}

function getDailyText() {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 9) return '早安！新的一天，从动一下开始 ☀️'
  if (hour >= 9 && hour < 12) return '工作了一会儿了，肩颈还好吗？'
  if (hour >= 12 && hour < 14) return '午休时间，活动一下下午更有精神'
  if (hour >= 14 && hour < 18) return '下午了，动一下赶走困倦'
  if (hour >= 18 && hour < 22) return '忙碌了一天，放松一下身体吧 🌙'
  return '夜深了，做个简单的睡前放松'
}

module.exports = {
  exercises,
  meditations,
  knowledge,
  defaultProfile,
  mockUser,
  getHomepageRecommendations,
  getCategories,
  getExercises,
  getExerciseDetail,
  getMeditations,
  getMeditationDetail,
  getKnowledge,
  getStats,
  getAchievements,
  getWeeklyReport,
  getFeedback,
  getBehaviorStats,
  getDailyText,
}
