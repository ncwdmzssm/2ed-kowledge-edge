// 新建 js/composables/useSoftwareForm.js
import { ref, computed } from 'vue'

export function useSoftwareForm(initialData) {
  const formData = ref({ ...initialData })
  
  const isFormValid = computed(() => {
    return formData.value.name && formData.value.description
  })
  
  const resetForm = () => {
    formData.value = { ...initialData }
  }
  
  return {
    formData,
    isFormValid,
    resetForm
  }
}