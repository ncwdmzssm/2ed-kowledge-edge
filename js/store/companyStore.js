import { defineStore } from 'pinia'
import { loadData, saveData } from '../storage'

export const useCompanyStore = defineStore('company', {
  state: () => ({
    items: [],       // 存储所有公司数据
    currentItem: null, // 当前正在编辑的公司
    totalPages: 1,   // 总页数
    currentPage: 1,  // 当前页码
    itemsPerPage: 6  // 每页显示数量
  }),
  
  getters: {
    // 获取当前页的公司数据
    currentPageItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      return this.items.slice(startIndex, startIndex + this.itemsPerPage)
    }
  },
  
  actions: {
    // 初始化数据
    initialize() {
      try {
        const data = loadData()
        this.items = data.companies || []
        this.calculateTotalPages()
      } catch (error) {
        console.error('Failed to initialize company data:', error)
        this.items = []
      }
    },
    
    // 计算总页数
    calculateTotalPages() {
      this.totalPages = Math.max(1, Math.ceil(this.items.length / this.itemsPerPage))
      // 确保当前页不超过总页数
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages
      }
    },
    
    // 切换页码
    setPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
      }
    },
    
    // 添加新公司
    addItem(item) {
      const newCompany = {
        id: Date.now().toString(), // 生成唯一ID
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...item
      }
      this.items.unshift(newCompany) // 添加到数组开头
      this.persist()
      this.calculateTotalPages()
    },
    
    // 更新公司信息
    updateItem(updatedItem) {
      const index = this.items.findIndex(item => item.id === updatedItem.id)
      if (index !== -1) {
        this.items[index] = {
          ...this.items[index],
          ...updatedItem,
          updatedAt: new Date().toISOString() // 更新时间戳
        }
        this.persist()
      }
    },
    
    // 删除公司
    deleteItem(id) {
      this.items = this.items.filter(item => item.id !== id)
      this.persist()
      this.calculateTotalPages()
    },
    
    // 设置当前编辑的公司
    setCurrentItem(item) {
      this.currentItem = item ? { ...item } : null
    },
    
    // 保存数据到本地存储
    persist() {
      try {
        const data = loadData()
        saveData({ ...data, companies: this.items })
      } catch (error) {
        console.error('Failed to save company data:', error)
      }
    }
  }
})
