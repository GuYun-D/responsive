import { watch } from 'vue'
import store from '../store'
import { THMEN_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants'

/**
 * @description 监听系统的主题变更
 */
let matchMedia
const watchSystemThemeChange = () => {
  if (matchMedia) return
  matchMedia = window.matchMedia('(prefers-color-scheme: dark)')
  // 监听主题变化
  matchMedia.onchange = () => {
    _changeTheme(THEME_SYSTEM)
  }
}

/**
 * @description 主题配置
 */
export default () => {
  watch(() => store.getters.theme, theme => {
    _changeTheme(theme)
  }, {
    immediate: true
  })
}

/**
 * 切换主题
 * @param {*} theme 
 */
function _changeTheme(theme) {
  let themeClassName = ''
  switch (theme) {
    case THMEN_LIGHT:
      themeClassName = 'light'
      break;
    case THEME_DARK:
      themeClassName = 'dark'
      break
    case THEME_SYSTEM:
      watchSystemThemeChange()
      themeClassName = matchMedia.matches ? 'dark' : 'light'
      break
  }
  document.querySelector('html').className = themeClassName
}