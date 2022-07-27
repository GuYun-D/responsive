import { THMEN_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants'

export default {
  namespaced: true,
  state() {
    return {
      themeType: THMEN_LIGHT
    }
  },
  mutations: {
    changeThemeType(state, newTheme) {
      state.themeType = newTheme
    }
  }
}