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
.feature-item {
  @apply warm-card p-5 flex items-start gap-4;
}
.feature-icon {
  @apply text-primary-color text-xl pt-1;
}
.add-btn {
  @apply border-primary-color text-primary-color hover:bg-primary-light;
}
</style>