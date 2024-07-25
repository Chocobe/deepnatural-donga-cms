const routePathFactory = {
  auth: {
    getLayoutPath() {
      return '/';
    },
    getLoginPagePath() {
      return '';
    },
  },
} as const;

export default routePathFactory;
