// utils/mock-data.js - 本地 Mock 数据（预览用）

const exercises = [
  { id: 'ex_micro_01', title: '站起来活动一下', subtitle: '只要1分钟，比不动强100倍', emoji: '⚡', cover_gradient: 'linear-gradient(135deg, #fdcb6e, #f39c12)', category: 'micro', category_label: '微行动', target_body: ['全身'], problem_tags: ['久坐'], difficulty: '零门槛', duration: 60, duration_text: '1min', scene: ['工作间隙', '随时'], position_type: '站姿', play_count: 2341 },
  { id: 'ex_micro_02', title: '转转脖子', subtitle: '缓解颈部僵硬', emoji: '🔄', cover_gradient: 'linear-gradient(135deg, #ffeaa7, #fdcb6e)', category: 'micro', category_label: '微行动', target_body: ['肩颈'], problem_tags: ['肩颈痛'], difficulty: '零门槛', duration: 60, duration_text: '1min', scene: ['工作间隙', '随时'], position_type: '坐姿可做', play_count: 1876 },
  { id: 'ex_micro_03', title: '伸个懒腰', subtitle: '全身舒展', emoji: '🤸', cover_gradient: 'linear-gradient(135deg, #55efc4, #00b894)', category: 'micro', category_label: '微行动', target_body: ['全身'], problem_tags: ['久坐'], difficulty: '零门槛', duration: 30, duration_text: '30s', scene: ['工作间隙', '随时'], position_type: '站姿', play_count: 1567 },
  { id: 'ex_micro_05', title: '深呼吸3次', subtitle: '1分钟呼吸重置', emoji: '🫁', cover_gradient: 'linear-gradient(135deg, #74b9ff, #0984e3)', category: 'micro', category_label: '微行动', target_body: ['全身'], problem_tags: ['压力', '脑雾'], difficulty: '零门槛', duration: 60, duration_text: '1min', scene: ['随时'], position_type: '任何姿势', play_count: 1234 },

  { id: 'ex_aid_01', title: '肩颈拉伸4步', subtitle: '3分钟缓解肩颈僵硬', emoji: '🆘', cover_gradient: 'linear-gradient(135deg, #ff7675, #d63031)', category: 'first_aid', category_label: '久坐急救', target_body: ['肩颈', '颈部'], problem_tags: ['肩颈痛', '久坐'], difficulty: '入门', duration: 180, duration_text: '3min', scene: ['工作间隙'], position_type: '坐姿可做', play_count: 3456 },
  { id: 'ex_aid_02', title: '腰背放松3式', subtitle: '久坐腰痛快速缓解', emoji: '🆘', cover_gradient: 'linear-gradient(135deg, #e17055, #d63031)', category: 'first_aid', category_label: '久坐急救', target_body: ['腰背'], problem_tags: ['久坐', '腰背不适'], difficulty: '入门', duration: 180, duration_text: '3min', scene: ['工作间隙'], position_type: '坐姿可做', play_count: 2789 },
  { id: 'ex_aid_05', title: '全身快速唤醒', subtitle: '坐久了动一下全身', emoji: '🆘', cover_gradient: 'linear-gradient(135deg, #fdcb6e, #e17055)', category: 'first_aid', category_label: '久坐急救', target_body: ['全身'], problem_tags: ['久坐', '脑雾'], difficulty: '入门', duration: 300, duration_text: '5min', scene: ['工作间隙', '午休'], position_type: '站姿', play_count: 2134 },

  { id: 'ex_posture_01', title: '圆肩矫正跟练', subtitle: '打开胸腔，改善圆肩', emoji: '🧍', cover_gradient: 'linear-gradient(135deg, #7c6ff7, #9d93fa)', category: 'posture', category_label: '体态改善', target_body: ['肩颈', '胸部'], problem_tags: ['体态差', '圆肩'], difficulty: '初级', duration: 300, duration_text: '5min', scene: ['晨起', '工作间隙'], position_type: '站姿', play_count: 1987 },
  { id: 'ex_posture_02', title: '驼背改善跟练', subtitle: '挺起来，告别驼背', emoji: '🧍', cover_gradient: 'linear-gradient(135deg, #5b4fd4, #7c6ff7)', category: 'posture', category_label: '体态改善', target_body: ['背部', '肩颈'], problem_tags: ['体态差', '驼背'], difficulty: '初级', duration: 420, duration_text: '7min', scene: ['晨起', '工作间隙'], position_type: '站姿', play_count: 1678 },
  { id: 'ex_posture_03', title: '脖子前倾矫正', subtitle: '找回你的天鹅颈', emoji: '🧍', cover_gradient: 'linear-gradient(135deg, #9d93fa, #b8b0ff)', category: 'posture', category_label: '体态改善', target_body: ['肩颈', '颈部'], problem_tags: ['体态差', '脖子前倾'], difficulty: '初级', duration: 300, duration_text: '5min', scene: ['晨起', '工作间隙'], position_type: '站姿', play_count: 1456 },

  { id: 'ex_energy_01', title: '晨间唤醒操', subtitle: '用运动开启新的一天', emoji: '☀️', cover_gradient: 'linear-gradient(135deg, #ffeaa7, #f39c12)', category: 'energy', category_label: '活力唤醒', target_body: ['全身'], problem_tags: ['脑雾', '久坐'], difficulty: '入门', duration: 180, duration_text: '3min', scene: ['晨起'], position_type: '站姿', play_count: 2567 },
  { id: 'ex_energy_02', title: '办公室活力操', subtitle: '下午犯困？动起来', emoji: '☀️', cover_gradient: 'linear-gradient(135deg, #f39c12, #e17055)', category: 'energy', category_label: '活力唤醒', target_body: ['全身'], problem_tags: ['脑雾', '久坐'], difficulty: '入门', duration: 300, duration_text: '5min', scene: ['午休', '工作间隙'], position_type: '站姿', play_count: 1890 },

  { id: 'ex_stress_01', title: '拍打放松', subtitle: '拍走身体里的紧张', emoji: '😌', cover_gradient: 'linear-gradient(135deg, #a29bfe, #6c5ce7)', category: 'stress', category_label: '压力释放', target_body: ['全身'], problem_tags: ['压力'], difficulty: '入门', duration: 180, duration_text: '3min', scene: ['工作间隙', '睡前'], position_type: '站姿', play_count: 1678 },
  { id: 'ex_stress_02', title: '抖动放松', subtitle: '像狗甩水一样放松', emoji: '😌', cover_gradient: 'linear-gradient(135deg, #fd79a8, #e84393)', category: 'stress', category_label: '压力释放', target_body: ['全身'], problem_tags: ['压力'], difficulty: '入门', duration: 180, duration_text: '3min', scene: ['工作间隙', '睡前'], position_type: '站姿', play_count: 1234 },

  { id: 'ex_core_01', title: '核心激活', subtitle: '唤醒沉睡的核心肌群', emoji: '💪', cover_gradient: 'linear-gradient(135deg, #00b894, #55efc4)', category: 'core', category_label: '核心稳定', target_body: ['核心', '腰腹'], problem_tags: ['体态差', '腰背不适'], difficulty: '初级', duration: 300, duration_text: '5min', scene: ['晨起', '午休'], position_type: '需要垫子', play_count: 1456 },
  { id: 'ex_core_03', title: '死虫鸟狗式跟练', subtitle: '最安全的核心训练', emoji: '💪', cover_gradient: 'linear-gradient(135deg, #55efc4, #00b894)', category: 'core', category_label: '核心稳定', target_body: ['核心', '腰背'], problem_tags: ['腰背不适', '体态差'], difficulty: '初级', duration: 300, duration_text: '5min', scene: ['晨起', '午休'], position_type: '需要垫子', play_count: 876 },

  { id: 'ex_flex_01', title: '全身拉伸', subtitle: '从头到脚的拉伸', emoji: '🧘', cover_gradient: 'linear-gradient(135deg, #74b9ff, #0984e3)', category: 'flexibility', category_label: '柔韧性', target_body: ['全身'], problem_tags: ['久坐', '柔韧差'], difficulty: '初级', duration: 420, duration_text: '7min', scene: ['晨起', '睡前'], position_type: '需要垫子', play_count: 1890 },
  { id: 'ex_flex_02', title: '髋部打开', subtitle: '久坐族的髋部释放', emoji: '🧘', cover_gradient: 'linear-gradient(135deg, #0984e3, #6c5ce7)', category: 'flexibility', category_label: '柔韧性', target_body: ['髋部'], problem_tags: ['久坐'], difficulty: '初级', duration: 300, duration_text: '5min', scene: ['晨起', '睡前'], position_type: '需要垫子', play_count: 1234 },

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
  { id: 'know_01', title: '为什么久坐腰痛？', content: '久坐时，腰椎承受的压力是站立的1.5倍。', category: 'science', category_label: '身体科普', problem_tags: ['久坐', '腰背不适'], read_count: 3456 },
  { id: 'know_02', title: '3个动作告别圆肩', content: '圆肩的根本原因是胸肌过紧+背部肌群过弱。', category: 'tip', category_label: '行动贴士', problem_tags: ['体态差', '圆肩'], read_count: 2789 },
  { id: 'know_03', title: '拉伸不是越痛越好', content: '正确拉伸应该是"有感觉但不疼"。', category: 'myth', category_label: '常见误区', problem_tags: ['久坐', '体态差'], read_count: 1987 },
  { id: 'know_04', title: '脖子前倾正在伤害你', content: '头每前倾2.5cm，颈椎额外承受4-5kg压力。', category: 'science', category_label: '身体科普', problem_tags: ['体态差', '脖子前倾', '肩颈痛'], read_count: 2345 },
  { id: 'know_05', title: '1分钟运动也有用', content: '即使1分钟的轻度活动，也能改善血糖水平。', category: 'tip', category_label: '行动贴士', problem_tags: ['久坐', '脑雾'], read_count: 1678 },
]

const defaultProfile = {
  problem_tags: ['肩颈痛', '久坐', '体态差'],
  duration_pref: '5min',
  exercise_habit: 'occasional',
  feature_weights: { exercise: 0.7, knowledge: 0.15, meditation: 0.15 },
  persistence_score: 45,
  usage_pattern: 'random',
}

const mockUser = { id: 'mock-user-001', nickname: 'Dayong', avatar_url: '' }

// ===== 分类分区配置 =====
const categoryConfig = [
  { key: 'first_aid', label: '久坐急救', emoji: '🆘', section_reason: { icon: '⏰', text: '已连续久坐2小时+' } },
  { key: 'posture', label: '体态改善', emoji: '🧍', section_reason: { icon: '🎯', text: '你标记了体态问题' } },
  { key: 'micro', label: '微行动', emoji: '⚡', section_reason: { icon: '💡', text: '没时间？1分钟也有效' } },
  { key: 'energy', label: '活力唤醒', emoji: '☀️', section_reason: { icon: '🧠', text: '赶走脑雾，恢复专注' } },
  { key: 'stress', label: '压力释放', emoji: '😌', section_reason: { icon: '📉', text: '今日压力指数偏高' } },
  { key: 'core', label: '核心稳定', emoji: '💪', section_reason: { icon: '📊', text: '核心稳定仅35，需加强' } },
  { key: 'flexibility', label: '柔韧性', emoji: '🧘', section_reason: { icon: '💡', text: '久坐导致柔韧性下降' } },
  { key: 'sleep', label: '睡前放松', emoji: '🌙', section_reason: { icon: '🌙', text: '改善睡眠质量' } },
]

// ===== 推荐理由生成 =====
const reasonPool = {
  first_aid: [
    { reason: '久坐2小时+，肩颈在求救', icon: '⏰', tag: '久坐提醒' },
    { reason: '腰背已经僵硬了，快速缓解', icon: '💡', tag: '痛点发现' },
    { reason: '3分钟就能缓解，比忍着强', icon: '📈', tag: '高效' },
  ],
  posture: [
    { reason: '你标记了肩颈痛，精准针对', icon: '🎯', tag: '精准匹配' },
    { reason: '圆肩正在加重你的肩颈负担', icon: '💡', tag: '根因发现' },
    { reason: '每天5分钟，2周改善体态', icon: '📊', tag: '科学验证' },
  ],
  micro: [
    { reason: '1分钟也比不动强100倍', icon: '📈', tag: '科学依据' },
    { reason: '坐姿就能做，不影响工作', icon: '💡', tag: '零门槛' },
    { reason: '每隔1小时做一次效果最好', icon: '⏰', tag: '习惯科学' },
  ],
  energy: [
    { reason: '下午2-4点最易脑雾', icon: '🧠', tag: '时段优化' },
    { reason: '运动后专注力提升40%', icon: '📈', tag: '科学验证' },
    { reason: '3分钟唤醒，比咖啡更管用', icon: '💡', tag: '高效' },
  ],
  stress: [
    { reason: '抖动放松已被证实快速减压', icon: '🔬', tag: '科学验证' },
    { reason: '今天周三，压力高峰期', icon: '📉', tag: '压力指数' },
    { reason: '释放紧张，睡眠也会变好', icon: '💡', tag: '连锁改善' },
  ],
  core: [
    { reason: '核心弱是腰痛的根源', icon: '💡', tag: '根因发现' },
    { reason: '死虫式是最安全的核心训练', icon: '🔬', tag: '专业推荐' },
    { reason: '你的核心稳定只有35', icon: '📊', tag: '能力分析' },
  ],
  flexibility: [
    { reason: '久坐让髋部越来越紧', icon: '💡', tag: '痛点发现' },
    { reason: '拉伸后第二天身体更轻松', icon: '📈', tag: '效果预期' },
    { reason: '柔韧性下降是久坐的隐形伤害', icon: '📊', tag: '健康预警' },
  ],
  sleep: [
    { reason: '睡前3小时轻度运动助眠', icon: '🌙', tag: '睡眠科学' },
    { reason: '呼吸放松能缩短入睡时间50%', icon: '📈', tag: '科学验证' },
    { reason: '你的睡眠评分偏低，试试这个', icon: '📊', tag: '健康分析' },
  ],
}

function pickReason(categoryKey) {
  const pool = reasonPool[categoryKey] || reasonPool.micro
  return pool[Math.floor(Math.random() * pool.length)]
}

// ===== 导出函数 =====

function getHomepageRecommendations() {
  const hour = new Date().getHours()
  let primaryIdx = 5

  if (hour >= 5 && hour < 9) primaryIdx = 12
  else if (hour >= 9 && hour < 12) primaryIdx = 5
  else if (hour >= 12 && hour < 14) primaryIdx = 13
  else if (hour >= 14 && hour < 18) primaryIdx = 0
  else if (hour >= 18 && hour < 22) primaryIdx = 19
  else primaryIdx = 20

  // 按分类分组，每项带推荐理由
  const categorySections = categoryConfig.map(cat => {
    const catExercises = exercises.filter(e => e.category === cat.key)
    return {
      key: cat.key,
      label: cat.label,
      emoji: cat.emoji,
      section_reason: cat.section_reason,
      exercises: catExercises.map(ex => ({
        ...ex,
        reason: pickReason(cat.key)
      }))
    }
  })

  return {
    primary: exercises[primaryIdx],
    category_sections: categorySections,
    meditation: meditations[0],
    user_stats: {
      posture: 58, core: 35, flexibility: 42, vitality: 72, mind_body: 28,
      streak: 3, total_exercises: 12
    }
  }
}

function getCategories() {
  return { categories: categoryConfig.map(c => ({ key: c.key, label: c.label, emoji: c.emoji })) }
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
      level: 5, total_exercises: 12, total_minutes: 47, streak: 3,
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
      total_duration: 47, duration_change: 15, exercise_count: 8,
      meditation_count: 2, active_days: 5,
      stats: { posture_score: 58, core_score: 35, flexibility_score: 42, vitality_score: 72, mind_body_score: 28 }
    }
  }
}

function getFeedback(data) {
  const exerciseId = data?.exercise_id || 'ex_aid_01'
  const ex = exercises.find(e => e.id === exerciseId) || exercises[5]
  const category = ex.category

  const statMap = {
    micro: { primary: 'vitality_score', primaryLabel: '⚡ 活力值', primaryGain: 1 },
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
  if (mapping.secondary) statGains.push({ stat: mapping.secondary, label: mapping.secondaryLabel, gain: mapping.secondaryGain })

  return {
    feedback: {
      body_hint: `你的${(ex.target_body || ['全身']).join('、')}今天第1次活动了 ✨`,
      stat_gains: statGains,
      achievement: data?.completed ? { type: 'daily_first', title: '迈出第一步', description: '今天第一次运动！' } : null,
      encouragement: category === 'micro' ? '虽然只做了1分钟，但比不动强100倍 💪' : '坚持就是改变！你的身体在感谢你 🎉'
    }
  }
}

function getBehaviorStats() {
  return { stats: { total_exercises: 12, total_duration: 47, total_meditations: 2, streak_days: 3, most_frequent_category: 'first_aid' } }
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
  exercises, meditations, knowledge, defaultProfile, mockUser,
  getHomepageRecommendations, getCategories, getExercises, getExerciseDetail,
  getMeditations, getMeditationDetail, getKnowledge, getStats, getAchievements,
  getWeeklyReport, getFeedback, getBehaviorStats, getDailyText,
}
