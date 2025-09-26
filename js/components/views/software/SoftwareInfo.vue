<template>
  <div class="software-info">
    <h2>软件概述</h2>
    <button class="edit-info-btn">编辑</button>
    <p class="software-desc">
      {{ software.description || '[请输入软件简介，介绍软件的核心功能、特点等]' }}
    </p>
    <div class="software-meta">
      <div class="meta-item">
        <span class="meta-label">开发商</span>
        <span class="meta-value">{{ software.developer || '[如：公司/团队名称]' }}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">首次发布</span>
        <span class="meta-value">{{ software.firstRelease || '[如：YYYY年MM月]' }}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">许可证类型</span>
        <span class="meta-value">{{ software.licenseType || '[如：开源、商业等]' }}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">适用平台</span>
        <span class="meta-value">{{ software.platforms || '[如：Windows、macOS等，用逗号分隔]' }}</span>
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
/* 软件概述区域 */
.software-info {
  background-color: #fafafa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
}

.software-info h2 {
  font-size: 18px;
  margin: 0 0 15px 0;
  display: flex;
  align-items: center;
}

.edit-info-btn {
  float: right;
  padding: 4px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  font-size: 13px;
  color: #666;
}

.software-desc {
  line-height: 1.7;
  margin: 0 0 20px 0;
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  min-height: 60px;
}

.software-meta {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 15px;
}

.meta-item {
  display: flex;
  flex-wrap: wrap;
  padding: 8px 10px;
  background-color: #fff;
  border-radius: 4px;
}

.meta-label {
  font-weight: 500;
  margin-right: 8px;
  color: #555;
  min-width: 80px;
}

.meta-value {
  color: #333;
  flex: 1;
}
</style>
