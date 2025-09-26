
// js/composables/useTabs.js
import { ref, computed } from 'vue';

export function useTabs(initialTab = 'industry') {
  const activeTab = ref(initialTab);
  
  // 引入新的公司列表组件
  const CompanyList = () => import('../components/views/CompanyList.vue');
  const CompanyView = () => import('../components/views/CompanyView.vue');
  const IndustryView = () => import('../components/views/IndustryView.vue');
  const SoftwareView = () => import('../components/views/SoftwareView.vue');
  const KnowledgeView = () => import('../components/views/KnowledgeView.vue');
  
  // 当前视图组件 - 公司模块先显示汇总列表
  const currentView = computed(() => {
    switch (activeTab.value) {
      case 'industry':
        return IndustryView;
      case 'company':
        return CompanyList; // 默认显示公司汇总列表
      case 'software':
        return SoftwareView;
      case 'knowledge':
        return KnowledgeView;
      default:
        return IndustryView;
    }
  });
  
  // 处理标签页切换
  const handleTabChange = (tab) => {
    activeTab.value = tab;
  };
  
  // 切换到公司详情视图
  const goToCompanyDetail = () => {
    // 这里可以保留状态，用于返回列表
    activeTab.value = 'company-detail';
  };
  
  // 返回公司列表
  const goToCompanyList = () => {
    activeTab.value = 'company';
  };
  
  return {
    activeTab,
    currentView,
    handleTabChange,
    goToCompanyDetail,
    goToCompanyList
  };
}