import './assets/base.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "@/store";

const app = createApp(App)

// Axios setup
import axiosInstance from './plugins/axios';
app.config.globalProperties.$axios = axiosInstance

app.use(router).use(store)
app.mount('#app')