
<template>
  <header class="bg-white shadow-sm sticky top-0 z-40 transition-all duration-300" :class="{ 'shadow-md': isScrolled }">
    <nav class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <i class="fa fa-line-chart text-primary text-2xl mr-2"></i>
          <h1 class="text-xl font-bold text-primary">商业分析知识库</h1>
        </div>
        
        <!-- 桌面端导航 -->
        <div class="hidden md:flex items-center space-x-1">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            :class="[
              'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
              activeTab === tab.id 
                ? 'bg-primary text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            ]"
            @click="$emit('change-tab', tab.id)"
          >
            <i :class="['fa', tab.icon, 'mr-1.5']"></i>
            {{ tab.name }}
          </button>
        </div>

        <!-- 移动端菜单按钮 -->
        <button 
          class="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          aria-label="菜单"
        >
          <i class="fa fa-bars text-gray-600"></i>
        </button>
      </div>

      <!-- 移动端导航菜单 -->
      <div 
        v-show="isMobileMenuOpen"
        class="md:hidden py-3 animate-fade-in"
      >
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="[
            'block w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors',
            activeTab === tab.id 
              ? 'bg-primary text-white'
              : 'text-gray-600 hover:bg-gray-100'
          ]"
          @click="selectMobileTab(tab.id)"
        >
          <i :class="['fa', tab.icon, 'mr-2']"></i>
          {{ tab.name }}
        </button>
      </div>
    </nav>
  </header>
</template>

<!-- 在 Header.vue 的 style 部分添加 -->
<style scoped>
/* 增强导航栏样式 */
.header-actions {
  @apply flex items-center gap-3;
}

/* 用户头像样式 */
.user-avatar {
  @apply w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-primary-color font-medium cursor-pointer hover:bg-primary-color/10 transition-colors;
}

/* 通知图标样式 */
.notification-icon {
  @apply text-gray-600 hover:text-primary-color transition-colors cursor-pointer relative;
}

.notification-badge {
  @apply absolute -top-1 -right-1 w-4 h-4 bg-danger-color rounded-full text-white text-xs flex items-center justify-center;
}
</style>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  activeTab: String
})

const emit = defineEmits(['change-tab'])

const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)

const tabs = [
  { id: 'industry', name: '行业', icon: 'fa-building-o' },
  { id: 'company', name: '企业', icon: 'fa-briefcase' },
  { id: 'software', name: '软件', icon: 'fa-desktop' },
  { id: 'knowledge', name: '前沿知识', icon: 'fa-lightbulb-o' }
]

const selectMobileTab = (tabId) => {
  emit('change-tab', tabId)
  isMobileMenuOpen.value = false
}

// 监听滚动事件，实现导航栏阴影效果
const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

