<template>
    <div class="company-summary warm-section">
      <!-- 页面标题 -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-text-primary">公司汇总</h1>
        <button 
          class="warm-btn"
          @click="handleAddNew"
        >
          <i class="fa fa-plus mr-2"></i>添加新公司
        </button>
      </div>
  
      <!-- 公司卡片网格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="company in currentPageCompanies" 
          :key="company.id"
          class="warm-card cursor-pointer hover:shadow-lg transition-all"
          @click="handleViewDetail(company.id)"
        >
          <div class="p-6">
            <!-- 公司名称和基本信息 -->
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-xl font-semibold text-primary-color">{{ company.name }}</h3>
              <span class="tag" v-if="company.industry">{{ company.industry }}</span>
            </div>
            
            <!-- 公司简介 -->
            <p class="text-gray-600 text-sm mb-4 line-clamp-3">
              {{ company.description || '暂无公司简介' }}
            </p>
            
            <!-- 关键信息 -->
            <div class="grid grid-cols-2 gap-2 text-sm">
              <div class="flex items-center text-text-secondary">
                <i class="fa fa-map-marker mr-2 text-primary-color"></i>
                <span>{{ company.location || '未知地点' }}</span>
              </div>
              <div class="flex items-center text-text-secondary">
                <i class="fa fa-users mr-2 text-primary-color"></i>
                <span>{{ company.employees || '未知规模' }}</span>
              </div>
            </div>
          </div>
          
          <!-- 底部操作区 -->
          <div class="px-6 py-3 bg-primary-light/30 flex justify-between items-center">
            <span class="text-xs text-text-secondary">
              最后更新: {{ formatDate(company.updatedAt) }}
            </span>
            <button 
              class="text-primary-color hover:text-accent-color text-sm"
              @click.stop="handleEdit(company.id)"
            >
              编辑
            </button>
          </div>
        </div>
      </div>
  
      <!-- 空状态 -->
      <div v-if="currentPageCompanies.length === 0" class="empty-placeholder p-8 text-center">
        <i class="fa fa-building-o text-4xl mb-4 text-primary-color/50"></i>
        <p class="text-lg">暂无公司数据</p>
        <button 
          class="mt-4 warm-btn"
          @click="handleAddNew"
        >
          <i class="fa fa-plus mr-2"></i>添加第一个公司
        </button>
      </div>
  
      <!-- 分页控件 -->
      <div v-if="totalPages > 1" class="mt-8 flex justify-center items-center gap-2">
        <button 
          class="px-3 py-1 rounded border"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          <i class="fa fa-chevron-left"></i>
        </button>
        
        <span class="text-sm">
          第 {{ currentPage }} 页 / 共 {{ totalPages }} 页
        </span>
        
        <button 
          class="px-3 py-1 rounded border"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          <i class="fa fa-chevron-right"></i>
        </button>
      </div>
  
      <!-- 公司详情/编辑模态框 -->
      <CompanyDetailModal 
        :is-open="isDetailModalOpen"
        :company-id="selectedCompanyId"
        @close="isDetailModalOpen = false"
        @save="handleCompanySaved"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { useCompanyStore } from '../../store/companyStore';
  import CompanyDetailModal from '../modals/CompanyDetailModal.vue';
  
  // 状态管理
  const companyStore = useCompanyStore();
  const router = useRouter();
  
  // 分页控制
  const currentPage = ref(1);
  const itemsPerPage = 6; // 每页显示6个公司
  
  // 模态框控制
  const isDetailModalOpen = ref(false);
  const selectedCompanyId = ref(null);
  
  // 初始化数据
  companyStore.initialize();
  
  // 计算当前页的公司
  const currentPageCompanies = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    return companyStore.items.slice(startIndex, startIndex + itemsPerPage);
  });
  
  // 计算总页数
  const totalPages = computed(() => {
    return Math.ceil(companyStore.items.length / itemsPerPage);
  });
  
  // 监听数据变化，重置到第一页
  watch(
    () => companyStore.items.length,
    () => {
      currentPage.value = 1;
    }
  );
  
  // 格式化日期
  const formatDate = (timestamp) => {
    if (!timestamp) return '未知';
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };
  
  // 查看详情
  const handleViewDetail = (id) => {
    selectedCompanyId.value = id;
    isDetailModalOpen.value = true;
  };
  
  // 编辑公司
  const handleEdit = (id) => {
    selectedCompanyId.value = id;
    isDetailModalOpen.value = true;
  };
  
  // 添加新公司
  const handleAddNew = () => {
    selectedCompanyId.value = null; // 空ID表示新建
    isDetailModalOpen.value = true;
  };
  
  // 公司保存后刷新数据
  const handleCompanySaved = () => {
    companyStore.initialize(); // 重新加载数据
  };
  </script>
  
  <style scoped>
  .empty-placeholder {
    @apply bg-primary-light/30 border border-amber-200/50 text-text-secondary rounded-xl;
  }
  
  .tag {
    @apply bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-xs;
  }
  </style>
  