const authLoadingMessageFactory = {
  getLoginMessage() {
    return '로그인 중입니다.';
  },

  getLogoutMessage() {
    return '로그아웃 중입니다.';
  },
} as const;

export default authLoadingMessageFactory;
