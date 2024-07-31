// axios
import axios from 'axios';
// store
import useAuthApiStore from '@/store/authApiStore/authApiStore';

export default (function createAPI() {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10_000,
  });

  api.interceptors.request.use(config => {
    try {
      const loginToken = useAuthApiStore
        .getState()
        .login
        .state
        .data;

      if (loginToken?.token) {
        config.headers.Authorization = `Token ${loginToken.token}`;
      }

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
