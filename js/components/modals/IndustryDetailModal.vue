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
          <button 
            class="close-button"
            @click="$emit('close')"
          >
            <i class="fa fa-times"></i>
          </button>
        </div>
        
        <!-- 内容区域 -->
        <div class="modal-content">
          <div v-if="isEditing">
            <textarea
              v-model="editedContent"
              class="edit-input"
              placeholder="支持 Markdown 格式，可输入行业分析详情..."
            ></textarea>
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
            
            <!-- 详细内容 -->
            <div class="content-section">
              <h4 class="section-heading">详细分析</h4>
              <div 
                class="markdown-body"
                v-html="renderedContent"
              ></div>
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
        <div class="modal-footer">
          <button 
            v-if="isEditing"
            class="btn-secondary"
            @click="cancelEdit"
          >
            取消
          </button>
          <button 
            v-if="isEditing"
            class="btn-primary"
            @click="saveEdit"
          >
            保存
          </button>
          <button 
            v-else
            class="btn-primary"
            @click="startEdit"
          >
            编辑分析
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { marked } from 'marked'
  import hljs from 'highlight.js'
  
  // 配置marked
  marked.setOptions({
    highlight: (code, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value
      }
      return hljs.highlightAuto(code).value
    },
    breaks: true,
    gfm: true
  })
  
  const props = defineProps({
    item: {
      type: Object,
      required: true
    }
  })
  
  const emit = defineEmits(['close', 'save'])
  
  const isEditing = ref(false)
  const editedContent = ref('')
  
  const renderedContent = computed(() => {
    return marked(props.item.content || '[暂无详细分析内容]')
  })
  
  const startEdit = () => {
    editedContent.value = props.item.content || ''
    isEditing.value = true
  }
  
  const cancelEdit = () => {
    isEditing.value = false
  }
  
  const saveEdit = () => {
    emit('save', {
      ...props.item,
      content: editedContent.value,
      updatedAt: new Date().toISOString()
    })
    isEditing.value = false
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
  }
  
  .modal-container {
    background-color: white;
    border-radius: 12px;
    width: 100%;
    max-width: 900px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  
  /* 头部样式 */
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    border-bottom: 1px solid #f3f4f6;
  }
  
  .header-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .industry-badge {
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
    color: white;
  }
  
  .modal-title {
    font-size: 20px;
    font-weight: 600;
    color: #1f2937;
    margin: 0;
  }
  
  .close-button {
    background: none;
    border: none;
    color: #6b7280;
    font-size: 20px;
    cursor: pointer;
    transition: color 0.2s ease;
  }
  
  .close-button:hover {
    color: #1f2937;
  }
  
  /* 内容区域 */
  .modal-content {
    flex: 1;
    overflow-y: auto;
    padding: 24px;
  }
  
  .edit-input {
    width: 100%;
    height: 500px;
    padding: 16px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
    font-size: 14px;
    resize: none;
  }
  
  .edit-input:focus {
    outline: none;
    border-color: #1890ff;
    box-shadow: 0 0 0 3px rgba(24, 144, 255, 0.1);
  }
  
  /* 详情样式 */
  .section-heading {
    font-size: 16px;
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 16px 0;
    padding-bottom: 8px;
    border-bottom: 1px solid #f3f4f6;
  }
  
  .overview-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 32px;
  }
  
  .stat-card {
    background-color: #f9fafb;
    border-radius: 8px;
    padding: 16px;
    text-align: center;
  }
  
  .stat-label {
    font-size: 14px;
    color: #6b7280;
    margin: 0 0 8px 0;
  }
  
  .stat-value {
    font-size: 20px;
    font-weight: 600;
    color: #1f2937;
    margin: 0;
  }
  
  .content-section {
    margin-bottom: 32px;
  }
  
  .markdown-body {
    font-size: 14px;
    line-height: 1.8;
    color: #374151;
  }
  
  .markdown-body h1,
  .markdown-body h2,
  .markdown-body h3 {
    margin-top: 24px;
    margin-bottom: 16px;
    color: #1f2937;
  }
  
  .markdown-body p {
    margin-bottom: 16px;
  }
  
  .markdown-body ul,
  .markdown-body ol {
    margin-bottom: 16px;
    padding-left: 24px;
  }
  
  .markdown-body img {
    max-width: 100%;
    border-radius: 8px;
    margin: 16px 0;
  }
  
  /* 相关企业 */
  .related-companies {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  
  .company-item {
    display: flex;
    align-items: center;
    gap: 12px;
    background-color: #f9fafb;
    border-radius: 8px;
    padding: 12px 16px;
    min-width: 250px;
  }
  
  .company-logo {
    width: 40px;
    height: 40px;
    border-radius: 6px;
    object-fit: contain;
    background-color: white;
    border: 1px solid #e5e7eb;
  }
  
  .company-info .company-name {
    font-weight: 500;
    margin: 0 0 4px 0;
  }
  
  .company-info .company-role {
    font-size: 12px;
    color: #6b7280;
    margin: 0;
  }
  
  /* 底部按钮 */
  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding: 16px 24px;
    border-top: 1px solid #f3f4f6;
  }
  
  .btn-secondary {
    padding: 8px 16px;
    background-color: #f3f4f6;
    color: #4b5563;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .btn-secondary:hover {
    background-color: #e5e7eb;
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
  
  /* 响应式调整 */
  @media (max-width: 768px) {
    .overview-stats {
      grid-template-columns: 1fr 1fr;
    }
    
    .company-item {
      width: 100%;
    }
  }
  </style>