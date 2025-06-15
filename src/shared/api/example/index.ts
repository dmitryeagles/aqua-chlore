import type { mockList } from '@/shared/lib/constants';
import httpClient, { type IRequestConfig } from '../httpClient';
import type { TExample } from './example.types';

const apiModule = '/example';

export default {
  example: async (body: TExample.IExamplePayload): Promise<TExample.IExampleResponse> => {
    const config: IRequestConfig = {
      accessType: 'public',
    };

    return httpClient.post(`${apiModule}`, body, config).then((res) => res.data);
  },
  getExamples: async (): Promise<typeof mockList> =>
    httpClient.get(`${apiModule}`).then((res) => res.data),
};
