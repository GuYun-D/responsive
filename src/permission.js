/**
 * 处理需要登录的访问权限啊
 */

import router from '@/router'
import store from '@/store'
import { message } from '@/libs'

router.beforeEach((to, from) => {
  // 不需要登陆的页面
  if (!to.meta.user) {
    return
  }

  // 已登录
  if (store.getters.token) {
    return true
  }

  // 没登陆
  message('warn', '登陆失效, 请重新登录')
  return '/'
})