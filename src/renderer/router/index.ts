import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/Characters',
    name: 'Characters',
    component: () => import('../views/Characters.vue'),
  },
  {
    path: '/Setting',
    name: 'Setting',
    component: () => import('../views/Setting.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

export function setupRouter(app: App) {
  app.use(router)
}
