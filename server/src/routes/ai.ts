// src/routes/ai.ts - AI 路由
import { Router, Request, Response } from 'express'
import { AuthRequest } from '../middleware/auth'
import { generateDailyText } from '../engine/daily-text'

const router = Router()

// 生成每日个性化文案
router.post('/daily-text', async (req: AuthRequest, res: Response) => {
  try {
    const text = await generateDailyText(req.userId!)
    res.json({ text })
  } catch (err) {
    console.error('生成每日文案失败', err)
    res.status(500).json({ error: '生成文案失败' })
  }
})

// 冥想引导词生成（后期接入火山引擎）
router.post('/meditation-script', async (req: AuthRequest, res: Response) => {
  // TODO: Phase 3 - 接入豆包 LLM + 火山 TTS
  res.json({ script: '冥想引导词生成功能即将上线', audio_url: '' })
})

// 个性化挑战（后期接入）
router.post('/challenge', async (req: AuthRequest, res: Response) => {
  // TODO: Phase 3 - AI 生成个性化挑战
  res.json({ challenge: '个性化挑战功能即将上线' })
})

export { router as aiRouter }
