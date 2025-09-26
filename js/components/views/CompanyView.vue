<template>
    <div class="company-view">
      <!-- 公司基本信息区域 -->
      <div class="company-basic">
        <div class="company-header">
          <img :src="company.logo || placeholderLogo" alt="公司logo" class="company-logo" />
          <div class="company-title">
            <h1>{{ company.name || '[请输入公司名称]' }}</h1>
            <p>{{ company.englishName || '[请输入英文名称，可选]' }}</p>
            <div class="company-tags">
              <span v-for="(tag, index) in company.tags" :key="index" class="tag">{{ tag }}</span>
              <span v-if="company.tags.length === 0" class="placeholder-tag">[添加标签，如：行业属性、企业规模等]</span>
            </div>
          </div>
          <div class="company-actions">
            <button class="edit-tag-btn">编辑标签</button>
            <button class="edit-content-btn">编辑内容</button>
          </div>
        </div>
  
        <div class="company-info">
          <h2>迅速了解公司</h2>
          <button class="edit-info-btn">编辑</button>
          <p class="company-desc">
            {{ company.description || '[请输入公司简介，简要介绍公司的核心业务、定位和特点]' }}
          </p>
          <div class="company-meta">
            <div class="meta-item">
              <span class="meta-label">总部地点</span>
              <span class="meta-value">{{ company.headquarters || '[如：城市/地区]' }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">成立时间</span>
              <span class="meta-value">{{ company.foundedTime || '[如：YYYY年MM月]' }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">创始人</span>
              <span class="meta-value">{{ company.founders || '[可填写多位，用逗号分隔]' }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">市值(可选)</span>
              <span class="meta-value">{{ company.marketValue || '[如：XX亿元/美元]' }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">员工数量</span>
              <span class="meta-value">{{ company.employeeCount || '[如：XX人]' }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">主要产品</span>
              <span class="meta-value">{{ company.mainProducts || '[核心产品/服务，用逗号分隔]' }}</span>
            </div>
          </div>
        </div>
      </div>
  
      <!-- 主要行业区域 -->
      <div class="company-industry">
        <div class="section-header">
          <h2>主要行业</h2>
          <button class="add-btn">+ 添加</button>
        </div>
        <div class="industry-list">
          <div v-for="(industry, index) in company.industries" :key="index" class="industry-item">
            <div class="industry-icon">
              <i class="fas fa-industry"></i>
            </div>
            <div class="industry-info">
              <h3>{{ industry.name || '[行业名称]' }}</h3>
              <p>{{ industry.desc || '[公司在该行业的定位、市场地位等说明]' }}</p>
            </div>
            <button class="delete-btn">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div v-if="company.industries.length === 0" class="empty-placeholder">
            <p>暂无行业信息，点击"添加"按钮录入公司涉及的主要行业</p>
          </div>
        </div>
      </div>
  
      <!-- 主要产品区域 -->
      <div class="company-product">
        <div class="section-header">
          <h2>主要产品</h2>
          <button class="add-btn">+ 添加</button>
        </div>
        <div class="product-list">
          <div v-for="(product, index) in company.products" :key="index" class="product-item">
            <div class="product-icon">
              <i class="fas fa-box"></i>
            </div>
            <div class="product-info">
              <h3>{{ product.name || '[产品/服务名称]' }}</h3>
              <p>{{ product.desc || '[产品特点、市场表现等说明]' }}</p>
            </div>
            <button class="delete-btn">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div v-if="company.products.length === 0" class="empty-placeholder">
            <p>暂无产品信息，点击"添加"按钮录入公司的主要产品或服务</p>
          </div>
        </div>
      </div>
  
      <!-- 企业历史大事件区域 -->
      <div class="company-history">
        <div class="section-header">
          <h2>企业历史大事件</h2>
          <button class="add-btn">+ 添加</button>
        </div>
        <div class="history-list">
          <div v-for="(event, index) in company.historyEvents" :key="index" class="history-item">
            <div class="event-dot"></div>
            <div class="event-content">
              <h3>{{ event.year || '[年份]' }}：{{ event.title || '[事件标题]' }}</h3>
              <p>{{ event.desc || '[事件详细描述]' }}</p>
            </div>
            <button class="delete-btn">
              <i class="fas fa-trash"></i>
            </button>
          </div>
          <div v-if="company.historyEvents.length === 0" class="empty-placeholder">
            <p>暂无历史事件，点击"添加"按钮录入公司发展历程中的重要事件</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // 空白公司数据结构（带提示性默认值）
  const company = ref({
    name: '', // 公司名称
    englishName: '', // 英文名称（可选）
    logo: '', // 公司logo图片地址
    tags: [], // 标签列表，如：['上市公司', '科技行业', '独角兽企业']
    description: '', // 公司简介
    headquarters: '', // 总部地点
    foundedTime: '', // 成立时间
    founders: '', // 创始人
    marketValue: '', // 市值（可选）
    employeeCount: '', // 员工数量
    mainProducts: '', // 主要产品/服务
    industries: [], // 主要行业
    products: [], // 主要产品详情
    historyEvents: [] // 历史大事件
  });
  
  // 占位图片（无logo时显示）
  const placeholderLogo = 'https://picsum.photos/80/80?grayscale&blur=2';
  </script>
  
  <style scoped>
  .company-view {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #333;
  }
  
  /* 头部样式 */
  .company-header {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    flex-wrap: wrap;
    gap: 15px;
  }
  
  .company-logo {
    width: 80px;
    height: 80px;
    border-radius: 4px;
    object-fit: contain;
    background-color: #f5f5f5;
    border: 1px dashed #ddd;
  }
  
  .company-title h1 {
    font-size: 28px;
    margin: 0 0 5px 0;
  }
  
  .company-title p {
    font-size: 16px;
    color: #666;
    margin: 0 0 10px 0;
    font-style: italic;
  }
  
  .company-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .tag {
    padding: 4px 10px;
    background-color: #f0f7ff;
    border-radius: 12px;
    font-size: 13px;
    color: #1890ff;
  }
  
  .placeholder-tag {
    padding: 4px 10px;
    background-color: #fafafa;
    border: 1px dashed #ddd;
    border-radius: 12px;
    font-size: 13px;
    color: #999;
  }
  
  .company-actions {
    margin-left: auto;
    display: flex;
    gap: 10px;
  }
  
  .edit-tag-btn, .edit-content-btn {
    padding: 6px 14px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;
  }
  
  .edit-tag-btn {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #666;
  }
  
  .edit-tag-btn:hover {
    border-color: #1890ff;
    color: #1890ff;
  }
  
  .edit-content-btn {
    background-color: #1890ff;
    border: 1px solid #1890ff;
    color: #fff;
  }
  
  .edit-content-btn:hover {
    background-color: #096dd9;
  }
  
  /* 基本信息区域 */
  .company-info {
    background-color: #fafafa;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 30px;
  }
  
  .company-info h2 {
    font-size: 18px;
    margin: 0 0 15px 0;
    display: flex;
    align-items: center;
  }
  
  .edit-info-btn {
    float: right;
    padding: 4px 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;
    font-size: 13px;
    color: #666;
  }
  
  .company-desc {
    line-height: 1.7;
    margin: 0 0 20px 0;
    padding: 10px;
    background-color: #fff;
    border-radius: 4px;
    min-height: 60px;
  }
  
  .company-meta {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 15px;
  }
  
  .meta-item {
    display: flex;
    flex-wrap: wrap;
    padding: 8px 10px;
    background-color: #fff;
    border-radius: 4px;
  }
  
  .meta-label {
    font-weight: 500;
    margin-right: 8px;
    color: #555;
    min-width: 80px;
  }
  
  .meta-value {
    color: #333;
    flex: 1;
  }
  
  /* 通用区块样式 */
  .section-header {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .section-header h2 {
    font-size: 18px;
    margin: 0;
  }
  
  .add-btn {
    margin-left: auto;
    padding: 4px 10px;
    border: 1px dashed #1890ff;
    border-radius: 4px;
    background-color: transparent;
    color: #1890ff;
    cursor: pointer;
    font-size: 14px;
  }
  
  .add-btn:hover {
    background-color: #e6f7ff;
  }
  
  /* 行业列表 */
  .industry-list, .product-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 15px;
    margin-bottom: 30px;
  }
  
  .industry-item, .product-item {
    display: flex;
    align-items: flex-start;
    border: 1px solid #eee;
    border-radius: 6px;
    padding: 15px;
    background-color: #fff;
  }
  
  .industry-icon, .product-icon {
    margin-right: 12px;
    color: #1890ff;
    font-size: 20px;
    padding-top: 3px;
  }
  
  .industry-info, .product-info {
    flex: 1;
  }
  
  .industry-info h3, .product-info h3 {
    font-size: 16px;
    margin: 0 0 5px 0;
  }
  
  .industry-info p, .product-info p {
    font-size: 14px;
    color: #666;
    margin: 0;
    line-height: 1.6;
  }
  
  /* 历史事件 */
  .company-history {
    margin-bottom: 30px;
  }
  
  .history-list {
    position: relative;
    padding-left: 20px;
  }
  
  .history-list::before {
    content: '';
    position: absolute;
    left: 5px;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: #eee;
  }
  
  .history-item {
    position: relative;
    margin-bottom: 25px;
    padding-right: 20px;
  }
  
  .event-dot {
    width: 12px;
    height: 12px;
    background-color: #1890ff;
    border-radius: 50%;
    position: absolute;
    left: -24px;
    top: 5px;
  }
  
  .event-content {
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 6px;
    padding: 15px;
  }
  
  .event-content h3 {
    font-size: 16px;
    margin: 0 0 5px 0;
  }
  
  .event-content p {
    font-size: 14px;
    color: #666;
    margin: 0;
    line-height: 1.6;
  }
  
  /* 删除按钮 */
  .delete-btn {
    background: transparent;
    border: none;
    color: #f5222d;
    cursor: pointer;
    padding: 4px;
    opacity: 0.7;
    transition: opacity 0.2s;
  }
  
  .delete-btn:hover {
    opacity: 1;
  }
  
  /* 空状态提示 */
  .empty-placeholder {
    padding: 30px 15px;
    text-align: center;
    border: 1px dashed #ddd;
    border-radius: 6px;
    color: #999;
    font-size: 14px;
    background-color: #fafafa;
  }
  
  /* 响应式调整 */
  @media (max-width: 768px) {
    .company-header {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .company-actions {
      margin-left: 0;
      width: 100%;
      justify-content: flex-end;
    }
    
    .industry-list, .product-list, .company-meta {
      grid-template-columns: 1fr;
    }
  }
  </style>
