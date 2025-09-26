<template>
  <div class="company-list-view">
    <div class="list-header">
      <h1>公司库</h1>
      <button class="add-new-btn" @click="$emit('add-new')">
        <i class="fas fa-plus"></i> 添加新公司
      </button>
    </div>

    <div class="company-grid">
      <div 
        v-for="company in companies" 
        :key="company.id" 
        class="company-card"
        @click="$emit('view-detail', company)"
      >
        <div class="card-header">
          <img :src="company.logo || placeholderLogo" alt="logo" class="card-logo">
          <h2 class="card-title">{{ company.name || '[公司名称]' }}</h2>
        </div>
        <p class="card-description">{{ company.description || '[暂无简介]' }}</p>
        <div class="card-tags">
          <span v-if="company.tags.length === 0" class="no-tags">[暂无标签]</span>
          <span v-for="tag in company.tags.slice(0, 3)" :key="tag" class="card-tag">{{ tag }}</span>
          <span v-if="company.tags.length > 3" class="card-tag-more">...</span>
        </div>
      </div>
    </div>

    <!-- 简单分页 -->
    <div class="pagination">
      <button class="page-btn" disabled>&laquo;</button>
      <button class="page-btn active">1</button>
      <button class="page-btn">2</button>
      <button class="page-btn">3</button>
      <button class="page-btn">&raquo;</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineEmits(['view-detail', 'add-new']);

// 从父组件接收公司列表
const props = defineProps({
  companies: {
    type: Array,
    default: () => []
  }
});

// 在实际应用中，这个列表会通过 prop 或从 store 中获取
// 这里我们暂时使用父组件的模拟数据，但假装它是通过 prop 传进来的
const placeholderLogo = 'https://picsum.photos/80/80?grayscale&blur=2';

</script>

<style scoped>
.company-list-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.list-header h1 {
  font-size: 28px;
  font-weight: 600;
  color: var(--secondary-color);
}

.add-new-btn {
  @apply warm-btn;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s;
}

.company-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.company-card {
  @apply warm-card;
  padding: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.company-card:hover {
  transform: translateY(-4px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.card-logo {
  width: 48px;
  height: 48px;
  border-radius: 6px;
  object-fit: contain;
  background-color: #f5f5f5;
  border: 1px solid #eee;
  flex-shrink: 0;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: var(--secondary-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-description {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0 0 16px 0;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 44px; /* 2 lines height */
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding-top: 12px;
  border-top: 1px solid var(--neutral-color);
}

.card-tag {
  @apply badge badge-primary;
}

.no-tags, .card-tag-more {
  font-size: 12px;
  color: #9ca3af;
  padding: 2px 8px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 32px;
  gap: 8px;
}

.page-btn {
  @apply btn-secondary;
  width: 32px;
  height: 32px;
  padding: 0;
}

.page-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.page-btn.active {
  @apply btn-primary;
}

.page-btn:disabled {
  color: #ccc;
  cursor: not-allowed;
  background-color: #f5f5f5;
  border-color: #d9d9d9;
}
.page-btn:disabled:hover {
  border-color: #d9d9d9;
  color: #ccc;
}
</style>
