<template>
  <div class="company-index">
    <transition name="fade" mode="out-in">
      <component 
        :is="activeView" 
        :company="selectedCompany"
        :companies="companies"
        @view-detail="handleViewDetail"
        @add-new="handleAddNew"
        @back-to-list="resetView"
      />
    </transition>
  </div>
</template>

<script setup>
import { ref, shallowRef, computed } from 'vue';
import CompanyList from './CompanyList.vue';
import CompanyDetail from './CompanyDetail.vue';

// 模拟的公司数据
const mockCompanies = [
  {
    id: 1,
    name: '先进技术公司',
    englishName: 'Advanced Tech Inc.',
    logo: 'https://picsum.photos/id/101/80/80',
    tags: ['人工智能', '云计算', '大数据'],
    description: '一家致力于前沿科技研发与应用的高科技企业，提供领先的AI解决方案。',
    headquarters: '中国，北京',
    foundedTime: '2015年06月',
    founders: '李明',
    marketValue: '500亿美元',
    employeeCount: '5000+',
    mainProducts: 'AI平台、云存储',
    industries: [{ name: '人工智能', desc: '在计算机视觉领域处于行业领先地位。' }],
    products: [{ name: 'VisionAI', desc: '一款强大的图像识别与分析平台。' }],
    historyEvents: [{ year: '2020', title: '发布VisionAI 2.0', desc: '引入了革命性的深度学习算法。' }]
  },
  {
    id: 2,
    name: '绿色能源集团',
    englishName: 'Green Energy Group',
    logo: 'https://picsum.photos/id/102/80/80',
    tags: ['新能源', '可持续发展'],
    description: '全球领先的可再生能源解决方案提供商，专注于太阳能和风能技术的创新。',
    headquarters: '德国，柏林',
    foundedTime: '2010年03月',
    founders: 'Hans Schmidt',
    marketValue: '800亿欧元',
    employeeCount: '12000+',
    mainProducts: '太阳能电池板, 风力涡轮机',
    industries: [],
    products: [],
    historyEvents: []
  },
  {
    id: 3,
    name: '创意设计坊',
    englishName: 'Creative Design Studio',
    logo: '',
    tags: ['设计', 'UI/UX', '初创公司'],
    description: '一个充满活力的设计团队，为全球客户提供顶级的用户体验和品牌设计服务。',
    headquarters: '美国，旧金山',
    foundedTime: '2018年11月',
    founders: 'Emily White, John Black',
    marketValue: '',
    employeeCount: '50人',
    mainProducts: 'UI/UX设计, 品牌咨询',
    industries: [],
    products: [],
    historyEvents: []
  }
];

const companies = ref(mockCompanies);
const selectedCompany = ref(null);
const currentView = ref('list'); // 'list' or 'detail'

const activeView = shallowRef(CompanyList);

const handleViewDetail = (company) => {
  selectedCompany.value = company;
  activeView.value = CompanyDetail;
};

const handleAddNew = () => {
  selectedCompany.value = {}; // 传递一个空对象用于创建新公司
  activeView.value = CompanyDetail;
};

const resetView = () => {
  selectedCompany.value = null;
  activeView.value = CompanyList;
};

</script>

<style scoped>
.company-index {
  background-color: #f0f2f5;
  min-height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
