import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.scss'
import store from './store'
import router from './router'
import { useREM } from './utils/flexible'
import MobileComponent from './libs'
// 注册 svg-icons
import 'virtual:svg-icons-register'

useREM()
createApp(App).use(store).use(router).use(MobileComponent).mount('#app')
