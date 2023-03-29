import { AppAPIInstance } from 'config/axios-config';
import { API_ENDPOINTS } from 'constant/api-endpoints';
import { LOGIN_BODY_TYPE } from 'models/authentication';

export const loginApi = async (data: LOGIN_BODY_TYPE) => {
  return AppAPIInstance.post(API_ENDPOINTS.login, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: {
      tenantDomain: 'carbon.super',
    },
  });
};
