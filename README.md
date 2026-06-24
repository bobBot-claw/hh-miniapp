# HH小程序 — 身体健康行动引导应用

> AI 驱动的身体健康行动引导应用。运动为主，冥想为辅。帮你解决"知道该动但不知道做什么"和"坚持不下去"的问题。

## 🎯 核心定位

- **运动为主（70%）**：科学系统的居家运动跟练视频
- **健康知识（15%）**：短小实用的身体科普和行动贴士
- **冥想辅助（15%）**：呼吸练习、身体扫描、正念冥想
- **双正反馈**：即时反馈（完成动画+能力值+成就）+ 长期反馈（周报+月报+复测）
- **千人千面**：AI 根据你的身体状况推荐最适合的行动

## 🛠 技术栈

| 层级 | 选型 |
|------|------|
| 前端 | 原生微信小程序 |
| 后端 | Node.js + TypeScript + Express |
| AI | 火山引擎（豆包 LLM + 火山 TTS） |
| 数据库 | Supabase (PostgreSQL + pgvector) |
| 缓存 | Redis |
| 视频/音频 | 微信视频组件 + OSS |

## 📁 项目结构

```
├── client/                  微信小程序前端
│   ├── pages/
│   │   ├── index/           首页（今日行动）
│   │   ├── exercise/        运动模块
│   │   │   ├── list/        运动分类列表
│   │   │   ├── detail/      运动详情
│   │   │   └── player/      跟练播放器
│   │   ├── meditation/      冥想模块
│   │   ├── discover/        发现（知识+冥想）
│   │   └── profile/         我的（能力值+成就）
│   ├── utils/
│   │   ├── api.js           API 请求封装
│   │   └── util.js          工具函数
│   └── app.js/wxss/json     全局配置
├── server/                  后端服务
│   └── src/
│       ├── engine/
│       │   ├── recommend.ts 推荐引擎（3层：召回/排序/过滤）
│       │   └── daily-text.ts 每日文案生成
│       ├── routes/          API 路由
│       │   ├── auth.ts      微信登录
│       │   ├── user.ts      用户画像+问卷
│       │   ├── exercise.ts  运动内容
│       │   ├── knowledge.ts 健康知识
│       │   ├── meditation.ts 冥想内容
│       │   ├── recommend.ts 推荐接口
│       │   ├── stats.ts     能力值+统计+成就
│       │   ├── feedback.ts  即时反馈
│       │   └── behavior.ts  行为日志
│       ├── middleware/auth.ts JWT 认证
│       ├── db/
│       │   ├── index.ts     数据库连接
│       │   └── init.sql     数据库 Schema + 种子数据
│       └── index.ts         服务入口
└── docs/                    文档
    ├── requirements.md      产品需求文档 v2.0
    ├── architecture.md      系统架构 v2.0
    └── content-modules.md   内容模块设计 v2.0
```

## 🚀 快速开始

### 1. 数据库初始化

在 Supabase SQL Editor 中执行 `server/src/db/init.sql`

### 2. 后端

```bash
cd server
cp .env.example .env  # 填入实际配置
npm install
npm run dev
```

### 3. 小程序

用微信开发者工具打开 `client/` 目录

## 💡 推荐引擎

3层架构，规则先行，AI可插拔：

1. **召回层**：问题匹配 + 时段匹配 + 久坐触发 + 热门兜底
2. **排序层**：问题匹配(0.35) + 时段(0.25) + 行动频率(0.20) + 新鲜度(0.10) + 热度(0.10)
3. **过滤层**：难度适配 + 去重 + 近期降权

## 🎮 能力值系统

| 维度 | 增长来源 |
|------|---------|
| 🦴 体态健康 | 体态改善、久坐急救 |
| 💪 核心稳定 | 核心稳定训练 |
| 🧘 柔韧性 | 拉伸、柔韧性训练 |
| ⚡ 活力值 | 微行动、活力唤醒 |
| 🧠 身心平衡 | 压力释放、冥想、睡前放松 |

## 📋 MVP 路线

- **Phase 1**: 运动跟练视频+播放器, 冷启动问卷, 今日行动推荐, 即时正反馈
- **Phase 2**: 能力值面板, 久坐提醒, 推荐引擎v1, 健康知识, 每周周报
- **Phase 3**: AI 个性化推荐, 30天复测, 冥想模块, 个性化计划
- **Phase 4**: UI/UX 优化, 视频加载优化, 提审上线
