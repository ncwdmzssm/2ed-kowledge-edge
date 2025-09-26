<template>
  <div class="software-basic">
    <div class="software-header">
      <img :src="software.logo || defaultLogo" alt="软件logo" class="software-logo" />
      <div class="software-title">
        <h1>{{ software.name || '[请输入软件名称]' }}</h1>
        <p>{{ software.subtitle || '[请输入软件副标题/定位]' }}</p>
        <div class="software-tags">
          <span v-for="(tag, index) in software.tags" :key="index" class="tag">{{ tag }}</span>
          <span v-if="software.tags.length === 0" class="placeholder-tag">[添加标签，如：功能属性、收费类型等]</span>
        </div>
      </div>
      <div class="software-actions">
        <button class="edit-tag-btn">编辑标签</button>
        <button class="edit-content-btn">编辑内容</button>
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

// 默认logo地址（无logo时显示）
const defaultLogo = 'https://picsum.photos/80/80?grayscale&blur=2';
</script>

<style scoped>
/* 头部样式 */
.software-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 15px;
}

.software-logo {
  width: 80px;
  height: 80px;
  border-radius: 4px;
  object-fit: contain;
  background-color: #f5f5f5;
  border: 1px dashed #ddd;
}

.software-title h1 {
  font-size: 28px;
  margin: 0 0 5px 0;
}

.software-title p {
  font-size: 16px;
  color: #666;
  margin: 0 0 10px 0;
}

.software-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 4px 10px;
  background-color: #f0f7ff;
  border-radius: 12px;
  font-size: 13px;
  color: #1890ff;
}

.placeholder-tag {
  padding: 4px 10px;
  background-color: #fafafa;
  border: 1px dashed #ddd;
  border-radius: 12px;
  font-size: 13px;
  color: #999;
}

.software-actions {
  margin-left: auto;
  display: flex;
  gap: 10px;
}

.edit-tag-btn,
.edit-content-btn {
  padding: 6px 14px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.edit-tag-btn {
  background-color: #fff;
  border: 1px solid #ddd;
  color: #666;
}

.edit-tag-btn:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.edit-content-btn {
  background-color: #1890ff;
  border: 1px solid #1890ff;
  color: #fff;
}

.edit-content-btn:hover {
  background-color: #096dd9;
}
</style>
