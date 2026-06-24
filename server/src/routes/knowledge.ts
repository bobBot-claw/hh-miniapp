// src/routes/knowledge.ts - 健康知识路由
import { Router, Request, Response } from 'express'
import { query } from '../db'

export const knowledgeRouter = Router()

// 知识列表
knowledgeRouter.get('/', async (req: Request, res: Response) => {
  try {
    const { category, problem, limit = '20', offset = '0' } = req.query

    let sql = 'SELECT * FROM knowledge WHERE 1=1'
    const params: any[] = []
    let paramIdx = 1

    if (category) {
      sql += ` AND category = $${paramIdx++}`
      params.push(category)
    }
    if (problem) {
      sql += ` AND problem_tags ?| ARRAY[$${paramIdx++}]`
      params.push(problem)
    }

    sql += ` ORDER BY created_at DESC LIMIT $${paramIdx++} OFFSET $${paramIdx++}`
    params.push(parseInt(limit as string), parseInt(offset as string))

    const result = await query(sql, params)
    res.json({ knowledge: result.rows, total: result.rows.length })
  } catch (error) {
    console.error('Get knowledge error:', error)
    res.status(500).json({ error: 'Failed to get knowledge' })
  }
})

// 知识详情
knowledgeRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM knowledge WHERE id = $1', [req.params.id])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Knowledge not found' })
    }

    // 增加阅读计数
    await query('UPDATE knowledge SET read_count = read_count + 1 WHERE id = $1', [req.params.id])

    res.json({ knowledge: result.rows[0] })
  } catch (error) {
    console.error('Get knowledge error:', error)
    res.status(500).json({ error: 'Failed to get knowledge' })
  }
})
