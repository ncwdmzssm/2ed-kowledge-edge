import { createApp } from 'vue'
import App from './components/App.vue'
import { initializeStore } from './store'
import { pinia } from './store'  

// 初始化本地存储
initializeStore();

createApp(App)
  .use(pinia)  // 关键：挂载 Pinia
  .mount('#app')