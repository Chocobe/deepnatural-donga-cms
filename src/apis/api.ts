// axios
import axios, { 
  AxiosError,
} from 'axios';
// store
import useAuthApiStore from '@/store/authApiStore/authApiStore';
import useMathQuestionToolPageStore from '@/store/mathStores/mathQuestionToolPageStore/mathQuestionToolPageStore';
// router
import routePathFactory from '@/routes/routePathFactory';
// api
import ApiManager from './ApiManager';
import mathOCRUrlFactory from './mathOCR/mathOCRUrlFactory';

export default (function createAPI() {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10_000,
  });

  api.interceptors.request.use(
    config => {
      const url = config.url;

      const isMathPixAuthApi = url?.includes(mathOCRUrlFactory.produceMathPixAppToken());
      const isMathPixApi = url?.includes(import.meta.env.VITE_MATH_PIX_API_BASE_URL);

      switch(true) {
        case isMathPixAuthApi: {
          const mathPixAppKey = useMathQuestionToolPageStore
            .getState()
            .mathPixAuth
            .state
            .appKeyInfo;

          config.headers['app_key'] = mathPixAppKey;
          break;
        }

        case isMathPixApi: {
          const {
            appTokenInfo,
          } = useMathQuestionToolPageStore
            .getState()
            .mathPixAuth
            .state;

          config.headers['app_token'] = appTokenInfo.appToken;
          config.headers['app_token_expires_at'] = appTokenInfo.appTokenExpiresAt;
          break;
        }

        default: {
          const loginToken = useAuthApiStore
            .getState()
            .login
            .state
            .data;

          if (loginToken?.token) {
            config.headers.Authorization = `Token ${loginToken.token}`;
          }
        }
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
    async (error: AxiosError) => {
      const config = error.config;
      const url = config?.url;

      const status = error.response?.status;
      const isRootPage = window.location.pathname === routePathFactory
        .auth
        .getAuthRootPath();

      if (status != 401) {
        throw error;
      }

      if (url?.includes(import.meta.env.VITE_MATH_PIX_API_BASE_URL)) {
        const responseOfProduceMathPixAppToken = await ApiManager
          .mathOCR
          .produceMathPixAppToken();

        const mathPixAppToken = responseOfProduceMathPixAppToken.data;

        useMathQuestionToolPageStore()
          .mathPixAuth
          .action
          .setMathPixTokenInfo_action(mathPixAppToken);

        return api(config!);
      }

      if (!isRootPage) {
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
