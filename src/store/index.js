import { createStore } from 'vuex'
import craetePersistedstate from 'vuex-persistedstate'
import getters from './getters'
import category from './modules/category'
import theme from './modules/theme'

const store = createStore({
  getters,
  modules: {
    category,
    theme
  },
  plugins: [craetePersistedstate({
    key: '', // 指定保存到 localstorage 中的 key
    paths: ['category', 'theme'] // 需要保存的模块
  })]
})

export default store