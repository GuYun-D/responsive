import { createRouter, createWebHistory } from 'vue-router'
import { isMobileTerminal } from '../utils/flexible'
import mobileRoutes from './modules/mobile-rotes.js'
import pcRoutes from './modules/pc-routes.js'


const router = createRouter({
  history: createWebHistory(),
  routes: isMobileTerminal.value ? mobileRoutes : pcRoutes
})

export default router 