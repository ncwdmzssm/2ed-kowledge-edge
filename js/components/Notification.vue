<template>
    <div class="notifications-container">
      <div 
        v-for="(notification, index) in notifications" 
        :key="index"
        :class="['notification', `notification-${notification.type}`]"
        :style="{ top: `${index * 60}px` }"
      >
        <div class="notification-icon">
          <i class="fas" :class="getIcon(notification.type)"></i>
        </div>
        <div class="notification-content">
          <h4>{{ notification.title }}</h4>
          <p>{{ notification.message }}</p>
        </div>
        <button class="notification-close" @click="removeNotification(index)">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  // 通知类型定义：成功、错误、警告、信息
  const notifications = ref([]);
  
  // 根据通知类型获取对应的图标
  const getIcon = (type) => {
    switch(type) {
      case 'success': return 'fa-check-circle';
      case 'error': return 'fa-exclamation-circle';
      case 'warning': return 'fa-exclamation-triangle';
      case 'info': return 'fa-info-circle';
      default: return 'fa-bell';
    }
  };
  
  // 添加新通知
  const addNotification = (options) => {
    // 默认配置
    const defaults = {
      title: '',
      message: '',
      type: 'info', // 默认信息类型
      duration: 3000 // 默认3秒后自动关闭
    };
    
    // 合并用户配置与默认配置
    const notification = { ...defaults, ...options };
    notifications.value.push(notification);
    
    // 自动关闭
    if (notification.duration > 0) {
      setTimeout(() => {
        const index = notifications.value.indexOf(notification);
        if (index !== -1) {
          removeNotification(index);
        }
      }, notification.duration);
    }
  };
  
  // 移除通知
  const removeNotification = (index) => {
    notifications.value.splice(index, 1);
  };
  
  // 暴露方法给父组件使用
  defineExpose({
    addNotification
  });
  </script>
  
  <style scoped>
  .notifications-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    width: 320px;
  }
  
  .notification {
    position: relative;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 6px;
    color: #fff;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    animation: slideIn 0.3s ease forwards;
  }
  
  /* 通知类型样式 */
  .notification-success {
    background-color: #4CAF50;
  }
  
  .notification-error {
    background-color: #F44336;
  }
  
  .notification-warning {
    background-color: #FF9800;
  }
  
  .notification-info {
    background-color: #2196F3;
  }
  
  .notification-icon {
    font-size: 24px;
    margin-right: 15px;
    min-width: 24px;
  }
  
  .notification-content {
    flex: 1;
  }
  
  .notification-content h4 {
    margin: 0 0 5px 0;
    font-size: 16px;
    font-weight: 600;
  }
  
  .notification-content p {
    margin: 0;
    font-size: 14px;
    opacity: 0.9;
  }
  
  .notification-close {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font-size: 16px;
    opacity: 0.8;
    padding: 2px;
    transition: opacity 0.2s;
  }
  
  .notification-close:hover {
    opacity: 1;
  }
  
  /* 滑入动画 */
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  </style>
      