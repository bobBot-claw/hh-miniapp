// src/routes/habit.ts - 习惯路由
import { Router, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { query } from '../db'
import { AuthRequest } from '../middleware/auth'

const router = Router()

// 获取习惯列表
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const result = await query('SELECT * FROM habits WHERE user_id = $1 ORDER BY created_at', [req.userId])

    // 检查今日打卡状态
    const habits = result.rows.map(habit => {
      const todayChecked = habit.last_checkin &&
        new Date(habit.last_checkin).toDateString() === new Date().toDateString()
      return { ...habit, todayChecked }
    })

    res.json({ habits })
  } catch (err) {
    res.status(500).json({ error: '获取习惯失败' })
  }
})

// 创建习惯
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const { name, icon, schedule, category } = req.body
    const id = uuidv4()

    await query(
      `INSERT INTO habits (id, user_id, name, icon, schedule, category, streak, total_checkins, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, 0, 0, NOW())`,
      [id, req.userId, name, icon || '⭐', schedule || 'all_day', category || '自定义']
    )

    res.json({ id, ok: true })
  } catch (err) {
    res.status(500).json({ error: '创建习惯失败' })
  }
})

// 打卡
router.post('/:id/checkin', async (req: AuthRequest, res: Response) => {
  try {
    const habitId = req.params.id

    // 检查是否已打卡
    const habit = await query('SELECT * FROM habits WHERE id = $1 AND user_id = $2', [habitId, req.userId])
    if (habit.rows.length === 0) {
      return res.status(404).json({ error: '习惯不存在' })
    }

    const todayChecked = habit.rows[0].last_checkin &&
      new Date(habit.rows[0].last_checkin).toDateString() === new Date().toDateString()
    if (todayChecked) {
      return res.status(400).json({ error: '今天已经打卡了' })
    }

    // 更新打卡
    const streak = habit.rows[0].streak || 0
    const newStreak = streak + 1
    const totalCheckins = (habit.rows[0].total_checkins || 0) + 1

    await query(
      `UPDATE habits SET streak = $1, total_checkins = $2, last_checkin = NOW() WHERE id = $3`,
      [newStreak, totalCheckins, habitId]
    )

    // 上报行为
    await query(
      `INSERT INTO behavior_logs (id, user_id, event_type, event_data, created_at)
       VALUES ($1, $2, 'habit_checkin', $3, NOW())`,
      [uuidv4(), req.userId, JSON.stringify({ habit_id: habitId, streak: newStreak })]
    )

    res.json({ ok: true, streak: newStreak })
  } catch (err) {
    res.status(500).json({ error: '打卡失败' })
  }
})

// 习惯连续记录
router.get('/:id/streak', async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(
      `SELECT * FROM habits WHERE id = $1 AND user_id = $2`,
      [req.params.id, req.userId]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: '习惯不存在' })
    }
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: '获取记录失败' })
  }
})

export { router as habitRouter }
