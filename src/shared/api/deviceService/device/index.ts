import httpClient from '../../httpClient';
import type * as TDevice from './types';

export const getDevices = async (): Promise<TDevice.IDevice[]> =>
  httpClient.get<TDevice.IDevice[]>(`/devices`).then((res) => res.data);

export const getDeviceMetrics = async (deviceId: string): Promise<TDevice.IDeviceMetricValue[]> =>
  httpClient
    .get<TDevice.IDeviceMetricValue[]>(`/devices/${deviceId}/metrics/values`)
    .then((res) => res.data);

export const deleteDevice = async (deviceId: string): Promise<null> =>
  httpClient.delete<null>(`/devices/${deviceId}`).then((res) => res.data);

export const updateMetrics = async (value: boolean): Promise<TDevice.IDevice[]> =>
  httpClient.post<TDevice.IDevice[]>(`/updateMetrics`, value).then((res) => res.data);

export const updateDevice = async (value: TDevice.IDevice): Promise<TDevice.IDevice> =>
  httpClient.put<TDevice.IDevice>(`/devices`, value).then((res) => res.data);

export const createDevice = async (value: TDevice.IDevice): Promise<TDevice.IDevice> =>
  httpClient.post<TDevice.IDevice>(`/devices`, value).then((res) => res.data);
