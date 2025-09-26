
// js/main.js
import { createApp } from 'vue'
import App from './components/App.vue'
import { initializeStorage } from './storage'  // 注意：旧的 initializeStore 已移到 storage/index.js
import { pinia } from './store'  // 导入 Pinia 实例

// 初始化本地存储（使用新的 storage 模块）
initializeStorage();

// 挂载 Pinia 到应用
createApp(App)
  .use(pinia)  // 关键：注入 Pinia
  .mount('#app')