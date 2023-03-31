import axios from 'axios';
import { APP_ROUTES } from 'constant/app-routes';
import { ACCESS_TOKEN, ORG_TOKEN } from 'constant/global';

const token = localStorage.getItem(ACCESS_TOKEN);
const org_token = localStorage.getItem(ORG_TOKEN);

export const AppAPIInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setToken = (token: string) => {
  AppAPIInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const setOrgToken = (orgToken: string) => {
  AppAPIInstance.defaults.headers.common['org-token'] = `${orgToken}`;
};

if (token) {
  setToken(token);
}

if (org_token) {
  setOrgToken(org_token);
}

AppAPIInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      const _window: any = window;
      // _window.location = '/';
      _window.location.reload();
    }
    return Promise.reject(error);
  }
);
