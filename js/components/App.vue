<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <Header 
      :active-tab="activeTab"
      @change-tab="handleTabChange"
    />
  
    <!-- 修改 App.vue 中的 main 部分 -->
    <main class="flex-grow container mx-auto px-4 py-6">
      <PageTransition>
        <SearchBar 
          v-model:search="searchTerm"
          :tags="availableTags"
          :selected-tags="selectedTags"
          @toggle-tag="toggleTag"
        />
        
        <IndustryView 
          v-if="activeTab === 'industry'"
          :items="filteredItems"
          @edit="handleIndustryEdit"
          @add="handleIndustryAdd"
        />
        <!-- 在template中更新组件引用 -->
        <component 
          v-if="activeTab === 'company'"
          :is="currentView"
          :items="filteredItems"
          @view="handleCompanyView"
          @add="openAddModal"
        />

        <CompanyView 
          v-if="activeTab === 'company-detail'"
          :company="currentCompany"
          @back="goToCompanyList"
        />
          
        />
      </PageTransition>
    </main>
    <Footer />
    
    <!-- 模态框组件 -->
    <DetailModal 
      v-if="isDetailModalOpen" 
      :item="currentItem"
      :type="activeTab"
      @close="closeDetailModal"
      @save="saveItem"
    />
    
    <IndustryDetailModal
      v-if="showIndustryModal"
      :item="currentIndustry"
      @close="showIndustryModal = false"
      @save="handleIndustrySave"
    />

    <AddModal 
      v-if="isAddModalOpen" 
      :type="activeTab"
      @close="closeAddModal"
      @save="addNewItem"
    />
    
    <Notification 
      :message="notification.message"
      :type="notification.type"
      :show="notification.show"
      @close="hideNotification"
    />
  </div>
</template>


<script setup>
import { watch } from 'vue'
import { useAppCore } from '../composables/useAppCore'
import { useTabs } from '../composables/useTabs'
import { useFiltering } from '../composables/useFiltering'
import { useIndustry } from '../composables/useIndustry'
import { ref } from 'vue';
import Header from './Header.vue'
import Footer from './Footer.vue'
import SearchBar from './SearchBar.vue'
import DetailModal from './modals/DetailModal.vue'
import AddModal from './modals/AddModal.vue'
import IndustryDetailModal from './modals/IndustryDetailModal.vue'
import Notification from './Notification.vue'
import IndustryView from './views/IndustryView.vue'
import CompanyView from './views/CompanyView.vue'
import SoftwareView from './views/SoftwareView.vue'
import KnowledgeView from './views/KnowledgeView.vue'
import PageTransition from './PageTransition.vue'; 



// 核心状态管理
const {
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
} = useAppCore()

// 标签页和视图管理
const { 
  activeTab, 
  currentView, 
  handleTabChange: originalHandleTabChange ,
  goToCompanyDetail,
  goToCompanyList
} = useTabs('industry')

const currentCompany = ref(null)

const handleCompanyView = (company) => {
  currentCompany.value = company;
  goToCompanyDetail();
}


// 搜索和过滤
const {
  searchTerm,
  selectedTags,
  availableTags,
  filteredItems,
  currentModuleData,
  toggleTag,
  resetFilters
} = useFiltering(data, activeTab)

// 行业模块逻辑
const {
  showIndustryModal,
  currentIndustry,
  handleIndustryEdit,
  handleIndustryAdd,
  handleIndustrySave,
} = useIndustry(data, showNotification)


// 组合标签页切换逻辑
const handleTabChange = (tab) => {
  originalHandleTabChange(tab)
  resetFilters()
}


// 保存项目 (通用)
const saveItem = (updatedItem) => {
  const moduleData = currentModuleData.value
  const index = moduleData.findIndex(item => item.id === updatedItem.id)
  
  if (index !== -1) {
    moduleData[index] = updatedItem
    showNotification('保存成功', 'success')
  }
  
  closeDetailModal()
}

// 添加新项目 (通用)
const addNewItem = (newItem) => {
  const itemWithId = {
    ...newItem,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  }
  
  currentModuleData.value.push(itemWithId)
  showNotification('添加成功', 'success')
  closeAddModal()
}
</script>