<template>
    <div class="company-view">
      <!-- 公司基本信息区域 -->
      <div class="info-card company-basic">
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
            <button class="action-btn"><i class="fas fa-tags"></i> 编辑标签</button>
            <button class="action-btn primary"><i class="fas fa-edit"></i> 编辑内容</button>
          </div>
        </div>
  
        <div class="company-info">
          <div class="section-header">
            <h2>迅速了解公司</h2>
            <button class="action-btn"><i class="fas fa-pen"></i> 编辑</button>
          </div>
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
      <div class="info-card company-industry">
        <div class="section-header">
          <h2>主要行业</h2>
          <button class="action-btn primary"><i class="fas fa-plus"></i> 添加</button>
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
      <div class="info-card company-product">
        <div class="section-header">
          <h2>主要产品</h2>
          <button class="action-btn primary"><i class="fas fa-plus"></i> 添加</button>
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
      <div class="info-card company-history">
        <div class="section-header">
          <h2>企业历史大事件</h2>
          <button class="action-btn primary"><i class="fas fa-plus"></i> 添加</button>
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
    padding: 24px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #333;
    background-color: #f0f2f5;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .info-card {
    background-color: #fff;
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    transition: box-shadow 0.3s;
  }

  .info-card:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }
  
  /* 头部样式 */
  .company-header {
    display: flex;
    align-items: center;
    padding-bottom: 24px;
    border-bottom: 1px solid #f0f0f0;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .company-logo {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    object-fit: contain;
    background-color: #f5f5f5;
    border: 1px solid #eee;
  }
  
  .company-title h1 {
    font-size: 26px;
    font-weight: 600;
    margin: 0 0 4px 0;
  }
  
  .company-title p {
    font-size: 15px;
    color: #888;
    margin: 0 0 12px 0;
  }
  
  .company-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .tag {
    padding: 3px 12px;
    background-color: #e6f7ff;
    border: 1px solid #91d5ff;
    border-radius: 4px;
    font-size: 12px;
    color: #096dd9;
    font-weight: 500;
  }
  
  .placeholder-tag {
    padding: 3px 12px;
    background-color: #fafafa;
    border: 1px dashed #d9d9d9;
    border-radius: 4px;
    font-size: 12px;
    color: #999;
  }
  
  .company-actions {
    margin-left: auto;
    display: flex;
    gap: 12px;
  }
  
  .action-btn {
    padding: 6px 14px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    color: #555;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .action-btn:hover {
    border-color: #40a9ff;
    color: #40a9ff;
  }

  .action-btn.primary {
    background-color: #1890ff;
    border-color: #1890ff;
    color: #fff;
  }

  .action-btn.primary:hover {
    background-color: #40a9ff;
    border-color: #40a9ff;
  }
  
  /* 基本信息区域 */
  .company-info {
    padding-top: 24px;
  }
  
  .company-info .section-header {
    margin-bottom: 16px;
  }
  
  .company-desc {
    line-height: 1.8;
    margin: 0 0 24px 0;
    padding: 12px 16px;
    background-color: #fafafa;
    border-radius: 6px;
    min-height: 60px;
    color: #555;
    border: 1px solid #f0f0f0;
  }
  
  .company-meta {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
  }
  
  .meta-item {
    display: flex;
    align-items: center;
    padding: 12px;
    background-color: #fafafa;
    border-radius: 6px;
    border: 1px solid #f0f0f0;
  }
  
  .meta-label {
    font-weight: 500;
    margin-right: 12px;
    color: #555;
    min-width: 70px;
    flex-shrink: 0;
  }
  
  .meta-value {
    color: #333;
    flex: 1;
    word-break: break-all;
  }
  
  /* 通用区块样式 */
  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .section-header h2 {
    font-size: 20px;
    font-weight: 600;
    margin: 0;
  }
  
  /* 行业与产品列表 */
  .industry-list, .product-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 16px;
  }
  
  .industry-item, .product-item {
    display: flex;
    align-items: flex-start;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    padding: 16px;
    background-color: #fff;
    transition: border-color 0.3s, box-shadow 0.3s;
  }

  .industry-item:hover, .product-item:hover {
    border-color: #e6f7ff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .industry-icon, .product-icon {
    margin-right: 16px;
    color: #1890ff;
    font-size: 22px;
    padding-top: 4px;
    width: 24px;
    text-align: center;
  }
  
  .industry-info, .product-info {
    flex: 1;
  }
  
  .industry-info h3, .product-info h3 {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 6px 0;
  }
  
  .industry-info p, .product-info p {
    font-size: 14px;
    color: #666;
    margin: 0;
    line-height: 1.7;
  }
  
  /* 历史事件 */
  .history-list {
    position: relative;
    padding-left: 30px;
    border-left: 2px solid #f0f0f0;
  }
  
  .history-item {
    position: relative;
    margin-bottom: 24px;
    padding-right: 20px;
  }

  .history-item:last-child {
    margin-bottom: 0;
  }
  
  .event-dot {
    width: 14px;
    height: 14px;
    background-color: #fff;
    border: 3px solid #1890ff;
    border-radius: 50%;
    position: absolute;
    left: -38px;
    top: 5px;
    z-index: 1;
  }
  
  .event-content {
    background-color: #fafafa;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    padding: 16px;
  }
  
  .event-content h3 {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 8px 0;
  }
  
  .event-content p {
    font-size: 14px;
    color: #666;
    margin: 0;
    line-height: 1.7;
  }
  
  /* 删除按钮 */
  .delete-btn {
    background: transparent;
    border: none;
    color: #ff4d4f;
    cursor: pointer;
    padding: 4px;
    opacity: 0; /* 默认隐藏 */
    transition: opacity 0.2s;
    font-size: 16px;
  }

  .industry-item:hover .delete-btn,
  .product-item:hover .delete-btn,
  .history-item:hover .delete-btn {
    opacity: 0.7;
  }
  
  .delete-btn:hover {
    opacity: 1;
  }
  
  /* 空状态提示 */
  .empty-placeholder {
    padding: 40px 20px;
    text-align: center;
    border: 1px dashed #d9d9d9;
    border-radius: 8px;
    color: #999;
    font-size: 14px;
    background-color: #fafafa;
    grid-column: 1 / -1; /* 跨越所有列 */
  }
  
  /* 响应式调整 */
  @media (max-width: 768px) {
    .company-view {
      padding: 16px;
      gap: 16px;
    }
    .info-card {
      padding: 16px;
    }
    .company-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
    
    .company-actions {
      margin-left: 0;
      width: 100%;
      justify-content: flex-start;
    }
    
    .industry-list, .product-list, .company-meta {
      grid-template-columns: 1fr;
    }
  }
  </style>
