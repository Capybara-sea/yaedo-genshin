import App from '@/App.vue'
import { createApp } from 'vue'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import { setupAppUpdater } from '@/common'
import '@/styles/index.scss'

const app = createApp(App)
setupStore(app)
setupRouter(app)
app.mount('#app')

setupAppUpdater()
