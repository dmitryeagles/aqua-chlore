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

  return config;
});

export default httpClient;
