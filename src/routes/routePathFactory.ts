const routePathFactory = {
  auth: {
    getLayoutPath() {
      return '/';
    },
    getLoginPagePath() {
      return this.getLayoutPath();
    },
    getFindPasswordPagePath() {
      return 'find-password';
    },
  },
} as const;

export default routePathFactory;
