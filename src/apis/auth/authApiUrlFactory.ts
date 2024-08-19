const authApiUrlFactory = (() => {
  const BASE_PATH = import.meta.env.VITE_CMS_API_PATH;

  return {
    login() {
      return `${BASE_PATH}login/`;
    },

    logout() {
      return `${BASE_PATH}logout/`;
    },

    retrieveGroups() {
      return `${BASE_PATH}groups/`;
    },

    retrieveUser(id: string) {
      return `${BASE_PATH}users/${id}/`;
    },
  };
})();

export default authApiUrlFactory;
