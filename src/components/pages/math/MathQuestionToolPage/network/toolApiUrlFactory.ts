// FIXME: CMS 파일구조와 통합하기
// FIXME: CMS 파일구조와 통합하기
// FIXME: CMS 파일구조와 통합하기

const BASE_URL = import.meta.env.VITE_DONGA_CMS_BASE_URL;

const apiUrlFactory = {
  submitUrl() {
    return `${BASE_URL}/cms/api/questions/`;
  },
};

export default apiUrlFactory;
