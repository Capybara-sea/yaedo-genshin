import App from '@/App.vue'
import { createApp } from 'vue'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import { setupAppUpdater } from '@/modules'
import '@/styles/index.scss'

const app = createApp(App)
setupStore(app)
setupRouter(app)
app.mount('#app')

setupAppUpdater()

// 告诉主进程初始化完成 给一点延迟给暗夜模式做反应
setTimeout(window.api.ready2show, 300)
