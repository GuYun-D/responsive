// 处理navgationbar的数据
import { ALL_CATEGORY_ITEM } from '@/constants'
import { getCategory } from '@/api/category'

export default {
  namespaced: true,
  state() {
    return {
      categorys: [ALL_CATEGORY_ITEM]
    }
  },

  mutations: {
    setCategory(state, categorys) {
      state.categorys = [ALL_CATEGORY_ITEM, ...categorys]
    }
  },

  actions: {
    async useCategoryData({ commit }) {
      const {category} = await getCategory()
      commit('setCategory', category)
    }
  }
}