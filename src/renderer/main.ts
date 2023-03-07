import { createApp } from 'vue'
import './styles/index.scss'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router).mount('#app')
;(async () => {
  const a = await window.api.HelloApi.hello('App.vue')
  console.log('a:', a)
})()
