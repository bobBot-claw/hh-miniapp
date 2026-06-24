// src/routes/auth.ts - 认证路由
import { Router, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { query } from '../db'

const router = Router()

// 微信登录
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { code } = req.body
    if (!code) {
      return res.status(400).json({ error: '缺少 code 参数' })
    }

    // 调用微信 API 获取 openid
    const wxResp = await fetch(
      `https://api.weixin.qq.com/sns/jscode2session?appid=${process.env.WX_APPID}&secret=${process.env.WX_SECRET}&js_code=${code}&grant_type=authorization_code`
    )
    const wxData = await wxResp.json() as any

    if (!wxData.openid) {
      return res.status(400).json({ error: '微信登录失败' })
    }

    // 查找或创建用户
    let userResult = await query('SELECT * FROM users WHERE openid = $1', [wxData.openid])

    let userId: string
    if (userResult.rows.length === 0) {
      // 新用户
      userId = uuidv4()
      await query(
        'INSERT INTO users (id, openid, created_at, updated_at) VALUES ($1, $2, NOW(), NOW())',
        [userId, wxData.openid]
      )
    } else {
      userId = userResult.rows[0].id
    }

    // 生成 JWT
    const token = jwt.sign(
      { userId },
      process.env.JWT_SECRET || 'default-secret',
      { expiresIn: '30d' }
    )

    // 检查是否有画像
    const profileResult = await query('SELECT id FROM user_profiles WHERE user_id = $1', [userId])

    res.json({
      token,
      userInfo: { id: userId, hasProfile: profileResult.rows.length > 0 }
    })
  } catch (err) {
    console.error('登录错误', err)
    res.status(500).json({ error: '登录失败' })
  }
})

export { router as authRouter }
