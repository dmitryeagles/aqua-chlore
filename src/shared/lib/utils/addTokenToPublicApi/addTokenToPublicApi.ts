import type { IRequestConfig } from '@/shared/api/httpClient';

const getToken = () => localStorage.getItem('accessToken');

const addTokenToPublicApi = (config: IRequestConfig) => {
  const token = getToken();

  if (token) {
    config.headers = {};
    config.headers.Authorization = `Bearer ${token}`;
  }
};

export default addTokenToPublicApi;
