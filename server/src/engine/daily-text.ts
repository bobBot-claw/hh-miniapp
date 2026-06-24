// src/engine/daily-text.ts - 每日个性化文案生成（模板+规则，后期可接入LLM）
import { query } from '../db'

const GREETINGS: Record<string, string[]> = {
  morning: ['早上好 ☀️', '早安 🌅', '新的一天开始了 ☀️'],
  forenoon: ['上午好 🌤️', '今天也要加油 🌤️'],
  noon: ['中午好 🌞', '午间小憩一下 🌞'],
  afternoon: ['下午好 ⛅', '再坚持一下 ⛅'],
  evening: ['晚上好 🌙', '辛苦了一天 🌙'],
  night: ['夜深了 🌃', '安静下来 🌃']
}

const SUGGESTIONS: Record<string, Record<string, string[]>> = {
  sleep: {
    morning: ['昨晚睡得好吗？今天继续保持'],
    evening: ['今晚试试睡前放松，5 分钟就够了', '准备一个安静的夜晚吧'],
    night: ['放下手机，来一段助眠冥想']
  },
  stress: {
    morning: ['深呼吸，今天从平静开始', '先做 3 分钟呼吸，再开始一天'],
    afternoon: ['工作累了？来个 5 分钟放松', '深呼吸，释放一下压力'],
    evening: ['辛苦了，今晚好好放松', '放慢脚步，给自己一些空间']
  },
  focus: {
    morning: ['清空大脑，专注当下', '今天先从 5 分钟专注冥想开始'],
    afternoon: ['下午犯困？试试专注力训练', '深呼吸，找回专注']
  },
  exercise: {
    morning: ['运动前来个热身冥想？', '运动后别忘了拉伸放松'],
    evening: ['今天运动了吗？5 分钟也行']
  },
  meditation: {
    morning: ['晨间冥想，开启清醒的一天', '今天从 5 分钟呼吸冥想开始'],
    evening: ['睡前冥想，帮助你安心入睡'],
    night: ['安静下来，进入冥想状态']
  },
  emotion: {
    morning: ['今天也要善待自己', '先做 3 分钟呼吸，稳定情绪'],
    evening: ['今天过得怎么样？来一段情绪调节冥想'],
    night: ['放下今天的烦恼，好好休息']
  }
}

const STREAK_TEXT: Record<string, string> = {
  '0': '今天开始新的坚持',
  '1': '昨天已经迈出第一步！',
  '3': '坚持 3 天了！',
  '7': '🎉 坚持一周了！',
  '14': '💪 两周不间断！',
  '30': '🌟 一个月！太厉害了！'
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

function getStreakText(streak: number): string {
  const key = Object.keys(STREAK_TEXT).reverse().find(k => streak >= parseInt(k))
  return key ? STREAK_TEXT[key] : '继续加油'
}

export async function generateDailyText(userId: string): Promise<string> {
  const tod = getTimeOfDay()

  // 获取用户画像
  const profileResult = await query('SELECT * FROM user_profiles WHERE user_id = $1', [userId])
  const profile = profileResult.rows[0]

  if (!profile) {
    // 没有画像，返回默认
    return GREETINGS[tod][0]
  }

  const preferenceTags: string[] = profile.preference_tags || []
  const mainTag = preferenceTags[0] || 'stress'

  // 获取用户打卡 streak
  const streakResult = await query(
    `SELECT MAX(streak) as max_streak FROM habits WHERE user_id = $1`,
    [userId]
  )
  const streak = streakResult.rows[0]?.max_streak || 0

  // 组装文案
  const greetings = GREETINGS[tod] || GREETINGS.morning
  const greeting = greetings[Math.floor(Math.random() * greetings.length)]

  const tagSuggestions = SUGGESTIONS[mainTag] || SUGGESTIONS.stress
  const todSuggestions = tagSuggestions[tod] || tagSuggestions['morning'] || tagSuggestions[Object.keys(tagSuggestions)[0]] || ['来个冥想？']
  const suggestion = todSuggestions[Math.floor(Math.random() * todSuggestions.length)]

  const streakText = streak > 0 ? getStreakText(streak) : ''

  if (streakText) {
    return `${greeting} ${streakText} ${suggestion}`
  }
  return `${greeting} ${suggestion}`
}
