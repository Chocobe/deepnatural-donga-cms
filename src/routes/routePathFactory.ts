const routePathFactory = {
  auth: {
    getAuthRootPath() {
      return '/' as const;
    },
    getLoginPagePath() {
      return `${this.getAuthRootPath()}` as const;
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
    // 교과서
    getTextbookPath() {
      return `${this.getMathRootPath()}/textbook` as const;
    },
    // 교과서 단원
    getChapterPath() {
      return `${this.getMathRootPath()}/chapter` as const;
    },
    // 성취기준
    getAchievementPath() {
      return `${this.getMathRootPath()}/achievement` as const;
    },
    // 지식개념
    getKnowledgeConceptPath() {
      return `${this.getMathRootPath()}/knowledge-concept` as const;
    },
    // 시리즈-출처
    getSeriesSourcePath() {
      return `${this.getMathRootPath()}/series-source` as const;
    },
    // 지문
    getInstructionPath() {
      return `${this.getMathRootPath()}/instruction` as const;
    },
    // 문항
    getQuestionPath() {
      return `${this.getMathRootPath()}/question` as const;
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
} as const;

export default routePathFactory;
