<!-- 修改 js/components/views/SoftwareView.vue -->
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
        <button class="btn-primary" @click="handleAdd">
          <i class="fa fa-plus mr-2"></i>添加软件
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="item in items" 
          :key="item.id" 
          class="bg-white rounded-lg shadow p-6 card-hover cursor-pointer border-l-4 border-transparent hover:border-primary"
          @click="handleEdit(item)"
        >
          <div class="flex justify-between items-start">
            <h3 class="text-lg font-semibold mb-2 text-gray-800">{{ item.name }}</h3>
            <button 
              class="text-gray-400 hover:text-red-500 transition-colors"
              @click.stop="handleDelete(item.id)"
            >
              <i class="fa fa-trash"></i>
            </button>
          </div>
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

    <!-- 编辑模态框 -->
    <CommonEditModal 
      :is-open="isModalOpen"
      :title="isNew ? '添加新软件' : '编辑软件'"
      :current-item="currentItem"
      :is-new="isNew"
      @close="closeModal"
      @save="saveItem"
    >
      <template #content="{ item, updateItem }">
        <div class="space-y-4">
          <div>
            <label class="form-label">软件名称</label>
            <input 
              type="text" 
              class="input-field"
              :value="item.name || ''"
              @input="updateItem('name', $event.target.value)"
              placeholder="请输入软件名称"
            >
          </div>
          
          <div>
            <label class="form-label">软件简介</label>
            <textarea 
              class="input-field"
              :value="item.summary || ''"
              @input="updateItem('summary', $event.target.value)"
              placeholder="请输入软件简介"
              rows="3"
            ></textarea>
          </div>
          
          <div>
            <label class="form-label">标签</label>
            <input 
              type="text" 
              class="input-field"
              :value="item.tags?.join(',') || ''"
              @input="updateItem('tags', $event.target.value.split(',').map(t => t.trim()).filter(t => t))"
              placeholder="请输入标签，用逗号分隔"
            >
          </div>
        </div>
      </template>
    </CommonEditModal>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useSoftwareStore } from '../../store';
import CommonEditModal from '../../components/CommonEditModal.vue';
import SoftwareHeader from './software/SoftwareHeader.vue';
import SoftwareInfo from './software/SoftwareInfo.vue';
import SoftwareFeatures from './software/SoftwareFeatures.vue';
import SoftwareScenarios from './software/SoftwareScenarios.vue';
import SoftwareProsCons from './software/SoftwareProsCons.vue';

const softwareStore = useSoftwareStore();

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

// 模态框状态
const isModalOpen = ref(false);
const isNew = ref(false);
const currentItem = ref(null);

// 从store获取数据
const items = ref(softwareStore.items);

// 监听store数据变化
watch(
  () => softwareStore.items,
  (newVal) => {
    items.value = newVal;
  },
  { deep: true }
);

// 打开添加模态框
const handleAdd = () => {
  isNew.value = true;
  currentItem.value = { name: '', summary: '', tags: [] };
  isModalOpen.value = true;
};

// 打开编辑模态框
const handleEdit = (item) => {
  isNew.value = false;
  currentItem.value = JSON.parse(JSON.stringify(item));
  isModalOpen.value = true;
};

// 关闭模态框
const closeModal = () => {
  isModalOpen.value = false;
  currentItem.value = null;
};

// 保存项目
const saveItem = () => {
  if (isNew.value) {
    softwareStore.addItem(currentItem.value);
  } else {
    softwareStore.updateItem(currentItem.value);
  }
  closeModal();
};

// 删除项目
const handleDelete = (id) => {
  if (confirm('确定要删除这个软件吗？')) {
    softwareStore.deleteItem(id);
  }
};

// 更新项目字段
const updateItem = (field, value) => {
  if (currentItem.value) {
    currentItem.value[field] = value;
  }
};

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