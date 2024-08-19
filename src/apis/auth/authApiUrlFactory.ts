const authApiUrlFactory = (() => {
  const BASE_PATH = import.meta.env.VITE_CMS_API_PATH;

  return {
    login() {
      return `${BASE_PATH}login/`;
    },

    logout() {
      return `${BASE_PATH}logout/`;
    },

    retrieveUserInfo() {
      return `${BASE_PATH}userinfo/`;
    },

    retrieveGroups() {
      return `${BASE_PATH}groups/`;
    },
  };
})();

export default authApiUrlFactory;
