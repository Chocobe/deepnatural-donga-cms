// axios
import axios, { 
  AxiosError,
} from 'axios';
// store
import useAuthApiStore from '@/store/authApiStore/authApiStore';
// router
import routePathFactory from '@/routes/routePathFactory';

export default (function createAPI() {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10_000,
  });

  api.interceptors.request.use(
    config => {
      const loginToken = useAuthApiStore
        .getState()
        .login
        .state
        .data;

      if (loginToken?.token) {
        config.headers.Authorization = `Token ${loginToken.token}`;
      }

      return config;
    },
    (error: any) => {
      throw error;
    }
  );

  api.interceptors.response.use(
    response => {
      return response;
    },
    (error: AxiosError) => {
      const status = error.response?.status;
      const isRootPage = window.location.pathname === routePathFactory
        .auth
        .getAuthRootPath();

      if (status == 401 && !isRootPage) {
        useAuthApiStore
          .getState()
          .login
          .action
          .removeLoginState();

        window.location.href = routePathFactory
          .auth
          .getAuthRootPath();

        return;
      }

      throw error;
    }
  );

  return api;
}());
