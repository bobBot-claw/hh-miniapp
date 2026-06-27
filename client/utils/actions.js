// utils/actions.js — 慢慢变好 v0.8 — 专业健身行动库 + 治愈世界
// 三段式：热身→训练→放松 | phase: warmup/work/rest/cooldown

const ACTIONS = {

  // ── 晨 间 ──

  morning_squat: {
    id: 'morning_squat',
    title: '晨间深蹲',
    subtitle: '3×15 · 叫醒臀腿',
    duration: 300,
    scene: 'morning',
    depth: 'medium',
    tags: ['lower', 'full', 'cardio'],
    steps: [
      { text: '高抬腿 30s', hint: '把心率拉起来', phase: 'warmup' },
      { text: '手臂大圈 10次', hint: '肩活动开', phase: 'warmup' },
      { text: '深蹲 ×15', hint: '屁股往后坐，膝对脚尖', phase: 'work' },
      { text: '休 20s', hint: '抖腿', phase: 'rest' },
      { text: '深蹲 ×15', hint: '蹲低一点', phase: 'work' },
      { text: '休 20s', hint: '最后一组', phase: 'rest' },
      { text: '深蹲 ×15', hint: '最后5个可能抖', phase: 'work' },
      { text: '后仰 10s', hint: '打开前侧', phase: 'cooldown' },
      { text: '前屈 15s', hint: '拉长后侧', phase: 'cooldown' },
    ],
    feeling: '腿酸 · 臀泵感 · 出微汗',
    benefit: '激活臀腿，提升代谢',
  },
  morning_pushup: {
    id: 'morning_pushup',
    title: '晨间俯卧撑',
    subtitle: '3组×尽力 · 唤醒上肢',
    duration: 300,
    scene: 'morning',
    depth: 'medium',
    tags: ['upper', 'core', 'posture'],
    steps: [
      { text: '手臂大圈 15次', hint: '先慢后快', phase: 'warmup' },
      { text: '扩胸夹背各10', hint: '肩胛骨活动开', phase: 'warmup' },
      { text: '俯卧撑 尽力做', hint: '做不到就跪姿', phase: 'work' },
      { text: '休 30s', hint: '拉手腕', phase: 'rest' },
      { text: '俯卧撑 尽力做', hint: '少也正常', phase: 'work' },
      { text: '休 30s', hint: '甩手', phase: 'rest' },
      { text: '俯卧撑 尽力做', hint: '最后一个最慢推', phase: 'work' },
      { text: '眼镜蛇式 15s', hint: '拉胸腹', phase: 'cooldown' },
      { text: '婴儿式 15s', hint: '放松', phase: 'cooldown' },
    ],
    feeling: '胸胀 · 臂酸 · 肩后收',
    benefit: '强化胸肌和核心稳定',
  },
  morning_core: {
    id: 'morning_core',
    title: '晨间核心',
    subtitle: '平板+死虫+卷腹',
    duration: 300,
    scene: 'morning',
    depth: 'medium',
    tags: ['core', 'posture', 'back'],
    steps: [
      { text: '猫牛 8轮', hint: '脊柱活动开', phase: 'warmup' },
      { text: '平板 30s', hint: '不塌腰不翘臀', phase: 'work' },
      { text: '休 10s', hint: '膝着地', phase: 'rest' },
      { text: '死虫 ×10', hint: '下背贴死地面', phase: 'work' },
      { text: '休 10s', hint: '', phase: 'rest' },
      { text: '卷腹 ×15', hint: '只起肩胛骨', phase: 'work' },
      { text: '休 10s', hint: '', phase: 'rest' },
      { text: '平板 30s', hint: '坚持住', phase: 'work' },
      { text: '婴儿式 20s', hint: '放松', phase: 'cooldown' },
    ],
    feeling: '肚子酸紧 · 腰稳了',
    benefit: '核心是运动根基，减腰痛',
  },
  morning_flow: {
    id: 'morning_flow',
    title: '晨间流动',
    subtitle: '太阳礼拜×3轮',
    duration: 360,
    scene: 'morning',
    depth: 'light',
    tags: ['full', 'posture', 'calm'],
    steps: [
      { text: '合十 3次呼吸', hint: '安静下来', phase: 'warmup' },
      { text: '吸气 手举过头顶', hint: '拉长', phase: 'work' },
      { text: '呼气 前屈触地', hint: '膝微弯', phase: 'work' },
      { text: '吸气 半起身', hint: '背放平', phase: 'work' },
      { text: '呼气 走到平板', hint: '肩在手腕上', phase: 'work' },
      { text: '趴下 眼镜蛇', hint: '胸抬起', phase: 'work' },
      { text: '下犬式', hint: '脚跟踩地', phase: 'work' },
      { text: '走回 起立', hint: '再来两轮', phase: 'work' },
      { text: '合十 3次呼吸', hint: '身体热了', phase: 'cooldown' },
    ],
    feeling: '全身热 · 呼吸深 · 背展开',
    benefit: '全身拉伸+轻度心肺',
  },
  morning_hiit: {
    id: 'morning_hiit',
    title: '晨间HIIT',
    subtitle: '30做·15休·4动作×2轮',
    duration: 420,
    scene: 'morning',
    depth: 'deep',
    tags: ['cardio', 'full', 'lower', 'upper'],
    steps: [
      { text: '开合跳 30s', hint: '热起来', phase: 'warmup' },
      { text: '深蹲跳 30s', hint: '蹲到底 轻落地', phase: 'work' },
      { text: '休 15s', hint: '', phase: 'rest' },
      { text: '俯卧撑 30s', hint: '不停就行', phase: 'work' },
      { text: '休 15s', hint: '', phase: 'rest' },
      { text: '登山跑 30s', hint: '交替提膝', phase: 'work' },
      { text: '休 15s', hint: '', phase: 'rest' },
      { text: '波比跳 30s', hint: '最难一个 撑住', phase: 'work' },
      { text: '休 30s', hint: '再来一轮', phase: 'rest' },
      { text: '第二轮 重复4动作', hint: '慢不停', phase: 'work' },
      { text: '深呼吸 5次', hint: '心率降下来', phase: 'cooldown' },
      { text: '前屈+婴儿式 各15s', hint: '放松', phase: 'cooldown' },
    ],
    feeling: '喘 · 汗 · 抖 · 爽',
    benefit: '7分钟有氧+力量，后燃数小时',
  },

  // ── 工 间 ──

  work_lunge: {
    id: 'work_lunge',
    title: '弓步矩阵',
    subtitle: '前弓+后弓+侧弓',
    duration: 300,
    scene: 'work',
    depth: 'medium',
    tags: ['lower', 'posture', 'full'],
    steps: [
      { text: '踏步 30s', hint: '腿活动开', phase: 'warmup' },
      { text: '前弓步 ×10', hint: '前膝不过脚尖', phase: 'work' },
      { text: '休 15s', hint: '', phase: 'rest' },
      { text: '后撤弓步 ×10', hint: '重心在前腿', phase: 'work' },
      { text: '休 15s', hint: '', phase: 'rest' },
      { text: '侧弓步 ×10', hint: '一腿直一腿蹲', phase: 'work' },
      { text: '休 15s', hint: '', phase: 'rest' },
      { text: '弓步+提膝 ×6', hint: '起立时提膝', phase: 'work' },
      { text: '髋屈肌拉伸 各15s', hint: '后膝着地', phase: 'cooldown' },
    ],
    feeling: '臀腿酸 · 站起来腿稳了',
    benefit: '恢复髋灵活，激活臀肌',
  },
  work_back: {
    id: 'work_back',
    title: '背部唤醒',
    subtitle: '划船+YTW·对抗圆肩',
    duration: 300,
    scene: 'work',
    depth: 'medium',
    tags: ['upper', 'posture', 'neck'],
    steps: [
      { text: '肩后画圈 10', hint: '对抗前倾', phase: 'warmup' },
      { text: '毛巾划船 ×12', hint: '肘后拉 夹紧', phase: 'work' },
      { text: '休 15s', hint: '', phase: 'rest' },
      { text: 'Y举起 ×8', hint: '拇指朝上', phase: 'work' },
      { text: 'T平举 ×8', hint: '挤压肩胛骨', phase: 'work' },
      { text: 'W下拉 ×8', hint: '肩胛骨下压', phase: 'work' },
      { text: '休 15s', hint: '', phase: 'rest' },
      { text: '划船 ×12', hint: '最后3个挤最紧', phase: 'work' },
      { text: '门框拉伸 20s', hint: '胸往前走', phase: 'cooldown' },
    ],
    feeling: '背热 · 胸开 · 脖子松',
    benefit: '纠正圆肩，激活后侧链',
  },
  work_glute: {
    id: 'work_glute',
    title: '久坐臀救',
    subtitle: '臀桥+蚌式·臀肌唤醒',
    duration: 300,
    scene: 'work',
    depth: 'light',
    tags: ['lower', 'posture', 'back'],
    steps: [
      { text: '踏步+髋绕环 各10', hint: '髋活动开', phase: 'warmup' },
      { text: '臀桥 ×15', hint: '脚跟发力', phase: 'work' },
      { text: '休 10s', hint: '', phase: 'rest' },
      { text: '臀桥 ×15 顶端停2s', hint: '夹紧', phase: 'work' },
      { text: '休 10s', hint: '', phase: 'rest' },
      { text: '蚌式 每侧15', hint: '像贝壳打开', phase: 'work' },
      { text: '侧抬腿 每侧12', hint: '缓慢抬起', phase: 'work' },
      { text: '臀桥 ×10 快', hint: '快推慢放', phase: 'work' },
      { text: '鸽子式 每侧20s', hint: '久坐臀最需要', phase: 'cooldown' },
    ],
    feeling: '臀酸胀 · 腰松了',
    benefit: '激活久坐废掉的臀肌',
  },
  work_posture: {
    id: 'work_posture',
    title: '体态矫正',
    subtitle: '靠墙天使+颈后缩',
    duration: 300,
    scene: 'work',
    depth: 'light',
    tags: ['posture', 'neck', 'upper', 'back'],
    steps: [
      { text: '靠墙站 10s', hint: '跟臀肩头贴墙', phase: 'warmup' },
      { text: '靠墙天使 ×10', hint: '肘贴墙上下', phase: 'work' },
      { text: '颈后缩 ×10', hint: '做双下巴', phase: 'work' },
      { text: '毛巾垫肩胛骨 后仰30s', hint: '胸椎打开', phase: 'work' },
      { text: '毛巾下移2cm 再30s', hint: '换一节', phase: 'work' },
      { text: '靠墙天使 ×10', hint: '更流畅了', phase: 'work' },
      { text: '颈后缩 ×10', hint: '', phase: 'work' },
      { text: '门框拉伸 20s', hint: '身体前走', phase: 'cooldown' },
      { text: '离墙自然站 5s', hint: '肩自动后收', phase: 'cooldown' },
    ],
    feeling: '肩后收 · 胸开 · 呼吸深',
    benefit: '纠正圆肩头前伸，2周见效',
  },
  work_eyes_shoulder: {
    id: 'work_eyes_shoulder',
    title: '肩眼双救',
    subtitle: '肩颈+护眼·最轻量工间',
    duration: 240,
    scene: 'work',
    depth: 'light',
    tags: ['neck', 'eyes', 'upper', 'calm'],
    steps: [
      { text: '耸肩5s→放下 ×3', hint: '让肩膀掉下去', phase: 'warmup' },
      { text: '肩后画圈 15', hint: '越大越好', phase: 'work' },
      { text: '叉腰夹背 ×5', hint: '肩胛骨往中间挤', phase: 'work' },
      { text: '颈侧屈 各20s', hint: '耳找肩', phase: 'work' },
      { text: '看6米外 20s', hint: '睫状肌放松', phase: 'work' },
      { text: '闭眼3s→眨10次', hint: '挤睑板腺', phase: 'work' },
      { text: '搓热捂眼 15s', hint: '热气渗透', phase: 'work' },
      { text: '深呼吸 5次', hint: '肩彻底放下', phase: 'cooldown' },
    ],
    feeling: '肩颈松 · 眼润 · 人松一圈',
    benefit: '肩颈+眼睛一次解决',
  },

  // ── 夜 间 ──

  night_yoga: {
    id: 'night_yoga',
    title: '夜间拉伸',
    subtitle: '6体式×30s',
    duration: 300,
    scene: 'night',
    depth: 'light',
    tags: ['full', 'calm', 'posture'],
    steps: [
      { text: '猫牛 8轮', hint: '脊柱活动', phase: 'warmup' },
      { text: '下犬 30s', hint: '脚跟踩地', phase: 'work' },
      { text: '鸽子式 各30s', hint: '久坐臀需要', phase: 'work' },
      { text: '坐姿前屈 30s', hint: '腿后侧拉长', phase: 'work' },
      { text: '脊柱扭转 各30s', hint: '肩贴地', phase: 'work' },
      { text: '靠墙抬腿 60s', hint: '消水肿', phase: 'work' },
      { text: '婴儿式 30s', hint: '膝靠腋下', phase: 'work' },
      { text: '摊尸式 30s', hint: '什么都不做', phase: 'cooldown' },
    ],
    feeling: '全身松 · 呼吸长 · 沉',
    benefit: '降皮质醇，缩短入睡时间',
  },
  night_core_stretch: {
    id: 'night_core_stretch',
    title: '核心+拉伸',
    subtitle: '轻核心+深拉伸',
    duration: 360,
    scene: 'night',
    depth: 'medium',
    tags: ['core', 'full', 'calm', 'sleep'],
    steps: [
      { text: '猫牛 8轮', hint: '', phase: 'warmup' },
      { text: '平板 20s', hint: '不塌腰', phase: 'work' },
      { text: '死虫 每侧8', hint: '下背贴地', phase: 'work' },
      { text: '臀桥 ×12', hint: '顶端停2s', phase: 'work' },
      { text: '侧平板 各15s', hint: '膝着地也行', phase: 'work' },
      { text: '鸽子式 各30s', hint: '', phase: 'work' },
      { text: '脊柱扭转 各30s', hint: '', phase: 'work' },
      { text: '靠墙抬腿 90s', hint: '闭眼', phase: 'cooldown' },
      { text: '摊尸式 30s', hint: '困了就睡', phase: 'cooldown' },
    ],
    feeling: '肚子微酸 · 松了 · 困了',
    benefit: '耗精力+松肌肉，双重助眠',
  },
  night_breath: {
    id: 'night_breath',
    title: '入睡呼吸',
    subtitle: '4-7-8呼吸·6轮',
    duration: 180,
    scene: 'night',
    depth: 'light',
    tags: ['sleep', 'calm'],
    steps: [
      { text: '躺好或坐好', hint: '最舒服的姿势', phase: 'warmup' },
      { text: '鼻吸 4s', hint: '肚子鼓', phase: 'work' },
      { text: '屏住 7s', hint: '自然停住', phase: 'work' },
      { text: '嘴呼 8s', hint: '像吹吸管', phase: 'work' },
      { text: '重复到第6轮', hint: '每轮更沉', phase: 'work' },
      { text: '自然呼吸', hint: '困了就睡', phase: 'cooldown' },
    ],
    feeling: '越来越沉 · 四肢暖 · 困了',
    benefit: '临床验证缩短入睡时间',
  },
  night_body: {
    id: 'night_body',
    title: '身体扫描',
    subtitle: 'PMR·从脚到头松一遍',
    duration: 300,
    scene: 'night',
    depth: 'deep',
    tags: ['sleep', 'calm', 'full'],
    steps: [
      { text: '躺平闭眼 呼吸10s', hint: '', phase: 'warmup' },
      { text: '脚趾紧5s→松', hint: '感受对比', phase: 'work' },
      { text: '小腿紧5s→松', hint: '', phase: 'work' },
      { text: '大腿+臀紧5s→松', hint: '', phase: 'work' },
      { text: '肚子紧5s→松', hint: '', phase: 'work' },
      { text: '拳+臂紧5s→松', hint: '手指对比最明显', phase: 'work' },
      { text: '脸挤紧5s→松', hint: '全脸放松', phase: 'work' },
      { text: '全身紧5s→全松', hint: '像融化了', phase: 'work' },
      { text: '自然呼吸30s', hint: '困了就睡', phase: 'cooldown' },
    ],
    feeling: '像融化 · 全松了 · 很困',
    benefit: 'PMR临床验证改善失眠',
  },
  night_write: {
    id: 'night_write',
    title: '写三行字',
    subtitle: '不是日记·写完就放下',
    duration: 180,
    scene: 'night',
    depth: 'light',
    tags: ['calm', 'sleep'],
    steps: [
      { text: '拿纸笔或备忘录', hint: '纸笔更好', phase: 'warmup' },
      { text: '第一行 脑子最多的事', hint: '几个字就行', phase: 'work' },
      { text: '第二行 想不通的', hint: '写出来就好', phase: 'work' },
      { text: '第三行 明天1件小事', hint: '越小越好', phase: 'work' },
      { text: '放下笔 不回看', hint: '脑子可以放了', phase: 'work' },
      { text: '4-7-8 3轮', hint: '拉回身体', phase: 'cooldown' },
    ],
    feeling: '脑里少了一圈 · 肩沉了',
    benefit: '降皮质醇，止反刍思维',
  },

  // ── 问题轴 ──

  problem_dizzy: {
    id: 'problem_dizzy',
    title: '起身不晕',
    subtitle: '踝泵+缓起',
    duration: 90,
    scene: 'problem',
    depth: 'light',
    tags: ['cardio', 'lower'],
    steps: [
      { text: '脚掌上勾', hint: '小腿前侧绷紧', phase: 'warmup' },
      { text: '用力下踩', hint: '像踩油门', phase: 'work' },
      { text: '交替 每脚15', hint: '泵血回心', phase: 'work' },
      { text: '按大腿 慢站起', hint: '别猛起', phase: 'work' },
      { text: '站稳10s 深呼吸3', hint: '', phase: 'cooldown' },
    ],
    feeling: '不黑了 · 不晕 · 站稳',
    benefit: '促静脉回流，防体位性低血压',
  },
  problem_energy: {
    id: 'problem_energy',
    title: '快速回血',
    subtitle: '开合跳+冷水',
    duration: 120,
    scene: 'problem',
    depth: 'medium',
    tags: ['cardio', 'full'],
    steps: [
      { text: '开合跳 30s', hint: '提心率', phase: 'work' },
      { text: '高抬腿 15s', hint: '膝尽量高', phase: 'work' },
      { text: '深呼吸5', hint: '', phase: 'work' },
      { text: '冷水冲手腕15s', hint: '血管密集降温快', phase: 'work' },
      { text: '冷水拍后颈5s', hint: '', phase: 'cooldown' },
    ],
    feeling: '喘 · 汗 · 清醒了',
    benefit: '比咖啡快，激活交感神经',
  },
  problem_core: {
    id: 'problem_core',
    title: '腰痛急救',
    subtitle: '死虫+臀桥+猫牛',
    duration: 300,
    scene: 'problem',
    depth: 'medium',
    tags: ['core', 'back', 'lower'],
    steps: [
      { text: '猫牛 10轮', hint: '', phase: 'warmup' },
      { text: '死虫 每侧8', hint: '下背贴死地', phase: 'work' },
      { text: '臀桥 ×12 停2s', hint: '臀用力不是腰', phase: 'work' },
      { text: '婴儿式 20s', hint: '松下背', phase: 'rest' },
      { text: '鸟狗 每侧8', hint: '对侧手脚伸', phase: 'work' },
      { text: '臀桥 ×12', hint: '顶到最紧', phase: 'work' },
      { text: '抱膝 20s', hint: '晃一晃', phase: 'cooldown' },
      { text: '站直后仰10s', hint: '打开前侧', phase: 'cooldown' },
    ],
    feeling: '腰不空了 · 核心紧 · 站稳',
    benefit: '80%腰痛源于核心无力+臀失忆',
  },
  problem_posture: {
    id: 'problem_posture',
    title: '驼背急救',
    subtitle: 'YTW+门框拉伸',
    duration: 180,
    scene: 'problem',
    depth: 'light',
    tags: ['posture', 'upper', 'neck'],
    steps: [
      { text: '肩后画圈 10', hint: '', phase: 'warmup' },
      { text: 'Y举 ×10', hint: '拇指朝上', phase: 'work' },
      { text: 'T举 ×10', hint: '挤肩胛骨', phase: 'work' },
      { text: 'W拉 ×10', hint: '肩胛骨下压', phase: 'work' },
      { text: '颈后缩 ×10', hint: '双下巴', phase: 'work' },
      { text: '门框拉伸 30s', hint: '身体前走', phase: 'cooldown' },
    ],
    feeling: '背热 · 胸开 · 肩后收',
    benefit: '3分钟圆肩驼背最有效自重训练',
  },
  problem_neck: {
    id: 'problem_neck',
    title: '颈痛急救',
    subtitle: '颈后缩+侧屈+拉伸',
    duration: 150,
    scene: 'problem',
    depth: 'light',
    tags: ['neck', 'posture', 'upper'],
    steps: [
      { text: '肩后画圈 10', hint: '', phase: 'warmup' },
      { text: '颈后缩 ×10', hint: '双下巴', phase: 'work' },
      { text: '侧屈 各20s ×2', hint: '耳找肩', phase: 'work' },
      { text: '上斜方拉伸 各20s', hint: '耳找腋下', phase: 'work' },
      { text: '颈后缩 ×10', hint: '巩固', phase: 'work' },
      { text: '耸肩5s→放 ×3', hint: '彻底掉下来', phase: 'cooldown' },
    ],
    feeling: '脖后拉紧又松开 · 头正了',
    benefit: '恢复颈椎中立位',
  },
  problem_eyes: {
    id: 'problem_eyes',
    title: '眼疲劳急救',
    subtitle: '远眺+眨眼+热敷',
    duration: 120,
    scene: 'problem',
    depth: 'light',
    tags: ['eyes', 'calm'],
    steps: [
      { text: '看6米外 20s', hint: '睫状肌松', phase: 'work' },
      { text: '闭眼3s→眨10次', hint: '挤睑板腺', phase: 'work' },
      { text: '眼球顺逆各转1圈', hint: '慢慢转', phase: 'work' },
      { text: '搓热捂眼 15s', hint: '别按压', phase: 'work' },
      { text: '闭眼深呼吸5', hint: '眼压降下来', phase: 'cooldown' },
    ],
    feeling: '眼润 · 不干 · 清晰了',
    benefit: '远眺+眨眼+热敷三合一',
  },
}

// ═══════════════════════════════════════
// 时段 → 行动映射
// ═══════════════════════════════════════

const SCENE_ACTIONS = {
  morning: ['morning_squat', 'morning_pushup', 'morning_core', 'morning_flow', 'morning_hiit'],
  work: ['work_lunge', 'work_back', 'work_glute', 'work_posture', 'work_eyes_shoulder'],
  night: ['night_yoga', 'night_core_stretch', 'night_breath', 'night_body', 'night_write'],
}

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
// 12 个主题世界
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
