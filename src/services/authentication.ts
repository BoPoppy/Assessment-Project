import { AppAPIInstance } from 'config/axios-config';
import { API_ENDPOINTS } from 'constant/api-endpoints';

export const loginApi = async (data: any) => {
  return AppAPIInstance.post(API_ENDPOINTS.login, data);
};
