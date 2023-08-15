import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout'),
    children: [
      {
        path: '',
        name: 'takeaway',
        component: () => import('@/views/takeaway')
      },
      {
        path: '/search',
        name: 'search',
        component: () => import('@/views/search')
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('@/views/order')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/chooseCity',
    name: 'chooseCity',
    component: () => import('@/views/choose-city')
  },
  {
    path: '/city/:id',
    name: 'city',
    component: () => import('@/views/city'),
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
