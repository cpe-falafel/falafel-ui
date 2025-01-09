import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import vueFlowPlugin from './plugins/vueFlow'
import { createPinia } from 'pinia'
import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
import VueNumberInput from '@chenfengyuan/vue-number-input';

const app = createApp(App)
app.use(router)
app.use(vueFlowPlugin)
app.use(createPinia())
app.use(Vue3ColorPicker)
app.component(VueNumberInput.name, VueNumberInput);
app.mount('#app')
