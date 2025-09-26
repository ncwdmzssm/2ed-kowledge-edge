// 新建 js/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
import IndustryView from '../components/views/IndustryView.vue'
import CompanyIndex from "@/views/company/CompanyIndex.vue";
import SoftwareView from '../components/views/SoftwareView.vue'
import KnowledgeView from '../components/views/KnowledgeView.vue'

const routes = [
  { path: '/industry', component: IndustryView },
  { path: '/company', component: CompanyView },
  { path: '/software', component: SoftwareView },
  { path: '/knowledge', component: KnowledgeView },
  { path: '/', redirect: '/industry' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router