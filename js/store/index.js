// 新建 js/store/index.js
import { createPinia } from 'pinia'
import { useIndustryStore } from './industryStore'
import { useCompanyStore } from './companyStore'
import { useSoftwareStore } from './softwareStore'
import { useKnowledgeStore } from './knowledgeStore'

const pinia = createPinia()

export {
  pinia,
  useIndustryStore,
  useCompanyStore,
  useSoftwareStore,
  useKnowledgeStore
}

