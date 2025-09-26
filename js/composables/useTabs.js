import { ref, computed } from 'vue'
import IndustryView from '../components/views/IndustryView.vue'
import CompanyIndex from "@/views/company/CompanyIndex.vue";
import SoftwareView from '../components/views/SoftwareView.vue'
import KnowledgeView from '../components/views/KnowledgeView.vue'

const viewMap = {
  industry: IndustryView,
  company: CompanyView,
  software: SoftwareView,
  knowledge: KnowledgeView
}

export function useTabs(initialTab = 'industry') {
  const activeTab = ref(initialTab)

  const currentView = computed(() => viewMap[activeTab.value])

  const handleTabChange = (tab) => {
    activeTab.value = tab
  }

  return {
    activeTab,
    currentView,
    handleTabChange
  }
}
