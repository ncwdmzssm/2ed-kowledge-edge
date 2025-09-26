<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
    
    <div class="relative min-h-screen flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-3xl animate-fade-in">
        <!-- 模态框头部 -->
        <div class="flex items-center justify-between p-4 border-b">
          <h3 class="text-lg font-medium">{{ item.title }}</h3>
          <button 
            class="text-gray-400 hover:text-gray-500"
            @click="$emit('close')"
          >
            <i class="fa fa-times"></i>
          </button>
        </div>

        <!-- 内容区域 -->
        <div class="p-6 max-h-[70vh] overflow-y-auto">
          <div v-if="isEditing">
            <textarea
              v-model="editedContent"
              class="w-full h-96 input-field font-mono"
              placeholder="支持 Markdown 格式..."
            ></textarea>
          </div>
          <div v-else>
            <div 
              class="markdown-body"
              v-html="renderedContent"
            ></div>
          </div>
        </div>

        <!-- 底部按钮 -->
        <div class="flex justify-end gap-3 p-4 border-t">
          <button 
            v-if="isEditing"
            class="btn-secondary"
            @click="cancelEdit"
          >
            取消
          </button>
          <button 
            v-if="isEditing"
            class="btn-primary"
            @click="saveEdit"
          >
            保存
          </button>
          <button 
            v-else
            class="btn-primary"
            @click="startEdit"
          >
            编辑
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'

// 配置 marked
marked.setOptions({
  highlight: (code, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value
    }
    return hljs.highlightAuto(code).value
  }
})

const props = defineProps({
  item: Object
})

const emit = defineEmits(['close', 'save'])

const isEditing = ref(false)
const editedContent = ref('')

const renderedContent = computed(() => {
  return marked(props.item.content)
})

const startEdit = () => {
  editedContent.value = props.item.content
  isEditing.value = true
}

const cancelEdit = () => {
  isEditing.value = false
}

const saveEdit = () => {
  emit('save', {
    ...props.item,
    content: editedContent.value
  })
  isEditing.value = false
}
</script>
