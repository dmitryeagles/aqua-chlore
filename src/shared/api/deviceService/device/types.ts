type DeviceStatus = 'active' | 'warning' | 'error';

export interface IDevice {
  uuid: string;
  name: string;
  dateCreated: string;
  representative: string;
  phone: string;
  address: string;
  status: DeviceStatus;
}

export interface IDeviceMetricValue {
  uuid: string;
  value: number | string | boolean;
  metric: {
    uuid: string;
    name: string;
    type: 'number' | 'string' | 'boolean';
  };
}
