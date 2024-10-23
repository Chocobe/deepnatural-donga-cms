const mathToolApiUrlFactory = (() => {
  const BASE_PATH = `${import.meta.env.VITE_CMS_API_PATH}annotation`;

  return {
    retrieveMathToolSourcesPath() {
      return `${BASE_PATH}/source/`;
    },

    retrieveMathToolTextbooksPath() {
      return `${BASE_PATH}/textbook/`;
    },
  } as const;
})();

export default mathToolApiUrlFactory;
