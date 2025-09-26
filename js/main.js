import { createApp } from 'vue'
import App from './components/App.vue'
import { initializeStore } from './store'

// 初始化本地存储
initializeStore();

createApp(App).mount('#app')
