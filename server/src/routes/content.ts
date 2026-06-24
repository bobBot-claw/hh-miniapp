// src/routes/content.ts - 内容路由
import { Router, Request, Response } from 'express'
import { query } from '../db'
import { AuthRequest } from '../middleware/auth'

const router = Router()

// 获取单个内容
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const result = await query('SELECT * FROM contents WHERE id = $1', [req.params.id])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: '内容不存在' })
    }
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: '获取内容失败' })
  }
})

// 搜索/筛选内容
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const { type, theme, difficulty, scene, limit = '20', offset = '0' } = req.query

    let sql = 'SELECT * FROM contents WHERE is_static = true'
    const params: any[] = []
    let paramIndex = 1

    if (type) {
      sql += ` AND type = $${paramIndex++}`
      params.push(type)
    }
    if (theme) {
      sql += ` AND tags @> $${paramIndex++}`
      params.push(JSON.stringify({ theme: [theme] }))
    }
    if (difficulty) {
      sql += ` AND tags @> $${paramIndex++}`
      params.push(JSON.stringify({ difficulty }))
    }
    if (scene) {
      sql += ` AND tags @> $${paramIndex++}`
      params.push(JSON.stringify({ scene: [scene] }))
    }

    sql += ` ORDER BY play_count DESC LIMIT $${paramIndex++} OFFSET $${paramIndex++}`
    params.push(parseInt(limit as string), parseInt(offset as string))

    const result = await query(sql, params)
    res.json({ items: result.rows })
  } catch (err) {
    console.error('搜索内容失败', err)
    res.status(500).json({ error: '搜索内容失败' })
  }
})

export { router as contentRouter }
