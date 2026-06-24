// src/routes/recommend.ts - 推荐路由 v2.0
import { Router, Request, Response } from 'express'
import { getHomepageRecommendations, getExerciseRecommendations } from '../engine/recommend'

export const recommendRouter = Router()

// 首页推荐 — 今日行动
recommendRouter.get('/', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId
    const result = await getHomepageRecommendations(userId)

    // 格式化主推荐
    const primary = result.primary ? {
      id: result.primary.id,
      title: result.primary.title,
      subtitle: result.primary.subtitle,
      emoji: result.primary.emoji || '💪',
      coverGradient: result.primary.cover_gradient || 'linear-gradient(135deg, #7c6ff7, #4ecdc4)',
      category: result.primary.category,
      categoryLabel: getCategoryLabel(result.primary.category),
      durationText: formatDuration(result.primary.duration),
      duration: result.primary.duration,
      difficulty: result.primary.difficulty,
      targetBody: result.primary.target_body,
      positionType: result.primary.position_type,
      reason: result.primary.reason,
    } : null

    // 格式化备选
    const alternatives = result.alternatives.map(alt => ({
      id: alt.id,
      title: alt.title,
      subtitle: alt.subtitle,
      emoji: alt.emoji || '⚡',
      coverGradient: alt.cover_gradient || 'linear-gradient(135deg, #7c6ff7, #4ecdc4)',
      category: alt.category,
      categoryLabel: getCategoryLabel(alt.category),
      durationText: formatDuration(alt.duration),
      duration: alt.duration,
      reason: alt.reason,
    }))

    // 格式化冥想推荐
    const meditation = result.meditation ? {
      id: result.meditation.id,
      title: result.meditation.title,
      subtitle: result.meditation.subtitle,
      emoji: result.meditation.emoji || '🧘',
      coverGradient: result.meditation.cover_gradient || 'linear-gradient(135deg, #7c6ff7, #4ecdc4)',
      durationText: formatDuration(result.meditation.duration),
      duration: result.meditation.duration,
      reason: result.meditation.reason,
    } : null

    res.json({
      primary,
      alternatives,
      meditation,
      daily_text: result.daily_text,
      user_stats: result.user_stats ? {
        posture: result.user_stats.posture_score,
        core: result.user_stats.core_score,
        flexibility: result.user_stats.flexibility_score,
        vitality: result.user_stats.vitality_score,
        mind_body: result.user_stats.mind_body_score,
        streak: result.user_stats.streak_days,
      } : null,
    })
  } catch (err) {
    console.error('推荐失败', err)
    res.status(500).json({ error: '推荐失败' })
  }
})

// 运动推荐列表
recommendRouter.get('/exercises', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId
    const { category, limit } = req.query
    const items = await getExerciseRecommendations(
      userId,
      category as string | undefined,
      parseInt((limit as string) || '20')
    )

    const formatted = items.map(item => ({
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      emoji: item.emoji || '💪',
      coverGradient: item.cover_gradient || 'linear-gradient(135deg, #7c6ff7, #4ecdc4)',
      category: item.category,
      categoryLabel: getCategoryLabel(item.category),
      durationText: formatDuration(item.duration),
      duration: item.duration,
      difficulty: item.difficulty,
      targetBody: item.target_body,
      positionType: item.position_type,
      reason: item.reason,
    }))

    res.json({ items: formatted })
  } catch (err) {
    console.error('运动推荐失败', err)
    res.status(500).json({ error: '运动推荐失败' })
  }
})

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}秒`
  const minutes = Math.floor(seconds / 60)
  return `${minutes}分钟`
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    micro: '微行动',
    first_aid: '久坐急救',
    posture: '体态改善',
    energy: '活力唤醒',
    stress: '压力释放',
    core: '核心稳定',
    flexibility: '柔韧性',
    sleep: '睡前放松',
  }
  return labels[category] || category
}
