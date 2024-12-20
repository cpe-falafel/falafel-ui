import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import vueFlowPlugin from './plugins/vueFlow'

const app = createApp(App)
app.use(router)
app.use(vueFlowPlugin)
app.mount('#app')
