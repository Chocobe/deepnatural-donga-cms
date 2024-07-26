const routePathFactory = {
  auth: {
    getAuthRootPath() {
      return '' as const;
    },
    getLoginPagePath() {
      return `${this.getAuthRootPath()}/` as const;
    },
    getFindPasswordPagePath() {
      return `${this.getAuthRootPath()}/find-password` as const;
    },
  },

  math: {
    getMathRootPath() {
      return '/math' as const;
    },
    getTextbookPath() {
      return `${this.getMathRootPath()}/textbook` as const;
    },
  },
} as const;

export default routePathFactory;
