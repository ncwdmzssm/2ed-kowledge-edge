// 修改 js/store/softwareStore.js，补充删除功能
import { defineStore } from 'pinia'
import { loadData, saveData } from '../storage'

export const useSoftwareStore = defineStore('software', {
  state: () => ({
    items: [],
    currentItem: null // 当前正在编辑的项目
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
    deleteItem(id) {
      this.items = this.items.filter(item => item.id !== id)
      this.persist()
    },
    setCurrentItem(item) {
      this.currentItem = item ? JSON.parse(JSON.stringify(item)) : null
    },
    persist() {
      const data = loadData()
      saveData({ ...data, softwares: this.items })
    }
  }
})