const mathApiUrlFactory = (() => {
  const BASE_PATH = import.meta.env.VITE_CMS_API_PATH;

  return {
    // (GET) 수학 교과서 목록
    retrieveMathTextbooks() {
      return `${BASE_PATH}textbooks/`;
    },
  };
})();

export default mathApiUrlFactory;
