import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.scss'
import router from './router'
import { useREM } from './utils/flexible'
import MobileComponent from './libs'

useREM()
createApp(App).use(router).use(MobileComponent).mount('#app')
