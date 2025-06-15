import type { Component } from 'vue';
import type { LocationQuery, RouteParamsGeneric, RouteRecordNameGeneric } from 'vue-router';
import { PermissionsNames, ResponseCodes, RoleNames, RouteNames } from '@/shared/lib/constants';

export type ValueOf<T> = T[keyof T]; // для использования объектов as const вместо enum

export type RoleValue = ValueOf<typeof RoleNames>;
export type PermissionValue = ValueOf<typeof PermissionsNames>;
export type RouteNameValue = ValueOf<typeof RouteNames>;
export type ResposeCodeValue = ValueOf<typeof ResponseCodes>;

export interface IEntity {
  id: string;
  name: string;
}

export interface IError {
  code: ResposeCodeValue;
  message: string;
}

export interface IException {
  name: string;
  message: string;
  code: number;
  type: 'Error';
  file: string;
  line: number;
  'stack-trace': string[];
}

export interface IResponse<T = unknown> {
  values: T[];
  exceptions?: IException[];
  errors: IError[];
  status: boolean;
  pages: any[];
}

export interface IResponseUploadFile<T> {
  values: T;
  errors: IError[];
  status: boolean;
  pages: any[];
}

export interface IAttachment {
  id?: string;
  path: string;
  size: number;
  name: string;
  type: string;
}

export interface IDocument {
  name: string;
  show_row_info?: boolean | string;
  attachment: IAttachment;
}

export interface IDefaultTab {
  id: string;
  label: string;
  component?: Component;
  data?: any;
  props?: Record<string, any>;
}

export interface IRedirectRoute {
  name: RouteRecordNameGeneric;
  params: RouteParamsGeneric;
  query: LocationQuery;
}
