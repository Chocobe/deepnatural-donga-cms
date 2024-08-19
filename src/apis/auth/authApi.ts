// api
import api from '../api';
import authApiUrlFactory from './authApiUrlFactory';
// util
import createApiWithNoticeMessageGroup from '@/utils/createApiWithNoticeMessageGroup';
// type
import { 
  TRetrieveGroupsApiResponse,
  TLoginApiPayload,
  TLoginApiResponse,
} from './authApi.type';
import noticeMessageGroupFactory from '@/utils/noticeMessageGroupFactory';
import { 
  TUserModel,
} from '../models/authModel.type';

// 로그인
export const loginApi = createApiWithNoticeMessageGroup({
  apiFunction: (payload: TLoginApiPayload) => {
    return api.post<TLoginApiResponse>(
      authApiUrlFactory.login(),
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
      authApiUrlFactory.logout()
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

// (GET) 그룹 목록
export const retrieveGroupsApi = createApiWithNoticeMessageGroup({
  apiFunction: () => {
    return api.get<TRetrieveGroupsApiResponse>(
      authApiUrlFactory.retrieveGroups()
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .auth
    .retrieveGroups,
});

// (GET) 현재 계정의 사용자 정보
export const retrieveUserApi = createApiWithNoticeMessageGroup({
  apiFunction: (id: string) => {
    // FIXME: TRetrieveUserApiResponse 로 바꾸기
    return api.get<TUserModel>(
      authApiUrlFactory.retrieveUser(id)
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .auth
    .retrieveUser,
});
