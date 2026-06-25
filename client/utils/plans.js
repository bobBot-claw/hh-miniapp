// utils/plans.js - 系统训练计划数据

/**
 * 训练计划体系
 * 核心理念：一个计划解决一个问题
 * 每个计划包含：阶段 → 每日安排 → 具体练习
 */

const plans = [
  // ═══════════════════════════════════════
  // 计划1：久坐修复
  // ═══════════════════════════════════════
  {
    id: 'plan_sedentary',
    title: '久坐修复计划',
    subtitle: '14天系统修复久坐伤害',
    description: '针对久坐导致的肩颈僵硬、腰背疼痛、髋部紧绷，从快速缓解到深层修复，14天找回轻松的身体。',
    cover_gradient: 'linear-gradient(135deg, #ff7675, #fdcb6e)',
    problem_tags: ['久坐', '肩颈痛', '腰背不适'],
    duration_days: 14,
    difficulty: '入门',
    target_body: ['肩颈', '腰背', '髋部'],
    abilities_gain: { posture: 12, flexibility: 8, vitality: 5 },
    phases: [
      {
        title: '快速缓解',
        subtitle: '前3天，先解决最难受的',
        days: 3,
        daily: [
          { day: 1, title: '肩颈急救', exercises: ['ex_aid_01', 'ex_micro_02'], meditation: 'med_001', duration_text: '6min' },
          { day: 2, title: '腰背释放', exercises: ['ex_aid_02', 'ex_micro_03'], meditation: null, duration_text: '4min' },
          { day: 3, title: '全身唤醒', exercises: ['ex_aid_05', 'ex_micro_05'], meditation: null, duration_text: '6min' },
        ]
      },
      {
        title: '深层修复',
        subtitle: '4-10天，修复深层问题',
        days: 7,
        daily: [
          { day: 4, title: '打开胸腔', exercises: ['ex_posture_01', 'ex_flex_02'], meditation: null, duration_text: '10min' },
          { day: 5, title: '核心唤醒', exercises: ['ex_core_01', 'ex_aid_01'], meditation: null, duration_text: '8min' },
          { day: 6, title: '髋部释放', exercises: ['ex_flex_02', 'ex_flex_01'], meditation: null, duration_text: '12min' },
          { day: 7, title: '肩颈深度放松', exercises: ['ex_posture_03', 'ex_aid_01'], meditation: 'med_004', duration_text: '11min' },
          { day: 8, title: '腰背强化', exercises: ['ex_core_03', 'ex_aid_02'], meditation: null, duration_text: '8min' },
          { day: 9, title: '全身拉伸', exercises: ['ex_flex_01', 'ex_posture_02'], meditation: null, duration_text: '12min' },
          { day: 10, title: '活力恢复', exercises: ['ex_energy_01', 'ex_stress_01'], meditation: 'med_002', duration_text: '11min' },
        ]
      },
      {
        title: '习惯固化',
        subtitle: '11-14天，让身体记住好状态',
        days: 4,
        daily: [
          { day: 11, title: '晨间修复', exercises: ['ex_energy_01', 'ex_posture_01'], meditation: null, duration_text: '8min' },
          { day: 12, title: '办公修复', exercises: ['ex_aid_01', 'ex_micro_01'], meditation: 'med_006', duration_text: '7min' },
          { day: 13, title: '深度修复', exercises: ['ex_flex_01', 'ex_core_01'], meditation: null, duration_text: '10min' },
          { day: 14, title: '全面巩固', exercises: ['ex_aid_05', 'ex_flex_01'], meditation: 'med_004', duration_text: '12min' },
        ]
      }
    ]
  },

  // ═══════════════════════════════════════
  // 计划2：体态矫正
  // ═══════════════════════════════════════
  {
    id: 'plan_posture',
    title: '体态矫正计划',
    subtitle: '21天重塑挺拔身姿',
    description: '圆肩、驼背、脖子前倾——三大体态问题的系统矫正方案。从松解紧张肌群到强化弱势肌群，逐步重建正确体态。',
    cover_gradient: 'linear-gradient(135deg, #7c6ff7, #9d93fa)',
    problem_tags: ['体态差', '圆肩', '驼背', '脖子前倾'],
    duration_days: 21,
    difficulty: '初级',
    target_body: ['肩颈', '背部', '胸部'],
    abilities_gain: { posture: 18, core: 8, flexibility: 6 },
    phases: [
      {
        title: '松解期',
        subtitle: '1-7天，松开紧张的肌肉',
        days: 7,
        daily: [
          { day: 1, title: '胸肌松解', exercises: ['ex_posture_01', 'ex_aid_01'], meditation: null, duration_text: '8min' },
          { day: 2, title: '颈部释放', exercises: ['ex_posture_03', 'ex_micro_02'], meditation: null, duration_text: '6min' },
          { day: 3, title: '背部舒展', exercises: ['ex_posture_02', 'ex_flex_01'], meditation: null, duration_text: '12min' },
          { day: 4, title: '肩部打开', exercises: ['ex_posture_01', 'ex_posture_03'], meditation: null, duration_text: '10min' },
          { day: 5, title: '休息日', exercises: ['ex_micro_05'], meditation: 'med_001', duration_text: '2min' },
          { day: 6, title: '综合松解', exercises: ['ex_aid_01', 'ex_posture_01', 'ex_posture_03'], meditation: null, duration_text: '13min' },
          { day: 7, title: '拉伸恢复', exercises: ['ex_flex_01', 'ex_flex_02'], meditation: 'med_004', duration_text: '12min' },
        ]
      },
      {
        title: '强化期',
        subtitle: '8-14天，强化薄弱的肌群',
        days: 7,
        daily: [
          { day: 8, title: '背部强化', exercises: ['ex_posture_02', 'ex_core_01'], meditation: null, duration_text: '10min' },
          { day: 9, title: '核心稳定', exercises: ['ex_core_03', 'ex_posture_01'], meditation: null, duration_text: '10min' },
          { day: 10, title: '肩胛稳定', exercises: ['ex_posture_01', 'ex_aid_01'], meditation: null, duration_text: '8min' },
          { day: 11, title: '深层颈屈肌', exercises: ['ex_posture_03', 'ex_core_01'], meditation: null, duration_text: '10min' },
          { day: 12, title: '休息日', exercises: ['ex_micro_05'], meditation: 'med_002', duration_text: '6min' },
          { day: 13, title: '综合强化', exercises: ['ex_posture_02', 'ex_core_03'], meditation: null, duration_text: '10min' },
          { day: 14, title: '拉伸恢复', exercises: ['ex_flex_01'], meditation: 'med_004', duration_text: '7min' },
        ]
      },
      {
        title: '巩固期',
        subtitle: '15-21天，把好体态变成习惯',
        days: 7,
        daily: [
          { day: 15, title: '晨间体态操', exercises: ['ex_energy_01', 'ex_posture_01'], meditation: null, duration_text: '8min' },
          { day: 16, title: '办公体态维护', exercises: ['ex_posture_03', 'ex_micro_02'], meditation: 'med_006', duration_text: '7min' },
          { day: 17, title: '力量巩固', exercises: ['ex_core_01', 'ex_posture_02'], meditation: null, duration_text: '10min' },
          { day: 18, title: '柔韧巩固', exercises: ['ex_flex_01', 'ex_flex_02'], meditation: null, duration_text: '12min' },
          { day: 19, title: '休息日', exercises: ['ex_micro_01'], meditation: 'med_001', duration_text: '2min' },
          { day: 20, title: '全面检验', exercises: ['ex_posture_01', 'ex_posture_02', 'ex_posture_03'], meditation: null, duration_text: '15min' },
          { day: 21, title: '毕业日', exercises: ['ex_energy_01', 'ex_posture_01'], meditation: 'med_004', duration_text: '10min' },
        ]
      }
    ]
  },

  // ═══════════════════════════════════════
  // 计划3：压力管理
  // ═══════════════════════════════════════
  {
    id: 'plan_stress',
    title: '压力释放计划',
    subtitle: '7天学会身体减压法',
    description: '工作压力大、焦虑紧张、睡不好——用运动+呼吸+冥想的组合，7天掌握3种身体减压技术，随时自我调节。',
    cover_gradient: 'linear-gradient(135deg, #a29bfe, #fd79a8)',
    problem_tags: ['压力', '脑雾', '睡眠差'],
    duration_days: 7,
    difficulty: '入门',
    target_body: ['全身'],
    abilities_gain: { mind_body: 15, vitality: 6 },
    phases: [
      {
        title: '觉察与释放',
        subtitle: '前3天，学会觉察压力并释放',
        days: 3,
        daily: [
          { day: 1, title: '压力觉察', exercises: ['ex_stress_01'], meditation: 'med_001', duration_text: '6min' },
          { day: 2, title: '抖动释放', exercises: ['ex_stress_02', 'ex_micro_03'], meditation: null, duration_text: '4min' },
          { day: 3, title: '呼吸调节', exercises: ['ex_micro_05'], meditation: 'med_002', duration_text: '6min' },
        ]
      },
      {
        title: '系统减压',
        subtitle: '4-7天，建立日常减压习惯',
        days: 4,
        daily: [
          { day: 4, title: '运动减压', exercises: ['ex_energy_02', 'ex_stress_01'], meditation: null, duration_text: '8min' },
          { day: 5, title: '正念减压', exercises: ['ex_micro_05'], meditation: 'med_006', duration_text: '4min' },
          { day: 6, title: '动态冥想', exercises: ['ex_stress_02'], meditation: 'med_007', duration_text: '8min' },
          { day: 7, title: '睡前减压', exercises: ['ex_sleep_01'], meditation: 'med_001', duration_text: '8min' },
        ]
      }
    ]
  },

  // ═══════════════════════════════════════
  // 计划4：活力恢复
  // ═══════════════════════════════════════
  {
    id: 'plan_energy',
    title: '活力恢复计划',
    subtitle: '7天告别脑雾和疲惫',
    description: '总是昏昏沉沉、注意力不集中？用科学的运动节奏唤醒身体能量系统，7天恢复清醒和活力。',
    cover_gradient: 'linear-gradient(135deg, #ffeaa7, #f39c12)',
    problem_tags: ['脑雾', '久坐'],
    duration_days: 7,
    difficulty: '入门',
    target_body: ['全身'],
    abilities_gain: { vitality: 15, mind_body: 5 },
    phases: [
      {
        title: '能量唤醒',
        subtitle: '前3天，重新激活身体',
        days: 3,
        daily: [
          { day: 1, title: '晨间唤醒', exercises: ['ex_energy_01', 'ex_micro_03'], meditation: null, duration_text: '4min' },
          { day: 2, title: '午后回血', exercises: ['ex_energy_02'], meditation: 'med_002', duration_text: '8min' },
          { day: 3, title: '全身激活', exercises: ['ex_aid_05', 'ex_micro_01'], meditation: null, duration_text: '6min' },
        ]
      },
      {
        title: '节奏建立',
        subtitle: '4-7天，建立能量节奏',
        days: 4,
        daily: [
          { day: 4, title: '晨间仪式', exercises: ['ex_energy_01'], meditation: 'med_006', duration_text: '6min' },
          { day: 5, title: '间歇激活', exercises: ['ex_micro_01', 'ex_micro_05', 'ex_energy_02'], meditation: null, duration_text: '9min' },
          { day: 6, title: '压力清理', exercises: ['ex_stress_02', 'ex_aid_05'], meditation: null, duration_text: '8min' },
          { day: 7, title: '能量巩固', exercises: ['ex_energy_01', 'ex_flex_01'], meditation: 'med_007', duration_text: '12min' },
        ]
      }
    ]
  },

  // ═══════════════════════════════════════
  // 计划5：睡眠改善
  // ═══════════════════════════════════════
  {
    id: 'plan_sleep',
    title: '睡眠改善计划',
    subtitle: '14天重建入睡仪式',
    description: '入睡困难、睡眠浅、醒来累——通过睡前拉伸+呼吸冥想的组合，重建你的入睡仪式，14天找回好睡眠。',
    cover_gradient: 'linear-gradient(135deg, #2d2d52, #4a4a8a)',
    problem_tags: ['睡眠差', '压力'],
    duration_days: 14,
    difficulty: '入门',
    target_body: ['全身'],
    abilities_gain: { mind_body: 12, flexibility: 6 },
    phases: [
      {
        title: '入睡准备',
        subtitle: '1-5天，学会放松身体',
        days: 5,
        daily: [
          { day: 1, title: '睡前拉伸', exercises: ['ex_sleep_01'], meditation: 'med_001', duration_text: '8min' },
          { day: 2, title: '呼吸放松', exercises: ['ex_sleep_03'], meditation: null, duration_text: '5min' },
          { day: 3, title: '全身释放', exercises: ['ex_flex_01', 'ex_sleep_01'], meditation: null, duration_text: '12min' },
          { day: 4, title: '压力清空', exercises: ['ex_stress_01'], meditation: 'med_001', duration_text: '6min' },
          { day: 5, title: '身心放松', exercises: ['ex_sleep_01'], meditation: 'med_004', duration_text: '10min' },
        ]
      },
      {
        title: '仪式建立',
        subtitle: '6-10天，固定入睡流程',
        days: 5,
        daily: [
          { day: 6, title: '完整仪式', exercises: ['ex_sleep_01', 'ex_sleep_03'], meditation: 'med_001', duration_text: '11min' },
          { day: 7, title: '身体扫描', exercises: ['ex_flex_01'], meditation: 'med_004', duration_text: '12min' },
          { day: 8, title: '温和版', exercises: ['ex_sleep_03'], meditation: 'med_002', duration_text: '8min' },
          { day: 9, title: '深度放松', exercises: ['ex_sleep_01'], meditation: 'med_004', duration_text: '10min' },
          { day: 10, title: '节奏固定', exercises: ['ex_sleep_01', 'ex_sleep_03'], meditation: null, duration_text: '10min' },
        ]
      },
      {
        title: '质量提升',
        subtitle: '11-14天，深化睡眠质量',
        days: 4,
        daily: [
          { day: 11, title: '延长仪式', exercises: ['ex_flex_01', 'ex_sleep_01'], meditation: 'med_001', duration_text: '15min' },
          { day: 12, title: '精简版', exercises: ['ex_sleep_03'], meditation: 'med_001', duration_text: '8min' },
          { day: 13, title: '深度入睡', exercises: ['ex_sleep_01'], meditation: 'med_004', duration_text: '10min' },
          { day: 14, title: '毕业夜', exercises: ['ex_sleep_01', 'ex_sleep_03'], meditation: 'med_001', duration_text: '11min' },
        ]
      }
    ]
  },

  // ═══════════════════════════════════════
  // 计划6：腰背强化
  // ═══════════════════════════════════════
  {
    id: 'plan_back',
    title: '腰背强化计划',
    subtitle: '14天从腰痛到腰强',
    description: '腰痛的根源往往是核心弱+体态差。从安全的核心激活开始，逐步强化腰背支撑系统，14天让腰不再痛。',
    cover_gradient: 'linear-gradient(135deg, #00b894, #55efc4)',
    problem_tags: ['腰背不适', '体态差'],
    duration_days: 14,
    difficulty: '初级',
    target_body: ['核心', '腰背'],
    abilities_gain: { core: 16, posture: 8 },
    phases: [
      {
        title: '安全启动',
        subtitle: '1-5天，安全激活核心',
        days: 5,
        daily: [
          { day: 1, title: '核心感知', exercises: ['ex_core_01'], meditation: null, duration_text: '5min' },
          { day: 2, title: '温和稳定', exercises: ['ex_core_03', 'ex_aid_02'], meditation: null, duration_text: '8min' },
          { day: 3, title: '休息日', exercises: ['ex_micro_05'], meditation: 'med_001', duration_text: '2min' },
          { day: 4, title: '核心+拉伸', exercises: ['ex_core_01', 'ex_flex_01'], meditation: null, duration_text: '12min' },
          { day: 5, title: '腰背释放', exercises: ['ex_aid_02', 'ex_core_03'], meditation: null, duration_text: '8min' },
        ]
      },
      {
        title: '渐进强化',
        subtitle: '6-10天，逐步加强',
        days: 5,
        daily: [
          { day: 6, title: '核心强化', exercises: ['ex_core_01', 'ex_core_03'], meditation: null, duration_text: '10min' },
          { day: 7, title: '体态配合', exercises: ['ex_posture_02', 'ex_core_01'], meditation: null, duration_text: '10min' },
          { day: 8, title: '休息日', exercises: ['ex_flex_01'], meditation: 'med_004', duration_text: '7min' },
          { day: 9, title: '综合训练', exercises: ['ex_core_03', 'ex_posture_02', 'ex_aid_02'], meditation: null, duration_text: '13min' },
          { day: 10, title: '功能训练', exercises: ['ex_core_01', 'ex_flex_02'], meditation: null, duration_text: '10min' },
        ]
      },
      {
        title: '稳定巩固',
        subtitle: '11-14天，巩固成果',
        days: 4,
        daily: [
          { day: 11, title: '力量巩固', exercises: ['ex_core_01', 'ex_core_03'], meditation: null, duration_text: '10min' },
          { day: 12, title: '柔韧巩固', exercises: ['ex_flex_01', 'ex_aid_02'], meditation: null, duration_text: '12min' },
          { day: 13, title: '全面检验', exercises: ['ex_core_01', 'ex_posture_02'], meditation: null, duration_text: '10min' },
          { day: 14, title: '毕业日', exercises: ['ex_core_03', 'ex_flex_01'], meditation: 'med_004', duration_text: '12min' },
        ]
      }
    ]
  },
]

/**
 * 获取所有训练计划
 */
function getPlans(problemTag) {
  if (problemTag) {
    return plans.filter(p => p.problem_tags.includes(problemTag))
  }
  return plans
}

/**
 * 获取单个计划详情
 */
function getPlanDetail(planId) {
  return plans.find(p => p.id === planId) || null
}

/**
 * 根据用户问题标签推荐计划
 */
function getRecommendedPlans(userProblemTags) {
  if (!userProblemTags || userProblemTags.length === 0) return plans.slice(0, 3)

  const scored = plans.map(plan => {
    const overlap = plan.problem_tags.filter(t => userProblemTags.includes(t)).length
    return { plan, score: overlap }
  })
  scored.sort((a, b) => b.score - a.score)
  return scored.map(s => s.plan)
}

module.exports = {
  plans,
  getPlans,
  getPlanDetail,
  getRecommendedPlans,
}
