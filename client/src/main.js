import './assets/base.css'
import './assets/styles/decorations.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "@/store";
import { globalCookiesConfig } from 'vue3-cookies'

const app = createApp(App)

app.use(router).use(store)
app.mount('#app')