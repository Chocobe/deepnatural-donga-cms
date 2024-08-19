// api
import api from '../api';
import autApihUrlFactory from './authApiUrlFactory';
// util
import createApiWithNoticeMessageGroup from '@/utils/createApiWithNoticeMessageGroup';
// type
import { 
  TLoginPayload,
  TLoginResponse,
} from './authApi.type';
import noticeMessageGroupFactory from '@/utils/noticeMessageGroupFactory';

// 로그인
export const loginApi = createApiWithNoticeMessageGroup({
  apiFunction: (payload: TLoginPayload) => {
    return api.post<TLoginResponse>(
      autApihUrlFactory.login(),
      payload
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .auth
    .login
});

// 로그아웃
export const logoutApi = createApiWithNoticeMessageGroup({
  apiFunction: () => {
    return api.post<void>(
      autApihUrlFactory.logout()
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .auth
    .logout
});

// 비밀번호 찾기
export const findPasswordApi = createApiWithNoticeMessageGroup({
  apiFunction: () => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5
          ? resolve()
          : reject();
      }, Math.random() * 1_000);
    });
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .auth
    .findPassword,
});
