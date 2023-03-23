import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { label: 'Home' },
  },
  {
    path: '/Characters',
    name: 'Characters',
    component: () => import('../views/Characters.vue'),
    meta: { label: 'Characters' },
    children: [
      {
        path: '/:id',
        component: () => import('../views/Character/Character.vue'),
        name: 'Character',
      },
    ],
  },
  {
    path: '/Settins',
    name: 'Settings',
    component: () => import('../views/Settings.vue'),
    meta: { label: 'Settings' },
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
