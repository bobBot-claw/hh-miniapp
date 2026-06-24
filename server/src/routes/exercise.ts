// src/routes/exercise.ts - 运动内容路由
import { Router, Request, Response } from 'express'
import { query } from '../db'

export const exerciseRouter = Router()

// 运动分类列表
exerciseRouter.get('/categories', (_req: Request, res: Response) => {
  const categories = [
    { key: 'micro', label: '微行动', emoji: '⚡', description: '1-2分钟，随时能做' },
    { key: 'first_aid', label: '久坐急救', emoji: '🆘', description: '3-5分钟，快速缓解' },
    { key: 'posture', label: '体态改善', emoji: '🧍', description: '5-10分钟，系统改善' },
    { key: 'energy', label: '活力唤醒', emoji: '☀️', description: '3-5分钟，赶走困倦' },
    { key: 'stress', label: '压力释放', emoji: '😌', description: '3-5分钟，释放紧张' },
    { key: 'core', label: '核心稳定', emoji: '💪', description: '5-10分钟，强化核心' },
    { key: 'flexibility', label: '柔韧性', emoji: '🧘', description: '5-10分钟，打开身体' },
    { key: 'sleep', label: '睡前放松', emoji: '🌙', description: '5-10分钟，助眠放松' },
  ]
  res.json({ categories })
})

// 运动列表（支持分类筛选、难度筛选）
exerciseRouter.get('/', async (req: Request, res: Response) => {
  try {
    const { category, difficulty, position_type, limit = '20', offset = '0' } = req.query

    let sql = 'SELECT * FROM exercises WHERE is_static = true'
    const params: any[] = []
    let paramIdx = 1

    if (category) {
      sql += ` AND category = $${paramIdx++}`
      params.push(category)
    }
    if (difficulty) {
      sql += ` AND difficulty = $${paramIdx++}`
      params.push(difficulty)
    }
    if (position_type) {
      sql += ` AND position_type = $${paramIdx++}`
      params.push(position_type)
    }

    sql += ` ORDER BY play_count DESC LIMIT $${paramIdx++} OFFSET $${paramIdx++}`
    params.push(parseInt(limit as string), parseInt(offset as string))

    const result = await query(sql, params)
    res.json({ exercises: result.rows, total: result.rows.length })
  } catch (error) {
    console.error('Get exercises error:', error)
    res.status(500).json({ error: 'Failed to get exercises' })
  }
})

// 运动详情
exerciseRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM exercises WHERE id = $1', [req.params.id])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Exercise not found' })
    }

    // 增加播放计数
    await query('UPDATE exercises SET play_count = play_count + 1 WHERE id = $1', [req.params.id])

    res.json({ exercise: result.rows[0] })
  } catch (error) {
    console.error('Get exercise error:', error)
    res.status(500).json({ error: 'Failed to get exercise' })
  }
})
