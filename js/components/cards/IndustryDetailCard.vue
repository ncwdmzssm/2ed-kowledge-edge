<template>
    <div class="industry-detail-card">
      <!-- 卡片头部 -->
      <div class="card-header">
        <div class="industry-badge" :style="{ backgroundColor: industry.color || '#1890ff' }">
          {{ industry.category || '行业' }}
        </div>
        <h2 class="industry-title">{{ industry.title || '[行业名称]' }}</h2>
        <button class="edit-btn" @click="toggleEditMode">
          <i class="fas fa-edit"></i> {{ isEditing ? '取消' : '编辑' }}
        </button>
      </div>
  
      <!-- 核心数据概览 -->
      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-label">市场规模</span>
          <div v-if="isEditing">
            <input 
              type="text" 
              v-model="editedIndustry.marketSize" 
              class="edit-input"
              placeholder="如：1000亿元"
            >
          </div>
          <span v-else class="stat-value">{{ industry.marketSize || '暂无数据' }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">年增长率</span>
          <div v-if="isEditing">
            <input 
              type="text" 
              v-model="editedIndustry.growthRate" 
              class="edit-input"
              placeholder="如：15.6"
            >
          </div>
          <span v-else class="stat-value">{{ industry.growthRate || '0' }}%</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">企业数量</span>
          <div v-if="isEditing">
            <input 
              type="number" 
              v-model="editedIndustry.companiesCount" 
              class="edit-input"
              placeholder="如：500"
            >
          </div>
          <span v-else class="stat-value">{{ industry.companiesCount || '0' }} 家</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">产业链长度</span>
          <div v-if="isEditing">
            <select v-model="editedIndustry.chainLength" class="edit-select">
              <option value="">请选择</option>
              <option value="短">短</option>
              <option value="中">中</option>
              <option value="长">长</option>
            </select>
          </div>
          <span v-else class="stat-value">{{ industry.chainLength || '未知' }}</span>
        </div>
      </div>
  
      <!-- 行业描述 -->
      <div class="section">
        <h3 class="section-title">行业概述</h3>
        <div v-if="isEditing">
          <textarea 
            v-model="editedIndustry.summary" 
            class="edit-textarea"
            placeholder="请输入行业概述..."
          ></textarea>
        </div>
        <p v-else class="section-content">{{ industry.summary || '[暂无行业概述]' }}</p>
      </div>
  
      <!-- 发展趋势 -->
      <div class="section">
        <h3 class="section-title">发展趋势</h3>
        <div v-if="isEditing">
          <textarea 
            v-model="editedIndustry.trends" 
            class="edit-textarea"
            placeholder="请输入行业发展趋势..."
          ></textarea>
        </div>
        <p v-else class="section-content">{{ industry.trends || '[暂无发展趋势分析]' }}</p>
      </div>
  
      <!-- 核心企业 -->
      <div class="section">
        <h3 class="section-title">核心企业</h3>
        <div v-if="isEditing" class="edit-company-list">
          <div 
            v-for="(company, index) in editedIndustry.relatedCompanies" 
            :key="index"
            class="edit-company-item"
          >
            <input 
              type="text" 
              v-model="company.name" 
              class="edit-input company-name"
              placeholder="企业名称"
            >
            <input 
              type="text" 
              v-model="company.role" 
              class="edit-input company-role"
              placeholder="在行业中的角色"
            >
            <button class="delete-btn" @click="removeCompany(index)">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <button class="add-company-btn" @click="addCompany">
            <i class="fas fa-plus"></i> 添加企业
          </button>
        </div>
        <div v-else class="company-list">
          <div 
            v-for="(company, index) in industry.relatedCompanies" 
            :key="index"
            class="company-item"
          >
            <span class="company-name">{{ company.name || '[企业名称]' }}</span>
            <span class="company-role">{{ company.role || '[角色描述]' }}</span>
          </div>
          <div v-if="!industry.relatedCompanies || industry.relatedCompanies.length === 0" class="empty-placeholder">
            暂无核心企业信息
          </div>
        </div>
      </div>
  
      <!-- 编辑模式下的保存按钮 -->
      <div v-if="isEditing" class="save-section">
        <button class="save-btn" @click="saveChanges">保存修改</button>
      </div>
  
      <!-- 最后更新时间 -->
      <div class="last-update">
        <span>最后更新: {{ formatDate(industry.updatedAt) || '未更新' }}</span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, computed } from 'vue';
  import { format } from 'date-fns';
  
  // 定义组件属性
  const props = defineProps({
    industry: {
      type: Object,
      required: true,
      default: () => ({})
    }
  });
  
  // 定义事件
  const emit = defineEmits(['update:industry', 'save']);
  
  // 状态管理
  const isEditing = ref(false);
  const editedIndustry = ref({});
  
  // 初始化编辑数据
  watch(() => props.industry, () => {
    editedIndustry.value = JSON.parse(JSON.stringify({
      ...props.industry,
      relatedCompanies: props.industry.relatedCompanies || []
    }));
  }, { immediate: true });
  
  // 格式化日期
  const formatDate = (dateString) => {
    if (!dateString) return null;
    return format(new Date(dateString), 'yyyy-MM-dd HH:mm');
  };
  
  // 编辑模式切换
  const toggleEditMode = () => {
    if (isEditing.value) {
      // 取消编辑时重置数据
      editedIndustry.value = JSON.parse(JSON.stringify(props.industry));
    }
    isEditing.value = !isEditing.value;
  };
  
  // 添加企业
  const addCompany = () => {
    editedIndustry.value.relatedCompanies.push({
      name: '',
      role: ''
    });
  };
  
  // 移除企业
  const removeCompany = (index) => {
    editedIndustry.value.relatedCompanies.splice(index, 1);
  };
  
  // 保存修改
  const saveChanges = () => {
    const updatedIndustry = {
      ...editedIndustry.value,
      updatedAt: new Date().toISOString()
    };
    emit('update:industry', updatedIndustry);
    emit('save', updatedIndustry);
    isEditing.value = false;
  };
  </script>
  
  <style scoped>
  .industry-detail-card {
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    padding: 20px;
    margin-bottom: 24px;
  }
  
  /* 头部样式 */
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 12px;
  }
  
  .industry-badge {
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 500;
    color: white;
  }
  
  .industry-title {
    font-size: 22px;
    font-weight: 600;
    margin: 0;
    color: #1f2937;
    flex: 1;
  }
  
  .edit-btn {
    padding: 6px 12px;
    background-color: #1890ff;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: background-color 0.2s;
  }
  
  .edit-btn:hover {
    background-color: #096dd9;
  }
  
  /* 数据概览 */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #f3f4f6;
  }
  
  .stat-card {
    background-color: #f9fafb;
    border-radius: 8px;
    padding: 16px;
  }
  
  .stat-label {
    display: block;
    font-size: 14px;
    color: #6b7280;
    margin-bottom: 8px;
  }
  
  .stat-value {
    font-size: 20px;
    font-weight: 600;
    color: #1f2937;
  }
  
  /* 通用区块样式 */
  .section {
    margin-bottom: 24px;
  }
  
  .section-title {
    font-size: 16px;
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 12px 0;
    padding-bottom: 6px;
    border-bottom: 1px solid #f3f4f6;
  }
  
  .section-content {
    font-size: 14px;
    line-height: 1.7;
    color: #4b5563;
    margin: 0;
  }
  
  /* 企业列表 */
  .company-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 12px;
  }
  
  .company-item {
    background-color: #f9fafb;
    border-radius: 6px;
    padding: 12px;
  }
  
  .company-name {
    display: block;
    font-weight: 500;
    margin-bottom: 4px;
  }
  
  .company-role {
    font-size: 13px;
    color: #6b7280;
  }
  
  /* 编辑模式样式 */
  .edit-input, .edit-select, .edit-textarea {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    font-size: 14px;
    box-sizing: border-box;
  }
  
  .edit-textarea {
    min-height: 100px;
    resize: vertical;
    font-family: inherit;
  }
  
  .edit-company-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 12px;
  }
  
  .edit-company-item {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  
  .company-name {
    flex: 2;
  }
  
  .company-role {
    flex: 3;
  }
  
  .add-company-btn {
    padding: 6px 12px;
    background-color: #f3f4f6;
    color: #4b5563;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 8px;
  }
  
  .delete-btn {
    background: transparent;
    border: none;
    color: #f5222d;
    cursor: pointer;
    padding: 4px;
  }
  
  .save-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
  }
  
  .save-btn {
    padding: 8px 16px;
    background-color: #52c41a;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
  }
  
  .save-btn:hover {
    background-color: #4aa919;
  }
  
  /* 空状态和最后更新 */
  .empty-placeholder {
    padding: 20px;
    text-align: center;
    color: #9ca3af;
    font-size: 14px;
    background-color: #f9fafb;
    border-radius: 6px;
  }
  
  .last-update {
    font-size: 12px;
    color: #9ca3af;
    text-align: right;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #f3f4f6;
  }
  
  /* 响应式调整 */
  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: 1fr 1fr;
    }
    
    .edit-company-item {
      flex-direction: column;
      align-items: stretch;
    }
    
    .company-name, .company-role {
      flex: none;
      width: 100%;
    }
  }
  </style>