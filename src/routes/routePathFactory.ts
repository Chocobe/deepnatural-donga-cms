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

  dashboard: {
    getDashboardRootPath() {
      return '/dashboard' as const;
    },
    getDashboardPagePath() {
      return this.getDashboardRootPath();
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

  english: {
    getEnglishRootPath() {
      return '/english' as const;
    },
    getTextbookPath() {
      return `${this.getEnglishRootPath()}/textbook` as const;
    },
  }
} as const;

export default routePathFactory;
