export interface IDevice {
  uuid: string;
  name: string;
  dateCreated: Date;
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
