// src/index.ts - 后端入口 v2.0
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { authRouter } from './routes/auth'
import { userRouter } from './routes/user'
import { exerciseRouter } from './routes/exercise'
import { knowledgeRouter } from './routes/knowledge'
import { meditationRouter } from './routes/meditation'
import { recommendRouter } from './routes/recommend'
import { statsRouter } from './routes/stats'
import { feedbackRouter } from './routes/feedback'
import { behaviorRouter } from './routes/behavior'
import { authMiddleware } from './middleware/auth'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// 中间件
app.use(cors())
app.use(express.json())

// 公开路由
app.use('/api/auth', authRouter)

// 需要认证的路由
app.use('/api/user', authMiddleware, userRouter)
app.use('/api/exercises', authMiddleware, exerciseRouter)
app.use('/api/knowledge', authMiddleware, knowledgeRouter)
app.use('/api/meditations', authMiddleware, meditationRouter)
app.use('/api/recommendations', authMiddleware, recommendRouter)
app.use('/api/stats', authMiddleware, statsRouter)
app.use('/api/feedback', authMiddleware, feedbackRouter)
app.use('/api/behaviors', authMiddleware, behaviorRouter)

// 健康检查
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', version: '2.0', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`🚀 HH API Server v2.0 running on http://localhost:${PORT}`)
})

export default app
