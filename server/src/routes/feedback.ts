// src/routes/feedback.ts - 即时反馈路由
import { Router, Request, Response } from 'express'
import { query } from '../db'
import { generateInstantFeedback } from '../engine/recommend'

export const feedbackRouter = Router()

// 完成跟练后获取即时反馈
feedbackRouter.post('/complete', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId
    const { exercise_id, duration_completed, completed } = req.body

    if (!exercise_id) {
      return res.status(400).json({ error: 'exercise_id is required' })
    }

    // 1. 获取运动详情
    const exerciseResult = await query('SELECT * FROM exercises WHERE id = $1', [exercise_id])
    if (exerciseResult.rows.length === 0) {
      return res.status(404).json({ error: 'Exercise not found' })
    }
    const exercise = exerciseResult.rows[0]

    // 2. 获取当前能力值
    const statsResult = await query('SELECT * FROM user_stats WHERE user_id = $1', [userId])
    const stats = statsResult.rows[0] || null

    // 3. 检查今天是否第一次运动
    const todayResult = await query(
      `SELECT COUNT(*) as count FROM behavior_logs
       WHERE user_id = $1 AND event_type = 'exercise_complete'
       AND created_at > CURRENT_DATE`,
      [userId]
    )
    const isFirstToday = parseInt(todayResult.rows[0].count) === 0

    // 4. 获取连续天数
    const streakDays = stats?.streak_days || 0

    // 5. 生成即时反馈
    const feedback = generateInstantFeedback(exercise, stats, streakDays, isFirstToday)

    // 6. 更新能力值
    if (completed && stats) {
      const updates: string[] = []
      const values: any[] = [userId]
      let paramIdx = 2

      for (const gain of feedback.stat_gains) {
        updates.push(`${gain.stat} = LEAST(100, ${gain.stat} + $${paramIdx++})`)
        values.push(gain.gain)
      }

      // 更新总运动时长和连续天数
      const durationMin = Math.floor((duration_completed || exercise.duration) / 60)
      updates.push(`total_exercise_min = total_exercise_min + $${paramIdx++}`)
      values.push(durationMin)
      updates.push(`streak_days = $${paramIdx++}`)
      values.push(isFirstToday ? streakDays + 1 : streakDays)
      updates.push(`last_exercise_at = NOW()`)
      updates.push(`updated_at = NOW()`)

      await query(
        `UPDATE user_stats SET ${updates.join(', ')} WHERE user_id = $1`,
        values
      )
    }

    // 7. 检查并解锁成就
    if (completed) {
      // 连续天数成就
      if ([3, 7, 14, 30, 60, 100].includes(streakDays + (isFirstToday ? 1 : 0))) {
        const newStreak = streakDays + (isFirstToday ? 1 : 0)
        await query(
          `INSERT INTO achievements (user_id, achievement_type, achievement_data)
           VALUES ($1, 'streak', '{"title": "连续' || $2 || '天", "streak_days": ' || $2 || '}')
           ON CONFLICT DO NOTHING`,
          [userId, newStreak]
        )
      }

      // 总运动时长成就
      if (stats?.total_exercise_min) {
        const totalMin = stats.total_exercise_min + Math.floor((duration_completed || exercise.duration) / 60)
        if ([30, 60, 100, 200, 500, 1000].includes(totalMin)) {
          await query(
            `INSERT INTO achievements (user_id, achievement_type, achievement_data)
             VALUES ($1, 'total_min', '{"title": "' || $2 || '分钟达成", "total_min": ' || $2 || '}')
             ON CONFLICT DO NOTHING`,
            [userId, totalMin]
          )
        }
      }
    }

    // 8. 更新用户久坐状态
    await query(
      `UPDATE user_profiles SET last_active_at = NOW(), total_sedentary_min = 0, updated_at = NOW() WHERE user_id = $1`,
      [userId]
    )

    // 9. 记录行为日志
    await query(
      `INSERT INTO behavior_logs (user_id, event_type, event_data) VALUES ($1, $2, $3)`,
      [userId, completed ? 'exercise_complete' : 'exercise_skip', {
        exercise_id,
        duration_completed: duration_completed || 0,
        category: exercise.category,
        target_body: exercise.target_body,
      }]
    )

    res.json({ feedback })
  } catch (error) {
    console.error('Feedback complete error:', error)
    res.status(500).json({ error: 'Failed to generate feedback' })
  }
})
