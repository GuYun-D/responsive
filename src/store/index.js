import { createStore } from 'vuex'
import craetePersistedstate from 'vuex-persistedstate'
import getters from './getters'
import category from './modules/category'
import theme from './modules/theme'
import app from './modules/app'
import search from './modules/search'
import user from './modules/user'

const store = createStore({
  getters,
  modules: {
    category,
    theme,
    app,
    search,
    user
  },
  plugins: [craetePersistedstate({
    key: '', // 指定保存到 localstorage 中的 key
    paths: ['category', 'theme', 'search', 'user'] // 需要保存的模块
  })]
})

export default store