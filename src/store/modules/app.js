import { ALL_CATEGORY_ITEM } from '@/constants'

/**
 * @description app 数据不会被缓存
 */
export default {
  namespaced: true,
  state: () => {
    return {
      currentCategory: ALL_CATEGORY_ITEM
    }
  },
  mutations: {
    changeCurrentCategory(state, currentCategory) {
      state.currentCategory = currentCategory
    }
  }
}