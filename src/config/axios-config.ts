import axios from 'axios';
import { ACCESS_TOKEN } from 'constant/global';

const token = localStorage.get(ACCESS_TOKEN);

export const AppAPIInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_REACT_APP_VINOVA_API}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setToken = (token: string) => {
  AppAPIInstance.defaults.headers.common['Authorization'] = token;
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
