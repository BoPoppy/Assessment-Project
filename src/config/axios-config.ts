import axios from 'axios';
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
    return Promise.reject(error);
  }
);
