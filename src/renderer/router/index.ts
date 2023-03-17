import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home/Home.vue'),
    meta: { label: 'Home' },
  },
  {
    path: '/Characters',
    name: 'Characters',
    component: () => import('../views/Characters/Characters.vue'),
    meta: { label: 'Characters' },
    children: [
      {
        path: '/:id',
        component: () => import('../views/Characters/Character.vue'),
        name: 'Character',
      },
    ],
  },
  {
    path: '/Setting',
    name: 'Setting',
    component: () => import('../views/Setting/Setting.vue'),
    meta: { label: 'Setting' },
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
