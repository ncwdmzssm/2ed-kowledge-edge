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

// 新建 js/store/softwareStore.js
import { defineStore } from 'pinia'
import { loadData, saveData } from '../storage'

export const useSoftwareStore = defineStore('software', {
  state: () => ({
    items: []
  }),
  actions: {
    initialize() {
      const data = loadData()
      this.items = data.softwares || []
    },
    addItem(item) {
      this.items.push({ ...item, id: Date.now().toString() })
      this.persist()
    },
    updateItem(updatedItem) {
      const index = this.items.findIndex(i => i.id === updatedItem.id)
      if (index !== -1) {
        this.items[index] = updatedItem
        this.persist()
      }
    },
    persist() {
      const data = loadData()
      saveData({ ...data, softwares: this.items })
    }
  }
})