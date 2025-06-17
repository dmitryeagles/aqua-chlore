import type { IResponse } from '@/shared/lib/types';
import httpClient from '../../httpClient';
import type * as TDevice from './types';

export const getDevices = async (): Promise<TDevice.IDevice[]> =>
  httpClient.get<TDevice.IDevice[]>(`/devices`).then((res) => res.data);

export const getDeviceMetrics = async (deviceId: string): Promise<TDevice.IDeviceMetricValue[]> =>
  httpClient
    .get<TDevice.IDeviceMetricValue[]>(`/devices/${deviceId}/metrics/values`)
    .then((res) => res.data);

export const updateMetrics = async (value: boolean): Promise<TDevice.IDevice[]> =>
  httpClient
    .post<IResponse<TDevice.IDevice[]>>(`/updateMetrics`, value)
    .then((res) => res.data.values[0]);
