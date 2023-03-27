import App from '@/App.vue'
import { createApp } from 'vue'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import { setupIpcListener } from '@/common'
import '@/styles/index.scss'

setupIpcListener()

const app = createApp(App)

setupRouter(app)
setupStore(app)
app.mount('#app')
