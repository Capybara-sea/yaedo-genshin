import type { App } from 'vue'
import { createPinia } from 'pinia'
import { useAppStore } from './modules/app'
export const store = createPinia()

export function setupStore(app: App) {
  app.use(store)

  useAppStore().init()
}

export * from './modules'
