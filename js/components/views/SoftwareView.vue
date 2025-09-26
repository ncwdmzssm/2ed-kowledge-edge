<template>
  <div class="software-view">
    <SoftwareHeader :software="software" />
    <SoftwareInfo :software="software" />
    <SoftwareFeatures :software="software" />
    <SoftwareScenarios :software="software" />
    <SoftwareProsCons :software="software" />

    <!-- 软件工具区域 -->
    <div>
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">软件工具</h2>
        <button class="btn-primary" @click="$emit('add')">
          <i class="fa fa-plus mr-2"></i>添加软件
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="item in items" :key="item.id" class="bg-white rounded-lg shadow p-6 card-hover cursor-pointer border-l-4 border-transparent hover:border-primary" @click="$emit('edit', item)">
          <h3 class="text-lg font-semibold mb-2 text-gray-800">{{ item.name }}</h3>
          <div class="flex flex-wrap gap-2 mb-3">
            <span v-for="tag in item.tags" :key="tag" class="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
              {{ tag }}
            </span>
          </div>
          <p class="text-gray-600 text-sm line-clamp-3">
            {{ item.summary }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SoftwareHeader from './software/SoftwareHeader.vue';
import SoftwareInfo from './software/SoftwareInfo.vue';
import SoftwareFeatures from './software/SoftwareFeatures.vue';
import SoftwareScenarios from './software/SoftwareScenarios.vue';
import SoftwareProsCons from './software/SoftwareProsCons.vue';

// 模拟软件数据，初始为空白带提示
const software = ref({
  name: '',
  subtitle: '',
  logo: '',
  tags: [],
  description: '',
  developer: '',
  firstRelease: '',
  licenseType: '',
  platforms: '',
  features: [],
  scenarios: [],
  pros: [],
  cons: []
});

defineProps({
  items: Array
})

defineEmits(['edit', 'add'])
</script>

<style scoped>
.software-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #333;
}
</style>
``` 