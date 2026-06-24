// src/routes/meditation.ts - 冥想内容路由
import { Router, Request, Response } from 'express'
import { query } from '../db'

export const meditationRouter = Router()

// 冥想列表
meditationRouter.get('/', async (req: Request, res: Response) => {
  try {
    const { category, difficulty, limit = '20', offset = '0' } = req.query

    let sql = 'SELECT * FROM meditations WHERE is_static = true'
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

    sql += ` ORDER BY play_count DESC LIMIT $${paramIdx++} OFFSET $${paramIdx++}`
    params.push(parseInt(limit as string), parseInt(offset as string))

    const result = await query(sql, params)
    res.json({ meditations: result.rows, total: result.rows.length })
  } catch (error) {
    console.error('Get meditations error:', error)
    res.status(500).json({ error: 'Failed to get meditations' })
  }
})

// 冥想详情
meditationRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM meditations WHERE id = $1', [req.params.id])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Meditation not found' })
    }

    // 增加播放计数
    await query('UPDATE meditations SET play_count = play_count + 1 WHERE id = $1', [req.params.id])

    res.json({ meditation: result.rows[0] })
  } catch (error) {
    console.error('Get meditation error:', error)
    res.status(500).json({ error: 'Failed to get meditation' })
  }
})
