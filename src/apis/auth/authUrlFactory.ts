const authUrlFactory = (() => {
  const BASE_PATH = import.meta.env.VITE_CMS_API_PATH;

  return {
    login() {
      return `${BASE_PATH}login/`;
    },
  };
})();

export default authUrlFactory;
