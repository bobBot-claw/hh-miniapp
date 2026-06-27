# MEMORY.md — Project Knowledge

## Project: 慢慢变好 (v0.7)
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
- **Action:** 2分钟倒计时进度环 + 4步步骤引导
- **Done:** 插画模糊→清晰揭示 + "今天有了光"
- **World:** 12世界网格（6开放 + 6锁定）
- **Mood:** 5天气 + 1词（不评分不比较）

## 核心数据
- **15 行动:** 9时间轴(morning/work/night × 3) + 6问题轴
- **12 世界:** forest/sea/window/warm/tea/night + 6锁定
- **360 彩蛋:** 12世界 × 30插画 × 2版(blur+clear)
- **状态管理:** localStorage, appState 结构

## 技术栈
- **前端:** 原生微信小程序, AppID: wx91db22c766984692
- **状态:** wx.setStorageSync (纯本地, 无后端依赖)
- **核心模块:** utils/actions.js (行动库+世界数据+时段逻辑)
- **Git:** https://github.com/bobBot-claw/hh-miniapp

## 彩蛋实现
- 预渲染 blur_XX.png + clear_XX.png，opacity 切换（不用实时 blur CSS）
- 插画未就绪时用 CSS 渐变 fallback
- 插画需云托管（小程序包体 2MB 限制）

## 版本变迁
- v2.0: HH小程序（冥想优先 → 运动优先）
- v5.0: 极简沉浸·行动驱动（深紫暗色系）
- **v0.7: 慢慢变好（暖光治愈系，当前版本）**

## 关键文件
- `client/utils/actions.js` — 行动库 + 世界数据 + 时段逻辑
- `client/assets/eggs/README.md` — 插画资源目录结构
- `client/app.wxss` — 全局样式（暖光主题）
- `docs/` — 旧版文档（v2.0 遗留）
