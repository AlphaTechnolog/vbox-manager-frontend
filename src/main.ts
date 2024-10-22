import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import VueVNC from "vue-vnc"
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(VueVNC);
app.use(router)

app.mount('#app')
