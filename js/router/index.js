
import { createRouter, createWebHistory } from 'vue-router'
import CompanySummary from '../components/views/CompanySummary.vue'
import IndustryView from '../components/views/IndustryView.vue'
import SoftwareView from '../components/views/SoftwareView.vue'
import KnowledgeView from '../components/views/KnowledgeView.vue'

const routes = [
  {
    path: '/',
    name: 'CompanySummary',
    component: CompanySummary,
    meta: { title: '公司汇总' }
  },
  {
    path: '/industries',
    name: 'IndustryView',
    component: IndustryView,
    meta: { title: '行业信息' }
  },
  {
    path: '/softwares',
    name: 'SoftwareView',
    component: SoftwareView,
    meta: { title: '软件工具' }
  },
  {
    path: '/knowledge',
    name: 'KnowledgeView',
    component: KnowledgeView,
    meta: { title: '知识库' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 设置页面标题
router.beforeEach((to) => {
  document.title = to.meta.title || '商业分析知识库'
})

export default router
