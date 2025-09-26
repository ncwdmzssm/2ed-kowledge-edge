import { ref, watch } from 'vue'
import { loadData, saveData } from '../store'

export function useAppCore() {
  const data = ref(loadData())
  const isDetailModalOpen = ref(false)
  const isAddModalOpen = ref(false)
  const currentItem = ref(null)
  const notification = ref({ show: false, message: '', type: 'success' })

  // 通知
  const showNotification = (message, type = 'success') => {
    notification.value = { show: true, message, type }
    setTimeout(() => {
      hideNotification()
    }, 3000)
  }
  const hideNotification = () => {
    notification.value.show = false
  }

  // 通用模态框
  const openDetailModal = (item) => {
    currentItem.value = JSON.parse(JSON.stringify(item))
    isDetailModalOpen.value = true
  }
  const closeDetailModal = () => {
    isDetailModalOpen.value = false
    currentItem.value = null
  }
  const openAddModal = () => { isAddModalOpen.value = true }
  const closeAddModal = () => { isAddModalOpen.value = false }

  // 数据持久化
  watch(data, (newValue) => {
    saveData(newValue)
  }, { deep: true })

  return {
    data,
    notification,
    showNotification,
    hideNotification,
    isDetailModalOpen,
    isAddModalOpen,
    currentItem,
    openDetailModal,
    closeDetailModal,
    openAddModal,
    closeAddModal,
  }
}
