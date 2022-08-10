export default [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/main/index.vue')
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
  }
]