import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.scss'
import store from './store'
import router from './router'
import { useREM } from './utils/flexible'
import MobileComponent from './libs'
import mDirectives from './directives'
// 注册 svg-icons
import 'virtual:svg-icons-register'
import useTheme from './utils/theme'

useTheme()
useREM()
createApp(App).use(store).use(router).use(MobileComponent).use(mDirectives).mount('#app')
