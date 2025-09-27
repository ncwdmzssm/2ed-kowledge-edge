<template>
  <div class="expandable-card" :style="{ borderColor: themeColor }">
    <div class="card-header" @click="isExpanded = !isExpanded">
      <h5 class="card-title">{{ title }}</h5>
      <i class="fa" :class="isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
    </div>
    <div v-if="isExpanded" class="card-content">
      <div class="markdown-body" v-html="content"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  themeColor: {
    type: String,
    default: '#e5e7eb'
  }
});

const isExpanded = ref(false);
</script>

<style scoped>
.expandable-card {
  border: 1px solid; /* Set by themeColor */
  border-radius: 8px;
  margin-bottom: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  background-color: #f9fafb;
}

.card-header:hover {
  background-color: #f3f4f6;
}

.card-title {
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.card-header i {
  color: #6b7280;
  transition: transform 0.3s ease;
}

.card-content {
  padding: 16px;
  border-top: 1px solid #e5e7eb;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Markdown 样式 */
.markdown-body {
  font-size: 14px;
  line-height: 1.7;
  color: #374151;
}
</style>
