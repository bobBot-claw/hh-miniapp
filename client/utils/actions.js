// utils/actions.js — 慢慢变好 v0.7.1 — 行动库 + 治愈世界 + 彩蛋插画

// ═══════════════════════════════════════════════════════════
// 行动库
// ═══════════════════════════════════════════════════════════
//
// 设计原则：
// 1. 每个行动 1.5~5 分钟，做完有体感
// 2. 5~6 步引导，每步包含动作 + 感受提示
// 3. feeling = 当下体感（揭示页用），benefit = 长期收益（世界页用）
// 4. 问题轴行动并入对应时段，需要时自动优先推送
//
// 结构说明：
//   depth: 'light' | 'medium' | 'deep'
//     light  = 入门级，随时可做
//     medium = 需要一点空间或准备
//     deep   = 需要躺下/靠墙等条件
//   tags: 标签，用于问题轴匹配
//     neck / shoulder / back / core / eyes / energy / calm / sleep / posture
// ═══════════════════════════════════════════════════════════

const ACTIONS = {

  // ╔═══════════════════════════════════╗
  // ║          晨 间 · 5 行动          ║
  // ╚═══════════════════════════════════╝

  morning_light: {
    id: 'morning_light',
    title: '今天见光',
    subtitle: '走到窗边 · 让光进来',
    duration: 180,
    scene: 'morning',
    depth: 'light',
    tags: ['energy', 'calm'],
    steps: [
      { text: '走到窗边，拉开窗帘', hint: '让眼睛适应自然光' },
      { text: '面向窗外，让光照在脸上', hint: '感受皮肤微暖' },
      { text: '闭眼，背对窗 10 秒', hint: '让光透过眼皮，看到橙红色' },
      { text: '睁眼，看远处最亮的云', hint: '让焦距松开' },
      { text: '深呼吸 5 次，慢慢来', hint: '肩膀跟着呼吸沉下来' },
    ],
    feeling: '眼睛被光洗过 · 皮肤微暖 · 脑子醒了',
    benefit: '晨间自然光调节褪黑素，帮你稳定睡眠节律',
  },
  morning_breath: {
    id: 'morning_breath',
    title: '晨间呼吸',
    subtitle: '4-7-8 呼吸法 · 把心率拉下来',
    duration: 150,
    scene: 'morning',
    depth: 'light',
    tags: ['calm', 'energy'],
    steps: [
      { text: '坐直，双脚踩地', hint: '身体稳了，呼吸才能稳' },
      { text: '鼻子吸气 4 秒', hint: '肚子慢慢鼓起来' },
      { text: '屏住呼吸 7 秒', hint: '不要用力，自然停住' },
      { text: '嘴巴缓缓呼气 8 秒', hint: '像吹灭蜡烛一样' },
      { text: '重复 5 轮', hint: '每轮比上一轮更慢' },
      { text: '最后一次，自然呼吸 3 次', hint: '感受心率慢下来' },
    ],
    feeling: '心跳变慢 · 肩膀松了 · 呼吸变长',
    benefit: '4-7-8 呼吸激活副交感神经，长期练习降低基础焦虑水平',
  },
  morning_neck: {
    id: 'morning_neck',
    title: '颈侧屈',
    subtitle: '耳朵找肩膀 · 脖子松一半',
    duration: 150,
    scene: 'morning',
    depth: 'light',
    tags: ['neck', 'calm'],
    steps: [
      { text: '坐直，右手放在左耳上方', hint: '不要拉，只是轻轻搭着' },
      { text: '右耳慢慢靠向右肩', hint: '感受左侧脖子被拉长' },
      { text: '保持 20 秒，正常呼吸', hint: '每次呼气，再沉一点' },
      { text: '换边，左耳靠左肩', hint: '两边可能不一样紧，正常' },
      { text: '每边 3 次', hint: '最后一次，头回正时会很轻松' },
      { text: '低头 5 秒，抬头 5 秒', hint: '脖子一圈都活动到了' },
    ],
    feeling: '脖子两侧松开 · 头没那么沉了 · 转头变轻松',
    benefit: '缓解夜间枕头造成的颈侧紧张，预防颈椎曲度变直',
  },
  morning_catcow: {
    id: 'morning_catcow',
    title: '猫牛式',
    subtitle: '脊柱一节一节醒来',
    duration: 180,
    scene: 'morning',
    depth: 'medium',
    tags: ['back', 'posture', 'calm'],
    steps: [
      { text: '四点跪姿，手在肩下方，膝在髋下方', hint: '背放平，像一张桌子' },
      { text: '吸气，塌腰抬头，尾骨上翘', hint: '这是牛式，肚子往下沉' },
      { text: '呼气，拱背低头，尾骨内卷', hint: '这是猫式，背推到最高' },
      { text: '跟着呼吸，牛→猫→牛→猫', hint: '每次都让脊柱多动一点' },
      { text: '做 10 轮', hint: '后背会越来越热' },
      { text: '回到平背，屁股坐脚跟，趴下', hint: '婴儿式休息 10 秒' },
    ],
    feeling: '整条脊柱热了 · 后腰松了 · 呼吸更深',
    benefit: '脊柱灵活性训练，长期预防腰椎和胸椎僵硬，改善驼背',
  },
  morning_stretch: {
    id: 'morning_stretch',
    title: '全身伸懒腰',
    subtitle: '像猫刚醒一样 · 拉到最远',
    duration: 180,
    scene: 'morning',
    depth: 'light',
    tags: ['back', 'energy', 'posture'],
    steps: [
      { text: '站直，双脚与肩同宽', hint: '脚踩实地面' },
      { text: '双手交叉翻掌，举过头顶', hint: '掌心朝上，往天花板推' },
      { text: '保持 15 秒，脚跟微微离地', hint: '从脚趾一直拉到指尖' },
      { text: '放下，双手体后交叉', hint: '肩膀后展，胸打开' },
      { text: '保持 15 秒，深呼吸 3 次', hint: '胸腔像被撑开' },
      { text: '放松，甩手甩脚 10 秒', hint: '血液重新跑起来' },
    ],
    feeling: '全身拉长了 · 胸口打开了 · 血液上头了',
    benefit: '晨间全身伸展激活血液循环，减少久睡带来的僵硬感',
  },

  // ╔═══════════════════════════════════╗
  // ║          工 间 · 5 行动          ║
  // ╚═══════════════════════════════════╝

  work_stand: {
    id: 'work_stand',
    title: '站起来走走',
    subtitle: '不只是站起来 · 走 30 步',
    duration: 120,
    scene: 'work',
    depth: 'light',
    tags: ['energy', 'posture'],
    steps: [
      { text: '推椅子，站起来', hint: '先别急着走，站稳 3 秒' },
      { text: '踮脚 5 次', hint: '小腿肌肉把血液泵回来' },
      { text: '走 30 步，不用快', hint: '手臂自然摆动' },
      { text: '走到头，转个身走回来', hint: '视线离开屏幕' },
      { text: '站定，深呼吸 3 次', hint: '肩膀放下来再坐回去' },
    ],
    feeling: '腿不麻了 · 脑子清醒了一点 · 眼睛松了',
    benefit: '每 45 分钟起身走动能降低深静脉血栓风险，改善腰骶血液循环',
  },
  work_shoulder: {
    id: 'work_shoulder',
    title: '肩部松绑',
    subtitle: '画圈 + 夹背 · 肩胛骨归位',
    duration: 150,
    scene: 'work',
    depth: 'light',
    tags: ['shoulder', 'neck', 'posture'],
    steps: [
      { text: '双肩向上耸起，保持 5 秒', hint: '耸到耳朵旁边' },
      { text: '瞬间放下，感受重力', hint: '让肩膀掉下去，不要控制' },
      { text: '向后画大圈，10 圈', hint: '圈画越大越好' },
      { text: '向前画大圈，5 圈', hint: '前少后多，对抗前倾' },
      { text: '双手叉腰，手肘往后夹', hint: '肩胛骨往中间挤' },
      { text: '保持 5 秒，重复 5 次', hint: '后背会微微发热' },
    ],
    feeling: '肩胛骨附近松了 · 手臂变轻 · 胸口打开了',
    benefit: '松解肩胛提肌和菱形肌，对抗长期伏案导致的圆肩驼背',
  },
  work_eyes: {
    id: 'work_eyes',
    title: '护眼三步',
    subtitle: '远看 + 眨眼 + 热敷 · 三步走',
    duration: 150,
    scene: 'work',
    depth: 'light',
    tags: ['eyes'],
    steps: [
      { text: '视线离开屏幕，看窗外或远处', hint: '至少 6 米外' },
      { text: '盯住最远的点，20 秒', hint: '让睫状肌完全放松' },
      { text: '用力闭紧眼睛 3 秒', hint: '挤压睑板腺，分泌油脂' },
      { text: '慢慢睁开，眨眼 10 次', hint: '每次都要完全闭上' },
      { text: '双手搓热，掌心捂住眼睛', hint: '不要按压，让热量渗透' },
      { text: '保持 15 秒，慢慢拿开', hint: '眼前会有一小片暖光' },
    ],
    feeling: '眼眶湿润了 · 焦距变松 · 不干涩了',
    benefit: '完整眨眼 + 远眺 + 热敷三步组合，缓解干眼和视疲劳，预防近视加深',
  },
  work_wrist: {
    id: 'work_wrist',
    title: '手腕松一松',
    subtitle: '转腕 + 撑地 · 鼠标手自救',
    duration: 120,
    scene: 'work',
    depth: 'light',
    tags: ['shoulder', 'energy'],
    steps: [
      { text: '双手伸出，十指交叉', hint: '掌心朝外' },
      { text: '向外推 10 秒', hint: '手腕和小臂前侧有拉伸感' },
      { text: '翻转掌心朝内，向胸口拉 10 秒', hint: '小臂外侧拉伸' },
      { text: '单手伸出，另一只手帮忙向下压手指', hint: '每只手 10 秒' },
      { text: '双手握拳，画圈 10 圈', hint: '正反各 5 圈' },
      { text: '甩手 10 秒，放松', hint: '让手腕完全放松' },
    ],
    feeling: '手指灵活了 · 手腕不僵了 · 前臂松了',
    benefit: '预防腕管综合征和腱鞘炎，对长期用鼠标键盘的人尤其重要',
  },
  work_wall: {
    id: 'work_wall',
    title: '靠墙天使',
    subtitle: '贴墙抬手 · 打开胸腔',
    duration: 180,
    scene: 'work',
    depth: 'medium',
    tags: ['posture', 'shoulder', 'back'],
    steps: [
      { text: '找一面墙，背靠上去', hint: '脚跟、臀部、后脑勺贴墙' },
      { text: '双臂贴墙抬起，肘弯 90°', hint: '手肘和手背都贴墙' },
      { text: '手臂沿墙慢慢上推', hint: '能推多高推多高，保持贴墙' },
      { text: '慢慢收回起始位置', hint: '像雪花落在玻璃上一样慢' },
      { text: '重复 10 次', hint: '后背中段会越来越热' },
      { text: '离开墙，自然站 5 秒', hint: '肩膀会自动后收' },
    ],
    feeling: '胸腔打开了 · 肩膀自动后收 · 呼吸更深了',
    benefit: '纠正上交叉综合征（圆肩+头前伸），长期坚持改善体态',
  },

  // ╔═══════════════════════════════════╗
  // ║          夜 间 · 5 行动          ║
  // ╚═══════════════════════════════════╝

  night_write: {
    id: 'night_write',
    title: '写三行字',
    subtitle: '不是日记 · 写完就放下',
    duration: 180,
    scene: 'night',
    depth: 'light',
    tags: ['calm', 'sleep'],
    steps: [
      { text: '拿出纸笔或手机备忘录', hint: '纸笔更好，手写有质感' },
      { text: '第一行：今天脑子里最多的事', hint: '就写几个字，不用完整句子' },
      { text: '第二行：一个想不通的东西', hint: '写出来就好，不需要答案' },
      { text: '第三行：明天的 1 件小事', hint: '越小越好，比如"喝水"' },
      { text: '放下笔，不回看', hint: '字已经写在纸上了，脑子可以放下' },
      { text: '深呼吸 3 次，闭眼', hint: '让写下的东西留在纸上面' },
    ],
    feeling: '脑子里少了一圈 · 呼吸变长 · 肩膀沉了',
    benefit: '表达性写作降低皮质醇水平，帮助大脑从"反刍思维"中脱出',
  },
  night_hip: {
    id: 'night_hip',
    title: '髋部前屈',
    subtitle: '站着弯腰 · 释放一天的压力',
    duration: 180,
    scene: 'night',
    depth: 'medium',
    tags: ['back', 'calm', 'sleep'],
    steps: [
      { text: '站立，双脚与肩同宽', hint: '重心均匀' },
      { text: '膝盖微弯，上身慢慢前屈', hint: '不要直腿弯腰' },
      { text: '手臂自然下垂，头放松', hint: '脖子完全不用力' },
      { text: '保持 30 秒，感受后腰和腿后侧拉长', hint: '每次呼气再往下一点' },
      { text: '慢慢起身，重复 3 次', hint: '起身要慢，避免头晕' },
      { text: '最后一次起身后，双手叉腰后仰 10 秒', hint: '前后平衡' },
    ],
    feeling: '后腰和腿后侧拉长 · 站直轻松了 · 呼吸更深',
    benefit: '释放腘绳肌和下背部张力，改善骨盆前倾，睡前做有助入睡',
  },
  night_breath: {
    id: 'night_breath',
    title: '入睡呼吸',
    subtitle: '4-7-8 · 身体变沉 · 困意来了',
    duration: 180,
    scene: 'night',
    depth: 'light',
    tags: ['sleep', 'calm'],
    steps: [
      { text: '躺下或靠枕头坐好', hint: '用最舒服的姿势' },
      { text: '鼻子吸气 4 秒', hint: '肚子鼓起来' },
      { text: '屏住 7 秒', hint: '不要用力，自然停住' },
      { text: '嘴巴呼气 8 秒', hint: '像在吹一根很细的吸管' },
      { text: '重复 6 轮', hint: '每轮身体会更沉一点' },
      { text: '最后一次后，自然呼吸', hint: '如果困了就直接睡' },
    ],
    feeling: '身体越来越沉 · 四肢变暖 · 困意来了',
    benefit: '4-7-8 呼吸法能缩短入睡时间，长期练习改善睡眠质量',
  },
  night_legs: {
    id: 'night_legs',
    title: '靠墙抬腿',
    subtitle: '腿靠墙 3 分钟 · 消肿助眠',
    duration: 240,
    scene: 'night',
    depth: 'medium',
    tags: ['calm', 'sleep', 'energy'],
    steps: [
      { text: '侧坐在墙边，臀部贴近墙根', hint: '床靠着墙最方便' },
      { text: '躺下的同时，把腿伸上墙', hint: '屁股尽量贴墙' },
      { text: '双臂自然放在身体两侧', hint: '掌心朝上，肩膀打开' },
      { text: '闭眼，自然呼吸 2 分钟', hint: '感受腿从沉重变轻盈' },
      { text: '弯曲膝盖，腿慢慢放下来', hint: '不要直直放下' },
      { text: '侧身，慢慢坐起来', hint: '动作慢，避免头晕' },
    ],
    feeling: '腿变轻了 · 肿消了 · 身体很沉很舒服',
    benefit: '促进下肢静脉回流，消除一天的水肿，睡前做显著改善睡眠',
  },
  night_body: {
    id: 'night_body',
    title: '身体扫描',
    subtitle: '从脚到头 · 每个部位松一遍',
    duration: 300,
    scene: 'night',
    depth: 'deep',
    tags: ['sleep', 'calm'],
    steps: [
      { text: '躺平，闭眼，自然呼吸 10 秒', hint: '先把气喘匀' },
      { text: '注意力到脚趾，用力蜷紧 5 秒', hint: '然后瞬间放松' },
      { text: '注意力到小腿，绷紧 5 秒', hint: '然后放松，感受对比' },
      { text: '注意力到大腿和臀部，收紧 5 秒', hint: '放松时整条腿都变沉' },
      { text: '注意力到肚子和胸口，深吸一口气憋住 5 秒', hint: '呼出来，全身变软' },
      { text: '注意力到脸，挤眉弄眼 5 秒', hint: '松开后整张脸都放松了' },
    ],
    feeling: '全身像融化了 · 每个部位都放松了 · 困意很重',
    benefit: '渐进式肌肉放松（PMR）是临床验证的失眠干预方法，长期练习降低整体肌张力',
  },

  // ╔═══════════════════════════════════╗
  // ║     问题轴 · 6 行动（随时触发）    ║
  // ╚═══════════════════════════════════╝

  problem_dizzy: {
    id: 'problem_dizzy',
    title: '起身不晕',
    subtitle: '踝泵 + 缓起 · 告别眼前发黑',
    duration: 90,
    scene: 'problem',
    depth: 'light',
    tags: ['energy'],
    steps: [
      { text: '坐着，脚掌用力向上勾', hint: '小腿前侧肌肉绷紧' },
      { text: '再用力向下踩', hint: '像踩油门' },
      { text: '上下交替，每只脚 15 次', hint: '帮血液泵回心脏' },
      { text: '双手按住大腿，慢慢站起来', hint: '不要猛地起身' },
      { text: '站稳 10 秒，深呼吸 3 次', hint: '确认不晕了再走' },
    ],
    feeling: '眼前不黑了 · 头不晕 · 站稳了',
    benefit: '踝泵运动促进下肢静脉回流，预防体位性低血压，久坐族必练',
  },
  problem_energy: {
    id: 'problem_energy',
    title: '快速回血',
    subtitle: '冷水 + 深呼吸 · 30 秒清醒',
    duration: 120,
    scene: 'problem',
    depth: 'light',
    tags: ['energy'],
    steps: [
      { text: '去洗手间，冷水冲手腕内侧 15 秒', hint: '手腕血管密集，降温最快' },
      { text: '冷水拍后颈 5 秒', hint: '刺激迷走神经' },
      { text: '双手搓脸 10 秒', hint: '从下巴往额头方向' },
      { text: '站直，深呼吸 5 次', hint: '每次吸气都吸到肚子' },
      { text: '原地踏步 20 步', hint: '把心率提起来' },
    ],
    feeling: '脑子清醒了 · 不困了 · 身体醒了',
    benefit: '冷水刺激激活交感神经，提升警觉度，比咖啡更快更健康',
  },
  problem_core: {
    id: 'problem_core',
    title: '死虫式',
    subtitle: '躺下 · 手脚对伸 · 核心稳了',
    duration: 180,
    scene: 'problem',
    depth: 'deep',
    tags: ['core', 'back', 'posture'],
    steps: [
      { text: '仰卧，双臂朝天，双腿屈膝 90°', hint: '像一只翻过来的虫' },
      { text: '收紧肚子，下背贴死地面', hint: '手塞不进腰和地之间就对了' },
      { text: '左臂向后伸，右腿向前伸', hint: '慢一点，保持腰贴地' },
      { text: '回到起始，换边', hint: '每边交替，不要急' },
      { text: '每边 8 次', hint: '后两次会抖，正常' },
      { text: '做完，双手抱膝 10 秒', hint: '放松下背' },
    ],
    feeling: '肚子收紧了 · 腰不空了 · 站直更有力',
    benefit: '激活腹横肌和多裂肌，从根本解决腰痛，比仰卧起坐安全有效',
  },
  problem_posture: {
    id: 'problem_posture',
    title: '胸椎打开',
    subtitle: '毛巾卷 + 后仰 · 驼背自救',
    duration: 180,
    scene: 'problem',
    depth: 'medium',
    tags: ['posture', 'back', 'shoulder'],
    steps: [
      { text: '把毛巾卷成拳头粗的卷', hint: '没有毛巾用靠垫也行' },
      { text: '仰卧，毛巾卷垫在肩胛骨下方', hint: '大约是内衣带的位置' },
      { text: '双手向头顶方向伸展', hint: '像伸懒腰一样' },
      { text: '保持 30 秒，自然呼吸', hint: '感觉胸椎被托起来往后弯' },
      { text: '毛巾下移 2 厘米，再保持 30 秒', hint: '换一个胸椎节段' },
      { text: '拿开毛巾，仰卧深呼吸 3 次', hint: '坐起来时背会自动挺直' },
    ],
    feeling: '胸腔打开了 · 肩膀自动后收 · 呼吸变深',
    benefit: '改善胸椎后凸，恢复胸椎伸展活动度，对抗长期前倾造成的驼背',
  },
  problem_neck: {
    id: 'problem_neck',
    title: '颈后缩',
    subtitle: '下巴后收 · 颈椎归位 · 头不前伸',
    duration: 120,
    scene: 'problem',
    depth: 'light',
    tags: ['neck', 'posture'],
    steps: [
      { text: '坐直，目视前方', hint: '耳朵和肩膀在一条线上' },
      { text: '下巴水平向后缩', hint: '做出双下巴的感觉' },
      { text: '保持 5 秒', hint: '脖子后面会拉紧' },
      { text: '放松，回到起始位置', hint: '不要向前探头' },
      { text: '重复 10 次', hint: '最后几次头可能微微发抖，正常' },
    ],
    feeling: '脖子后面拉紧 · 头回正了 · 肩颈松了',
    benefit: '纠正头前伸姿态（上交叉综合征），减轻颈椎间盘压力，预防颈源性头痛',
  },
  problem_eyes: {
    id: 'problem_eyes',
    title: '完全护眼',
    subtitle: '眨眼 + 远眺 + 转球 · 三合一',
    duration: 120,
    scene: 'problem',
    depth: 'light',
    tags: ['eyes'],
    steps: [
      { text: '用力闭紧眼睛 3 秒', hint: '挤压睑板腺' },
      { text: '睁眼，看窗外最远处 15 秒', hint: '让睫状肌完全放松' },
      { text: '眼球慢慢转一圈，顺时针', hint: '转到每个方向都停 1 秒' },
      { text: '逆时针再转一圈', hint: '慢一点，不要太快' },
      { text: '双手搓热，捂眼 10 秒', hint: '感受热气渗透眼眶' },
    ],
    feeling: '眼眶湿润 · 不干涩 · 看东西更清晰',
    benefit: '完整眨眼+远眺+眼球运动三合一，缓解干眼症和视疲劳，预防近视加深',
  },
}

// ═══════════════════════════════════════
// 时段 → 行动映射（每时段 5 个）
// ═══════════════════════════════════════

const SCENE_ACTIONS = {
  morning: ['morning_light', 'morning_breath', 'morning_neck', 'morning_catcow', 'morning_stretch'],
  work: ['work_stand', 'work_shoulder', 'work_eyes', 'work_wrist', 'work_wall'],
  night: ['night_write', 'night_hip', 'night_breath', 'night_legs', 'night_body'],
}

// 问题轴标签 → 行动映射（用于根据症状匹配）
const TAG_ACTIONS = {
  neck: ['morning_neck', 'problem_neck'],
  shoulder: ['work_shoulder', 'work_wall', 'problem_posture'],
  back: ['morning_catcow', 'morning_stretch', 'night_hip', 'problem_core', 'problem_posture'],
  core: ['problem_core'],
  eyes: ['work_eyes', 'problem_eyes'],
  energy: ['morning_light', 'morning_breath', 'work_stand', 'problem_energy'],
  calm: ['morning_breath', 'morning_light', 'night_write', 'night_breath', 'night_body', 'night_legs'],
  sleep: ['night_breath', 'night_body', 'night_legs', 'night_write'],
  posture: ['morning_catcow', 'morning_stretch', 'work_wall', 'problem_posture', 'problem_neck'],
}

// ═══════════════════════════════════════
// 场景 & 行动获取逻辑
// ═══════════════════════════════════════

// 获取当前时段
function getCurrentScene() {
  const hour = new Date().getHours()
  if (hour >= 6 && hour < 11) return 'morning'
  if (hour >= 11 && hour < 20) return 'work'
  return 'night'
}

// 根据日期获取轮换索引
function getDayIndex(date) {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date - start
  return Math.floor(diff / 86400000)
}

// 获取当前行动（每天 1 个，根据时段轮换）
// 5 个行动 × 3 时段 = 15 天不重复
function getCurrentAction() {
  const scene = getCurrentScene()
  const sceneActions = SCENE_ACTIONS[scene]
  const index = getDayIndex(new Date()) % sceneActions.length
  return ACTIONS[sceneActions[index]]
}

// 获取明天的行动预告
function getTomorrowAction() {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  // 用明天中午的时段做预告
  const tomorrowScene = (() => {
    const h = 12 // 预告取工间时段最常见
    return 'work'
  })()
  const scene = getCurrentScene()
  const sceneActions = SCENE_ACTIONS[scene]
  const index = getDayIndex(tomorrow) % sceneActions.length
  return ACTIONS[sceneActions[index]]
}

// 根据标签获取问题轴行动
function getActionByTag(tag) {
  const actionIds = TAG_ACTIONS[tag] || []
  return actionIds.map(id => ACTIONS[id]).filter(Boolean)
}

// 根据问题直接获取推荐行动
function getProblemAction(problemTag) {
  const candidates = TAG_ACTIONS[problemTag] || []
  if (candidates.length === 0) return null
  // 轮换：基于日期在候选中选一个
  const index = getDayIndex(new Date()) % candidates.length
  return ACTIONS[candidates[index]]
}

// ═══════════════════════════════════════
// 12 个主题世界 + 彩蛋插画
// ═══════════════════════════════════════

const WORLDS = [
  {
    id: 'forest',
    name: '春之森林',
    iconType: 'forest',
    locked: false,
    total: 30,
    eggs: Array.from({ length: 30 }, (_, i) => ({
      blurUrl: `/assets/eggs/forest/blur_${String(i + 1).padStart(2, '0')}.png`,
      clearUrl: `/assets/eggs/forest/clear_${String(i + 1).padStart(2, '0')}.png`,
    })),
  },
  {
    id: 'sea',
    name: '夏之海边',
    iconType: 'sea',
    locked: false,
    total: 30,
    eggs: Array.from({ length: 30 }, (_, i) => ({
      blurUrl: `/assets/eggs/sea/blur_${String(i + 1).padStart(2, '0')}.png`,
      clearUrl: `/assets/eggs/sea/clear_${String(i + 1).padStart(2, '0')}.png`,
    })),
  },
  {
    id: 'window',
    name: '秋之窗边',
    iconType: 'window',
    locked: false,
    total: 30,
    eggs: Array.from({ length: 30 }, (_, i) => ({
      blurUrl: `/assets/eggs/window/blur_${String(i + 1).padStart(2, '0')}.png`,
      clearUrl: `/assets/eggs/window/clear_${String(i + 1).padStart(2, '0')}.png`,
    })),
  },
  {
    id: 'warm',
    name: '冬之暖屋',
    iconType: 'warm',
    locked: false,
    total: 30,
    eggs: Array.from({ length: 30 }, (_, i) => ({
      blurUrl: `/assets/eggs/warm/blur_${String(i + 1).padStart(2, '0')}.png`,
      clearUrl: `/assets/eggs/warm/clear_${String(i + 1).padStart(2, '0')}.png`,
    })),
  },
  {
    id: 'tea',
    name: '茶与书',
    iconType: 'tea',
    locked: false,
    total: 30,
    eggs: Array.from({ length: 30 }, (_, i) => ({
      blurUrl: `/assets/eggs/tea/blur_${String(i + 1).padStart(2, '0')}.png`,
      clearUrl: `/assets/eggs/tea/clear_${String(i + 1).padStart(2, '0')}.png`,
    })),
  },
  {
    id: 'night',
    name: '夜与星',
    iconType: 'night',
    locked: false,
    total: 30,
    eggs: Array.from({ length: 30 }, (_, i) => ({
      blurUrl: `/assets/eggs/night/blur_${String(i + 1).padStart(2, '0')}.png`,
      clearUrl: `/assets/eggs/night/clear_${String(i + 1).padStart(2, '0')}.png`,
    })),
  },
  // ── 扩展世界（锁定）──
  {
    id: 'garden',
    name: '秘密花园',
    iconType: 'default',
    locked: true,
    total: 30,
    eggs: [],
  },
  {
    id: 'mountain',
    name: '山间远行',
    iconType: 'default',
    locked: true,
    total: 30,
    eggs: [],
  },
  {
    id: 'rain',
    name: '雨天漫步',
    iconType: 'default',
    locked: true,
    total: 30,
    eggs: [],
  },
  {
    id: 'sunrise',
    name: '日出之约',
    iconType: 'default',
    locked: true,
    total: 30,
    eggs: [],
  },
  {
    id: 'snow',
    name: '雪地静音',
    iconType: 'default',
    locked: true,
    total: 30,
    eggs: [],
  },
  {
    id: 'star',
    name: '星河长明',
    iconType: 'default',
    locked: true,
    total: 30,
    eggs: [],
  },
]

// ═══════════════════════════════════════
// 导出
// ═══════════════════════════════════════

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
