// FIXME: CMS 파일구조와 통합하기
// FIXME: CMS 파일구조와 통합하기
// FIXME: CMS 파일구조와 통합하기

const BASE_URL = import.meta.env.VITE_DONGA_CMS_BASE_URL;
// const AWS_S3_BASE_URL = '/proxy-api';
// const AWS_S3_BASE_URL = import.meta.env.VITE_AWS_S3_API_BASE_URL;
// const MATH_PIX_BASE_URL = import.meta.env.VITE_MATH_PIX_API_BASE_URL;

const apiUrlFactory = {
  // FIXME: 삭제 예정
  // retrieveSourceListUrl(productName: string, page: string | number) {
  //   return `${BASE_URL}/cms/api/source/?product_name=${productName}&page=${page}`;
  // },

  retrieveKnowledgeConceptListUrl(title: string, page: string | number) {
    return `${BASE_URL}/cms/api/kc2/?title=${title}&page=${page}`;
  },

  retrieveTextbookListUrl(title: string, page: string | number) {
    return `${BASE_URL}/cms/api/textbook/?title=${title}&page=${page}`;
  },

  retrieveChapter1ListUrl(title: string, textbookTitle: string, page: string | number) {
    return `${BASE_URL}/cms/api/chapter1/?title=${title}&textbook_title=${textbookTitle}&page=${page}`;
  },

  retrieveChapter2ListUrl(
    title: string,
    textbookTitle: string,
    chapter1Title: string,
    page: string | number
  ) {
    return `${BASE_URL}/cms/api/chapter2/?title=${title}&textbook_title=${textbookTitle}&chapter1_title=${chapter1Title}&page=${page}`;
  },

  retrieveChapter3ListUrl(
    title: string,
    textbookTitle: string,
    chapter1Title: string,
    chapter2Title: string,
    page: string | number
  ) {
    return `${BASE_URL}/cms/api/chapter3/?title=${title}&textbook_title=${textbookTitle}&chapter1_title=${chapter1Title}&chapter2_title=${chapter2Title}&page=${page}`;
  },

  submitUrl() {
    return `${BASE_URL}/cms/api/questions/`;
  },
};

export default apiUrlFactory;
