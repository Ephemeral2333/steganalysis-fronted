import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Content',
    component: () => import('@/components/Content.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
