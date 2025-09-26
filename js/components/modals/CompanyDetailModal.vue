<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <!-- 模态框头部 -->
        <div class="p-6 border-b border-gray-100 bg-primary-light/50">
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-semibold text-text-primary">
              {{ isNew ? '添加新公司' : '公司详情' }}
            </h3>
            <button @click="close" class="text-gray-500 hover:text-gray-700">
              <i class="fa fa-times text-xl"></i>
            </button>
          </div>
        </div>
        
        <!-- 模态框内容 -->
        <div class="p-6">
          <form @submit.prevent="saveCompany">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- 基本信息 -->
              <div>
                <h4 class="text-lg font-medium mb-4 text-text-primary">基本信息</h4>
                
                <div class="space-y-4">
                  <div>
                    <label class="form-label">公司名称 <span class="text-danger-color">*</span></label>
                    <input 
                      type="text" 
                      class="input-field"
                      v-model="company.name"
                      required
                      placeholder="请输入公司名称"
                    >
                  </div>
                  
                  <div>
                    <label class="form-label">所属行业</label>
                    <input 
                      type="text" 
                      class="input-field"
                      v-model="company.industry"
                      placeholder="如：互联网、金融、教育等"
                    >
                  </div>
                  
                  <div>
                    <label class="form-label">所在地区</label>
                    <input 
                      type="text" 
                      class="input-field"
                      v-model="company.location"
                      placeholder="请输入公司所在城市"
                    >
                  </div>
                  
                  <div>
                    <label class="form-label">员工规模</label>
                    <input 
                      type="text" 
                      class="input-field"
                      v-model="company.employees"
                      placeholder="如：100-500人"
                    >
                  </div>
                </div>
              </div>
              
              <!-- 详细信息 -->
              <div>
                <h4 class="text-lg font-medium mb-4 text-text-primary">详细信息</h4>
                
                <div class="space-y-4">
                  <div>
                    <label class="form-label">公司简介</label>
                    <textarea 
                      class="input-field"
                      v-model="company.description"
                      placeholder="请输入公司简介"
                      rows="5"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label class="form-label">主营业务</label>
                    <textarea 
                      class="input-field"
                      v-model="company.business"
                      placeholder="请输入公司主营业务"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 其他信息 -->
            <div class="mt-6">
              <h4 class="text-lg font-medium mb-4 text-text-primary">备注信息</h4>
              
              <div>
                <textarea 
                  class="input-field w-full"
                  v-model="company.notes"
                  placeholder="请输入其他备注信息"
                  rows="3"
                ></textarea>
              </div>
            </div>
            
            <!-- 按钮区域 -->
            <div class="mt-8 flex justify-end gap-3">
              <button 
                type="button"
                class="px-5 py-2 border border-gray-300 rounded-lg hover:border-primary-color hover:text-primary-color transition-colors"
                @click="close"
              >
                取消
              </button>
              <button 
                type="submit"
                class="warm-btn"
              >
                {{ isNew ? '创建公司' : '保存修改' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, ref, watch } from 'vue';
  import { useCompanyStore } from '../../store/companyStore';
  
  const companyStore = useCompanyStore();
  
  // Props
  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false
    },
    companyId: {
      type: [String, null],
      default: null
    }
  });
  
  // Emits
  const emit = defineEmits(['close', 'save']);
  
  // 状态
  const company = ref({
    id: null,
    name: '',
    industry: '',
    location: '',
    employees: '',
    description: '',
    business: '',
    notes: '',
    updatedAt: null
  });
  
  // 判断是否为新建
  const isNew = computed(() => !props.companyId);
  
  // 监听公司ID变化，加载公司数据
  watch(
    () => props.companyId,
    (newId) => {
      if (newId) {
        const found = companyStore.items.find(item => item.id === newId);
        if (found) {
          company.value = { ...found };
        }
      } else {
        // 重置为新公司
        company.value = {
          id: null,
          name: '',
          industry: '',
          location: '',
          employees: '',
          description: '',
          business: '',
          notes: '',
          updatedAt: Date.now()
        };
      }
    },
    { immediate: true }
  );
  
  // 关闭模态框
  const close = () => {
    emit('close');
  };
  
  // 保存公司信息
  const saveCompany = () => {
    const companyData = {
      ...company.value,
      id: company.value.id || Date.now().toString(),
      updatedAt: Date.now()
    };
    
    if (isNew.value) {
      companyStore.addItem(companyData);
    } else {
      companyStore.updateItem(companyData);
    }
    
    emit('save');
    close();
  };
  </script>
  
  <style scoped>
  .form-label {
    @apply block text-sm font-medium text-gray-700 mb-1.5;
  }
  
  .input-field {
    @apply w-full px-4 py-2.5 rounded-lg border border-gray-300 
           focus:outline-none focus:ring-2 focus:ring-primary-color/50 
           focus:border-primary-color transition-all;
  }
  
  .text-danger-color {
    @apply text-red-500;
  }
  </style>
  