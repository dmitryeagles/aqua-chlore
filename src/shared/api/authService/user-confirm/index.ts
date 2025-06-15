import type { IResponse } from '@/shared/lib/types';
import httpClient, { type IRequestConfig } from '../../httpClient';
import { servicePath } from '..';

const controllerPath = '/user-confirmation';

export const confirmEmail = async (code: string): Promise<boolean> => {
  const config: IRequestConfig = {
    accessType: 'public',
    params: { code },
  };

  return httpClient
    .get<IResponse<string>>(servicePath + controllerPath + '/confirm', config)
    .then((res) => res.data.status);
};
