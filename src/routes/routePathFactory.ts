const routePathFactory = {
  auth: {
    getAuthRootPath() {
      return '/' as const;
    },
    getLoginPagePath() {
      return `${this.getAuthRootPath()}` as const;
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
  },

  setting: {
    getSettingRootPath() {
      return '/setting' as const;
    },
    getMyPagePath() {
      return `${this.getSettingRootPath()}/my-page` as const;
    },
    getSuperAdminPagePath() {
      return `${this.getSettingRootPath()}/super-admin` as const;
    },
  },
} as const;

export default routePathFactory;
