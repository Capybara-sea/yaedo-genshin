import App from './App.vue'
import { createApp } from 'vue'
import { setupRouter } from './router'
import { setupStore } from './store'
import './styles/index.scss'

const app = createApp(App)

setupRouter(app)
setupStore(app)
app.mount('#app')