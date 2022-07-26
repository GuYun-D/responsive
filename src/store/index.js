import { createStore } from 'vuex'
import getters from './getters'
import category from './modules/category'
import craetePersistedstate from 'vuex-persistedstate'

const store = createStore({
  getters,
  modules: {
    category
  },
  plugins: [craetePersistedstate({
    key: '', // 指定保存到 localstorage 中的 key
    paths: ['category'] // 需要保存的模块
  })]
})

export default store