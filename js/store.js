const STORAGE_KEY = 'business_analysis_db';

// 初始数据
const defaultData = {
  industries: [],
  companies: [],
  softwares: [],
  knowledge: []
};


import { createPinia } from 'pinia'

export const pinia = createPinia()


export function initializeStore() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
  }
}

export function loadData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultData;
  } catch (error) {
    console.error("Failed to load data from local storage:", error);
    return defaultData;
  }
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
