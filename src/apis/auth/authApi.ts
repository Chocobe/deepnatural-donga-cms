// api
import api from '../api';
import authApiUrlFactory from './authApiUrlFactory';
// util
import createApiWithNoticeMessageGroup from '@/utils/createApiWithNoticeMessageGroup';
// type
import { 
  TLoginApiRequestParams,
  TLoginApiResponse,

  TRetrieveUserInfoApiResponse,

  TRetrieveGroupsApiResponse,

  TRetrieveUsersApiRequestParams,
  TRetrieveUsersApiResponse,

  TPatchUserApiRequestParams,
} from './authApi.type';
// util
import noticeMessageGroupFactory from '@/utils/noticeMessageGroupFactory';
import excludeNullOrUndefinedProperties from '@/utils/excludeNullOrUndefinedProperties/excludeNullOrUndefinedProperties';

//
// 로그인
//
export const loginApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TLoginApiRequestParams) => {
    const {
      payload,
    } = params;

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

//
// 로그아웃
//
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

//
// 비밀번호 찾기
//
// FIXME: mockup
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

//
// (GET) 현재 계정의 사용자 정보
//
export const retrieveUserInfoApi = createApiWithNoticeMessageGroup({
  apiFunction: () => {
    return api.get<TRetrieveUserInfoApiResponse>(
      authApiUrlFactory.retrieveUserInfo()
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .auth
    .retrieveUserInfo,
});

//
// (GET) 그룹 목록
//
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

//
// (GET) 사용자 목록
//
export const retrieveUsersApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TRetrieveUsersApiRequestParams) => {
    const {
      searchParams,
    } = params;

    const _searchParams = excludeNullOrUndefinedProperties(searchParams);

    return api.get<TRetrieveUsersApiResponse>(
      authApiUrlFactory.retrieveUsers(),
      {
        params: _searchParams,
      }
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .auth
    .retrieveUsers,
});

//
// (PATCH) 사용자 수정
//
export const patchUserApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TPatchUserApiRequestParams) => {
    const {
      pathParams,
      payload,
    } = params;

    return api.patch(
      authApiUrlFactory.patchUser(pathParams),
      payload
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .auth
    .patchUser,
});
