import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/Dashboard.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search.vue')
  },
  {
    path: '/help',
    name: 'help',
    component: () => import('@/views/Help.vue')
  },
  {
    path: '/result',
    name: 'result',
    component: () => import('@/views/Result.vue')
  },
  {
    path: '/info/histone/:id',
    name: 'histone',
    component: () => import('@/views/Histone.vue')
  },
  {
    path: '/info/lncrna/:id',
    name: 'lncrna',
    component: () => import('@/views/LncRNA.vue')
  },
  {
    path: '/info/gene/:id',
    name: 'gene',
    component: () => import('@/views/Gene.vue')
  },
  {
    path: '/info/corr',
    name: 'corr',
    component: () => import('@/views/Corr.vue')
  },
  { 
    path: '/404', 
    name: '404', 
    component: () => import('@/views/Wrong.vue')
  }, 
  { 
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})


export default router
