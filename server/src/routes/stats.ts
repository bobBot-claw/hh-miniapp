// src/routes/stats.ts - 能力值与统计路由
import { Router, Request, Response } from 'express'
import { query } from '../db'

export const statsRouter = Router()

// 获取能力值面板
statsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId

    // 确保能力值记录存在
    await query(
      `INSERT INTO user_stats (user_id) VALUES ($1) ON CONFLICT (user_id) DO NOTHING`,
      [userId]
    )

    const result = await query('SELECT * FROM user_stats WHERE user_id = $1', [userId])
    const stats = result.rows[0]

    // 计算等级
    const level = (score: number) => {
      if (score >= 95) return 5
      if (score >= 80) return 4
      if (score >= 60) return 3
      if (score >= 30) return 2
      return 1
    }

    res.json({
      stats: {
        posture: { score: stats.posture_score, level: level(stats.posture_score), label: '🦴 体态健康' },
        core: { score: stats.core_score, level: level(stats.core_score), label: '💪 核心稳定' },
        flexibility: { score: stats.flexibility_score, level: level(stats.flexibility_score), label: '🧘 柔韧性' },
        vitality: { score: stats.vitality_score, level: level(stats.vitality_score), label: '⚡ 活力值' },
        mind_body: { score: stats.mind_body_score, level: level(stats.mind_body_score), label: '🧠 身心平衡' },
        total_exercise_min: stats.total_exercise_min,
        streak_days: stats.streak_days,
      }
    })
  } catch (error) {
    console.error('Get stats error:', error)
    res.status(500).json({ error: 'Failed to get stats' })
  }
})

// 获取成就列表
statsRouter.get('/achievements', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId
    const result = await query(
      'SELECT * FROM achievements WHERE user_id = $1 ORDER BY unlocked_at DESC',
      [userId]
    )
    res.json({ achievements: result.rows })
  } catch (error) {
    console.error('Get achievements error:', error)
    res.status(500).json({ error: 'Failed to get achievements' })
  }
})

// 每周周报（简化版）
statsRouter.get('/weekly-report', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId

    // 本周行为统计
    const weekResult = await query(
      `SELECT
        COUNT(*) FILTER (WHERE event_type = 'exercise_complete') as exercise_count,
        COALESCE(SUM((event_data->>'duration')::int), 0) FILTER (WHERE event_type = 'exercise_complete') as total_duration,
        COUNT(*) FILTER (WHERE event_type = 'meditation_complete') as meditation_count,
        COUNT(DISTINCT DATE(created_at)) as active_days
      FROM behavior_logs
      WHERE user_id = $1 AND created_at > NOW() - INTERVAL '7 days'`,
      [userId]
    )

    // 上周对比
    const lastWeekResult = await query(
      `SELECT
        COUNT(*) FILTER (WHERE event_type = 'exercise_complete') as exercise_count,
        COALESCE(SUM((event_data->>'duration')::int), 0) FILTER (WHERE event_type = 'exercise_complete') as total_duration
      FROM behavior_logs
      WHERE user_id = $1 AND created_at BETWEEN NOW() - INTERVAL '14 days' AND NOW() - INTERVAL '7 days'`,
      [userId]
    )

    const thisWeek = weekResult.rows[0]
    const lastWeek = lastWeekResult.rows[0]
    const durationChange = lastWeek.total_duration > 0
      ? Math.round(((thisWeek.total_duration - lastWeek.total_duration) / lastWeek.total_duration) * 100)
      : 100

    // 能力值变化
    const statsResult = await query('SELECT * FROM user_stats WHERE user_id = $1', [userId])

    res.json({
      report: {
        total_duration: thisWeek.total_duration || 0,
        duration_change: durationChange,
        exercise_count: thisWeek.exercise_count || 0,
        meditation_count: thisWeek.meditation_count || 0,
        active_days: thisWeek.active_days || 0,
        stats: statsResult.rows[0] || null,
      }
    })
  } catch (error) {
    console.error('Get weekly report error:', error)
    res.status(500).json({ error: 'Failed to get weekly report' })
  }
})
