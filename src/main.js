import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import vueFlowPlugin from './plugins/vueFlow'
import { createPinia } from 'pinia'
import '@cyhnkckali/vue3-color-picker/dist/style.css'
import VueNumberInput from '@chenfengyuan/vue-number-input';

const app = createApp(App)
app.use(router)
app.use(vueFlowPlugin)
app.use(createPinia())
app.component(VueNumberInput.name, VueNumberInput);
app.mount('#app')
