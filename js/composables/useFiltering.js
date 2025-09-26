import { ref, computed } from 'vue'

export function useFiltering(data, activeTab) {
  const searchTerm = ref('')
  const selectedTags = ref([])

  const currentModuleData = computed(() => {
    if (!data.value) return []
    switch (activeTab.value) {
      case 'industry': return data.value.industries
      case 'company': return data.value.companies
      case 'software': return data.value.softwares
      case 'knowledge': return data.value.knowledge
      default: return []
    }
  })

  const availableTags = computed(() => {
    const tags = new Set()
    if (currentModuleData.value && Array.isArray(currentModuleData.value)) {
      currentModuleData.value.forEach(item => {
        if (Array.isArray(item.tags)) {
          item.tags.forEach(tag => tags.add(tag))
        }
      })
    }
    return Array.from(tags)
  })

  const filteredItems = computed(() => {
    if (!currentModuleData.value || !Array.isArray(currentModuleData.value)) {
      return []
    }
    return currentModuleData.value.filter(item => {
      const nameOrTitle = item.name || item.title || ''
      const matchesSearch = searchTerm.value === '' ||
        nameOrTitle.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        (item.tags || []).some(tag => tag.toLowerCase().includes(searchTerm.value.toLowerCase()))

      const matchesTags = selectedTags.value.length === 0 ||
        selectedTags.value.every(tag => (item.tags || []).includes(tag))

      return matchesSearch && matchesTags
    })
  })

  const toggleTag = (tag) => {
    if (selectedTags.value.includes(tag)) {
      selectedTags.value = selectedTags.value.filter(t => t !== tag)
    } else {
      selectedTags.value.push(tag)
    }
  }
  
  const resetFilters = () => {
      searchTerm.value = ''
      selectedTags.value = []
  }

  return {
    searchTerm,
    selectedTags,
    availableTags,
    filteredItems,
    currentModuleData,
    toggleTag,
    resetFilters
  }
}
