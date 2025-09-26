<template>
    <div class="company-list">
      <!-- 头部区域 -->
      <div class="header-container">
        <div class="header-content">
          <h2 class="section-title">公司汇总</h2>
          <p class="section-desc">浏览所有已添加的公司信息</p>
        </div>
        <button 
          class="add-button"
          @click="$emit('add')"
        >
          <i class="fa fa-plus mr-2"></i>添加公司
        </button>
      </div>
  
      <!-- 公司卡片网格 -->
      <div class="company-grid">
        <div
          v-for="company in paginatedCompanies"
          :key="company.id"
          class="company-card"
          @click="$emit('view', company)"
        >
          <!-- 卡片头部 -->
          <div class="card-header">
            <img :src="company.logo || placeholderLogo" alt="Company logo" class="company-logo" />
            <div class="card-tags">
              <span v-for="(tag, index) in company.tags.slice(0, 2)" :key="index" class="tag-item">
                {{ tag }}
              </span>
              <span v-if="company.tags.length > 2" class="tag-more">+{{ company.tags.length - 2 }}</span>
            </div>
          </div>
          
          <!-- 卡片内容 -->
          <div class="card-body">
            <h3 class="card-title">{{ company.name }}</h3>
            <p class="card-desc line-clamp-2">{{ company.description || '[暂无简介]' }}</p>
          </div>
          
          <!-- 卡片底部 -->
          <div class="card-footer">
            <div class="meta-info">
              <span class="meta-item">{{ company.headquarters || '未知地点' }}</span>
              <span class="meta-item">{{ company.foundedTime || '未知成立时间' }}</span>
            </div>
            <i class="fa fa-arrow-right arrow-icon"></i>
          </div>
        </div>
        
        <!-- 空状态 -->
        <div v-if="items.length === 0" class="empty-state">
          <div class="empty-icon">
            <i class="fa fa-building"></i>
          </div>
          <h3>暂无公司数据</h3>
          <p>点击添加按钮开始创建第一个公司信息</p>
          <button 
            class="primary-button"
            @click="$emit('add')"
          >
            <i class="fa fa-plus mr-2"></i>添加公司
          </button>
        </div>
      </div>
  
      <!-- 分页控件 -->
      <div v-if="totalPages > 1" class="pagination">
        <button 
          class="page-btn" 
          @click="currentPage = 1" 
          :disabled="currentPage === 1"
        >
          首页
        </button>
        <button 
          class="page-btn" 
          @click="currentPage--" 
          :disabled="currentPage === 1"
        >
          上一页
        </button>
        <span class="page-info">
          第 {{ currentPage }} / {{ totalPages }} 页
        </span>
        <button 
          class="page-btn" 
          @click="currentPage++" 
          :disabled="currentPage === totalPages"
        >
          下一页
        </button>
        <button 
          class="page-btn" 
          @click="currentPage = totalPages" 
          :disabled="currentPage === totalPages"
        >
          末页
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const props = defineProps({
    items: {
      type: Array,
      default: () => []
    }
  });
  
  const emit = defineEmits(['view', 'add']);
  
  // 分页配置
  const pageSize = 6; // 每页显示6个公司
  const currentPage = ref(1);
  const placeholderLogo = 'https://picsum.photos/60/60?grayscale&blur=2';
  
  // 计算分页后的数据
  const paginatedCompanies = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize;
    return props.items.slice(startIndex, startIndex + pageSize);
  });
  
  // 计算总页数
  const totalPages = computed(() => {
    return Math.ceil(props.items.length / pageSize);
  });
  </script>
  
  <style scoped>
  .company-list {
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
  }
  
  /* 头部样式 */
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    flex-wrap: wrap;
    gap: 16px;
  }
  
  .header-content .section-title {
    font-size: 28px;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 8px 0;
  }
  
  .header-content .section-desc {
    font-size: 16px;
    color: var(--text-secondary);
    margin: 0;
  }
  
  .add-button {
    padding: 10px 18px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: all 0.2s ease;
  }
  
  .add-button:hover {
    background-color: var(--accent-color);
    transform: translateY(-2px);
  }
  
  /* 卡片网格 */
  .company-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
    margin-bottom: 32px;
  }
  
  /* 卡片样式 */
  .company-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    padding: 20px;
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border-top: 4px solid var(--primary-color);
  }
  
  .company-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  
  /* 卡片头部 */
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
  }
  
  .company-logo {
    width: 60px;
    height: 60px;
    border-radius: 6px;
    object-fit: contain;
    background-color: var(--primary-light);
    border: 1px solid #f0f0f0;
  }
  
  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    max-width: 200px;
  }
  
  .tag-item {
    padding: 3px 8px;
    background-color: var(--primary-light);
    border-radius: 12px;
    font-size: 12px;
    color: var(--primary-color);
  }
  
  .tag-more {
    padding: 3px 8px;
    background-color: #f3f4f6;
    border-radius: 12px;
    font-size: 12px;
    color: #6b7280;
  }
  
  /* 卡片内容 */
  .card-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 12px 0;
  }
  
  .card-desc {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0 0 16px 0;
  }
  
  /* 卡片底部 */
  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 12px;
    border-top: 1px solid #f3f4f6;
  }
  
  .meta-info {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .meta-item {
    font-size: 12px;
    color: #9ca3af;
    display: flex;
    align-items: center;
  }
  
  .meta-item::before {
    content: "•";
    margin-right: 4px;
    font-size: 8px;
  }
  
  .arrow-icon {
    color: var(--primary-color);
    transition: transform 0.2s ease;
  }
  
  .company-card:hover .arrow-icon {
    transform: translateX(3px);
  }
  
  /* 空状态 */
  .empty-state {
    grid-column: 1 / -1;
    text-align: center;
    padding: 60px 20px;
    background-color: var(--bg-base);
    border-radius: 12px;
    border: 1px dashed #e5e7eb;
  }
  
  .empty-icon {
    font-size: 48px;
    color: var(--primary-color);
    opacity: 0.3;
    margin-bottom: 16px;
  }
  
  .empty-state h3 {
    font-size: 18px;
    color: var(--text-primary);
    margin: 0 0 8px 0;
  }
  
  .empty-state p {
    font-size: 14px;
    color: var(--text-secondary);
    margin: 0 0 24px 0;
  }
  
  .primary-button {
    padding: 10px 20px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    transition: background-color 0.2s ease;
  }
  
  .primary-button:hover {
    background-color: var(--accent-color);
  }
  
  /* 分页样式 */
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    padding: 16px;
  }
  
  .page-btn {
    padding: 6px 12px;
    background-color: white;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .page-btn:hover:not(:disabled) {
    background-color: var(--primary-light);
    border-color: var(--primary-color);
    color: var(--primary-color);
  }
  
  .page-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .page-info {
    color: var(--text-secondary);
    font-size: 14px;
  }
  
  /* 响应式调整 */
  @media (max-width: 768px) {
    .company-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>