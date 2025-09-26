// 新建 js/storage/index.js
const STORAGE_KEY = 'business_analysis_db';

const defaultData = {
  industries: [],
  companies: [],
  softwares: [],
  knowledge: []
};

export function initializeStorage() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
  }
}

export function loadData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultData;
  } catch (error) {
    console.error("Failed to load data:", error);
    return defaultData;
  }
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}