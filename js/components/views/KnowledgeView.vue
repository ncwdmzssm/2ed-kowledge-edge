<template>
    <div class="knowledge-view">
      <!-- 知识平台头部区域 -->
      <div class="knowledge-header">
        <h1>知识管理平台</h1>
        <p>汇聚专业知识，助力高效学习与工作</p>
        <div class="header-actions">
          <button class="create-knowledge-btn">创建知识</button>
          <button class="import-knowledge-btn">导入知识</button>
        </div>
      </div>
  
      <!-- 知识分类区域 -->
      <div class="knowledge-category">
        <h2>知识分类</h2>
        <div class="category-tabs">
          <button
            v-for="(category, index) in categories"
            :key="index"
            :class="['category-tab', { 'active': activeCategory === index }]"
            @click="activeCategory = index"
          >
            {{ category.name }}
          </button>
        </div>
        <div class="category-content">
          <div v-if="activeCategory === 0" class="category-detail">
            <p>{{ categories[0].description || '[请描述技术类知识包含的领域、特点等]' }}</p>
            <div class="sub-category">
              <span v-for="(sub, subIndex) in categories[0].subCategories" :key="subIndex" class="sub-category-item">
                {{ sub }}
              </span>
            </div>
          </div>
          <div v-else-if="activeCategory === 1" class="category-detail">
            <p>{{ categories[1].description || '[请描述业务类知识包含的方向、作用等]' }}</p>
            <div class="sub-category">
              <span v-for="(sub, subIndex) in categories[1].subCategories" :key="subIndex" class="sub-category-item">
                {{ sub }}
              </span>
            </div>
          </div>
          <div v-else-if="activeCategory === 2" class="category-detail">
            <p>{{ categories[2].description || '[请描述行业类知识涉及的领域、价值等]' }}</p>
            <div class="sub-category">
              <span v-for="(sub, subIndex) in categories[2].subCategories" :key="subIndex" class="sub-category-item">
                {{ sub }}
              </span>
            </div>
          </div>
        </div>
      </div>
  
      <!-- 热门知识区域 -->
      <div class="hot-knowledge">
        <h2>热门知识</h2>
        <div class="knowledge-list">
          <div
            v-for="(knowledge, index) in hotKnowledges"
            :key="index"
            class="knowledge-item"
            @click="viewKnowledgeDetail(knowledge)"
          >
            <h3>{{ knowledge.title || '[知识标题]' }}</h3>
            <p class="knowledge-desc">{{ knowledge.desc || '[知识简要描述]' }}</p>
            <div class="knowledge-meta">
              <span class="knowledge-category">{{ knowledge.category || '[所属分类]' }}</span>
              <span class="knowledge-view">{{ knowledge.viewCount || '0' }} 阅读</span>
              <span class="knowledge-like">{{ knowledge.likeCount || '0' }} 点赞</span>
            </div>
          </div>
        </div>
      </div>
  
      <!-- 知识贡献者区域 -->
      <div class="knowledge-contributor">
        <h2>知识贡献者</h2>
        <div class="contributor-list">
          <div v-for="(contributor, index) in contributors" :key="index" class="contributor-item">
            <img :src="contributor.avatar || defaultAvatar" alt="贡献者头像" class="contributor-avatar" />
            <div class="contributor-info">
              <h3>{{ contributor.name || '[贡献者姓名]' }}</h3>
              <p class="contributor-title">{{ contributor.title || '[职位/职称]' }}</p>
              <p class="contributor-desc">{{ contributor.desc || '[贡献者简介]' }}</p>
              <div class="contributor-stats">
                <span>{{ contributor.knowledgeCount || '0' }} 篇知识</span>
                <span>{{ contributor.likeCount || '0' }} 获赞</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- 知识统计区域 -->
      <div class="knowledge-stats">
        <h2>知识统计</h2>
        <div class="stats-container">
          <div class="stats-item">
            <h3>{{ totalKnowledge || '0' }}</h3>
            <p>总知识量</p>
          </div>
          <div class="stats-item">
            <h3>{{ todayAdd || '0' }}</h3>
            <p>今日新增</p>
          </div>
          <div class="stats-item">
            <h3>{{ totalView || '0' }}</h3>
            <p>总阅读量</p>
          </div>
          <div class="stats-item">
            <h3>{{ totalLike || '0' }}</h3>
            <p>总点赞量</p>
          </div>
        </div>
      </div>

      <!-- 前沿知识区域 -->
      <div>
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">前沿知识</h2>
          <button 
            class="btn-primary"
            @click="$emit('add')"
          >
            <i class="fa fa-plus mr-2"></i>添加知识
          </button>
        </div>
    
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="item in items"
            :key="item.id"
            class="bg-white rounded-lg shadow p-6 card-hover cursor-pointer border-l-4 border-transparent hover:border-primary"
            @click="$emit('edit', item)"
          >
            <h3 class="text-lg font-semibold mb-2 text-gray-800">{{ item.title }}</h3>
            <div class="flex flex-wrap gap-2 mb-3">
              <span
                v-for="tag in item.tags"
                :key="tag"
                class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full"
              >
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
  
  // 分类数据
  const categories = ref([
    {
      name: '技术',
      description: '',
      subCategories: ['前端开发', '后端开发', '移动开发', '云计算', '大数据']
    },
    {
      name: '业务',
      description: '',
      subCategories: ['销售技巧', '客户管理', '项目管理', '市场营销']
    },
    {
      name: '行业',
      description: '',
      subCategories: ['金融', '医疗', '教育', '互联网', '制造业']
    }
  ]);
  const activeCategory = ref(0);
  
  // 热门知识数据
  const hotKnowledges = ref([
    {
      title: '',
      desc: '',
      category: '',
      viewCount: '',
      likeCount: ''
    },
    {
      title: '',
      desc: '',
      category: '',
      viewCount: '',
      likeCount: ''
    },
    {
      title: '',
      desc: '',
      category: '',
      viewCount: '',
      likeCount: ''
    }
  ]);
  
  // 贡献者数据
  const contributors = ref([
    {
      name: '',
      title: '',
      desc: '',
      knowledgeCount: '',
      likeCount: '',
      avatar: ''
    },
    {
      name: '',
      title: '',
      desc: '',
      knowledgeCount: '',
      likeCount: '',
      avatar: ''
    }
  ]);
  
  // 统计数据
  const totalKnowledge = ref('');
  const todayAdd = ref('');
  const totalView = ref('');
  const totalLike = ref('');
  
  // 默认头像
  const defaultAvatar = 'https://picsum.photos/100/100?grayscale&blur=2';
  
  // 查看知识详情方法（可后续完善）
  const viewKnowledgeDetail = (knowledge) => {
    console.log('查看知识详情：', knowledge);
  };

  defineProps({
    items: Array
  })
  
  defineEmits(['edit', 'add'])
  </script>
  
  <style scoped>
  .knowledge-view {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #333;
  }
  
  .knowledge-header {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .knowledge-header h1 {
    font-size: 32px;
    margin: 0 0 10px 0;
  }
  
  .knowledge-header p {
    font-size: 16px;
    color: #666;
    margin: 0 0 20px 0;
  }
  
  .header-actions {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  
  .create-knowledge-btn,
  .import-knowledge-btn {
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;
  }
  
  .create-knowledge-btn {
    background-color: #1890ff;
    border: 1px solid #1890ff;
    color: #fff;
  }
  
  .create-knowledge-btn:hover {
    background-color: #096dd9;
  }
  
  .import-knowledge-btn {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #666;
  }
  
  .import-knowledge-btn:hover {
    border-color: #1890ff;
    color: #1890ff;
  }
  
  .knowledge-category,
  .hot-knowledge,
  .knowledge-contributor,
  .knowledge-stats {
    margin-bottom: 30px;
  }
  
  .knowledge-category h2,
  .hot-knowledge h2,
  .knowledge-contributor h2,
  .knowledge-stats h2 {
    font-size: 20px;
    margin: 0 0 15px 0;
  }
  
  .category-tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
  }
  
  .category-tab {
    padding: 8px 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .category-tab.active {
    background-color: #1890ff;
    color: #fff;
    border-color: #1890ff;
  }
  
  .category-detail {
    background-color: #fafafa;
    border-radius: 8px;
    padding: 20px;
  }
  
  .sub-category {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 10px;
  }
  
  .sub-category-item {
    padding: 4px 10px;
    background-color: #f0f7ff;
    border-radius: 12px;
    font-size: 13px;
    color: #1890ff;
  }
  
  .knowledge-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 15px;
  }
  
  .knowledge-item {
    border: 1px solid #eee;
    border-radius: 6px;
    padding: 15px;
    background-color: #fff;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .knowledge-item:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .knowledge-item h3 {
    font-size: 16px;
    margin: 0 0 8px 0;
  }
  
  .knowledge-desc {
    font-size: 14px;
    color: #666;
    margin: 0 0 10px 0;
    line-height: 1.5;
  }
  
  .knowledge-meta {
    display: flex;
    gap: 15px;
    font-size: 12px;
    color: #999;
  }
  
  .contributor-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
  }
  
  .contributor-item {
    display: flex;
    align-items: flex-start;
    border: 1px solid #eee;
    border-radius: 6px;
    padding: 15px;
    background-color: #fff;
  }
  
  .contributor-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 15px;
  }
  
  .contributor-info h3 {
    font-size: 16px;
    margin: 0 0 5px 0;
  }
  
  .contributor-title {
    font-size: 14px;
    color: #666;
    margin: 0 0 8px 0;
  }
  
  .contributor-desc {
    font-size: 13px;
    color: #888;
    margin: 0 0 10px 0;
    line-height: 1.4;
  }
  
  .contributor-stats {
    display: flex;
    gap: 15px;
    font-size: 12px;
    color: #999;
  }
  
  .stats-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
  
  .stats-item {
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 6px;
    padding: 20px;
    text-align: center;
  }
  
  .stats-item h3 {
    font-size: 24px;
    margin: 0 0 5px 0;
  }
  
  .stats-item p {
    font-size: 14px;
    color: #666;
    margin: 0;
  }
  
  @media (max-width: 768px) {
    .category-tabs {
      flex-wrap: wrap;
    }
  
    .stats-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  </style>