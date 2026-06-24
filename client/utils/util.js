// utils/util.js - 工具函数

/**
 * 格式化时长（秒 → 可读文本）
 */
function formatDuration(seconds) {
  if (seconds < 60) return `${seconds}秒`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}分钟`
  const hours = Math.floor(minutes / 60)
  const remainMinutes = minutes % 60
  return remainMinutes > 0 ? `${hours}小时${remainMinutes}分` : `${hours}小时`
}

/**
 * 获取当前时段
 */
function getTimeOfDay() {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 9) return 'morning'
  if (hour >= 9 && hour < 12) return 'forenoon'
  if (hour >= 12 && hour < 14) return 'noon'
  if (hour >= 14 && hour < 18) return 'afternoon'
  if (hour >= 18 && hour < 22) return 'evening'
  return 'night'
}

/**
 * 时段中文名
 */
function getTimeOfDayLabel(tod) {
  const map = {
    morning: '早上',
    forenoon: '上午',
    noon: '中午',
    afternoon: '下午',
    evening: '晚上',
    night: '深夜'
  }
  return map[tod] || '今天'
}

/**
 * 获取问候语
 */
function getGreeting() {
  const tod = getTimeOfDay()
  const map = {
    morning: '早上好',
    forenoon: '上午好',
    noon: '中午好',
    afternoon: '下午好',
    evening: '晚上好',
    night: '夜深了'
  }
  return map[tod] || '你好'
}

/**
 * 生成推荐原因文案
 */
function getRecommendReason(reason, tags) {
  const templates = {
    tag_match: `基于你对${tags.join('、')}的兴趣`,
    time_match: `适合${getTimeOfDayLabel()}的${tags[0] || '练习'}`,
    hot: `${tags[0] || '大家'}都在听`,
    streak: '你上周最爱的',
    new_content: '为你推荐新内容',
    difficulty: '适合你当前水平'
  }
  return templates[reason] || '为你推荐'
}

/**
 * 格式化日期
 */
function formatDate(date, fmt = 'YYYY-MM-DD') {
  const d = new Date(date)
  const map = {
    'YYYY': d.getFullYear(),
    'MM': String(d.getMonth() + 1).padStart(2, '0'),
    'DD': String(d.getDate()).padStart(2, '0'),
    'HH': String(d.getHours()).padStart(2, '0'),
    'mm': String(d.getMinutes()).padStart(2, '0')
  }
  let result = fmt
  for (const [key, value] of Object.entries(map)) {
    result = result.replace(key, value)
  }
  return result
}

/**
 * 防抖
 */
function debounce(fn, delay = 300) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

module.exports = {
  formatDuration,
  getTimeOfDay,
  getTimeOfDayLabel,
  getGreeting,
  getRecommendReason,
  formatDate,
  debounce
}
