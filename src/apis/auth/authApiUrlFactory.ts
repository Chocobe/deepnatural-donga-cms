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

    // (GET) 현재 계정의 사용자 정보
    retrieveUserInfo() {
      return `${BASE_PATH}userinfo/`;
    },

    // (GET) 그룹 목록
    retrieveGroups() {
      return `${BASE_PATH}groups/`;
    },

    // (GET) 사용자 목록
    retrieveUsers() {
      return `${BASE_PATH}users/`;
    },

    // (PATCH) 사용자 수정
    patchUser(pathParams: {
      userId: number
    }) {
      const {
        userId,
      } = pathParams;

      return `${this.retrieveUsers()}${userId}/`;
    },
  };
})();

export default authApiUrlFactory;
