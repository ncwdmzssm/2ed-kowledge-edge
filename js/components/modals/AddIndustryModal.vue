<!-- components/modals/AddIndustryModal.vue -->
<template>
    <div class="modal-overlay" v-if="isVisible">
      <div class="modal-card">
        <div class="card-header">
          <h3 class="card-title">添加新行业</h3>
          <button class="close-btn" @click="closeModal">
            <i class="fa fa-times"></i>
          </button>
        </div>
        
        <div class="card-body">
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="title">行业名称 *</label>
              <input 
                type="text" 
                id="title" 
                v-model="formData.title" 
                placeholder="输入行业名称"
                required
              >
            </div>
            
            <div class="form-group">
              <label for="category">行业分类</label>
              <input 
                type="text" 
                id="category" 
                v-model="formData.category" 
                placeholder="例如：信息技术、金融等"
              >
            </div>
            
            <div class="form-group">
              <label for="summary">行业简介</label>
              <textarea 
                id="summary" 
                v-model="formData.summary" 
                placeholder="简要描述该行业"
                rows="3"
              ></textarea>
            </div>
            
            <div class="form-row">
              <div class="form-group half">
                <label for="companiesCount">企业数量</label>
                <input 
                  type="number" 
                  id="companiesCount" 
                  v-model="formData.companiesCount" 
                  placeholder="行业内企业数量"
                >
              </div>
              
              <div class="form-group half">
                <label for="growthRate">增长率(%)</label>
                <input 
                  type="number" 
                  id="growthRate" 
                  v-model="formData.growthRate" 
                  placeholder="行业增长率"
                  step="0.1"
                >
              </div>
            </div>
            
            <div class="form-group">
              <label for="tags">标签（用逗号分隔）</label>
              <input 
                type="text" 
                id="tags" 
                v-model="tagInput" 
                placeholder="输入标签，用逗号分隔"
              >
            </div>
            
            <div class="tags-preview">
              <span 
                class="tag-item" 
                v-for="(tag, index) in formData.tags" 
                :key="index"
              >
                {{ tag }}
                <button 
                  type="button" 
                  class="remove-tag" 
                  @click.stop="removeTag(index)"
                >
                  <i class="fa fa-times"></i>
                </button>
              </span>
            </div>
          </form>
        </div>
        
        <div class="card-footer">
          <button class="btn-secondary" @click="closeModal">取消</button>
          <button class="btn-primary" @click="handleSubmit">保存行业</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const isVisible = ref(false);
  const formData = ref({
    title: '',
    category: '',
    summary: '',
    companiesCount: 0,
    growthRate: 0,
    tags: [],
    color: '#1890ff',
    updatedAt: new Date().toISOString()
  });
  const tagInput = ref('');
  
  // 监听标签输入，按逗号分割
  watch(tagInput, (newVal) => {
    if (newVal.includes(',')) {
      const tag = newVal.trim().replace(',', '');
      if (tag && !formData.value.tags.includes(tag)) {
        formData.value.tags.push(tag);
      }
      tagInput.value = '';
    }
  });
  
  const removeTag = (index) => {
    formData.value.tags.splice(index, 1);
  };
  
  const showModal = () => {
    isVisible.value = true;
    // 重置表单
    formData.value = {
      title: '',
      category: '',
      summary: '',
      companiesCount: 0,
      growthRate: 0,
      tags: [],
      color: '#1890ff',
      updatedAt: new Date().toISOString()
    };
    tagInput.value = '';
  };
  
  const closeModal = () => {
    isVisible.value = false;
  };
  
  const handleSubmit = () => {
    if (!formData.value.title) {
      alert('请输入行业名称');
      return;
    }
    
    // 生成唯一ID
    formData.value.id = Date.now().toString();
    
    // 提交数据
    emit('save', formData.value);
    closeModal();
  };
  
  const emit = defineEmits(['save']);
  
  defineExpose({
    showModal
  });
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
  
  .modal-card {
    background-color: white;
    border-radius: 12px;
    width: 100%;
    max-width: 600px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    animation: slideIn 0.3s ease-out;
  }
  
  @keyframes slideIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    border-bottom: 1px solid #f3f4f6;
  }
  
  .card-title {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
    color: #1f2937;
  }
  
  .close-btn {
    background: none;
    border: none;
    font-size: 20px;
    color: #6b7280;
    cursor: pointer;
    transition: color 0.2s;
  }
  
  .close-btn:hover {
    color: #1f2937;
  }
  
  .card-body {
    padding: 24px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-row {
    display: flex;
    gap: 16px;
  }
  
  .half {
    flex: 1;
  }
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #4b5563;
    font-size: 14px;
  }
  
  input, textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    font-size: 14px;
  }
  
  input:focus, textarea:focus {
    outline: none;
    border-color: #1890ff;
    box-shadow: 0 0 0 3px rgba(24, 144, 255, 0.1);
  }
  
  .tags-preview {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
  }
  
  .tag-item {
    display: inline-flex;
    align-items: center;
    background-color: #f3f4f6;
    border-radius: 12px;
    padding: 3px 10px;
    font-size: 12px;
    color: #6b7280;
  }
  
  .remove-tag {
    background: none;
    border: none;
    color: #6b7280;
    margin-left: 6px;
    cursor: pointer;
    font-size: 12px;
  }
  
  .card-footer {
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
    transition: background-color 0.2s;
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
    transition: background-color 0.2s;
  }
  
  .btn-primary:hover {
    background-color: #096dd9;
  }
  </style>