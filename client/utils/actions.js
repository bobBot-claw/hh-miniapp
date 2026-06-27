// utils/actions.js — 慢慢变好 v0.8 — 专业健身行动库 + 治愈世界
//
// ═══════════════════════════════════════════════════════════
// 设计理念
// ═══════════════════════════════════════════════════════════
//
// 每个行动 = 一节微型私教课
// 三段式结构：热身 → 训练 → 放松
// 有组数、次数、间歇，做完真有感觉
//
// 难度体系（depth）：
//   light  = 入门，自重基础，久坐族可做
//   medium = 进阶，增加负荷/时长/不稳定性
//   deep   = 挑战，高强度或需要更多空间
//
// 训练分类（tags）：
//   upper / lower / core / full / cardio / posture / neck / eyes / calm / sleep
//
// 步骤结构：
//   phase: 'warmup' | 'work' | 'rest' | 'cooldown'
//   每步 = 动作说明 + 感受提示 + 阶段标识
// ═══════════════════════════════════════════════════════════

const ACTIONS = {

  // ╔════════════════════════════════════════════╗
  // ║          晨 间 · 5 行动（唤醒+激活）        ║
  // ╚════════════════════════════════════════════╝

  morning_squat: {
    id: 'morning_squat',
    title: '晨间深蹲',
    subtitle: '3 组 × 15 次 · 叫醒臀腿',
    duration: 300,
    scene: 'morning',
    depth: 'medium',
    tags: ['lower', 'full', 'cardio'],
    steps: [
      { text: '原地高抬腿 30 秒', hint: '膝盖尽量抬高，把心率拉起来', phase: 'warmup' },
      { text: '手臂画大圈 10 次，前后各 5', hint: '肩关节活动开', phase: 'warmup' },
      { text: '深蹲 × 15：脚与肩宽，屁股往后坐', hint: '膝盖对准脚尖方向，不要内扣', phase: 'work' },
      { text: '休息 20 秒，抖腿放松', hint: '调整呼吸', phase: 'rest' },
      { text: '深蹲 × 15：这次蹲低一点', hint: '大腿至少与地面平行', phase: 'work' },
      { text: '休息 20 秒', hint: '第三次是最难的', phase: 'rest' },
      { text: '深蹲 × 15：最后一组，坚持住', hint: '最后 5 个可能会抖，正常', phase: 'work' },
      { text: '站直，双手抱头后仰 10 秒', hint: '拉伸髋屈肌，打开前侧', phase: 'cooldown' },
      { text: '前屈触地 15 秒', hint: '拉长后侧链', phase: 'cooldown' },
    ],
    feeling: '大腿发酸发热 · 臀部有泵感 · 心率上来 · 出微汗',
    benefit: '深蹲是最有效的下肢复合动作，激活臀大肌和股四头肌，提升基础代谢',
  },
  morning_pushup: {
    id: 'morning_pushup',
    title: '晨间俯卧撑',
    subtitle: '3 组 × 尽力 · 唤醒上肢',
    duration: 300,
    scene: 'morning',
    depth: 'medium',
    tags: ['upper', 'core', 'posture'],
    steps: [
      { text: '手臂画大圈 15 次', hint: '前 5 慢，后 10 加速', phase: 'warmup' },
      { text: '扩胸夹背各 10 次', hint: '肩胛骨活动开', phase: 'warmup' },
      { text: '俯卧撑第 1 组：尽力做', hint: '做不到标准就膝盖着地，不要硬撑', phase: 'work' },
      { text: '休息 30 秒', hint: '手撑地拉伸一下手腕', phase: 'rest' },
      { text: '俯卧撑第 2 组：尽力做', hint: '比第一组少也正常，质量 > 数量', phase: 'work' },
      { text: '休息 30 秒', hint: '甩手 5 秒', phase: 'rest' },
      { text: '俯卧撑第 3 组：尽力做', hint: '最后一个要最慢地推起来', phase: 'work' },
      { text: '眼镜蛇式：趴地，手臂撑起上身 15 秒', hint: '拉伸腹肌和胸肌', phase: 'cooldown' },
      { text: '婴儿式 15 秒', hint: '放松下背和肩膀', phase: 'cooldown' },
    ],
    feeling: '胸肌发胀 · 手臂发酸 · 核心收紧了 · 肩膀自动后收',
    benefit: '俯卧撑是最经典的上肢推力训练，强化胸肌、三角肌前束和核心稳定性',
  },
  morning_core: {
    id: 'morning_core',
    title: '晨间核心',
    subtitle: '平板 + 死虫 + 卷腹 · 5 分钟',
    duration: 300,
    scene: 'morning',
    depth: 'medium',
    tags: ['core', 'posture', 'back'],
    steps: [
      { text: '猫牛式 8 轮', hint: '脊柱一节一节活动开', phase: 'warmup' },
      { text: '平板支撑 30 秒', hint: '屁股不要翘起来也不要塌下去', phase: 'work' },
      { text: '休息 10 秒', hint: '膝盖着地', phase: 'rest' },
      { text: '死虫式 × 10（左右各 5）', hint: '下背贴死地面，手脚对伸', phase: 'work' },
      { text: '休息 10 秒', hint: '调整呼吸', phase: 'rest' },
      { text: '卷腹 × 15', hint: '不是仰卧起坐，只起肩胛骨', phase: 'work' },
      { text: '休息 10 秒', hint: '手放脑后拉伸', phase: 'rest' },
      { text: '平板支撑 30 秒', hint: '比第一次更累，坚持住', phase: 'work' },
      { text: '婴儿式 20 秒', hint: '全身放松', phase: 'cooldown' },
    ],
    feeling: '肚子发紧发酸 · 腰被撑住了 · 站直更稳',
    benefit: '核心训练是所有运动的根基，减少腰痛，改善体态，提升运动表现',
  },
  morning_flow: {
    id: 'morning_flow',
    title: '晨间流动',
    subtitle: '太阳礼拜 A × 3 轮 · 全身热起来',
    duration: 360,
    scene: 'morning',
    depth: 'light',
    tags: ['full', 'posture', 'calm'],
    steps: [
      { text: '站直，双手合十，闭眼 3 次呼吸', hint: '先安静下来', phase: 'warmup' },
      { text: '吸气，双手举过头顶', hint: '拉长整个身体', phase: 'work' },
      { text: '呼气，前屈触地', hint: '膝盖微弯没关系', phase: 'work' },
      { text: '吸气，半起身，背放平', hint: '指尖触地或小腿', phase: 'work' },
      { text: '呼气，双手撑地，走到平板', hint: '肩在手腕正上方', phase: 'work' },
      { text: '慢慢趴下，眼镜蛇式', hint: '手臂微弯，胸抬起', phase: 'work' },
      { text: '脚尖踩地，臀部推向天花板，下犬式', hint: '脚跟尽量踩地', phase: 'work' },
      { text: '走回双手之间，起立', hint: '这是一轮，再走两轮', phase: 'work' },
      { text: '站直，双手合十，3 次呼吸', hint: '感受身体从内到外热了', phase: 'cooldown' },
    ],
    feeling: '全身热了 · 呼吸深了 · 后背展开 · 微微出汗',
    benefit: '太阳礼拜是瑜伽经典流动序列，全身拉伸+轻度心肺，改善灵活性和呼吸',
  },
  morning_hiit: {
    id: 'morning_hiit',
    title: '晨间 HIIT',
    subtitle: '30 秒做 · 15 秒休 · 4 动作 × 2 轮',
    duration: 420,
    scene: 'morning',
    depth: 'deep',
    tags: ['cardio', 'full', 'lower', 'upper'],
    steps: [
      { text: '开合跳 30 秒', hint: '先慢后快，身体热起来', phase: 'warmup' },
      { text: '第 1 动作：深蹲跳 30 秒', hint: '蹲到底，跳起来，轻落地', phase: 'work' },
      { text: '休息 15 秒', hint: '深呼吸', phase: 'rest' },
      { text: '第 2 动作：俯卧撑 30 秒', hint: '做不了标准就跪姿，不要停', phase: 'work' },
      { text: '休息 15 秒', hint: '甩手', phase: 'rest' },
      { text: '第 3 动作：登山跑 30 秒', hint: '平板姿势，交替提膝', phase: 'work' },
      { text: '休息 15 秒', hint: '调整呼吸', phase: 'rest' },
      { text: '第 4 动作：波比跳 30 秒', hint: '这是最难的一个，撑住', phase: 'work' },
      { text: '休息 30 秒，再来一轮', hint: '第二轮会更喘，但你能做到', phase: 'rest' },
      { text: '第二轮：重复以上 4 动作', hint: '速度可以慢，不要停下来', phase: 'work' },
      { text: '站直，深呼吸 5 次，慢慢来', hint: '让心率降下来', phase: 'cooldown' },
      { text: '前屈 15 秒 + 婴儿式 15 秒', hint: '全身放松', phase: 'cooldown' },
    ],
    feeling: '喘 · 出汗 · 心率飙升 · 手臂腿发抖 · 但很爽',
    benefit: 'HIIT 在 7 分钟内实现有氧+力量双重刺激，后燃效应持续数小时',
  },

  // ╔════════════════════════════════════════════╗
  // ║        工 间 · 5 行动（对抗久坐）          ║
  // ╚════════════════════════════════════════════╝

  work_lunge: {
    id: 'work_lunge',
    title: '弓步矩阵',
    subtitle: '前弓 + 后弓 + 侧弓 · 臀腿激活',
    duration: 300,
    scene: 'work',
    depth: 'medium',
    tags: ['lower', 'posture', 'full'],
    steps: [
      { text: '原地踏步 30 秒', hint: '把腿活动开', phase: 'warmup' },
      { text: '前弓步 × 10（左右各 5）', hint: '前膝不超过脚尖，后膝轻触地', phase: 'work' },
      { text: '休息 15 秒', hint: '抖腿', phase: 'rest' },
      { text: '后撤弓步 × 10（左右各 5）', hint: '后腿伸直，重心在前腿', phase: 'work' },
      { text: '休息 15 秒', hint: '调整呼吸', phase: 'rest' },
      { text: '侧弓步 × 10（左右各 5）', hint: '一侧腿伸直，一侧蹲下', phase: 'work' },
      { text: '休息 15 秒', hint: '最后一下', phase: 'rest' },
      { text: '前弓步 + 膝提 × 6（左右各 3）', hint: '弓步起立时提膝到胸口', phase: 'work' },
      { text: '站直，髋屈肌拉伸每侧 15 秒', hint: '后腿膝盖着地，前腿弓步', phase: 'cooldown' },
    ],
    feeling: '臀腿发酸 · 大腿内侧拉伸 · 站起来腿稳了',
    benefit: '弓步是久坐者最需要的动作，恢复髋关节灵活性，激活久坐废掉的臀肌',
  },
  work_back: {
    id: 'work_back',
    title: '背部唤醒',
    subtitle: '划船 + 夹背 + YTW · 对抗圆肩',
    duration: 300,
    scene: 'work',
    depth: 'medium',
    tags: ['upper', 'posture', 'neck'],
    steps: [
      { text: '肩部画圈后 10 次', hint: '往后画，对抗前倾', phase: 'warmup' },
      { text: '弹力带划船（或毛巾划船）× 12', hint: '手肘往后拉，肩胛骨夹紧', phase: 'work' },
      { text: '休息 15 秒', hint: '甩手', phase: 'rest' },
      { text: 'Y 字举起 × 8', hint: '手臂成 Y 形，拇指朝上，激活下斜方肌', phase: 'work' },
      { text: 'T 字举起 × 8', hint: '手臂成 T 形，挤压肩胛骨', phase: 'work' },
      { text: 'W 字下拉 × 8', hint: '手肘弯曲成 W，肩胛骨下压', phase: 'work' },
      { text: '休息 15 秒', hint: '后背已经发热了', phase: 'rest' },
      { text: '弹力带划船 × 12（最后一组）', hint: '最后 3 个要挤到最紧', phase: 'work' },
      { text: '门框拉伸 20 秒', hint: '手臂抵门框，胸往前走', phase: 'cooldown' },
    ],
    feeling: '后背发热发紧 · 肩膀自动后收 · 胸口打开了 · 脖子松了',
    benefit: 'YTW+划船是纠正圆肩驼背的黄金组合，激活被久坐关闭的后侧链',
  },
  work_glute: {
    id: 'work_glute',
    title: '久坐臀救',
    subtitle: '臀桥 + 侧抬 + 蚌式 · 臀肌失忆症康复',
    duration: 300,
    scene: 'work',
    depth: 'light',
    tags: ['lower', 'posture', 'back'],
    steps: [
      { text: '原地踏步 + 髋绕环各 10 次', hint: '把髋关节活动开', phase: 'warmup' },
      { text: '臀桥 × 15', hint: '脚跟发力，臀部夹紧推起', phase: 'work' },
      { text: '休息 10 秒', hint: '下背贴地', phase: 'rest' },
      { text: '臀桥 × 15（顶端停 2 秒）', hint: '每次推到顶端用力夹紧', phase: 'work' },
      { text: '休息 10 秒', hint: '臀肌应该开始有感觉了', phase: 'rest' },
      { text: '侧卧蚌式 × 每侧 15', hint: '脚并拢，膝盖打开，像贝壳', phase: 'work' },
      { text: '侧卧抬腿 × 每侧 12', hint: '腿伸直，缓慢抬起', phase: 'work' },
      { text: '最后臀桥 × 10（快节奏）', hint: '快速推起，离心慢放', phase: 'work' },
      { text: '鸽子式拉伸每侧 20 秒', hint: '久坐臀最需要这个', phase: 'cooldown' },
    ],
    feeling: '臀部发酸发胀 · 后腰松了 · 站起来走路更稳',
    benefit: '久坐导致臀肌失忆（gluteal amnesia），这套训练重新激活臀肌，减轻腰椎压力',
  },
  work_posture: {
    id: 'work_posture',
    title: '体态矫正',
    subtitle: '靠墙天使 + 颈后缩 + 胸椎打开 · 5 分钟',
    duration: 300,
    scene: 'work',
    depth: 'light',
    tags: ['posture', 'neck', 'upper', 'back'],
    steps: [
      { text: '靠墙站 10 秒', hint: '脚跟、臀、肩、头贴墙', phase: 'warmup' },
      { text: '靠墙天使 × 10', hint: '手肘贴墙慢推上去再下来', phase: 'work' },
      { text: '颈后缩 × 10', hint: '下巴水平后缩，做双下巴', phase: 'work' },
      { text: '毛巾卷垫肩胛骨，后仰 30 秒', hint: '胸椎被托起来往后弯', phase: 'work' },
      { text: '毛巾下移 2cm，再 30 秒', hint: '换一个胸椎节段', phase: 'work' },
      { text: '靠墙天使 × 10（第二次更流畅了）', hint: '后背应该已经热了', phase: 'work' },
      { text: '颈后缩 × 10', hint: '最后几次头可能微抖，正常', phase: 'work' },
      { text: '门框胸肌拉伸 20 秒', hint: '手臂抵门框，身体前走', phase: 'cooldown' },
      { text: '离墙自然站 5 秒', hint: '肩膀会自动后收', phase: 'cooldown' },
    ],
    feeling: '肩膀自动后收 · 胸口打开 · 脖子回正 · 呼吸变深',
    benefit: '针对上交叉综合征（圆肩+头前伸）的完整矫正训练，坚持 2 周体态可见改善',
  },
  work_eyes_shoulder: {
    id: 'work_eyes_shoulder',
    title: '肩眼双救',
    subtitle: '肩颈释放 + 护眼三步 · 最轻量的工间',
    duration: 240,
    scene: 'work',
    depth: 'light',
    tags: ['neck', 'eyes', 'upper', 'calm'],
    steps: [
      { text: '耸肩 5 秒 → 瞬间放下 × 3', hint: '让肩膀掉下去', phase: 'warmup' },
      { text: '肩后画圈 15 次', hint: '圈越大越好', phase: 'work' },
      { text: '双手叉腰夹背 5 秒 × 5', hint: '肩胛骨往中间挤', phase: 'work' },
      { text: '颈侧屈每侧 20 秒 × 2', hint: '耳朵找肩膀', phase: 'work' },
      { text: '视线离开屏幕，看 6 米外 20 秒', hint: '睫状肌放松', phase: 'work' },
      { text: '用力闭眼 3 秒 → 眨眼 10 次', hint: '挤压睑板腺', phase: 'work' },
      { text: '双手搓热捂眼 15 秒', hint: '热气渗透', phase: 'work' },
      { text: '深呼吸 5 次', hint: '肩膀彻底放下来', phase: 'cooldown' },
    ],
    feeling: '肩颈松了 · 眼眶湿润 · 呼吸变深 · 整个人松了一圈',
    benefit: '久坐最伤肩颈和眼睛，这套组合同时解决两个最大痛点',
  },

  // ╔════════════════════════════════════════════╗
  // ║        夜 间 · 5 行动（放松+恢复）          ║
  // ╚════════════════════════════════════════════╝

  night_yoga: {
    id: 'night_yoga',
    title: '夜间拉伸',
    subtitle: '6 个体式各 30 秒 · 释放全身张力',
    duration: 300,
    scene: 'night',
    depth: 'light',
    tags: ['full', 'calm', 'posture'],
    steps: [
      { text: '猫牛式 8 轮', hint: '脊柱一节一节活动', phase: 'warmup' },
      { text: '下犬式 30 秒', hint: '脚跟踩地，背放平', phase: 'work' },
      { text: '鸽子式每侧 30 秒', hint: '久坐臀最需要这个拉伸', phase: 'work' },
      { text: '坐姿前屈 30 秒', hint: '腿后侧拉长', phase: 'work' },
      { text: '仰卧脊柱扭转每侧 30 秒', hint: '肩膀贴地，膝盖倒向一侧', phase: 'work' },
      { text: '靠墙抬腿 60 秒', hint: '腿靠墙，消水肿', phase: 'work' },
      { text: '快乐婴儿式 30 秒', hint: '抓住脚，膝盖靠近腋下', phase: 'work' },
      { text: '摊尸式 30 秒', hint: '什么都不做，就是躺着', phase: 'cooldown' },
    ],
    feeling: '全身松了 · 呼吸很长 · 身体很沉很舒服',
    benefit: '睡前拉伸降低交感神经活跃度，降低皮质醇，缩短入睡时间',
  },
  night_core_stretch: {
    id: 'night_core_stretch',
    title: '核心+拉伸',
    subtitle: '轻度核心 + 深度拉伸 · 练完超好睡',
    duration: 360,
    scene: 'night',
    depth: 'medium',
    tags: ['core', 'full', 'calm', 'sleep'],
    steps: [
      { text: '猫牛式 8 轮', hint: '脊柱热身', phase: 'warmup' },
      { text: '平板支撑 20 秒', hint: '不要塌腰', phase: 'work' },
      { text: '死虫式 × 每侧 8', hint: '下背贴地', phase: 'work' },
      { text: '臀桥 × 12', hint: '顶端夹紧 2 秒', phase: 'work' },
      { text: '侧平板每侧 15 秒', hint: '膝盖着地也可以', phase: 'work' },
      { text: '鸽子式每侧 30 秒', hint: '久坐臀要松开', phase: 'work' },
      { text: '仰卧脊柱扭转每侧 30 秒', hint: '肩膀贴地', phase: 'work' },
      { text: '靠墙抬腿 90 秒', hint: '闭眼，自然呼吸', phase: 'cooldown' },
      { text: '摊尸式 30 秒', hint: '如果困了就直接睡', phase: 'cooldown' },
    ],
    feeling: '肚子有点酸 · 全身松开了 · 困意来了',
    benefit: '轻度核心训练消耗多余精力，深度拉伸放松肌肉，双重助眠',
  },
  night_breath: {
    id: 'night_breath',
    title: '入睡呼吸',
    subtitle: '4-7-8 呼吸法 · 6 轮 · 身体变沉',
    duration: 180,
    scene: 'night',
    depth: 'light',
    tags: ['sleep', 'calm'],
    steps: [
      { text: '躺下或靠枕头坐好', hint: '用最舒服的姿势', phase: 'warmup' },
      { text: '鼻子吸气 4 秒', hint: '肚子鼓起来', phase: 'work' },
      { text: '屏住 7 秒', hint: '不要用力，自然停住', phase: 'work' },
      { text: '嘴巴呼气 8 秒', hint: '像在吹一根很细的吸管', phase: 'work' },
      { text: '重复到第 6 轮', hint: '每轮身体会更沉一点', phase: 'work' },
      { text: '最后一次后，自然呼吸', hint: '如果困了就直接睡', phase: 'cooldown' },
    ],
    feeling: '身体越来越沉 · 四肢变暖 · 困意来了',
    benefit: '4-7-8 呼吸法临床验证可缩短入睡时间，长期练习改善睡眠质量',
  },
  night_body: {
    id: 'night_body',
    title: '身体扫描',
    subtitle: '渐进式肌肉放松 · 从脚到头松一遍',
    duration: 300,
    scene: 'night',
    depth: 'deep',
    tags: ['sleep', 'calm', 'full'],
    steps: [
      { text: '躺平，闭眼，自然呼吸 10 秒', hint: '先把气喘匀', phase: 'warmup' },
      { text: '脚趾蜷紧 5 秒 → 松开', hint: '感受松开瞬间的对比', phase: 'work' },
      { text: '小腿绷紧 5 秒 → 松开', hint: '像站在脚尖上再放下来', phase: 'work' },
      { text: '大腿+臀部收紧 5 秒 → 松开', hint: '放松时腿更沉了', phase: 'work' },
      { text: '肚子收紧 5 秒 → 松开', hint: '呼吸变长', phase: 'work' },
      { text: '双手握拳 + 手臂绷紧 5 秒 → 松开', hint: '手指的对比最明显', phase: 'work' },
      { text: '整张脸挤紧 5 秒 → 松开', hint: '额头、眼睛、嘴巴全部放松', phase: 'work' },
      { text: '全身同时收紧 5 秒 → 完全松开', hint: '像融化了', phase: 'work' },
      { text: '自然呼吸 30 秒，什么都不做', hint: '如果困了就直接睡', phase: 'cooldown' },
    ],
    feeling: '全身像融化了 · 每个部位都松了 · 困意很重',
    benefit: 'PMR 渐进式肌肉放松是临床验证的失眠干预方法，长期练习降低整体肌张力',
  },
  night_write: {
    id: 'night_write',
    title: '写三行字',
    subtitle: '不是日记 · 写完就放下',
    duration: 180,
    scene: 'night',
    depth: 'light',
    tags: ['calm', 'sleep'],
    steps: [
      { text: '拿出纸笔或手机备忘录', hint: '纸笔更好，手写有质感', phase: 'warmup' },
      { text: '第一行：今天脑子里最多的事', hint: '就写几个字，不用完整句子', phase: 'work' },
      { text: '第二行：一个想不通的东西', hint: '写出来就好，不需要答案', phase: 'work' },
      { text: '第三行：明天的 1 件小事', hint: '越小越好，比如"喝水"', phase: 'work' },
      { text: '放下笔，不回看', hint: '字已经写在纸上了，脑子可以放下', phase: 'work' },
      { text: '4-7-8 呼吸 3 轮', hint: '把注意力拉回身体', phase: 'cooldown' },
    ],
    feeling: '脑子里少了一圈 · 呼吸变长 · 肩膀沉了',
    benefit: '表达性写作降低皮质醇水平，帮助大脑从"反刍思维"中脱出，改善入睡',
  },

  // ╔════════════════════════════════════════════╗
  // ║      问题轴 · 6 行动（随时按需触发）        ║
  // ╚════════════════════════════════════════════╝

  problem_dizzy: {
    id: 'problem_dizzy',
    title: '起身不晕',
    subtitle: '踝泵 + 缓起 · 告别眼前发黑',
    duration: 90,
    scene: 'problem',
    depth: 'light',
    tags: ['cardio', 'lower'],
    steps: [
      { text: '坐着，脚掌用力向上勾', hint: '小腿前侧肌肉绷紧', phase: 'warmup' },
      { text: '再用力向下踩', hint: '像踩油门', phase: 'work' },
      { text: '上下交替，每只脚 15 次', hint: '帮血液泵回心脏', phase: 'work' },
      { text: '双手按住大腿，慢慢站起来', hint: '不要猛地起身', phase: 'work' },
      { text: '站稳 10 秒，深呼吸 3 次', hint: '确认不晕了再走', phase: 'cooldown' },
    ],
    feeling: '眼前不黑了 · 头不晕 · 站稳了',
    benefit: '踝泵运动促进下肢静脉回流，预防体位性低血压',
  },
  problem_energy: {
    id: 'problem_energy',
    title: '快速回血',
    subtitle: '30 秒开合跳 + 冷水 · 立刻清醒',
    duration: 120,
    scene: 'problem',
    depth: 'medium',
    tags: ['cardio', 'full'],
    steps: [
      { text: '开合跳 30 秒', hint: '把心率提起来', phase: 'work' },
      { text: '原地高抬腿 15 秒', hint: '膝盖尽量高', phase: 'work' },
      { text: '深呼吸 5 次', hint: '鼻子吸嘴巴呼', phase: 'work' },
      { text: '冷水冲手腕 15 秒', hint: '手腕血管密集，降温最快', phase: 'work' },
      { text: '冷水拍后颈 5 秒', hint: '刺激迷走神经', phase: 'cooldown' },
    ],
    feeling: '喘了 · 出微汗 · 脑子清醒了 · 不困了',
    benefit: '开合跳+冷水组合快速激活交感神经，比咖啡更快更健康',
  },
  problem_core: {
    id: 'problem_core',
    title: '腰痛急救',
    subtitle: '死虫 + 臀桥 + 猫牛 · 5 分钟缓解',
    duration: 300,
    scene: 'problem',
    depth: 'medium',
    tags: ['core', 'back', 'lower'],
    steps: [
      { text: '猫牛式 10 轮', hint: '脊柱热身', phase: 'warmup' },
      { text: '死虫式 × 每侧 8', hint: '下背贴死地面', phase: 'work' },
      { text: '臀桥 × 12（顶端停 2 秒）', hint: '臀肌用力，不是腰', phase: 'work' },
      { text: '婴儿式 20 秒', hint: '放松下背', phase: 'rest' },
      { text: '鸟狗式 × 每侧 8', hint: '对侧手脚伸出，保持平衡', phase: 'work' },
      { text: '臀桥 × 12', hint: '最后一组，顶到最紧', phase: 'work' },
      { text: '仰卧抱膝 20 秒', hint: '左右晃一晃', phase: 'cooldown' },
      { text: '站直，双手抱头后仰 10 秒', hint: '打开前侧', phase: 'cooldown' },
    ],
    feeling: '腰没那么空了 · 核心收紧 · 站直更稳',
    benefit: '80%的腰痛源于核心无力+臀肌失忆，这套训练从根本解决',
  },
  problem_posture: {
    id: 'problem_posture',
    title: '驼背急救',
    subtitle: 'YTW + 门框拉伸 · 3 分钟打开胸腔',
    duration: 180,
    scene: 'problem',
    depth: 'light',
    tags: ['posture', 'upper', 'neck'],
    steps: [
      { text: '肩后画圈 10 次', hint: '往后画，对抗前倾', phase: 'warmup' },
      { text: 'Y 字举起 × 10', hint: '拇指朝上，激活下斜方', phase: 'work' },
      { text: 'T 字平举 × 10', hint: '挤压肩胛骨', phase: 'work' },
      { text: 'W 字下拉 × 10', hint: '手肘弯曲，肩胛骨下压', phase: 'work' },
      { text: '颈后缩 × 10', hint: '做双下巴', phase: 'work' },
      { text: '门框胸肌拉伸 30 秒', hint: '手臂抵门框，身体前走', phase: 'cooldown' },
    ],
    feeling: '后背发热 · 胸口打开 · 肩膀自动后收 · 呼吸变深',
    benefit: 'YTW 是纠正圆肩驼背最有效的自重训练，3 分钟即可感受到体态变化',
  },
  problem_neck: {
    id: 'problem_neck',
    title: '颈痛急救',
    subtitle: '颈后缩 + 侧屈 + 上斜方拉伸',
    duration: 150,
    scene: 'problem',
    depth: 'light',
    tags: ['neck', 'posture', 'upper'],
    steps: [
      { text: '肩部画圈后 10 次', hint: '先松肩膀', phase: 'warmup' },
      { text: '颈后缩 × 10', hint: '下巴水平后缩，做双下巴', phase: 'work' },
      { text: '颈侧屈每侧 20 秒 × 2', hint: '耳朵找肩膀，手轻搭', phase: 'work' },
      { text: '上斜方拉伸每侧 20 秒', hint: '手按头侧，耳朵找腋下', phase: 'work' },
      { text: '颈后缩 × 10', hint: '再做一遍巩固', phase: 'work' },
      { text: '耸肩 5 秒 → 放下 × 3', hint: '让肩膀彻底掉下来', phase: 'cooldown' },
    ],
    feeling: '脖子后面拉紧又松开 · 头回正了 · 肩颈松了一圈',
    benefit: '颈后缩恢复颈椎中立位，侧屈+上斜方拉伸松解最紧的肌肉群',
  },
  problem_eyes: {
    id: 'problem_eyes',
    title: '眼疲劳急救',
    subtitle: '远眺 + 完整眨眼 + 热敷 · 三步走',
    duration: 120,
    scene: 'problem',
    depth: 'light',
    tags: ['eyes', 'calm'],
    steps: [
      { text: '视线离开屏幕，看 6 米外 20 秒', hint: '让睫状肌完全放松', phase: 'work' },
      { text: '用力闭眼 3 秒 → 眨眼 10 次', hint: '挤压睑板腺分泌油脂', phase: 'work' },
      { text: '眼球顺时针转一圈 + 逆时针转一圈', hint: '每个方向停 1 秒', phase: 'work' },
      { text: '双手搓热捂眼 15 秒', hint: '不要按压，让热量渗透', phase: 'work' },
      { text: '闭眼，深呼吸 5 次', hint: '让眼压降下来', phase: 'cooldown' },
    ],
    feeling: '眼眶湿润 · 不干涩 · 看东西更清晰',
    benefit: '完整眨眼+远眺+热敷三合一，缓解干眼和视疲劳',
  },
}

// ═══════════════════════════════════════
// 时段 → 行动映射（每时段 5 个）
// ═══════════════════════════════════════

const SCENE_ACTIONS = {
  morning: ['morning_squat', 'morning_pushup', 'morning_core', 'morning_flow', 'morning_hiit'],
  work: ['work_lunge', 'work_back', 'work_glute', 'work_posture', 'work_eyes_shoulder'],
  night: ['night_yoga', 'night_core_stretch', 'night_breath', 'night_body', 'night_write'],
}

// 问题轴标签 → 行动映射
const TAG_ACTIONS = {
  neck: ['work_posture', 'work_eyes_shoulder', 'problem_neck'],
  shoulder: ['work_back', 'work_posture', 'problem_posture'],
  back: ['morning_core', 'night_core_stretch', 'problem_core'],
  core: ['morning_core', 'night_core_stretch', 'problem_core'],
  eyes: ['work_eyes_shoulder', 'problem_eyes'],
  lower: ['morning_squat', 'work_lunge', 'work_glute'],
  upper: ['morning_pushup', 'work_back', 'work_posture'],
  cardio: ['morning_hiit', 'problem_energy'],
  posture: ['work_posture', 'work_back', 'problem_posture', 'problem_neck'],
  calm: ['night_yoga', 'night_breath', 'night_body', 'night_write'],
  sleep: ['night_breath', 'night_body', 'night_yoga', 'night_write', 'night_core_stretch'],
}

// ═══════════════════════════════════════
// 场景 & 行动获取逻辑
// ═══════════════════════════════════════

function getCurrentScene() {
  const hour = new Date().getHours()
  if (hour >= 6 && hour < 11) return 'morning'
  if (hour >= 11 && hour < 20) return 'work'
  return 'night'
}

function getDayIndex(date) {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date - start
  return Math.floor(diff / 86400000)
}

// 每天按时段轮换，5 个行动 × 3 时段 = 15 天不重复
function getCurrentAction() {
  const scene = getCurrentScene()
  const sceneActions = SCENE_ACTIONS[scene]
  const index = getDayIndex(new Date()) % sceneActions.length
  return ACTIONS[sceneActions[index]]
}

function getTomorrowAction() {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const scene = getCurrentScene()
  const sceneActions = SCENE_ACTIONS[scene]
  const index = getDayIndex(tomorrow) % sceneActions.length
  return ACTIONS[sceneActions[index]]
}

function getActionByTag(tag) {
  const actionIds = TAG_ACTIONS[tag] || []
  return actionIds.map(id => ACTIONS[id]).filter(Boolean)
}

function getProblemAction(problemTag) {
  const candidates = TAG_ACTIONS[problemTag] || []
  if (candidates.length === 0) return null
  const index = getDayIndex(new Date()) % candidates.length
  return ACTIONS[candidates[index]]
}

// ═══════════════════════════════════════
// 12 个主题世界 + 彩蛋插画
// ═══════════════════════════════════════

const WORLDS = [
  { id: 'forest', name: '春之森林', iconType: 'forest', locked: false, total: 30, eggs: Array.from({ length: 30 }, (_, i) => ({ blurUrl: `/assets/eggs/forest/blur_${String(i + 1).padStart(2, '0')}.png`, clearUrl: `/assets/eggs/forest/clear_${String(i + 1).padStart(2, '0')}.png` })) },
  { id: 'sea', name: '夏之海边', iconType: 'sea', locked: false, total: 30, eggs: Array.from({ length: 30 }, (_, i) => ({ blurUrl: `/assets/eggs/sea/blur_${String(i + 1).padStart(2, '0')}.png`, clearUrl: `/assets/eggs/sea/clear_${String(i + 1).padStart(2, '0')}.png` })) },
  { id: 'window', name: '秋之窗边', iconType: 'window', locked: false, total: 30, eggs: Array.from({ length: 30 }, (_, i) => ({ blurUrl: `/assets/eggs/window/blur_${String(i + 1).padStart(2, '0')}.png`, clearUrl: `/assets/eggs/window/clear_${String(i + 1).padStart(2, '0')}.png` })) },
  { id: 'warm', name: '冬之暖屋', iconType: 'warm', locked: false, total: 30, eggs: Array.from({ length: 30 }, (_, i) => ({ blurUrl: `/assets/eggs/warm/blur_${String(i + 1).padStart(2, '0')}.png`, clearUrl: `/assets/eggs/warm/clear_${String(i + 1).padStart(2, '0')}.png` })) },
  { id: 'tea', name: '茶与书', iconType: 'tea', locked: false, total: 30, eggs: Array.from({ length: 30 }, (_, i) => ({ blurUrl: `/assets/eggs/tea/blur_${String(i + 1).padStart(2, '0')}.png`, clearUrl: `/assets/eggs/tea/clear_${String(i + 1).padStart(2, '0')}.png` })) },
  { id: 'night', name: '夜与星', iconType: 'night', locked: false, total: 30, eggs: Array.from({ length: 30 }, (_, i) => ({ blurUrl: `/assets/eggs/night/blur_${String(i + 1).padStart(2, '0')}.png`, clearUrl: `/assets/eggs/night/clear_${String(i + 1).padStart(2, '0')}.png` })) },
  { id: 'garden', name: '秘密花园', iconType: 'default', locked: true, total: 30, eggs: [] },
  { id: 'mountain', name: '山间远行', iconType: 'default', locked: true, total: 30, eggs: [] },
  { id: 'rain', name: '雨天漫步', iconType: 'default', locked: true, total: 30, eggs: [] },
  { id: 'sunrise', name: '日出之约', iconType: 'default', locked: true, total: 30, eggs: [] },
  { id: 'snow', name: '雪地静音', iconType: 'default', locked: true, total: 30, eggs: [] },
  { id: 'star', name: '星河长明', iconType: 'default', locked: true, total: 30, eggs: [] },
]

module.exports = {
  ACTIONS,
  WORLDS,
  SCENE_ACTIONS,
  TAG_ACTIONS,
  getCurrentScene,
  getCurrentAction,
  getTomorrowAction,
  getActionByTag,
  getProblemAction,
}
