# MEMORY.md — Project Knowledge

## Project: 慢慢变好 (v0.7.1)
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
- **Home:** 今日行动 + ✦光点 + CTA + 世界/情绪入口
- **Action:** 倒计时进度环 + 5~6步引导(每步有感受提示) + 深度标签
- **Done:** 插画模糊→清晰揭示 + 体感(feeling) + 长期收益(benefit)
- **World:** 12世界网格（6开放 + 6锁定）
- **Mood:** 5天气 + 1词（不评分不比较）

## 行动体系 (v0.7.1)
- **21 个行动:** 15时间轴(morning/work/night × 5) + 6问题轴
- **时长:** 90~300 秒（1.5~5 分钟），中位数 180 秒
- **深度:** light(随时可做) / medium(需要空间) / deep(需要躺下)
- **步骤:** 5~6 步，每步 = 动作说明 + 感受提示(hint)
- **双反馈:** feeling(做完当下体感) + benefit(长期收益)
- **标签:** neck/shoulder/back/core/eyes/energy/calm/sleep/posture
- **轮换:** 每时段 5 个行动，5 天内不重复

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
