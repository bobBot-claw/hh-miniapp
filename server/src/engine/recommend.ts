// src/engine/recommend.ts - 推荐引擎 v2.0（运动优先、模块化、规则驱动、AI可插拔）
import { query } from '../db'

// ===== 类型定义 =====
interface Exercise {
  id: string
  title: string
  subtitle: string
  category: string
  target_body: string[]
  problem_tags: string[]
  difficulty: string
  duration: number
  scene: string[]
  position_type: string
  emoji?: string
  cover_gradient?: string
  play_count: number
}

interface Meditation {
  id: string
  title: string
  subtitle: string
  category: string
  difficulty: string
  duration: number
  scene: string[]
  emoji?: string
  cover_gradient?: string
  play_count: number
}

interface UserProfile {
  problem_tags: string[]
  duration_pref: string
  exercise_habit: string
  feature_weights: Record<string, number>
  usage_pattern: string
  persistence_score: number
  last_active_at: Date | null
  total_sedentary_min: number
}

interface StatSnapshot {
  posture_score: number
  core_score: number
  flexibility_score: number
  vitality_score: number
  mind_body_score: number
  total_exercise_min: number
  streak_days: number
}

type RecommendItem = Exercise | Meditation & { score: number; reason: string; item_type: 'exercise' | 'meditation' }

// ===== 问题-部位映射 =====
const PROBLEM_BODY_MAP: Record<string, string[]> = {
  '肩颈痛': ['肩颈', '颈部'],
  '腰背不适': ['腰背'],
  '体态差': ['肩颈', '背部', '胸部', '腰背'],
  '圆肩': ['肩颈', '胸部'],
  '驼背': ['背部', '肩颈'],
  '脖子前倾': ['肩颈', '颈部'],
  '骨盆前倾': ['腰背', '髋部'],
  '脑雾': ['全身'],
  '压力': ['全身'],
  '睡眠差': ['全身'],
  '久坐': ['全身', '肩颈', '腰背'],
  '眼疲劳': ['眼睛'],
}

// ===== 时段-场景映射 =====
const TIME_SCENE_MAP: Record<string, string[]> = {
  morning: ['晨起'],
  forenoon: ['工作间隙'],
  noon: ['午休'],
  afternoon: ['工作间隙', '午休'],
  evening: ['睡前'],
  night: ['睡前']
}

function getTimeOfDay(): string {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 9) return 'morning'
  if (hour >= 9 && hour < 12) return 'forenoon'
  if (hour >= 12 && hour < 14) return 'noon'
  if (hour >= 14 && hour < 18) return 'afternoon'
  if (hour >= 18 && hour < 22) return 'evening'
  return 'night'
}

// ===== 运动类别-能力值映射 =====
const CATEGORY_STAT_MAP: Record<string, { primary: keyof StatSnapshot; secondary: keyof StatSnapshot }> = {
  micro: { primary: 'vitality_score', secondary: 'vitality_score' },
  first_aid: { primary: 'posture_score', secondary: 'vitality_score' },
  posture: { primary: 'posture_score', secondary: 'flexibility_score' },
  energy: { primary: 'vitality_score', secondary: 'mind_body_score' },
  stress: { primary: 'mind_body_score', secondary: 'vitality_score' },
  core: { primary: 'core_score', secondary: 'posture_score' },
  flexibility: { primary: 'flexibility_score', secondary: 'posture_score' },
  sleep: { primary: 'mind_body_score', secondary: 'flexibility_score' },
}

const CATEGORY_LABELS: Record<string, string> = {
  micro: '微行动',
  first_aid: '久坐急救',
  posture: '体态改善',
  energy: '活力唤醒',
  stress: '压力释放',
  core: '核心稳定',
  flexibility: '柔韧性',
  sleep: '睡前放松',
}

// ===== 1. 召回层 =====

/**
 * 问题匹配召回 — 主路
 */
async function recallByProblem(userProfile: UserProfile): Promise<Exercise[]> {
  const targetBodies: string[] = []
  for (const problem of userProfile.problem_tags || []) {
    targetBodies.push(...(PROBLEM_BODY_MAP[problem] || []))
  }

  if (targetBodies.length === 0) return []

  const result = await query(
    `SELECT * FROM exercises WHERE is_static = true AND (target_body ?| $1 OR problem_tags ?| $2)`,
    [targetBodies, userProfile.problem_tags]
  )

  return result.rows
}

/**
 * 时段召回
 */
async function recallByTimeOfDay(): Promise<Exercise[]> {
  const tod = getTimeOfDay()
  const scenes = TIME_SCENE_MAP[tod] || []
  if (scenes.length === 0) return []

  const result = await query(
    `SELECT * FROM exercises WHERE is_static = true AND scene ?| $1`,
    [scenes]
  )

  return result.rows
}

/**
 * 久坐触发召回
 */
async function recallBySedentary(sedentaryMin: number): Promise<Exercise[]> {
  if (sedentaryMin < 60) return []

  const categories = sedentaryMin >= 120
    ? ['first_aid', 'micro']
    : ['first_aid']

  const result = await query(
    `SELECT * FROM exercises WHERE is_static = true AND category = ANY($1)`,
    [categories]
  )

  return result.rows
}

/**
 * 热门召回（兜底）
 */
async function recallByPopularity(limit: number = 20): Promise<Exercise[]> {
  const result = await query(
    `SELECT * FROM exercises WHERE is_static = true ORDER BY play_count DESC LIMIT $1`,
    [limit]
  )
  return result.rows
}

/**
 * 冥想召回
 */
async function recallMeditations(limit: number = 10): Promise<Meditation[]> {
  const tod = getTimeOfDay()
  const scenes = TIME_SCENE_MAP[tod] || []

  if (scenes.length > 0) {
    const result = await query(
      `SELECT * FROM meditations WHERE is_static = true AND (scene ?| $1 OR scene @> '["随时"]'::jsonb) ORDER BY play_count DESC LIMIT $2`,
      [scenes, limit]
    )
    return result.rows
  }

  const result = await query(
    `SELECT * FROM meditations WHERE is_static = true ORDER BY play_count DESC LIMIT $1`,
    [limit]
  )
  return result.rows
}

// ===== 2. 排序层 =====

/**
 * 运动排序 v2 — 问题匹配(0.35) + 时段(0.25) + 行动频率(0.20) + 新鲜度(0.10) + 热度(0.10)
 */
function rankExercises(
  exercises: Exercise[],
  userProfile: UserProfile,
  recentExerciseIds: string[],
  sedentaryMin: number
): Array<Exercise & { score: number; reason: string }> {
  const tod = getTimeOfDay()
  const todScenes = TIME_SCENE_MAP[tod] || []

  // 用户问题对应的目标部位
  const userTargetBodies: string[] = []
  for (const problem of userProfile.problem_tags || []) {
    userTargetBodies.push(...(PROBLEM_BODY_MAP[problem] || []))
  }

  return exercises
    .map(ex => {
      // --- 难度过滤 ---
      if (userProfile.exercise_habit === 'sedentary') {
        if (!['zero', 'entry'].includes(ex.difficulty)) return { ...ex, score: -1, reason: '' }
        if (ex.duration > 300) return { ...ex, score: -0.5, reason: '' } // 不动族降权长视频
      } else if (userProfile.exercise_habit === 'occasional') {
        if (ex.difficulty === 'intermediate') return { ...ex, score: -0.5, reason: '' }
      }

      // --- 时长过滤 ---
      if (userProfile.duration_pref === '1-3min' && ex.duration > 300) {
        return { ...ex, score: -0.3, reason: '' }
      }

      // 1. 问题匹配度 (0-1)
      const problemMatches = (ex.problem_tags || []).filter((t: string) => userProfile.problem_tags.includes(t)).length
      const bodyMatches = (ex.target_body || []).filter((t: string) => userTargetBodies.includes(t)).length
      const problemScore = Math.max(
        userProfile.problem_tags.length > 0 ? problemMatches / userProfile.problem_tags.length : 0,
        userTargetBodies.length > 0 ? bodyMatches / userTargetBodies.length : 0
      )

      // 2. 时段匹配度 (0.3-1)
      const exScenes: string[] = ex.scene || []
      const timeScore = exScenes.some(s => todScenes.includes(s)) || exScenes.includes('随时') ? 1.0 : 0.3

      // 3. 行动频率匹配 (0.3-1)
      let frequencyScore = 0.5
      if (userProfile.exercise_habit === 'sedentary') {
        frequencyScore = ex.category === 'micro' ? 1.0 : ex.category === 'first_aid' ? 0.8 : 0.3
      } else if (userProfile.exercise_habit === 'occasional') {
        frequencyScore = ex.category === 'micro' ? 0.6 : ex.category === 'first_aid' ? 0.8 : 0.9
      } else {
        frequencyScore = ex.category === 'micro' ? 0.3 : ex.category === 'first_aid' ? 0.5 : 1.0
      }

      // 4. 新鲜度 (0.3-1)
      const freshnessScore = recentExerciseIds.includes(ex.id) ? 0.3 : 1.0

      // 5. 热度 (0-1)
      const popularityScore = Math.min(ex.play_count / 2000, 1.0)

      // 综合打分
      let score = problemScore * 0.35 + timeScore * 0.25 + frequencyScore * 0.20 + freshnessScore * 0.10 + popularityScore * 0.10

      // --- 久坐加权 ---
      if (sedentaryMin >= 120) {
        if (ex.category === 'first_aid') score *= 1.5
        if (ex.category === 'micro') score *= 1.3
      } else if (sedentaryMin >= 60) {
        if (ex.category === 'first_aid') score *= 1.2
        if (ex.category === 'micro') score *= 1.1
      }

      // 推荐原因
      let reason = '为你推荐'
      if (sedentaryMin >= 120 && ex.category === 'first_aid') {
        reason = `你已久坐${Math.floor(sedentaryMin / 60)}小时，起来动一下`
      } else if (problemMatches > 0) {
        const matchedProblem = (ex.problem_tags || []).find((t: string) => userProfile.problem_tags.includes(t))
        reason = matchedProblem ? `你的${matchedProblem}需要关心` : '为你推荐'
      } else if (timeScore > 0.5) {
        const sceneLabel = todScenes[0] || '现在'
        reason = `适合${sceneLabel}的${CATEGORY_LABELS[ex.category] || '运动'}`
      } else if (freshnessScore > 0.5) {
        reason = '试试新的练习'
      }

      return { ...ex, score, reason }
    })
    .filter(c => c.score > 0)
    .sort((a, b) => b.score - a.score)
}

// ===== 3. 过滤层 =====

function filterExercises(
  exercises: Array<Exercise & { score: number; reason: string }>,
  recentExerciseIds: string[],
  limit: number = 5
): Array<Exercise & { score: number; reason: string }> {
  // 去重
  const seen = new Set<string>()
  const deduped = exercises.filter(c => {
    if (seen.has(c.id)) return false
    seen.add(c.id)
    return true
  })

  // 近期做过的降权
  const filtered = deduped.map(c => {
    if (recentExerciseIds.includes(c.id)) {
      return { ...c, score: c.score * 0.3 }
    }
    return c
  })

  return filtered.sort((a, b) => b.score - a.score).slice(0, limit)
}

// ===== 主推荐函数 =====

export interface HomepageRecommendation {
  primary: (Exercise & { score: number; reason: string }) | null
  alternatives: Array<Exercise & { score: number; reason: string }>
  meditation: (Meditation & { score: number; reason: string }) | null
  daily_text: string
  user_stats: StatSnapshot | null
}

/**
 * 获取首页推荐 — 今日行动 (1主推 + 2备选 + 1冥想)
 */
export async function getHomepageRecommendations(
  userId: string
): Promise<HomepageRecommendation> {
  // 1. 加载用户画像
  const profileResult = await query('SELECT * FROM user_profiles WHERE user_id = $1', [userId])
  const userProfile: UserProfile = profileResult.rows[0] || {
    problem_tags: [],
    duration_pref: '5min',
    exercise_habit: 'sedentary',
    feature_weights: { exercise: 0.7, knowledge: 0.15, meditation: 0.15 },
    usage_pattern: 'random',
    persistence_score: 0,
    last_active_at: null,
    total_sedentary_min: 0,
  }

  // 2. 加载能力值
  const statsResult = await query('SELECT * FROM user_stats WHERE user_id = $1', [userId])
  const userStats: StatSnapshot | null = statsResult.rows[0] || null

  // 3. 计算久坐时间
  const sedentaryMin = userProfile.total_sedentary_min || 0

  // 4. 获取近期行为
  const recentResult = await query(
    `SELECT DISTINCT event_data->>'exercise_id' as exercise_id
     FROM behavior_logs
     WHERE user_id = $1 AND created_at > NOW() - INTERVAL '7 days'
     AND event_data->>'exercise_id' IS NOT NULL`,
    [userId]
  )
  const recentExerciseIds = recentResult.rows.map((r: any) => r.exercise_id)

  // 5. 多路召回运动
  const [problemResults, timeResults, sedentaryResults, hotResults] = await Promise.all([
    recallByProblem(userProfile),
    recallByTimeOfDay(),
    recallBySedentary(sedentaryMin),
    recallByPopularity(20)
  ])

  const allExerciseCandidates = [...problemResults, ...timeResults, ...sedentaryResults, ...hotResults]

  // 兜底
  if (allExerciseCandidates.length === 0) {
    const fallback = await query('SELECT * FROM exercises WHERE is_static = true LIMIT 20')
    allExerciseCandidates.push(...fallback.rows)
  }

  // 6. 排序
  const ranked = rankExercises(allExerciseCandidates, userProfile, recentExerciseIds, sedentaryMin)

  // 7. 过滤
  const filtered = filterExercises(ranked, recentExerciseIds, 3)

  // 8. 拆分主推+备选
  const primary = filtered[0] || null
  const alternatives = filtered.slice(1, 3)

  // 9. 冥想推荐
  let meditationRecommend: (Meditation & { score: number; reason: string }) | null = null
  const meditations = await recallMeditations(5)
  if (meditations.length > 0) {
    // 简单规则：取第一个匹配时段的
    const tod = getTimeOfDay()
    const todScenes = TIME_SCENE_MAP[tod] || []
    const matched = meditations.find(m => (m.scene || []).some(s => todScenes.includes(s) || s === '随时'))
    const best = matched || meditations[0]
    meditationRecommend = {
      ...best,
      score: 0.5,
      reason: `适合${todScenes[0] || '现在'}的冥想`
    }
  }

  // 10. 每日文案
  const dailyText = generateDailyText(userProfile, userStats, sedentaryMin)

  return {
    primary,
    alternatives,
    meditation: meditationRecommend,
    daily_text: dailyText,
    user_stats: userStats,
  }
}

/**
 * 获取运动推荐列表
 */
export async function getExerciseRecommendations(
  userId: string,
  category?: string,
  limit: number = 20
): Promise<Array<Exercise & { score: number; reason: string }>> {
  const profileResult = await query('SELECT * FROM user_profiles WHERE user_id = $1', [userId])
  const userProfile: UserProfile = profileResult.rows[0] || {
    problem_tags: [],
    duration_pref: '5min',
    exercise_habit: 'sedentary',
    feature_weights: {},
    usage_pattern: 'random',
    persistence_score: 0,
    last_active_at: null,
    total_sedentary_min: 0,
  }

  const sedentaryMin = userProfile.total_sedentary_min || 0

  const recentResult = await query(
    `SELECT DISTINCT event_data->>'exercise_id' as exercise_id
     FROM behavior_logs
     WHERE user_id = $1 AND created_at > NOW() - INTERVAL '7 days'
     AND event_data->>'exercise_id' IS NOT NULL`,
    [userId]
  )
  const recentExerciseIds = recentResult.rows.map((r: any) => r.exercise_id)

  let exercises: Exercise[]
  if (category) {
    const result = await query(
      `SELECT * FROM exercises WHERE is_static = true AND category = $1 ORDER BY play_count DESC LIMIT $2`,
      [category, limit * 2]
    )
    exercises = result.rows
  } else {
    const [problemResults, timeResults, hotResults] = await Promise.all([
      recallByProblem(userProfile),
      recallByTimeOfDay(),
      recallByPopularity(20)
    ])
    exercises = [...problemResults, ...timeResults, ...hotResults]
  }

  const ranked = rankExercises(exercises, userProfile, recentExerciseIds, sedentaryMin)
  return filterExercises(ranked, recentExerciseIds, limit)
}

// ===== 每日文案生成 =====

function generateDailyText(
  userProfile: UserProfile,
  stats: StatSnapshot | null,
  sedentaryMin: number
): string {
  const hour = new Date().getHours()

  // 久坐特别提醒
  if (sedentaryMin >= 120) {
    return `你已久坐${Math.floor(sedentaryMin / 60)}小时了，身体在等你动起来`
  }
  if (sedentaryMin >= 60) {
    return '坐了1小时了，起来活动一下？'
  }

  // 基于时段
  if (hour >= 5 && hour < 9) {
    if (stats?.streak_days && stats.streak_days >= 3) {
      return `早安！连续${stats.streak_days}天的你，今天也充满能量 🌅`
    }
    return '早安！新的一天，从动一下开始'
  }
  if (hour >= 9 && hour < 12) {
    return '工作了一会儿了，肩颈还好吗？'
  }
  if (hour >= 12 && hour < 14) {
    return '午休时间，活动一下下午更有精神'
  }
  if (hour >= 14 && hour < 18) {
    return '下午了，动一下赶走困倦'
  }
  if (hour >= 18 && hour < 22) {
    return '忙碌了一天，放松一下身体吧'
  }
  return '夜深了，做个简单的睡前放松'
}

// ===== 即时反馈生成 =====

export interface InstantFeedback {
  body_hint: string          // 身体部位活动提示
  stat_gains: Array<{ stat: string; label: string; gain: number }>  // 能力值增长
  achievement: { type: string; title: string; description: string } | null  // 成就
  encouragement: string      // 鼓励文案
}

export function generateInstantFeedback(
  exercise: Exercise,
  stats: StatSnapshot | null,
  streakDays: number,
  isFirstToday: boolean
): InstantFeedback {
  const category = exercise.category
  const statMapping = CATEGORY_STAT_MAP[category] || { primary: 'vitality_score', secondary: 'vitality_score' }

  // 能力值增长
  const primaryGain = category === 'micro' ? 1 : Math.floor(Math.random() * 3) + 2  // 微行动+1，其他+2~4
  const secondaryGain = category === 'micro' ? 0 : 1

  const statLabels: Record<string, string> = {
    posture_score: '🦴 体态健康',
    core_score: '💪 核心稳定',
    flexibility_score: '🧘 柔韧性',
    vitality_score: '⚡ 活力值',
    mind_body_score: '🧠 身心平衡',
  }

  const statGains = [
    { stat: statMapping.primary, label: statLabels[statMapping.primary], gain: primaryGain }
  ]
  if (secondaryGain > 0 && statMapping.secondary !== statMapping.primary) {
    statGains.push({ stat: statMapping.secondary, label: statLabels[statMapping.secondary], gain: secondaryGain })
  }

  // 身体部位活动提示
  const bodyParts = exercise.target_body || ['全身']
  const bodyHint = `你的${bodyParts.join('、')}今天第1次活动了 ✨`

  // 成就检测
  let achievement = null
  if (isFirstToday) {
    achievement = { type: 'daily_first', title: '迈出第一步', description: '今天第一次运动！' }
  }
  if (streakDays === 3) {
    achievement = { type: 'streak_3', title: '三天成习', description: '连续3天运动！你的身体在适应改变' }
  }
  if (streakDays === 7) {
    achievement = { type: 'streak_7', title: '一周达人', description: '连续7天！你已经是行动派了' }
  }
  if (streakDays === 30) {
    achievement = { type: 'streak_30', title: '月度坚持王', description: '连续30天！你证明了坚持的力量' }
  }

  // 鼓励文案
  let encouragement = '太棒了！'
  if (category === 'micro') {
    encouragement = '虽然只做了1分钟，但比不动强100倍 💪'
  } else if (isFirstToday) {
    encouragement = '迈出第一步，最难的部分已经过去了 🌟'
  } else if (streakDays >= 7) {
    encouragement = `连续${streakDays}天！你的坚持让身体在改变 🔥`
  }

  return { body_hint: bodyHint, stat_gains: statGains, achievement, encouragement }
}
