// src/routes/user.ts - 用户路由 v2.0
import { Router, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { query } from '../db'

export const userRouter = Router()

// 获取用户画像
userRouter.get('/profile', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId
    const result = await query('SELECT * FROM user_profiles WHERE user_id = $1', [userId])
    if (result.rows.length === 0) {
      return res.json(null)
    }
    const profile = result.rows[0]
    // 不返回向量数据
    delete profile.behavior_vector
    res.json(profile)
  } catch (err) {
    console.error('获取画像失败', err)
    res.status(500).json({ error: '获取画像失败' })
  }
})

// 更新用户画像
userRouter.put('/profile', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId
    const { problem_tags, duration_pref, exercise_habit, feature_weights } = req.body

    const existing = await query('SELECT id FROM user_profiles WHERE user_id = $1', [userId])

    if (existing.rows.length === 0) {
      // 创建画像
      await query(
        `INSERT INTO user_profiles (id, user_id, problem_tags, duration_pref, exercise_habit, feature_weights, persistence_score, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, 0, NOW())`,
        [uuidv4(), userId, JSON.stringify(problem_tags || []), duration_pref || '5min',
         exercise_habit || 'sedentary', JSON.stringify(feature_weights || { exercise: 0.7, knowledge: 0.15, meditation: 0.15 })]
      )
    } else {
      // 更新画像
      const updates: string[] = []
      const values: any[] = []
      let paramIndex = 1

      if (problem_tags !== undefined) { updates.push(`problem_tags = $${paramIndex++}`); values.push(JSON.stringify(problem_tags)) }
      if (duration_pref !== undefined) { updates.push(`duration_pref = $${paramIndex++}`); values.push(duration_pref) }
      if (exercise_habit !== undefined) { updates.push(`exercise_habit = $${paramIndex++}`); values.push(exercise_habit) }
      if (feature_weights !== undefined) { updates.push(`feature_weights = $${paramIndex++}`); values.push(JSON.stringify(feature_weights)) }

      updates.push(`updated_at = NOW()`)
      values.push(userId)

      await query(
        `UPDATE user_profiles SET ${updates.join(', ')} WHERE user_id = $${paramIndex}`,
        values
      )
    }

    res.json({ ok: true })
  } catch (err) {
    console.error('更新画像失败', err)
    res.status(500).json({ error: '更新画像失败' })
  }
})

// 冷启动问卷提交
userRouter.post('/onboarding', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId
    const { problem_tags, duration_pref, exercise_habit } = req.body

    if (!problem_tags || !Array.isArray(problem_tags) || problem_tags.length === 0) {
      return res.status(400).json({ error: '请至少选择一个身体问题' })
    }

    // 创建/更新画像
    await query(
      `INSERT INTO user_profiles (id, user_id, problem_tags, duration_pref, exercise_habit, feature_weights, persistence_score, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, 0, NOW())
       ON CONFLICT (user_id) DO UPDATE SET
         problem_tags = $3, duration_pref = $4, exercise_habit = $5,
         feature_weights = $6, updated_at = NOW()`,
      [uuidv4(), userId, JSON.stringify(problem_tags), duration_pref || '5min',
       exercise_habit || 'sedentary',
       JSON.stringify({ exercise: 0.7, knowledge: 0.15, meditation: 0.15 })]
    )

    // 确保能力值记录存在
    await query(
      `INSERT INTO user_stats (user_id) VALUES ($1) ON CONFLICT (user_id) DO NOTHING`,
      [userId]
    )

    res.json({ ok: true })
  } catch (err) {
    console.error('Onboarding 失败', err)
    res.status(500).json({ error: 'Onboarding 失败' })
  }
})
