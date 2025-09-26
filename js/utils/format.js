// 新建 js/utils/format.js
export function formatDate(dateString) {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }
  
  // 新建 js/utils/validation.js
  export function validateTags(tags) {
    return Array.isArray(tags) && tags.every(tag => typeof tag === 'string' && tag.trim())
  }