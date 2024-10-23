const mathToolApiUrlFactory = (() => {
  const BASE_PATH = `${import.meta.env.VITE_CMS_API_PATH}annotation`;

  return {
    retrieveMathToolSourcesPath() {
      return `${BASE_PATH}/source/`;
    },

    retrieveMathToolTextbooksPath() {
      return `${BASE_PATH}/textbook/`;
    },

    retrieveMathToolChapter1Path() {
      return `${BASE_PATH}/chapter1/`;
    },

    retrieveMathToolChapter2Path() {
      return `${BASE_PATH}/chapter2/`;
    },

    retrieveMathToolChapter3Path() {
      return `${BASE_PATH}/chapter3/`;
    },
  } as const;
})();

export default mathToolApiUrlFactory;
