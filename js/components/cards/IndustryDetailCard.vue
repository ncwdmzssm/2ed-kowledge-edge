<template>
    <div class="industry-detail-card">
      <!-- 头部：行业名称和标签 -->
      <div class="card-header">
        <div class="header-main">
          <h2 class="industry-name">{{ industry.name || '未命名行业' }}</h2>
          
          <!-- 标签区域 -->
          <div class="tags-container">
            <div v-if="isEditing">
              <input 
                type="text" 
                v-model="newTag" 
                class="tag-input"
                placeholder="输入标签后按回车添加"
                @keyup.enter="addTag"
              >
            </div>
            <div class="tags-list">
              <span 
                v-for="(tag, index) in displayedTags" 
                :key="index"
                class="tag-item"
              >
                {{ tag }}
                <button 
                  class="remove-tag" 
                  @click.stop="removeTag(index)"
                  v-if="isEditing"
                >×</button>
              </span>
            </div>
          </div>
        </div>
        
        <!-- 编辑按钮 -->
        <button class="edit-toggle" @click="toggleEditMode">
          <i class="fa fa-edit"></i> {{ isEditing ? '取消' : '编辑' }}
        </button>
      </div>
  
      <!-- 发展现状 -->
      <div class="content-section">
        <h3 class="section-title">发展现状</h3>
        <div v-if="isEditing" class="edit-content">
          <textarea 
            v-model="editedData.currentStatus" 
            class="content-editor"
            placeholder="描述该行业当前的发展状况..."
          ></textarea>
        </div>
        <div v-else class="display-content">
          {{ editedData.currentStatus || '暂无发展现状描述' }}
        </div>
      </div>
  
      <!-- 技术历史进程 -->
      <div class="content-section">
        <h3 class="section-title">技术历史进程</h3>
        <div v-if="isEditing" class="edit-content">
          <p class="format-hint">提示：使用冒号(:)分隔时间与事件，每行一个事件</p>
          <textarea 
            v-model="techHistoryText" 
            class="content-editor"
            placeholder="例如：2000年: 技术诞生&#10;2010年: 首次商业化应用"
          ></textarea>
        </div>
        <div v-else class="timeline">
          <div 
            v-for="(event, index) in parsedTechHistory" 
            :key="index"
            class="timeline-item"
          >
            <div class="timeline-time">{{ event.time || '时间' }}</div>
            <div class="timeline-content">{{ event.content || '事件描述' }}</div>
          </div>
          <div v-if="parsedTechHistory.length === 0" class="empty-state">
            暂无技术历史进程记录
          </div>
        </div>
      </div>
  
      <!-- 商业典型案例 -->
      <div class="content-section">
        <h3 class="section-title">商业典型案例</h3>
        
        <div v-if="isEditing" class="edit-content">
          <p class="format-hint">支持Markdown格式，例如：# 案例标题、**加粗**、[链接](url)</p>
          <textarea 
            v-model="editedData.businessCases" 
            class="content-editor cases-editor"
            placeholder="输入商业案例，支持Markdown格式..."
          ></textarea>
        </div>
        
        <div v-else class="cases-container">
          <div 
            v-for="(caseItem, index) in parsedCases" 
            :key="index"
            class="case-card"
          >
            <div class="case-header" @click="toggleCaseExpand(index)">
              <h4 class="case-title">{{ caseItem.title || `案例 ${index + 1}` }}</h4>
              <i class="fa" :class="caseItem.expanded ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
            </div>
            <div 
              class="case-content markdown-body" 
              v-if="caseItem.expanded"
              v-html="caseItem.contentHtml"
            ></div>
          </div>
          <div v-if="parsedCases.length === 0" class="empty-state">
            暂无商业典型案例
          </div>
        </div>
      </div>
  
      <!-- 保存按钮 -->
      <div v-if="isEditing" class="save-section">
        <button class="save-btn" @click="saveChanges">
          <i class="fa fa-save"></i> 保存修改
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, computed } from 'vue';
  import { marked } from 'marked';
  
  // 接收行业数据
  const props = defineProps({
    industry: {
      type: Object,
      required: true,
      default: () => ({})
    }
  });
  
  // 发出事件
  const emit = defineEmits(['save']);
  
  // 状态管理
  const isEditing = ref(false);
  const editedData = ref({
    name: '',
    tags: [],
    currentStatus: '',
    techHistory: [],
    businessCases: ''
  });
  const newTag = ref('');
  const expandedCases = ref([]);
  
  // 初始化数据
  watch(() => props.industry, () => {
    editedData.value = {
      name: props.industry.name || '',
      tags: [...(props.industry.tags || [])],
      currentStatus: props.industry.currentStatus || '',
      techHistory: [...(props.industry.techHistory || [])],
      businessCases: props.industry.businessCases || ''
    };
    // 初始化案例展开状态
    expandedCases.value = Array(parsedCases.value.length).fill(false);
  }, { immediate: true });
  
  // 处理标签
  const displayedTags = computed(() => editedData.value.tags);
  
  const addTag = () => {
    if (newTag.value.trim() && !displayedTags.value.includes(newTag.value.trim())) {
      editedData.value.tags.push(newTag.value.trim());
      newTag.value = '';
    }
  };
  
  const removeTag = (index) => {
    editedData.value.tags.splice(index, 1);
  };
  
  // 处理技术历史进程
  const techHistoryText = computed({
    get() {
      return editedData.value.techHistory
        .map(item => `${item.time || ''}: ${item.content || ''}`)
        .join('\n');
    },
    set(value) {
      const historyItems = value.split('\n')
        .filter(line => line.trim())
        .map(line => {
          const [time, ...contentParts] = line.split(':');
          return {
            time: time?.trim() || '',
            content: contentParts.join(':').trim() || ''
          };
        });
      editedData.value.techHistory = historyItems;
    }
  });
  
  const parsedTechHistory = computed(() => editedData.value.techHistory || []);
  
  // 处理商业案例
  const parsedCases = computed(() => {
    if (!editedData.value.businessCases) return [];
    
    // 简单解析Markdown标题作为案例分隔
    const caseBlocks = editedData.value.businessCases.split(/^#{1,3}\s+/m);
    if (caseBlocks[0] === '') caseBlocks.shift();
    
    return caseBlocks.map((block, index) => {
      const [title, ...contentLines] = block.split('\n');
      const content = contentLines.join('\n').trim();
      return {
        title: title || `案例 ${index + 1}`,
        content: content,
        contentHtml: marked(content),
        expanded: expandedCases.value[index] || false
      };
    });
  });
  
  const toggleCaseExpand = (index) => {
    expandedCases.value[index] = !expandedCases.value[index];
  };
  
  // 编辑模式切换
  const toggleEditMode = () => {
    if (isEditing.value) {
      // 取消编辑时重置数据
      editedData.value = { ...props.industry };
    }
    isEditing.value = !isEditing.value;
  };
  
  // 保存修改
  const saveChanges = () => {
    const updatedIndustry = {
      ...props.industry,
      ...editedData.value,
      updatedAt: new Date().toISOString()
    };
    emit('save', updatedIndustry);
    isEditing.value = false;
  };
  </script>
  
  <style scoped>

  .industry-detail-card {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    padding: 24px;
    max-width: 1000px;
    margin: 0 auto;
  }
  
  /* 头部样式 */
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;
    gap: 16px;
  }
  
  .header-main {
    flex: 1;
  }
  
  .industry-name {
    margin: 0 0 16px 0;
    font-size: 24px;
    color: #1f2937;
  }
  
  /* 标签样式 */
  .tags-container {
    margin-bottom: 8px;
  }
  
  .tag-input {
    padding: 6px 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 8px;
    width: 250px;
    font-size: 14px;
  }
  
  .tags-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .tag-item {
    display: inline-flex;
    align-items: center;
    background: #f1f5f9;
    color: #334155;
    padding: 4px 10px;
    border-radius: 16px;
    font-size: 13px;
    gap: 6px;
  }
  
  .remove-tag {
    background: none;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    font-size: 12px;
    line-height: 1;
    padding: 0;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .remove-tag:hover {
    color: #ef4444;
  }
  
  /* 编辑按钮 */
  .edit-toggle {
    padding: 6px 12px;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    white-space: nowrap;
  }
  
  .edit-toggle:hover {
    background: #2563eb;
  }
  
  /* 内容区块通用样式 */
  .content-section {
    margin-bottom: 32px;
    padding-bottom: 16px;
    border-bottom: 1px solid #f1f5f9;
  }
  
  .content-section:last-child {
    border-bottom: none;
    margin-bottom: 16px;
  }
  
  .section-title {
    margin: 0 0 16px 0;
    font-size: 18px;
    color: #1e293b;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .section-title::before {
    content: '';
    width: 4px;
    height: 18px;
    background: #3b82f6;
    border-radius: 2px;
  }
  
  /* 编辑模式样式 */
  .edit-content {
    position: relative;
  }
  
  .content-editor {
    width: 100%;
    min-height: 120px;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-family: inherit;
    font-size: 14px;
    line-height: 1.6;
    resize: vertical;
    box-sizing: border-box;
  }
  
  .cases-editor {
    min-height: 200px;
  }
  
  .format-hint {
    margin: 0 0 8px 0;
    font-size: 12px;
    color: #64748b;
    font-style: italic;
  }
  
  /* 展示模式样式 */
  .display-content {
    line-height: 1.8;
    color: #334155;
    font-size: 14px;
  }
  
  /* 技术历史进程时间线 */
  .timeline {
    position: relative;
    padding-left: 32px;
    margin-left: 8px;
  }
  
  .timeline::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #e2e8f0;
  }
  
  .timeline-item {
    position: relative;
    margin-bottom: 24px;
  }
  
  .timeline-item::before {
    content: '';
    position: absolute;
    left: -36px;
    top: 4px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #3b82f6;
    border: 2px solid white;
    box-shadow: 0 0 0 2px #dbeafe;
  }
  
  .timeline-time {
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 4px;
    font-size: 14px;
  }
  
  .timeline-content {
    line-height: 1.6;
    color: #334155;
    font-size: 14px;
  }
  
  /* 商业案例样式 */
  .cases-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .case-card {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .case-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: #f8fafc;
    cursor: pointer;
  }
  
  .case-header:hover {
    background: #f1f5f9;
  }
  
  .case-title {
    margin: 0;
    font-size: 16px;
    color: #1e293b;
  }
  
  .case-content {
    padding: 16px;
    line-height: 1.8;
  }
  
  /* 空状态 */
  .empty-state {
    padding: 24px;
    text-align: center;
    color: #94a3b8;
    background: #f8fafc;
    border-radius: 8px;
    font-size: 14px;
  }
  
  /* 保存按钮区域 */
  .save-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
  }
  
  .save-btn {
    padding: 8px 16px;
    background: #10b981;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
  }
  
  .save-btn:hover {
    background: #059669;
  }
  
  /* Markdown样式 */
  .markdown-body h1 {
    font-size: 1.8em;
    margin: 1em 0 0.5em;
  }
  
  .markdown-body h2 {
    font-size: 1.5em;
    margin: 1em 0 0.5em;
  }
  
  .markdown-body p {
    margin: 0 0 1em;
  }
  
  .markdown-body strong {
    font-weight: 600;
  }
  
  .markdown-body em {
    font-style: italic;
  }
  
  .markdown-body a {
    color: #3b82f6;
    text-decoration: none;
  }
  
  .markdown-body a:hover {
    text-decoration: underline;
  }
  
  .markdown-body ul, .markdown-body ol {
    margin: 0 0 1em 1.5em;
    padding: 0;
  }
  
  .markdown-body li {
    margin: 0.3em 0;
  }
  
  /* 响应式调整 */
  @media (max-width: 768px) {
    .industry-detail-card {
      padding: 16px;
    }
    
    .card-header {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .tag-input {
      width: 100%;
    }
    
    .timeline {
      padding-left: 24px;
    }
    
    .timeline-item::before {
      left: -28px;
    }
  }
    </style>
  