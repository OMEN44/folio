import { createApp } from 'vue'
import './reset.css'
import './assets/base.scss'
import App from './App.vue'
import router from './plugins/router.ts'

createApp(App).use(router).mount('#app')
