import { AppAPIInstance } from 'config/axios-config';
import { API_ENDPOINTS } from 'constant/api-endpoints';

export const getUserProfileApi = async (token?: string) => {
  return AppAPIInstance.get(API_ENDPOINTS.fetch_user_profile, {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  });
};
