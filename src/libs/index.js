import SvgIcon from './svg-icon/index.vue'
import Popup from './popup/index.vue'

export default {
  install(app) {
    app.component('m-svg-icon', SvgIcon)
    app.component('m-popup', Popup)
  }
}