import { watch } from 'vue'
import store from '../store'
import { THMEN_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants'

/**
 * @description 主题配置
 */
export default () => {
  watch(() => store.getters.theme, theme => {
    let themeClassName = ''
    switch (theme) {
      case THMEN_LIGHT:
        themeClassName = 'light'
        break;
      case THEME_DARK:
        themeClassName = 'dark'
    }
    document.querySelector('html').className = themeClassName
  }, {
    immediate: true
  })
}