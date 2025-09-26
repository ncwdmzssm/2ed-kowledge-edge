<template>
  <div class="software-feature">
    <div class="section-header">
      <h2>主要功能</h2>
      <button class="add-btn">+ 添加</button>
    </div>
    <div class="feature-list">
      <div v-for="(feature, index) in software.features" :key="index" class="feature-item">
        <div class="feature-icon">
          <i class="feature-icon-svg"></i>
        </div>
        <div class="feature-info">
          <h3>{{ feature.name || '[功能名称]' }}</h3>
          <p>{{ feature.desc || '[功能特点、作用等说明]' }}</p>
        </div>
        <button class="delete-feature-btn">
          <i class="delete-icon"></i>
        </button>
      </div>
      <div v-if="software.features.length === 0" class="empty-placeholder">
        <p>暂无功能信息，点击"添加"按钮录入软件的主要功能</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  software: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
/* 通用区块样式 */
.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.section-header h2 {
  font-size: 18px;
  margin: 0;
}

.add-btn,
.edit-btn {
  margin-left: auto;
  padding: 4px 10px;
  border: 1px dashed #1890ff;
  border-radius: 4px;
  background-color: transparent;
  color: #1890ff;
  cursor: pointer;
  font-size: 14px;
}

.add-btn:hover,
.edit-btn:hover {
  background-color: #e6f7ff;
}

/* 主要功能列表 */
.feature-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 15px;
  background-color: #fff;
}

.feature-icon {
  margin-right: 12px;
  color: #1890ff;
  font-size: 20px;
  padding-top: 3px;
}

.feature-info h3 {
  font-size: 16px;
  margin: 0 0 5px 0;
}

.feature-info p {
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.6;
}

/* 删除按钮 */
.delete-feature-btn,
.delete-scenario-btn,
.delete-icon {
  background: transparent;
  border: none;
  color: #f5222d;
  cursor: pointer;
  padding: 4px;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.delete-feature-btn:hover,
.delete-scenario-btn:hover,
.delete-icon:hover {
  opacity: 1;
}

/* 空状态提示 */
.empty-placeholder {
  padding: 30px 15px;
  text-align: center;
  border: 1px dashed #ddd;
  border-radius: 6px;
  color: #999;
  font-size: 14px;
  background-color: #fafafa;
}
</style>
