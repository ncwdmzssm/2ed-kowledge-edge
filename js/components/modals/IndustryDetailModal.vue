<!-- 2ed-kowledge-edge/js/components/modals/IndustryDetailModal.vue -->
<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-container" @click.stop>
      <!-- 模态框头部 -->
      <div class="modal-header">
        <div class="header-left">
          <div class="industry-badge" :style="{ backgroundColor: item.color || '#1890ff' }">
            {{ item.category || '行业' }}
          </div>
          <h3 class="modal-title">{{ item.title }}</h3>
        </div>
        <div class="header-actions">
          <button class="edit-button" @click="toggleEditMode">
            <i class="fa fa-edit mr-1"></i>{{ isEditing ? '保存' : '编辑' }}
          </button>
          <button class="delete-button" @click="handleDelete">
            <i class="fa fa-trash mr-1"></i>删除
          </button>
          <button class="close-button" @click="$emit('close')">
            <i class="fa fa-times"></i>
          </button>
        </div>
      </div>
      
      <!-- 内容区域 -->
      <div class="modal-content">
        <div v-if="isEditing">
          <!-- 基本信息编辑 -->
          <div class="edit-section">
            <h4 class="edit-section-title">基本信息</h4>
            <input 
              v-model="editedItem.title" 
              class="title-input" 
              placeholder="行业名称"
            >
            <div class="edit-row">
              <input 
                v-model="editedItem.category" 
                class="category-input" 
                placeholder="行业类别"
              >
              <input 
                v-model="editedItem.growthRate" 
                class="growth-rate-input" 
                placeholder="增长率(%)"
                type="number"
              >
              <input 
                v-model="editedItem.companiesCount" 
                class="companies-count-input" 
                placeholder="企业数量"
                type="number"
              >
            </div>
          </div>
          
          <!-- Markdown编辑区域 - 分块 -->
          <div class="edit-section">
            <h4 class="edit-section-title">行业简介</h4>
            <textarea
              v-model="editedContent.overview"
              class="edit-input"
              placeholder="请输入行业简介，支持Markdown格式..."
            ></textarea>
          </div>
          
          <div class="edit-section">
            <h4 class="edit-section-title">发展现状</h4>
            <textarea
              v-model="editedContent.currentSituation"
              class="edit-input"
              placeholder="请输入行业发展现状，支持Markdown格式..."
            ></textarea>
          </div>
          
          <div class="edit-section">
            <h4 class="edit-section-title">龙头企业</h4>
            <textarea
              v-model="editedContent.leadingCompanies"
              class="edit-input"
              placeholder="请输入龙头企业信息，支持Markdown格式..."
            ></textarea>
          </div>
          
          <div class="edit-section">
            <h4 class="edit-section-title">技术发展历史</h4>
            <textarea
              v-model="editedContent.techHistory"
              class="edit-input"
              placeholder="请输入技术发展历史，支持Markdown格式..."
            ></textarea>
          </div>
          
          <div class="edit-section">
            <h4 class="edit-section-title">商业案例</h4>
            <textarea
              v-model="editedContent.businessCases"
              class="edit-input"
              placeholder="请输入商业案例，支持Markdown格式..."
            ></textarea>
          </div>
        </div>
        
        <div v-else class="industry-detail">
          <!-- 行业概览 -->
          <div class="overview-section">
            <h4 class="section-heading">行业概览</h4>
            <div class="overview-stats">
              <div class="stat-card">
                <p class="stat-label">市场规模</p>
                <p class="stat-value">{{ item.marketSize || '暂无数据' }}</p>
              </div>
              <div class="stat-card">
                <p class="stat-label">增长率</p>
                <p class="stat-value">{{ item.growthRate || '0' }}%</p>
              </div>
              <div class="stat-card">
                <p class="stat-label">企业数量</p>
                <p class="stat-value">{{ item.companiesCount || '0' }} 家</p>
              </div>
              <div class="stat-card">
                <p class="stat-label">产业链长度</p>
                <p class="stat-value">{{ item.chainLength || '未知' }}</p>
              </div>
            </div>
          </div>
          
          <!-- 详细内容 - 分块展示 -->
          <div class="content-section">
            <h4 class="section-heading">行业简介</h4>
            <div class="markdown-body" v-html="renderedContent.overview"></div>
          </div>
          
          <div class="content-section">
            <h4 class="section-heading">发展现状</h4>
            <div class="markdown-body" v-html="renderedContent.currentSituation"></div>
          </div>
          
          <div class="content-section">
            <h4 class="section-heading">龙头企业</h4>
            <div class="markdown-body" v-html="renderedContent.leadingCompanies"></div>
          </div>
          
          <div class="content-section">
            <h4 class="section-heading">技术发展历史</h4>
            <div class="markdown-body" v-html="renderedContent.techHistory"></div>
          </div>
          
          <div class="content-section">
            <h4 class="section-heading">商业案例</h4>
            <div class="markdown-body" v-html="renderedContent.businessCases"></div>
          </div>
          
          <!-- 相关企业 -->
          <div class="related-section" v-if="item.relatedCompanies && item.relatedCompanies.length">
            <h4 class="section-heading">相关企业</h4>
            <div class="related-companies">
              <div 
                v-for="company in item.relatedCompanies" 
                :key="company.id"
                class="company-item"
              >
                <img :src="company.logo" alt="Company logo" class="company-logo" />
                <div class="company-info">
                  <p class="company-name">{{ company.name }}</p>
                  <p class="company-role">{{ company.role }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 底部按钮 -->
      <div class="modal-footer" v-if="isEditing">
        <button class="btn-secondary" @click="cancelEdit">取消</button>
        <button class="btn-primary" @click="saveEdit">保存更改</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { marked } from 'marked'

const props = defineProps({
  item: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

const emit = defineEmits(['close', 'save', 'delete'])

// 编辑状态管理
const isEditing = ref(false)
const editedItem = ref({})
const editedContent = ref({
  overview: '',
  currentSituation: '',
  leadingCompanies: '',
  techHistory: '',
  businessCases: ''
})

// 初始化编辑数据
watch(() => props.item, (newItem) => {
  editedItem.value = { ...newItem }
  editedContent.value = {
    overview: newItem.content?.overview || '',
    currentSituation: newItem.content?.currentSituation || '',
    leadingCompanies: newItem.content?.leadingCompanies || '',
    techHistory: newItem.content?.techHistory || '',
    businessCases: newItem.content?.businessCases || ''
  }
}, { immediate: true })

// 渲染Markdown内容
const renderedContent = computed(() => ({
  overview: marked(props.item.content?.overview || '[暂无行业简介]'),
  currentSituation: marked(props.item.content?.currentSituation || '[暂无发展现状描述]'),
  leadingCompanies: marked(props.item.content?.leadingCompanies || '[暂无龙头企业信息]'),
  techHistory: marked(props.item.content?.techHistory || '[暂无技术发展历史]'),
  businessCases: marked(props.item.content?.businessCases || '[暂无商业案例]')
}))

// 切换编辑模式
const toggleEditMode = () => {
  if (isEditing.value) {
    saveEdit()
  } else {
    isEditing.value = true
  }
}

// 取消编辑
const cancelEdit = () => {
  isEditing.value = false
  // 重置编辑数据
  editedItem.value = { ...props.item }
  editedContent.value = {
    overview: props.item.content?.overview || '',
    currentSituation: props.item.content?.currentSituation || '',
    leadingCompanies: props.item.content?.leadingCompanies || '',
    techHistory: props.item.content?.techHistory || '',
    businessCases: props.item.content?.businessCases || ''
  }
}

// 保存编辑
const saveEdit = () => {
  emit('save', {
    ...editedItem.value,
    content: { ...editedContent.value },
    updatedAt: new Date().toISOString()
  })
  isEditing.value = false
}

// 处理删除
const handleDelete = () => {
  if (confirm('确定要删除这个行业吗？此操作不可撤销。')) {
    emit('delete', props.item.id)
    emit('close')
  }
}
</script>

<style scoped>
/* 样式保持现有基础上，添加以下补充样式 */
.header-actions {
  display: flex;
  gap: 8px;
}

.edit-button {
  padding: 6px 12px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.delete-button {
  padding: 6px 12px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.edit-section {
  margin-bottom: 24px;
}

.edit-section-title {
  font-size: 16px;
  margin-bottom: 8px;
  color: #1f2937;
}

.title-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 16px;
  font-size: 16px;
}

.edit-row {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.category-input,
.growth-rate-input,
.companies-count-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.edit-input {
  width: 100%;
  min-height: 120px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-family: monospace;
  resize: vertical;
}

.content-section {
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f3f4f6;
}

.content-section:last-child {
  border-bottom: none;
}

.btn-primary {
  padding: 8px 16px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background-color: #096dd9;
}
</style>