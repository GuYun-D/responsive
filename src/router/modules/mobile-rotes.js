export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/main/index.vue')
  },
  {
    path: '/pins/:id',
    name: 'pins',
    component: () => import('@/views//pins/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/login/index.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/profile/index.vue'),
    meta: {
      user: true
    }
  }
]