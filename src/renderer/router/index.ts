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
    component: () => import('../views/Characters/Characters.vue'),
    children: [
      {
        path: '/:id',
        component: () => import('../views/Character/Character.vue'),
        name: 'Character',
      },
    ],
  },
  {
    path: '/Weapons',
    name: 'Weapons',
    component: () => import('../views/Weapons/Weapons.vue'),
  },
  {
    path: '/Settins',
    name: 'Settings',
    component: () => import('../views/Settings.vue'),
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
