# MEMORY.md — Project Knowledge

## Project: 慢慢变好 (v0.8)
- **类型:** WeChat Mini Program（微信小程序）
- **定位:** 极简行动 + 治愈世界 wellness 体验
- **核心问题:** 信息过载 → 不知道怎么行动 + 坚持不下去
- **核心解法:** 每天只给 1 个行动，做完揭示 1 张治愈插画
- **原产品名:** HH小程序 → 慢慢变好（临时用名）

## 设计系统
- **暖白:** #FCFCFD / **翠绿:** #147D45 / **暖金:** #C9A66B / **深暗:** #2A2820
- **图标:** 单色线条（不用 emoji，红线 #1）
- **导航:** 流程式（无 TabBar），5 页面
- **15 条红线:** 不做仪表盘/排行/推送/打卡/游戏化/百分比/倒计时数字等

## 5 页面结构
- **Home:** 今日行动 + ✦光点 + 时长标签 + CTA + 世界/情绪入口
- **Action:** 阶段标识进度环 + 当前步骤大字 + 阶段色彩进度条 + 折叠式步骤
- **Done:** 插画模糊→清晰揭示 + 体感(feeling) + 收益(benefit) + 彩蛋
- **World:** 12世界网格（6开放 + 6锁定）
- **Mood:** 5天气 + 1词（不评分不比较）

## 行动体系 (v0.8 专业健身)
- **21 个行动:** 15时间轴(morning/work/night × 5) + 6问题轴
- **三段式:** 热身(warmup) → 训练(work/rest) → 放松(cooldown)
- **有组数/次数/间歇:** 深蹲3×15、俯卧撑3组、HIIT 30s:15s 等
- **时长:** 90~420 秒（1.5~7 分钟），HIIT 最长
- **深度:** light(随时可做) / medium(需要空间) / deep(需要躺下)
- **步骤:** 6~12 步，每步 = 动作说明 + 感受提示(hint) + 阶段(phase)
- **双反馈:** feeling(做完当下体感) + benefit(长期收益)
- **标签:** neck/shoulder/back/core/eyes/energy/calm/sleep/posture/lower/upper/cardio/full
- **阶段色彩:** 金色热身 / 绿色训练 / 灰色间歇 / 紫色放松

### 晨间 (唤醒+激活)
- morning_squat: 深蹲 3×15 (300s, medium)
- morning_pushup: 俯卧撑 3组 (300s, medium)
- morning_core: 平板+死虫+卷腹 (300s, medium)
- morning_flow: 太阳礼拜A×3 (360s, light)
- morning_hiit: 4动作×2轮 HIIT (420s, deep)

### 工间 (对抗久坐)
- work_lunge: 弓步矩阵 (300s, medium)
- work_back: 背部唤醒YTW+划船 (300s, medium)
- work_glute: 久坐臀救 臀桥+蚌式 (300s, light)
- work_posture: 体态矫正 靠墙天使+颈后缩 (300s, light)
- work_eyes_shoulder: 肩眼双救 (240s, light)

### 夜间 (放松+恢复)
- night_yoga: 夜间拉伸 6体式×30s (300s, light)
- night_core_stretch: 核心+拉伸 (360s, medium)
- night_breath: 4-7-8呼吸法 (180s, light)
- night_body: 渐进式肌肉放松PMR (300s, deep)
- night_write: 写三行字 (180s, light)

### 问题轴 (随时按需)
- problem_dizzy: 起身不晕 踝泵+缓起 (90s, light)
- problem_energy: 快速回血 开合跳+冷水 (120s, medium)
- problem_core: 腰痛急救 死虫+臀桥+猫牛 (300s, medium)
- problem_posture: 驼背急救 YTW+门框拉伸 (180s, light)
- problem_neck: 颈痛急救 颈后缩+侧屈 (150s, light)
- problem_eyes: 眼疲劳急救 远眺+眨眼+热敷 (120s, light)

## 核心数据
- **12 世界:** forest/sea/window/warm/tea/night + 6锁定
- **360 彩蛋:** 12世界 × 30插画 × 2版(blur+clear)
- **状态管理:** localStorage, appState 结构

## 技术栈
- **前端:** 原生微信小程序, AppID: wx91db22c766984692
- **状态:** wx.setStorageSync (纯本地, 无后端依赖)
- **核心模块:** utils/actions.js (行动库+世界数据+时段逻辑+标签匹配)
- **Git:** https://github.com/bobBot-claw/hh-miniapp

## 关键文件
- `client/utils/actions.js` — 行动库 + 世界数据 + 时段逻辑
- `client/assets/eggs/README.md` — 插画资源目录结构
- `client/app.wxss` — 全局样式（暖光主题）
