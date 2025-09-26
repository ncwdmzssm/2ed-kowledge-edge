import { ref } from 'vue'

export function useIndustry(data, showNotification) {
  const showIndustryModal = ref(false)
  const currentIndustry = ref({})

  const handleIndustryEdit = (item) => {
    currentIndustry.value = JSON.parse(JSON.stringify(item))
    showIndustryModal.value = true
  }

  const handleIndustryAdd = () => {
    // 可以在这里打开一个专用的“添加行业”模态框
    // 为简化，我们暂时只记录一个log

    console.log('Add new industry clicked')
    showNotification('功能待开发: 添加新行业', 'info')
  }

  const handleIndustrySave = (updatedItem) => {
    const index = data.value.industries.findIndex(item => item.id === updatedItem.id)
    if (index !== -1) {
      data.value.industries[index] = updatedItem
      showNotification('行业分析已保存', 'success')
    }
    showIndustryModal.value = false
  }

  return {
    showIndustryModal,
    currentIndustry,
    handleIndustryEdit,
    handleIndustryAdd,
    handleIndustrySave,
  }
}
