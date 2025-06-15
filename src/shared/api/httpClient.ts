import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { ResponseCodes } from '@/shared/lib/constants';
import { handleApiError, handleApiResponse } from '@/shared/lib/utils';

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

httpClient.interceptors.response.use(
  (response) => {
    try {
      handleApiResponse(response.data);

      return response;
    } catch (error) {
      handleApiError(error);
    }
  },
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      handleApiError(error);
    }

    switch (error.response.status) {
      case ResponseCodes.UNAUTH:
        if (!originalRequest.retry) {
          originalRequest.retry = true;

          return axios(originalRequest);
        }
        break;
      case ResponseCodes.NOT_FOUND:
        break;
      case ResponseCodes.FORBIDDEN:
        break;
      case ResponseCodes.BAD_GATEWAY:
      case ResponseCodes.SERVER_ERROR:
        return handleApiError(error);
    }

    return Promise.reject(error);
  },
);

export default httpClient;
