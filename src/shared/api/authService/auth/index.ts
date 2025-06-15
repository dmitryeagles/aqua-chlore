import type { IResponse } from '@/shared/lib/types';
import httpClient, { type IRequestConfig } from '../../httpClient';
import { servicePath } from '..';
import type * as TAuth from './types';

const controllerPath = '/auth';

export const createUser = async (data: FormData): Promise<boolean> => {
  const config: IRequestConfig = {
    accessType: 'public',
  };

  return httpClient
    .post(servicePath + controllerPath + '/create-user', data, config)
    .then((res) => res.data.status);
};

export const getToken = async (data: TAuth.GetTokenRequest) => {
  const config: IRequestConfig = {
    accessType: 'public',
  };

  return httpClient
    .post<IResponse<TAuth.TokenResponse>>(servicePath + controllerPath + '/get-token', data, config)
    .then((res) => res.data.values[0]);
};

export const refreshToken = async (
  data: TAuth.RefreshTokenRequest,
): Promise<TAuth.TokenResponse> => {
  const config: IRequestConfig = {
    accessType: 'public',
  };

  return httpClient
    .post<
      IResponse<TAuth.TokenResponse>
    >(servicePath + controllerPath + '/refresh-token', data, config)
    .then((res) => res.data.values[0]);
};
