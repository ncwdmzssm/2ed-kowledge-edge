<template>
  <div class="mb-6 space-y-4">
    <div class="relative">
      <input
        type="text"
        :value="search"
        @input="$emit('update:search', $event.target.value)"
        class="input-field pl-10 pr-4 py-2 w-full"
        placeholder="搜索行业、企业、软件或知识..."
      >
      <i class="fa fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
      <button 
        v-if="search" 
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        @click="$emit('update:search', '')"
      >
        <i class="fa fa-times-circle"></i>
      </button>
    </div>
    
    <div class="flex flex-wrap gap-2">
      <div class="text-sm text-gray-500 min-w-[60px] pt-1">标签:</div>
      <button
        v-for="tag in tags"
        :key="tag"
        @click="$emit('toggle-tag', tag)"
        :class="[
          'px-3 py-1 rounded-full text-sm transition-all',
          selectedTags.includes(tag)
            ? 'bg-primary text-white shadow-sm'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        ]"
      >
        {{ tag }}
        <span v-if="selectedTags.includes(tag)" class="ml-1">×</span>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  search: String,
  tags: Array,
  selectedTags: Array
})

defineEmits(['update:search', 'toggle-tag'])
</script>

<!-- 创建或修改 SearchBar.vue 的 style 部分 -->
<style scoped>
.search-container {
  @apply relative mb-6;
}

.search-input {
  @apply w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-color/50 focus:border-primary-color transition-all;
}

.search-icon {
  @apply absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400;
}

.tags-container {
  @apply flex flex-wrap gap-2 mt-3;
}

.selected-tag {
  @apply bg-primary-light text-primary-color px-3 py-1 rounded-full text-sm flex items-center gap-1.5;
}

.tag-remove {
  @apply cursor-pointer hover:text-primary-color/80;
}
</style>