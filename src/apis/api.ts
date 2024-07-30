import axios from 'axios';

export default (function createAPI() {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10_000,
  });

  api.interceptors.request.use(config => {
    try {
      console.log('api request interceptors');
      return config;
    } catch(error) {
      return Promise.reject(error);
    }
  });

  api.interceptors.response.use(response => {
    try {
      console.log('api response interceptors');
      return response;
    } catch(error) {
      return Promise.reject(error);
    }
  });

  return api;
}());
