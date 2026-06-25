const { getPlans } = require('../../../utils/plans')

Page({
  data: {
    plans: [],
    filterTags: ['全部', '久坐', '体态差', '腰背不适', '压力', '睡眠差', '脑雾'],
    activeFilter: 0,
  },

  onLoad() {
    this.loadPlans()
  },

  loadPlans(tag) {
    const plans = getPlans(tag)
    this.setData({ plans })
  },

  onFilterTap(e) {
    const idx = e.currentTarget.dataset.index
    const tag = this.data.filterTags[idx]
    this.setData({ activeFilter: idx })
    this.loadPlans(idx === 0 ? null : tag)
  },

  onPlanTap(e) {
    const planId = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/plan/detail/detail?id=${planId}` })
  },
})
