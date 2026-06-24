// src/routes/behavior.ts - 行为路由
import { Router, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { query } from '../db'
import { AuthRequest } from '../middleware/auth'

const router = Router()

// 上报行为日志
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const { event_type, event_data } = req.body

    await query(
      `INSERT INTO behavior_logs (id, user_id, event_type, event_data, created_at)
       VALUES ($1, $2, $3, $4, NOW())`,
      [uuidv4(), req.userId, event_type, JSON.stringify(event_data || {})]
    )

    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: '上报失败' })
  }
})

// 获取行为统计
router.get('/stats', async (req: AuthRequest, res: Response) => {
  try {
    // 总冥想时长
    const meditationResult = await query(
      `SELECT COALESCE(SUM((event_data->>'duration')::int), 0) as total_meditation_seconds
       FROM behavior_logs WHERE user_id = $1 AND event_type = 'meditation_complete'`,
      [req.userId]
    )

    // 总打卡次数
    const checkinResult = await query(
      `SELECT COUNT(*) as total_checkins FROM behavior_logs WHERE user_id = $1 AND event_type = 'habit_checkin'`,
      [req.userId]
    )

    // 近7天活跃天数
    const activeResult = await query(
      `SELECT COUNT(DISTINCT DATE(created_at)) as active_days
       FROM behavior_logs WHERE user_id = $1 AND created_at > NOW() - INTERVAL '7 days'`,
      [req.userId]
    )

    res.json({
      totalMeditationSeconds: meditationResult.rows[0]?.total_meditation_seconds || 0,
      totalCheckins: parseInt(checkinResult.rows[0]?.total_checkins || '0'),
      activeDaysLastWeek: parseInt(activeResult.rows[0]?.active_days || '0')
    })
  } catch (err) {
    res.status(500).json({ error: '获取统计失败' })
  }
})

export { router as behaviorRouter }
