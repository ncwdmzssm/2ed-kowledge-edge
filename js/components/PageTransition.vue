<!-- 创建 js/components/PageTransition.vue -->
<template>
    <transition name="page">
      <slot />
    </transition>
  </template>
  
  <style scoped>
  .page-enter-active,
  .page-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .page-enter-from,
  .page-leave-to {
    opacity: 0;
  }
  </style>