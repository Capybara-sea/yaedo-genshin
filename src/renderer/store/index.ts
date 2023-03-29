import type { App } from 'vue'
import { createPinia } from 'pinia'
import { useAppStore, useAppDataStore } from './modules'
export const store = createPinia()

export function setupStore(app: App) {
  app.use(store)

  useAppStore().init()
  useAppDataStore().init()
}

export * from './modules'
