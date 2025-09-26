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
.software-header {
  @apply bg-gradient-to-r from-primary-light to-accent-light/50 
         p-6 rounded-xl mb-8 flex flex-wrap items-center gap-6;
}
.software-title h1 {
  @apply text-2xl font-bold text-accent-color;
}
.tag {
  @apply bg-primary-light text-primary-color px-3 py-1 rounded-full text-sm;
}
.edit-content-btn {
  @apply bg-primary-color text-white border-none hover:bg-accent-color;
}
</style>