<template>
  <div class="software-pros-cons">
    <div class="section-header">
      <h2>优缺点分析</h2>
      <button class="edit-btn">编辑</button>
    </div>
    <div class="pros-cons-container">
      <div class="pros">
        <h3>
          <i class="pros-icon"></i> 优点
        </h3>
        <ul>
          <li v-for="(pro, index) in software.pros" :key="index">
            {{ pro || '[优点描述]' }}
          </li>
          <li v-if="software.pros.length === 0" class="placeholder-li">
            [请添加优点]
          </li>
        </ul>
      </div>
      <div class="cons">
        <h3>
          <i class="cons-icon"></i> 缺点
        </h3>
        <ul>
          <li v-for="(con, index) in software.cons" :key="index">
            {{ con || '[缺点描述]' }}
          </li>
          <li v-if="software.cons.length === 0" class="placeholder-li">
            [请添加缺点]
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  software: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
/* 优缺点分析 */
.pros-cons-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-bottom: 30px;
}

.pros,
.cons {
  background-color: #fff;
  border-radius: 6px;
  padding: 15px;
  border: 1px solid #eee;
}

.pros h3,
.cons h3 {
  font-size: 16px;
  margin: 0 0 15px 0;
  display: flex;
  align-items: center;
}

.pros-icon {
  color: #52c41a;
  margin-right: 8px;
}

.cons-icon {
  color: #ff4d4f;
  margin-right: 8px;
}

.pros ul,
.cons ul {
  padding-left: 20px;
  margin: 0;
}

.pros li,
.cons li {
  margin-bottom: 8px;
  line-height: 1.6;
}

.placeholder-li {
  color: #999;
  list-style: none;
  padding-left: 0;
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

.add-btn,
.edit-btn {
  margin-left: auto;
  padding: 4px 10px;
  border: 1px dashed #1890ff;
  border-radius: 4px;
  background-color: transparent;
  color: #1890ff;
  cursor: pointer;
  font-size: 14px;
}

.add-btn:hover,
.edit-btn:hover {
  background-color: #e6f7ff;
}
</style>
