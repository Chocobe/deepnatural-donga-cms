// FIXME: CMS 파일구조와 통합하기 (삭제 예정)
// FIXME: CMS 파일구조와 통합하기 (삭제 예정)
// FIXME: CMS 파일구조와 통합하기 (삭제 예정)

// FIXME: 작업도구의 ApiManager 에서만 사용함
export const getCookie = (name: string) => {
  const regExp = new RegExp(`(^|;) ?${name}=([^;]*)(;|$)`);
  const value = document.cookie.match(regExp)?.[2];

  return value ?? null;
};
