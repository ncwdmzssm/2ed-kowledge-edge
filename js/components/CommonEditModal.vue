<!-- 创建 js/components/CommonEditModal.vue -->
<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b">
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-semibold">{{ title }}</h3>
            <button @click="close" class="text-gray-500 hover:text-gray-700">
              <i class="fa fa-times text-xl"></i>
            </button>
          </div>
        </div>
        
        <div class="p-6">
          <slot name="content" :item="currentItem" @update="updateItem"></slot>
        </div>
        
        <div class="p-6 border-t flex justify-end gap-3">
          <button 
            class="btn-secondary"
            @click="close"
          >
            取消
          </button>
          <button 
            class="btn-primary"
            @click="save"
          >
            {{ isNew ? '创建' : '保存' }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, ref } from 'vue';
  
  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    currentItem: {
      type: Object,
      default: null
    },
    isNew: {
      type: Boolean,
      default: false
    }
  });
  
  const emit = defineEmits(['close', 'save']);
  
  const updateItem = (field, value) => {
    // 可以在这里添加字段验证逻辑
    emit('update', field, value);
  };
  
  const save = () => {
    emit('save');
  };
  
  const close = () => {
    emit('close');
  };
  </script>