// type
import { 
  TPatchUserApiRequestParams,
} from './authApi.type';

const authApiUrlFactory = (() => {
  const BASE_PATH = import.meta.env.VITE_CMS_API_PATH;

  return {
    // 로그인
    login() {
      return `${BASE_PATH}login/`;
    },

    // 로그아웃
    logout() {
      return `${BASE_PATH}logout/`;
    },

    // 임시 비밀번호 생성
    randomPassword() {
      return `${BASE_PATH}random-password/`;
    },

    // 비밀번호 변경
    changePassword() {
      return `${BASE_PATH}change-password/`;
    },

    // 회원가입
    signup() {
      return `${BASE_PATH}signup/`;
    },

    // (GET) 현재 계정의 사용자 정보
    retrieveUserInfo() {
      return `${BASE_PATH}userinfo/`;
    },

    // (GET) 그룹 목록
    retrieveGroups() {
      return `${BASE_PATH}groups/`;
    },

    // (GET) 사용자 수
    retrieveUsersCount() {
      return `${this.retrieveUsers()}count/`;
    },

    // (GET) 사용자 목록
    retrieveUsers() {
      return `${BASE_PATH}users/`;
    },

    // (PATCH) 사용자 수정
    patchUser(pathParams: TPatchUserApiRequestParams['pathParams']) {
      const {
        userId,
      } = pathParams;

      return `${this.retrieveUsers()}${userId}/`;
    },
  };
})();

export default authApiUrlFactory;
