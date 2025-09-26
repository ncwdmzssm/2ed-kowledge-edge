<template>
  <div class="software-scenario">
    <div class="section-header">
      <h2>适用场景</h2>
      <button class="add-btn">+ 添加</button>
    </div>
    <div class="scenario-list">
      <div v-for="(scenario, index) in software.scenarios" :key="index" class="scenario-item">
        <i class="check-icon"></i>
        <span>{{ scenario || '[适用场景描述]' }}</span>
        <button class="delete-scenario-btn">
          <i class="delete-icon"></i>
        </button>
      </div>
      <div v-if="software.scenarios.length === 0" class="empty-placeholder">
        <p>暂无适用场景信息，点击"添加"按钮录入软件的适用场景</p>
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
/* 适用场景列表 */
.scenario-list {
  margin-bottom: 30px;
}

.scenario-item {
  display: flex;
  align-items: center;
  padding: 8px 10px;
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 8px;
}

.check-icon {
  color: #52c41a;
  margin-right: 8px;
}

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
