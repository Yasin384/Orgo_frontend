// src/services/api.js
import axios from 'axios';

// Создаём экземпляр Axios с базовым URL вашего бэкенда
const api = axios.create({
  baseURL: 'https://orgoback-production.up.railway.app/api/', // Убедитесь, что этот URL правильный
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем перехватчик запросов для добавления токена авторизации
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;