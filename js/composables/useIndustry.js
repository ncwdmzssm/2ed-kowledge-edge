// js/composables/useIndustry.js
import { ref } from 'vue'

// 确保使用正确的导出语法
export const useIndustry = (data, showNotification) => {
  const showIndustryModal = ref(false)
  const currentIndustry = ref({})
  const addIndustryModalRef = ref(null)

  const setAddIndustryModalRef = (el) => {
    addIndustryModalRef.value = el
  }

  const handleIndustryEdit = (item) => {
    currentIndustry.value = JSON.parse(JSON.stringify(item))
    showIndustryModal.value = true
  }

  const handleIndustryAdd = () => {
    // 打开添加卡片弹窗
    if (addIndustryModalRef.value) {
      addIndustryModalRef.value.showModal()
    }
  }

  const handleIndustrySave = (updatedItem) => {
    const index = data.value.industries.findIndex(item => item.id === updatedItem.id)
    if (index !== -1) {
      data.value.industries[index] = updatedItem
      showNotification('行业分析已保存', 'success')
    }
    showIndustryModal.value = false
  }

  const handleIndustryCreate = (newIndustry) => {
    // 添加新行业到数据列表
    data.value.industries.push(newIndustry)
    showNotification('新行业已添加', 'success')
  }

  return {
    showIndustryModal,
    currentIndustry,
    setAddIndustryModalRef,
    handleIndustryEdit,
    handleIndustryAdd,
    handleIndustrySave,
    handleIndustryCreate
  }
}