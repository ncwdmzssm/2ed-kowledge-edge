<!-- 2ed-kowledge-edge/js/components/modals/IndustryDetailModal.vue -->
<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-container" @click.stop>
      <!-- 模态框头部 -->
      <div class="modal-header" :style="{ backgroundColor: headerColor.bg, color: headerColor.text }">
        <div class="header-left">
          <h3 class="modal-title">{{ item.title }}</h3>
          <!-- 标签区域 -->
          <div class="header-tags">
            <span v-for="tag in item.tags" :key="tag" class="tag-item" :style="{ backgroundColor: headerColor.tagBg, color: headerColor.tagText }">
              {{ tag }}
            </span>
          </div>
        </div>
        <div class="header-actions">
          <button class="header-btn" @click="toggleEditMode" :style="{ backgroundColor: headerColor.btnBg, color: headerColor.btnText }">
            <i class="fa fa-edit mr-1"></i>{{ isEditing ? '保存' : '编辑' }}
          </button>
          <button class="header-btn danger" @click="handleDelete" :style="{ backgroundColor: headerColor.btnBg, color: headerColor.btnText }">
            <i class="fa fa-trash mr-1"></i>删除
          </button>
          <button class="header-btn close" @click="$emit('close')" :style="{ backgroundColor: headerColor.btnBg, color: headerColor.btnText }">
            <i class="fa fa-times"></i>
          </button>
        </div>
      </div>
      
      <!-- 内容区域 -->
      <div class="modal-content">
        <div v-if="isEditing">
          <!-- 基本信息编辑 -->
          <div class="edit-section">
            <h4 class="edit-section-title">基本信息</h4>
            <input 
              v-model="editedItem.title" 
              class="title-input" 
              placeholder="行业名称"
            >
            <div class="edit-row">
              <input 
                v-model="editedItem.category" 
                class="category-input" 
                placeholder="行业类别"
              >
              <input 
                v-model="editedItem.growthRate" 
                class="growth-rate-input" 
                placeholder="增长率(%)"
                type="number"
              >
              <input 
                v-model="editedItem.companiesCount" 
                class="companies-count-input" 
                placeholder="企业数量"
                type="number"
              >
            </div>
          </div>
          
          <!-- Markdown编辑区域 - 分块 -->
          <div class="edit-section">
            <h4 class="edit-section-title">发展现状</h4>
            <textarea
              v-model="editedContent.currentSituation"
              class="edit-input"
              placeholder="请输入行业发展现状，支持Markdown格式..."
            ></textarea>
          </div>
          
          <div class="edit-section">
            <h4 class="edit-section-title">技术发展历史</h4>
            <textarea
              v-model="editedContent.techHistory"
              class="edit-input"
              placeholder="请输入技术发展历史，每行一个事件，用冒号分隔，如：2010年：事件A"
            ></textarea>
          </div>
          
          <div class="edit-section">
            <h4 class="edit-section-title">商业案例</h4>
            <textarea
              v-model="editedContent.businessCases"
              class="edit-input"
              placeholder="请输入商业案例，支持Markdown格式...每个案例的标题写在第一行，然后用 '---' 分隔不同案例"
            ></textarea>
          </div>
        </div>
        
        <div v-else class="industry-detail">
          <!-- 发展现状 -->
          <div class="content-section">
            <h4 class="section-heading"><i class="fa fa-line-chart mr-2 text-gray-400"></i>发展现状</h4>
            <div class="markdown-body" v-html="renderedContent.currentSituation"></div>
          </div>

          <!-- 技术发展历史 -->
          <div class="content-section">
            <h4 class="section-heading"><i class="fa fa-cogs mr-2 text-gray-400"></i>技术历史进程</h4>
            <div class="timeline">
              <div v-for="(event, index) in techHistoryEvents" :key="index" class="timeline-item">
                <div class="timeline-dot" :style="{ backgroundColor: headerColor.bg }"></div>
                <div class="timeline-content">
                  <p class="timeline-title">{{ event.title }}</p>
                  <p class="timeline-desc">{{ event.desc }}</p>
                </div>
              </div>
              <div v-if="!techHistoryEvents.length" class="empty-text">
                [ 暂无技术发展历史 ]
              </div>
            </div>
          </div>

          <!-- 商业典型案例 -->
          <div class="content-section">
            <h4 class="section-heading"><i class="fa fa-briefcase mr-2 text-gray-400"></i>商业典型案例</h4>
            <div v-if="businessCases.length">
              <ExpandableCard
                v-for="(caseItem, index) in businessCases"
                :key="index"
                :title="caseItem.title"
                :content="caseItem.content"
                :theme-color="headerColor.bg"
              />
            </div>
            <div v-else class="empty-text">
              [ 暂无商业案例 ]
            </div>
          </div>
        </div>
      </div>
      
      <!-- 底部按钮 -->
      <div class="modal-footer" v-if="isEditing">
        <button class="btn-secondary" @click="cancelEdit">取消</button>
        <button class="btn-primary" @click="saveEdit" :style="{ backgroundColor: headerColor.bg }">保存更改</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { marked } from 'marked'
import ExpandableCard from '../cards/ExpandableCard.vue';

// --- Helper Functions ---
/**
 * Generates a consistent, visually appealing color palette from a string.
 * @param {string} str The input string (e.g., industry title).
 * @returns {{bg: string, text: string, tagBg: string, tagText: string, btnBg: string, btnText: string}}
 */
function generateColorPalette(str) {
  if (!str) str = "default";
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = hash % 360;
  const s = 70; // Saturation
  const l = 95; // Lightness for background

  const bg = `hsl(${h}, ${s}%, ${l}%)`;
  const text = `hsl(${h}, ${s}%, 20%)`;
  const tagBg = `hsl(${h}, ${s}%, 88%)`;
  const tagText = `hsl(${h}, ${s}%, 30%)`;
  const btnBg = `hsl(${h}, ${s}%, 92%)`;
  const btnText = `hsl(${h}, ${s}%, 25%)`;
  
  return { bg, text, tagBg, tagText, btnBg, btnText };
}

const props = defineProps({
  item: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

const emit = defineEmits(['close', 'save', 'delete'])

// 编辑状态管理
const isEditing = ref(false)
const editedItem = ref({})
const editedContent = ref({
  overview: '',
  currentSituation: '',
  leadingCompanies: '',
  techHistory: '',
  businessCases: ''
})

// 初始化编辑数据
watch(() => props.item, (newItem) => {
  editedItem.value = { ...newItem }
  editedContent.value = {
    overview: newItem.content?.overview || '',
    currentSituation: newItem.content?.currentSituation || '',
    leadingCompanies: newItem.content?.leadingCompanies || '',
    techHistory: newItem.content?.techHistory || '',
    businessCases: newItem.content?.businessCases || ''
  }
}, { immediate: true })

const headerColor = computed(() => generateColorPalette(props.item.title));

// 渲染Markdown内容
const renderedContent = computed(() => ({
  overview: marked(props.item.content?.overview || '[暂无行业简介]'),
  currentSituation: marked(props.item.content?.currentSituation || '[暂无发展现状描述]'),
  leadingCompanies: marked(props.item.content?.leadingCompanies || '[暂无龙头企业信息]'),
  techHistory: marked(props.item.content?.techHistory || '[暂无技术发展历史]'),
  businessCases: marked(props.item.content?.businessCases || '[暂无商业案例]')
}));

// 解析技术发展历史
const techHistoryEvents = computed(() => {
  const historyText = props.item.content?.techHistory || '';
  if (!historyText) return [];
  return historyText.split('\n').map(line => {
    const parts = line.split(/[:：]/, 2);
    if (parts.length < 2) return null;
    return {
      title: parts[0].trim(),
      desc: parts[1].trim()
    };
  }).filter(Boolean);
});

// 解析商业案例
const businessCases = computed(() => {
  const casesText = props.item.content?.businessCases || '';
  if (!casesText) return [];
  return casesText.split('---').map(caseBlock => {
    const lines = caseBlock.trim().split('\n');
    const title = lines.shift()?.replace(/^#+\s*/, '').trim() || '案例详情';
    const content = marked(lines.join('\n'));
    return { title, content };
  }).filter(c => c.content.trim());
});

// 切换编辑模式
const toggleEditMode = () => {
  if (isEditing.value) {
    saveEdit()
  } else {
    isEditing.value = true
  }
}

// 取消编辑
const cancelEdit = () => {
  isEditing.value = false
  // 重置编辑数据
  editedItem.value = { ...props.item }
  editedContent.value = {
    overview: props.item.content?.overview || '',
    currentSituation: props.item.content?.currentSituation || '',
    leadingCompanies: props.item.content?.leadingCompanies || '',
    techHistory: props.item.content?.techHistory || '',
    businessCases: props.item.content?.businessCases || ''
  }
}

// 保存编辑
const saveEdit = () => {
  emit('save', {
    ...editedItem.value,
    content: { ...editedContent.value },
    updatedAt: new Date().toISOString()
  })
  isEditing.value = false
}

// 处理删除
const handleDelete = () => {
  if (confirm(`确定要删除行业 "${props.item.title}" 吗？此操作不可撤销。`)) {
    emit('delete', props.item.id)
    emit('close')
  }
}
</script>

<style scoped>
/* 样式保持现有基础上，添加以下补充样式 */
.modal-header {
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  transition: background-color 0.3s ease;
}

.header-left {
  flex-grow: 1;
}

.modal-title {
  font-size: 22px;
  font-weight: 700;
  margin: 0;
}

.header-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.tag-item {
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.header-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  margin-left: 16px;
}

.header-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s ease;
}
.header-btn:hover {
  opacity: 0.8;
}
.header-btn.danger:hover {
  background-color: #ff4d4f !important;
  color: white !important;
}

.modal-content {
  padding: 24px;
  max-height: 70vh;
  overflow-y: auto;
}

.edit-section {
  margin-bottom: 24px;
}

.edit-section-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #1f2937;
}

.title-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 16px;
  font-size: 16px;
}

.edit-row {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.category-input,
.growth-rate-input,
.companies-count-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.edit-input {
  width: 100%;
  min-height: 120px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-family: monospace;
  resize: vertical;
}

.content-section {
  margin-bottom: 28px;
}

.section-heading {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  align-items: center;
}

.markdown-body {
  font-size: 14px;
  line-height: 1.7;
  color: #374151;
}

.empty-text {
  color: #9ca3af;
  font-style: italic;
  font-size: 14px;
}

/* 时间轴样式 */
.timeline {
  position: relative;
  padding-left: 20px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 5px;
  top: 5px;
  bottom: 5px;
  width: 2px;
  background-color: #e5e7eb;
}

.timeline-item {
  position: relative;
  margin-bottom: 16px;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: -25px;
  top: 5px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 0 0 2px #e5e7eb;
}

.timeline-title {
  font-weight: 600;
  color: #374151;
  margin: 0 0 4px 0;
}

.timeline-desc {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  line-height: 1.6;
}

.modal-footer {
  padding: 16px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-top: 1px solid #f3f4f6;
}

.btn-secondary {
  padding: 8px 16px;
  background-color: #f3f4f6;
  color: #4b5563;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}
.btn-secondary:hover {
  background-color: #e5e7eb;
}

.btn-primary {
  padding: 8px 16px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  opacity: 0.85;
}
</style>