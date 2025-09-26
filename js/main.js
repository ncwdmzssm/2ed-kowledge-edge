// js/main.js
import { createApp } from 'vue'
import { pinia } from './store'
import { initializeStorage } from './storage'
import App from './components/App.vue'

initializeStorage()  // 初始化本地存储
createApp(App).use(pinia).mount('#app')