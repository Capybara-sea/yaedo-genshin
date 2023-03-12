import type { App } from 'vue'
import { createPinia } from 'pinia'
import { useAppStore } from './modules/app'
export const store = createPinia()

export function setupStore(app: App) {
  app.use(store)

  useAppStore().init()
  // 告诉主进程初始化完成 给一点延迟给暗夜模式做反应
  setTimeout(window.api.ready2show, 300)
}

export * from './modules'
