<template>
    <div class="modal-overlay" v-if="isVisible">
      <div class="modal-content">
        <h3 class="modal-title">添加内容</h3>
        <!-- 这里可以添加表单等添加相关的内容 -->
        <form>
          <div class="form-group">
            <label for="name">名称</label>
            <input type="text" id="name" v-model="formData.name" />
          </div>
          <div class="form-group">
            <label for="description">描述</label>
            <textarea id="description" v-model="formData.description"></textarea>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn cancel" @click="closeModal">取消</button>
            <button type="button" class="btn confirm" @click="submitForm">确认添加</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    opacity: 0;
    animation: fadeIn 0.2s ease-out forwards;
  }
  
  .modal-content {
    background-color: white;
    padding: 24px;
    border-radius: var(--radius);
    width: 90%;
    max-width: 500px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    transform: translateY(20px);
    animation: slideIn 0.3s ease-out forwards;
  }
  
  @keyframes fadeIn {
    to { opacity: 1; }
  }
  
  @keyframes slideIn {
    to { transform: translateY(0); }
  }
  
  /* 其他样式保持不变 */
  </style>




  <script setup>
  import { ref, reactive } from 'vue';
  
  const isVisible = ref(false);
  const formData = reactive({
    name: '',
    description: ''
  });
  
  const showModal = () => {
    isVisible.value = true;
  };
  
  const closeModal = () => {
    isVisible.value = false;
    // 重置表单数据
    formData.name = '';
    formData.description = '';
  };
  
  const submitForm = () => {
    // 这里可以添加提交表单的逻辑，比如调用接口等
    console.log('提交的数据：', formData);
    closeModal();
  };
  
  // 暴露方法，让父组件可以控制模态框显示
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
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
  
  .modal-title {
    margin-top: 0;
    margin-bottom: 15px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
  }
  
  .btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn.cancel {
    background-color: #eee;
  }
  
  .btn.confirm {
    background-color: #42b983;
    color: white;
  }
  </style>