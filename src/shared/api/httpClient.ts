import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

export interface IRequestConfig extends AxiosRequestConfig {
  accessType?: 'public' | 'private';
}

const httpClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
  },
});

httpClient.interceptors.request.use(async (config) => {
  if ('accessType' in config && config.accessType === 'public') {
    return config;
  }

  // Добавляем токен авторизации для приватных запросов
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Интерцептор для обработки ошибок авторизации
httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Токен истек или недействителен
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');

      // Перенаправляем на страницу входа, если не находимся на публичных страницах
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);

export default httpClient;
