import httpClient from '../../httpClient';
import { servicePath } from '..';

const controllerPath = '/password';

export const changePassword = async (body: { new_password: string; old_password: string }) =>
  httpClient.post(`${servicePath}${controllerPath}/change-password`, body);
