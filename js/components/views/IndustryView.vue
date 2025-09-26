
<template>
  <div class="industry-view">
    <!-- 头部区域 -->
    <div class="header-container">
      <div class="header-content">
        <h2 class="section-title">行业分析</h2>
        <p class="section-desc">探索各行业发展趋势、市场规模及竞争格局</p>
      </div>
      <button 
        class="add-button"
        @click="$emit('add')"
      >
        <i class="fa fa-plus mr-2"></i>添加行业
      </button>
    </div>

    <!-- 行业卡片网格 -->
    <div class="industry-grid">
      <div
        v-for="item in items"
        :key="item.id"
        class="industry-card"
        @click="$emit('edit', item)"
      >
        <!-- 卡片头部 -->
        <div class="card-header">
          <div class="card-badge" :style="{ backgroundColor: item.color || '#1890ff' }">
            {{ item.category || '行业' }}
          </div>
          <div class="card-stats">
            <span class="stat-item">{{ item.companiesCount || 0 }} 家企业</span>
            <span class="stat-item">{{ item.growthRate || 0 }}% 增长率</span>
          </div>
        </div>
        
        <!-- 卡片内容 -->
        <div class="card-body">
          <h3 class="card-title">{{ item.title }}</h3>
          <p class="card-desc line-clamp-3">{{ item.summary }}</p>
          
          <!-- 标签区域 -->
          <div class="card-tags">
            <span
              v-for="tag in item.tags"
              :key="tag"
              class="tag-item"
            >
              {{ tag }}
            </span>
          </div>
        </div>
        
        <!-- 卡片底部 -->
        <div class="card-footer">
          <span class="update-time">{{ formatDate(item.updatedAt) }}</span>
          <i class="fa fa-arrow-right arrow-icon"></i>
        </div>
      </div>
      
      <!-- 空状态 -->
      <div v-if="items.length === 0" class="empty-state">
        <div class="empty-icon">
          <i class="fa fa-industry"></i>
        </div>
        <h3>暂无行业数据</h3>
        <p>点击添加按钮开始创建第一个行业分析</p>
        <button 
          class="primary-button"
          @click="$emit('add')"
        >
          <i class="fa fa-plus mr-2"></i>添加行业
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { format } from 'date-fns' // 需要安装date-fns: npm install date-fns

defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

defineEmits(['edit', 'add'])

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return '未更新'
  return format(new Date(dateString), 'yyyy-MM-dd')
}
</script>

<style scoped>
.industry-view {
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
  color: #1f2937;
  margin: 0 0 8px 0;
}

.header-content .section-desc {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
}

.add-button {
  padding: 10px 18px;
  background-color: #1890ff;
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
  background-color: #096dd9;
  transform: translateY(-2px);
}

/* 卡片网格 */
.industry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

/* 卡片样式 */
.industry-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  padding: 20px;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.industry-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* 卡片头部 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.card-badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  color: white;
}

.card-stats {
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: #6b7280;
}

/* 卡片内容 */
.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 12px 0;
}

.card-desc {
  font-size: 14px;
  color: #4b5563;
  line-height: 1.6;
  margin: 0 0 16px 0;
}

/* 标签样式 */
.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.tag-item {
  padding: 3px 10px;
  background-color: #f3f4f6;
  border-radius: 12px;
  font-size: 12px;
  color: #6b7280;
}

/* 卡片底部 */
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #f3f4f6;
}

.update-time {
  font-size: 12px;
  color: #9ca3af;
}

.arrow-icon {
  color: #1890ff;
  transition: transform 0.2s ease;
}

.industry-card:hover .arrow-icon {
  transform: translateX(3px);
}

/* 空状态 */
.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 20px;
  background-color: #f9fafb;
  border-radius: 12px;
  border: 1px dashed #e5e7eb;
}

.empty-icon {
  font-size: 48px;
  color: #d1d5db;
  margin-bottom: 16px;
}

.empty-state h3 {
  font-size: 18px;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.empty-state p {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 24px 0;
}

.primary-button {
  padding: 10px 20px;
  background-color: #1890ff;
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
  background-color: #096dd9;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .industry-grid {
    grid-template-columns: 1fr;
  }
  
  .header-container {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>