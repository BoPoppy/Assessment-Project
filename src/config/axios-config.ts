import axios from 'axios';
import { ACCESS_TOKEN } from 'constant/global';

const token = localStorage.getItem(ACCESS_TOKEN);

export const AppAPIInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setToken = (token: string) => {
  AppAPIInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

if (token) {
  setToken(token);
}

AppAPIInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
