# HH小程序 — 系统架构设计文档

> 版本: v2.0 | 日期: 2026-06-24 | 作者: Dayong Zhang & CodeBanana

---

## 1. 产品定位

**HH小程序** — AI 驱动的身体健康行动引导应用。

核心问题：**信息过载时代，人们到处看健康内容但不知道怎么行动，以及知道该做但坚持不下去。**

核心理念：
- **运动为主，冥想为辅** — 解决身体层面的实际问题
- **行动引导，不是内容堆砌** — 打开就知道该做什么
- **千人千面** — AI 根据你的身体状况推荐最适合的行动
- **双正反馈** — 即时反馈让你想做，长期反馈让你坚持做

---

## 2. 技术栈

| 层级 | 技术选型 | 说明 |
|------|---------|------|
| 前端 | 原生微信小程序 | 无跨平台框架，直接用微信能力 |
| 后端 | Node.js + TypeScript | 与小程序生态统一 |
| AI | 火山引擎 (豆包 LLM + 火山 TTS) | 国内服务，低延迟合规，后期可替换 |
| 数据库 | Supabase (PostgreSQL) | 结构化数据 + 向量查询 |
| 缓存 | Redis | 推荐结果、用户状态热数据 |
| 视频 | 微信视频组件 + OSS | 跟练视频托管 |
| 音频 | BackgroundAudioManager | 小程序原生后台播放（冥想/引导） |
| 部署 | Vercel (BFF) + 云服务器 (微服务) | 按模块拆分部署 |

---

## 3. 系统架构总览

```
┌──────────────────────────────────────────────────────┐
│                 微信小程序端 (Client)                  │
│                                                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │
│  │  首页    │ │  运动    │ │  发现    │ │  我的  │ │
│  │ 今日行动 │ │ 跟练播放 │ │ 知识/冥想│ │ 画像   │ │
│  └──────────┘ └──────────┘ └──────────┘ └────────┘ │
│                                                       │
│  本地存储: 用户状态缓存 · 能力值 · 离线数据           │
└────────────────────────┬─────────────────────────────┘
                         │ HTTPS (wx.request)
┌────────────────────────▼─────────────────────────────┐
│                  API Gateway (BFF)                     │
│                                                       │
│  认证鉴权 (微信登录) · 限流 · 请求路由 · 日志追踪    │
│  接口聚合: 多微服务数据合并返回                       │
└────┬──────────────┬──────────────┬──────────────────┘
     │              │              │
┌────▼────┐   ┌────▼─────┐   ┌───▼──────────┐
│ 用户服务 │   │ 内容服务  │   │  AI 引擎服务  │
│         │   │          │   │              │
│ 画像管理 │   │ 运动库   │   │ 推荐引擎     │
│ 能力值   │   │ 视频管理 │   │ 内容生成     │
│ 行为日志 │   │ 知识库   │   │ 适应性决策   │
│ 认证登录 │   │ 冥想库   │   │ 反馈引擎     │
└────┬────┘   └────┬─────┘   └───┬──────────┘
     │             │              │
┌────▼─────────────▼──────────────▼──────────────────┐
│                     数据层                           │
│                                                      │
│  PostgreSQL (Supabase)    Redis                      │
│  · 用户表/画像表          · 推荐缓存                 │
│  · 能力值表               · 会话状态                 │
│  · 行为日志表             · 久坐提醒状态             │
│  · 运动/内容/标签表        · 热点内容缓存             │
│  · 成就表                 · 限流计数器               │
│  · 反馈记录表                                        │
│  · 向量索引                                          │
│                                                      │
│  对象存储 (OSS)                                       │
│  · 跟练视频文件                                       │
│  · 冥想音频文件                                       │
│  · TTS 生成音频缓存                                   │
│  · 用户头像等静态资源                                  │
└──────────────────────────────────────────────────────┘
```

---

## 4. 核心模块设计

### 4.1 AI 引擎服务

AI 引擎是个性化体验的核心，分为四个子模块：

```
AI Engine
│
├── 推荐引擎 (Recommendation Engine) — 模块化设计
│   │
│   │  设计原则: 每个模块独立可替换，规则先行，AI 可插拔
│   │  核心逻辑: 运动为主，不让你选，告诉你做什么
│   │
│   ├── 召回层 (Recall) — 多路召回候选集
│   │   ├── 问题匹配召回: 用户身体问题标签 ∩ 运动目标部位 → 候选集 (主路)
│   │   ├── 时段召回: 当前时段 → 匹配场景标签的运动 (晨起/工作间隙/睡前)
│   │   ├── 久坐触发召回: 久坐时长 → 急救类运动
│   │   ├── 热门召回: 全局完成率 top-N (兜底)
│   │   └── [可插拔] 协同过滤召回: 向量近邻 → 相似用户偏好
│   │
│   ├── 排序层 (Ranking) — 候选集打分排序
│   │   ├── v1 规则排序 (当前):
│   │   │   ├── 问题匹配度   × 0.35  (你有什么问题→推什么运动)
│   │   │   ├── 时段匹配度   × 0.25  (早上→唤醒；工作中→久坐急救)
│   │   │   ├── 行动频率匹配 × 0.20  (好久没动→微行动；经常动→进阶)
│   │   │   ├── 内容新鲜度   × 0.10  (没做过的优先)
│   │   │   └── 全局完成率   × 0.10  (大家觉得有效的优先)
│   │   └── [可插拔] AI 排序 (后期):
│   │       └── 豆包模型 → 个性化打分替换权重
│   │
│   ├── 过滤层 (Filter) — 去重/去噪/难度适配
│   │   ├── 已完成内容降权 (近期不重复推)
│   │   ├── 难度过滤 (新手推微行动/入门，不推高级)
│   │   ├── 时长过滤 (选了3分钟就不推10分钟的)
│   │   └── 去重 (多路召回结果合并去重)
│   │
│   ├── 冷启动模块
│   │   └── 新用户问卷 (身体问题+时长+习惯) → 初始标签 → 问题匹配召回
│   │
│   └── 推荐解释
│       └── 规则模板: "你的肩颈3天没活动了" / "适合晨间的活力唤醒"
│
├── 反馈引擎 (Feedback Engine) — 即时+长期正反馈
│   │
│   ├── 即时反馈触发器
│   │   ├── 完成跟练 → 身体部位活动提示 + 能力值增长动画
│   │   ├── 首次尝试 → 鼓励语 + 新手成就
│   │   ├── 微行动 → "比不动强100倍" 类激励
│   │   ├── 打破久坐 → 久坐中断庆祝
│   │   └── 连续打卡 → streak 火焰 + 进度条
│   │
│   ├── 长期反馈生成器
│   │   ├── 每周周报 → 活动统计 + 对比 + 趋势
│   │   ├── 能力值升级 → 解锁新内容通知
│   │   ├── 30天复测 → 问题标签重新评估 + 身体变化报告
│   │   └── 里程碑成就 → 100分钟/连续30天等
│   │
│   └── 反馈文案个性化
│       └── 用户画像 + 事件类型 → LLM 生成个性化反馈语
│
├── 动态内容生成 (Content Generator)
│   │
│   ├── 运动引导词
│   │   └── 运动类型 + 用户水平 → LLM 生成跟练口令 → TTS
│   │
│   ├── 每日个性化文案
│   │   └── 用户能力值 + 行为数据 + 模板骨架 → LLM 生成
│   │
│   └── 个性化计划生成
│       └── 用户问题 + 水平 + 目标 → LLM 编排7天/30天计划
│
└── 适应性决策 (Adaptive Decision)
    │
    ├── 状态推断
    │   └── 行为序列 → 规则引擎 → 当前状态 (久坐/活跃/倦怠/进步)
    │
    └── 路径编排
        └── 状态 + 目标 → 决策树 → 下一步行动推荐
```

**AI 调用策略：**

| 场景 | 模型 | 延迟要求 | 缓存策略 |
|------|------|---------|---------|
| 推荐排序 | 规则 + 轻量模型 | <200ms | Redis 缓存 1h |
| 即时反馈 | 规则模板 | <50ms | 不缓存，实时生成 |
| 每日文案 | 豆包 (Doubao-pro) | <2s | 按用户缓存 24h |
| 运动引导词 | 豆包 (Doubao-pro) + 火山 TTS | <5s | 生成后缓存到 OSS |
| 状态推断 | 规则引擎 (初期) | <100ms | 实时计算 |

---

### 4.2 用户画像系统

```
User Profile
│
├── 静态属性 (注册时/问卷填写)
│   ├── 身体问题标签: [肩颈痛, 久坐, 体态差, 脑雾, 压力, 睡眠差, 眼疲劳]
│   ├── 运动时长偏好: 1-3min / 5min / 10min
│   ├── 运动习惯: 基本不动 / 偶尔动 / 有习惯
│   └── 自定义目标列表
│
├── 动态行为 (实时更新)
│   ├── 使用时段分布: 晨型 / 夜型 / 随机
│   ├── 运动完成率: 7日/30日滑动窗口
│   ├── 久坐状态: 最近一次活动时间 / 今日久坐总时长
│   ├── 功能偏好权重: {运动: 0.7, 知识: 0.15, 冥想: 0.15}
│   ├── 坚持度分数: 0-100
│   └── 最近活跃时间
│
├── 能力值面板 (游戏化反馈)
│   ├── 🦴 体态健康: 0-100 (Lv.1~10)
│   ├── 💪 核心稳定: 0-100
│   ├── 🧘 柔韧性:   0-100
│   ├── ⚡ 活力值:   0-100
│   └── 🧠 身心平衡: 0-100
│
└── 向量表示 (定期计算)
    ├── 行为向量: embedding(行为序列)
    └── 用途: 相似用户匹配 → 协同过滤推荐
```

**画像更新机制：**

| 事件 | 更新内容 | 频率 |
|------|---------|------|
| 完成运动跟练 | 能力值 +N，行为计数 +1，久坐状态重置 | 实时 |
| 跳过推荐 | 该类别权重微降 | 实时 |
| 久坐提醒响应/忽略 | 久坐敏感度调整 | 实时 |
| 每日首次打开 | 状态推断 + 推荐刷新 | 每日 |
| 问卷/设置修改 | 静态标签 | 用户触发 |
| 行为向量 | embedding 重算 | 每周批处理 |
| 30天复测 | 问题标签重新评估 | 每月 |

---

### 4.3 内容架构

```
Content
│
├── 运动跟练内容 (核心 70%)
│   │
│   ├── 微行动 (30秒-2min, 零门槛)
│   │   └── 站起来活动、转脖子、伸懒腰、抖抖手、深呼吸
│   │
│   ├── 久坐急救 (3-5min, 入门)
│   │   └── 肩颈拉伸、腰背放松、手腕放松、眼睛放松
│   │
│   ├── 体态改善 (5-10min, 入门-中级)
│   │   └── 圆肩矫正、驼背改善、骨盆前倾、脖子前倾
│   │
│   ├── 活力唤醒 (3-5min, 入门)
│   │   └── 晨间唤醒操、办公室活力操、午后提神
│   │
│   ├── 压力释放 (3-5min, 入门)
│   │   └── 释放紧张运动、拍打放松、抖动放松
│   │
│   ├── 核心稳定 (5-10min, 入门-中级)
│   │   └── 核心激活、腰腹力量、稳定性训练
│   │
│   ├── 柔韧性 (5-10min, 入门-中级)
│   │   └── 全身拉伸、髋部打开、肩胸打开
│   │
│   └── 睡前放松 (5-10min, 入门)
│       └── 睡前拉伸、助眠瑜伽、呼吸放松
│
├── 健康小知识 (15%)
│   ├── 身体科普: 「为什么久坐腰痛？」
│   ├── 行动贴士: 「3个动作告别圆肩」
│   └── 常见误区: 「拉伸不是越痛越好」
│
├── 冥想跟练 (15%)
│   ├── 呼吸练习: 4-7-8、箱式呼吸、腹式呼吸
│   ├── 身体扫描: 运动后身体觉察
│   ├── 正念冥想: 简短引导 (3-10min)
│   └── 动态冥想: 行走冥想、伸展冥想
│
└── 计划型内容
    ├── 7天体态改善计划
    ├── 14天肩颈拯救计划
    └── 30天久坐康复计划
```

**内容标签体系：**

```
运动内容标签
├── 目标部位: 肩颈/腰背/核心/髋部/全身/眼睛
├── 解决问题: 久坐/体态/脑雾/压力/睡眠/柔韧
├── 难度: 零门槛/入门/初级/中级
├── 时长: 1min/3min/5min/10min
├── 场景: 晨起/工作间隙/午休/睡前/随时
├── 类型: 微行动/急救/跟练/计划/知识/冥想
└── 状态: 坐姿可做/站姿/需要空间/需要垫子
```

---

### 4.4 正反馈系统

```
Feedback System
│
├── 即时正反馈 (< 1秒)
│   │
│   ├── 完成跟练
│   │   ├── 动画: 星星/光芒扩散效果
│   │   ├── 文案: 「你的肩颈今天第1次活动了 ✨」
│   │   ├── 能力值: 「核心稳定性 +3 📈」(数字上涨动画)
│   │   └── 成就: 久坐杀手/晨间达人/连续3天...
│   │
│   ├── 微行动完成
│   │   └── 「虽然只做了1分钟，但比不动强100倍 💪」
│   │
│   ├── 打破久坐
│   │   └── 「你打破了2小时的久坐！身体在感谢你 🙏」
│   │
│   └── 连续打卡
│       └── 「🔥 连续第7天！你的身体在适应改变」
│
└── 长期正反馈 (定时)
    │
    ├── 每周周报 (周一推送)
    │   └── 「本周你活动了47分钟，比上周多15% 📊」
    │
    ├── 能力值升级 (达到阈值触发)
    │   └── 「核心稳定性升至 Lv.3！解锁进阶训练 🎉」
    │
    ├── 月度报告
    │   └── 「坚持30天，体态改善分数 42→58」
    │
    ├── 30天复测
    │   └── 重新评估问题标签 + 身体变化对比
    │
    └── 里程碑成就
        └── 100分钟/连续30天/全类别尝试...
```

---

## 5. 数据模型

### 5.1 核心表结构

```sql
-- 用户表
users (
  id            UUID PRIMARY KEY,
  openid        VARCHAR UNIQUE NOT NULL,    -- 微信 openid
  nickname      VARCHAR,
  avatar_url    VARCHAR,
  created_at    TIMESTAMP,
  updated_at    TIMESTAMP
)

-- 用户画像表
user_profiles (
  id            UUID PRIMARY KEY,
  user_id       UUID REFERENCES users(id),
  problem_tags  JSONB,          -- 身体问题标签 ["肩颈痛","久坐","体态差"]
  duration_pref VARCHAR,        -- 运动时长偏好 '1-3min'/'5min'/'10min'
  exercise_habit VARCHAR,       -- 运动习惯 'sedentary'/'occasional'/'active'
  feature_weights JSONB,        -- 功能偏好权重 {exercise:0.7, knowledge:0.15, meditation:0.15}
  usage_pattern VARCHAR,        -- morning/evening/random
  persistence_score INTEGER DEFAULT 0,  -- 坚持度 0-100
  last_active_at TIMESTAMP,     -- 最近活跃时间（计算久坐用）
  total_sedentary_min INTEGER DEFAULT 0, -- 今日久坐分钟数
  behavior_vector  VECTOR(128), -- 行为向量 (pgvector)
  updated_at    TIMESTAMP
)

-- 能力值表
user_stats (
  id            UUID PRIMARY KEY,
  user_id       UUID REFERENCES users(id),
  posture_score    INTEGER DEFAULT 0,  -- 体态健康 0-100
  core_score       INTEGER DEFAULT 0,  -- 核心稳定 0-100
  flexibility_score INTEGER DEFAULT 0, -- 柔韧性 0-100
  vitality_score   INTEGER DEFAULT 0,  -- 活力值 0-100
  mind_body_score  INTEGER DEFAULT 0,  -- 身心平衡 0-100
  total_exercise_min INTEGER DEFAULT 0, -- 总运动分钟数
  updated_at    TIMESTAMP
)

-- 行为日志表
behavior_logs (
  id            UUID PRIMARY KEY,
  user_id       UUID REFERENCES users(id),
  event_type    VARCHAR NOT NULL,  -- exercise_complete, knowledge_read, meditation_complete, app_open, skip, ...
  event_data    JSONB,             -- 事件详情 {duration, content_id, body_part, ...}
  created_at    TIMESTAMP
)

-- 运动内容表
exercises (
  id            UUID PRIMARY KEY,
  title         VARCHAR NOT NULL,
  description   TEXT,
  category      VARCHAR NOT NULL,  -- micro/first_aid/posture/energy/stress/core/flexibility/sleep
  target_body   JSONB,             -- 目标部位 ["肩颈","腰背"]
  problem_tags  JSONB,             -- 解决问题 ["久坐","体态","脑雾"]
  difficulty    VARCHAR DEFAULT 'beginner',  -- zero/entry/beginner/intermediate
  duration      INTEGER,           -- 秒
  scene         JSONB,             -- 场景 ["晨起","工作间隙","睡前","随时"]
  position_type VARCHAR,           -- sit/stand/floor/any
  video_url     VARCHAR,           -- OSS 视频 URL
  thumbnail_url VARCHAR,           -- 封面图
  calorie       INTEGER,           -- 大约消耗卡路里
  is_static     BOOLEAN DEFAULT true,
  created_at    TIMESTAMP
)

-- 健康知识表
knowledge (
  id            UUID PRIMARY KEY,
  title         VARCHAR NOT NULL,
  content       TEXT,
  category      VARCHAR,           -- science/tip/myth
  problem_tags  JSONB,             -- 关联问题标签
  related_exercises JSONB,         -- 关联运动ID
  read_count    INTEGER DEFAULT 0,
  created_at    TIMESTAMP
)

-- 冥想内容表
meditations (
  id            UUID PRIMARY KEY,
  title         VARCHAR NOT NULL,
  description   TEXT,
  category      VARCHAR,           -- breath/body_scan/mindfulness/dynamic
  difficulty    VARCHAR DEFAULT 'beginner',
  duration      INTEGER,           -- 秒
  scene         JSONB,
  audio_url     VARCHAR,           -- OSS 音频 URL
  is_static     BOOLEAN DEFAULT true,
  created_at    TIMESTAMP
)

-- 成就表
achievements (
  id            UUID PRIMARY KEY,
  user_id       UUID REFERENCES users(id),
  achievement_type VARCHAR,        -- streak/total_min/category_first/level_up/milestone
  achievement_data JSONB,          -- 成就详情
  unlocked_at   TIMESTAMP
)

-- 推荐结果缓存
recommendations (
  id            UUID PRIMARY KEY,
  user_id       UUID REFERENCES users(id),
  content_ids   JSONB,             -- 推荐内容ID列表及排序
  reason        JSONB,             -- 推荐原因
  expires_at    TIMESTAMP,
  created_at    TIMESTAMP
)
```

### 5.2 向量查询 (pgvector)

```sql
-- 相似用户查询
SELECT user_id, behavior_vector <=> $1 AS distance
FROM user_profiles
WHERE behavior_vector IS NOT NULL
ORDER BY behavior_vector <=> $1
LIMIT 20;
```

---

## 6. API 设计

### 6.1 核心接口

```
# 认证
POST   /api/auth/login          微信登录 (code → openid → token)

# 用户
GET    /api/user/profile         获取画像
PUT    /api/user/profile         更新画像
POST   /api/user/onboarding     冷启动问卷提交

# 推荐 (BFF 聚合) — 核心接口
GET    /api/recommendations      获取今日行动推荐 (首页主接口)
GET    /api/recommendations/exercise  运动推荐列表
GET    /api/recommendations/plan      个性化计划推荐

# 运动内容
GET    /api/exercises/:id        获取运动详情
GET    /api/exercises/search     按标签筛选运动
GET    /api/exercises/categories 运动分类列表

# 知识
GET    /api/knowledge/:id        获取知识详情
GET    /api/knowledge/search     搜索知识

# 冥想
GET    /api/meditations          冥想列表
GET    /api/meditations/:id      冥想详情

# 行为
POST   /api/behaviors            上报行为日志
GET    /api/behaviors/stats      行为统计

# 能力值
GET    /api/stats                获取能力值面板
GET    /api/stats/weekly-report  每周周报
GET    /api/stats/monthly-report 月度报告

# 成就
GET    /api/achievements         成就列表
POST   /api/achievements/check   检查并解锁成就

# 反馈
POST   /api/feedback/complete    完成跟练后获取即时反馈

# AI 生成
POST   /api/ai/daily-text        生成每日个性化文案
POST   /api/ai/exercise-guide    生成运动引导词
POST   /api/ai/plan              生成个性化计划
```

---

## 7. 个性化体验流程

### 7.1 新用户冷启动

```
首次打开小程序
    │
    ▼
欢迎页 → 3步快速问卷
  Step 1: "你有什么身体问题？" [肩颈痛] [久坐] [体态差] [脑雾] [压力] [睡眠差]
  Step 2: "你能接受的运动时长？" [1-3分钟] [5分钟] [10分钟]
  Step 3: "你的运动习惯？" [基本不动] [偶尔动动] [有运动习惯]
    │
    ▼
POST /api/user/onboarding → 创建初始画像 + 能力值
    │
    ▼
生成首日推荐 (问题匹配 + 时段匹配)
    │
    ▼
首页展示: "今日行动" 大卡片 + 1-2个备选
    │
    ▼
首次完成跟练 → 即时正反馈 + 新手成就
```

### 7.2 老用户日常

```
打开小程序
    │
    ▼
本地缓存命中? ──→ 是 → 渲染缓存首页
    │                     │
    │                     ▼
    │               后台异步刷新推荐
    │                     │
    否                    ▼
    │               合并更新UI
    ▼
GET /api/recommendations
    │
    ▼ 后端处理:
  1. 加载用户画像 + 能力值
  2. 计算久坐时长
  3. 推断当前状态 (久坐/活跃/倦怠)
  4. 多路召回 + 排序 + 过滤
  5. 返回 1主推 + 2备选 + 推荐原因
    │
    ▼
渲染个性化首页
  - 今日行动 (1个大卡片，告诉你做什么)
  - 备选 (2个小选项)
  - 能力值进度条
  - streak / 久坐状态
  - 个性化问候 + 每日文案
```

### 7.3 运动跟练全流程

```
首页点击"开始跟练"
    │
    ▼
进入运动详情页
  - 问题说明 + 目标部位
  - 难度 + 时长
  - [开始] 按钮
    │
    ▼
进入跟练播放器
  - 视频播放 (video 组件)
  - 倒计时 + 语音引导
  - 动作名称提示
    │
    ▼
完成跟练
    │
    ▼
POST /api/feedback/complete
  { exercise_id, duration_completed, completed: true }
    │
    ▼
返回即时反馈:
  - 身体部位活动提示
  - 能力值增长 (+N)
  - 成就解锁 (如有)
  - 鼓励文案
    │
    ▼
展示反馈动画 (完成页)
  - 星星扩散 + 数字上涨 + 成就弹出
    │
    ▼
POST /api/behaviors (上报行为日志)
  { event: "exercise_complete", ... }
    │
    ▼
更新用户画像 (能力值 + 行为计数 + 久坐状态重置)
```

---

## 8. 小程序端页面结构

```
pages/
├── index/              首页 (今日行动)
│   ├── index.js
│   ├── index.wxml
│   ├── index.wxss
│   └── index.json
├── exercise/           运动模块 (核心)
│   ├── list/           运动分类列表
│   ├── detail/         运动详情
│   └── player/         跟练播放器 (视频+计时+引导)
├── discover/           发现页
│   └── index/          知识/冥想/计划探索
├── meditation/         冥想模块
│   ├── list/           冥想列表
│   └── player/         冥想播放器
├── profile/            我的
│   ├── index/          个人中心 (能力值面板+成就)
│   ├── onboarding/     冷启动问卷
│   └── stats/          详细统计 (周报/月报)
├── plan/               计划模块
│   ├── detail/         计划详情 (7天/14天/30天)
│   └── progress/       计划进度
└── components/         公共组件
    ├── video-player/   视频播放器组件
    ├── stat-bar/       能力值进度条
    ├── achievement/    成就弹窗
    ├── feedback-card/  即时反馈卡片
    └── exercise-card/  运动推荐卡片
```

**Tab Bar 结构 (运动优先):**

| Tab | 名称 | 图标 | 说明 |
|-----|------|------|------|
| 1 | 首页 | 🏠 | 今日行动 + 推荐 |
| 2 | 运动 | 💪 | 运动分类 + 跟练 |
| 3 | 发现 | 🔍 | 知识 + 冥想 + 计划 |
| 4 | 我的 | 👤 | 能力值 + 成就 + 设置 |

---

## 9. MVP 开发路线

### Phase 1 — 基础骨架 + 运动跟练 (2-3 周)

- [ ] 微信小程序项目初始化 + 页面骨架
- [ ] 后端项目搭建 (Node.js + TS + Express)
- [ ] Supabase 数据库 + 核心表创建
- [ ] 微信登录 + 用户基础表
- [ ] **运动跟练视频列表 + 视频播放器**
- [ ] 冷启动问卷 (3步)
- [ ] 首页"今日行动"推荐 (规则驱动)

### Phase 2 — 正反馈 + 个性化 (2-3 周)

- [ ] 即时正反馈系统 (完成动画 + 能力值 + 成就)
- [ ] 能力值面板
- [ ] 推荐引擎 v1 (问题+时段+频率)
- [ ] 久坐提醒
- [ ] 健康小知识卡片
- [ ] 每周周报

### Phase 3 — AI 增强 + 长期反馈 (2-3 周)

- [ ] AI 个性化推荐 (火山引擎 LLM)
- [ ] 30天体态复测
- [ ] 长期身体变化追踪
- [ ] 冥想跟练模块
- [ ] 能力值升级解锁内容
- [ ] 个性化计划生成

### Phase 4 — 打磨上线 (1-2 周)

- [ ] UI/UX 优化
- [ ] 视频加载优化
- [ ] 数据埋点
- [ ] 提审上线

---

## 10. 风险与应对

| 风险 | 影响 | 应对 |
|------|------|------|
| AI API 延迟高 | 用户体验差 | 推荐预生成 + 缓存；TTS 异步生成 |
| AI API 成本 | 运营成本高 | 能用规则的别用 LLM；TTS 音频缓存复用；豆包性价比优于海外 |
| 小程序包大小 | 超限无法发布 | 视频/音频全走 OSS；代码分包 |
| 冷启动数据不足 | 推荐质量差 | 问卷 + 规则兜底，不依赖 AI |
| 用户隐私合规 | 数据安全 | 最小化采集；明确授权；本地缓存优先 |
| 视频加载慢 | 跟练体验差 | CDN 加速；封面图预加载；降级为音频+图示 |
| 正反馈疲劳 | 成就感下降 | 控制频率；后期反馈升级；避免同质化 |

---

> 文档维护：架构调整时同步更新此文件。代码开发启动后，按模块拆分详细设计文档。
