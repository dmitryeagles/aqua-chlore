import type { IResponse } from '@/shared/lib/types';
import httpClient from '../../httpClient';
import { servicePath } from '..';
import type * as TDevice from './types';

const controllerPath = '/devicecontroller';

export const getMetrics = async (): Promise<TDevice.IDevice[]> =>
  httpClient
    .get<IResponse<TDevice.IDevice[]>>(`/devices`)
    .then((res) => res.data.values[0]);

export const updateMetrics = async ( 
  value: boolean,
): Promise<TDevice.IDevice[]> =>
  httpClient
    .post<
      IResponse<TDevice.IDevice[]>
    >(`${servicePath}${controllerPath}/updateMetrics`, value)
    .then((res) => res.data.values[0]);