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

    // 교과서
    getTextbookPath() {
      return `${this.getMathRootPath()}/textbook` as const;
    },
    getTextbookAddPath() {
      return `${this.getTextbookPath()}/add` as const;
    },
    getTextbookDetailPath(textbookId: string | number) {
      return `${this.getTextbookPath()}/${textbookId}` as const;
    },

    // 교과서 단원
    getChapterPath() {
      return `${this.getMathRootPath()}/chapter` as const;
    },
    getChapterAddPath() {
      return `${this.getChapterPath()}/add` as const;
    },
    getChapterDetailPath(chapterId: string | number) {
      return `${this.getChapterPath()}/${chapterId}` as const;
    },

    // 성취기준
    getAchievementPath() {
      return `${this.getMathRootPath()}/achievement` as const;
    },
    getAchievementAddPath() {
      return `${this.getAchievementPath()}/add` as const;
    },
    getAchievementDetailPath(achievementId: string | number) {
      return `${this.getAchievementPath()}/${achievementId}` as const;
    },

    // 지식개념
    getKnowledgeConceptPath() {
      return `${this.getMathRootPath()}/knowledge-concept` as const;
    },
    getKnowledgeConceptAddPage() {
      return `${this.getKnowledgeConceptPath()}/add` as const;
    },
    getKnowledgeConceptDetailPage(kc1Id: string | number) {
      return `${this.getKnowledgeConceptPath()}/${kc1Id}` as const;
    },

    // 시리즈-출처
    getSeriesSourcePath() {
      return `${this.getMathRootPath()}/series-source` as const;
    },
    getSeriesSourceAddPage() {
      return `${this.getSeriesSourcePath()}/add` as const;
    },

    // 지문
    // getInstructionPath() {
    //   return `${this.getMathRootPath()}/instruction` as const;
    // },

    // 문항
    getQuestionPath() {
      return `${this.getMathRootPath()}/question` as const;
    },
    getQuestionDetailPage(questionId: string | number) {
      return `${this.getQuestionPath()}/${questionId}` as const;
    },
    getQuestionToolPath() {
      return `${this.getQuestionPath()}/tool` as const;
    },
  },

  english: {
    getEnglishRootPath() {
      return '/english' as const;
    },

    // 교과서
    getTextbookPath() {
      return `${this.getEnglishRootPath()}/textbook` as const;
    },

    // 교과서 단원
    getChapterPath() {
      return `${this.getEnglishRootPath()}/chapter` as const;
    },

    // 성취기준
    getAchievementPath() {
      return `${this.getEnglishRootPath()}/achievement` as const;
    },

    // 지식개념
    getKnowledgeConceptPath() {
      return `${this.getEnglishRootPath()}/knowledge-concept` as const;
    },

    // 시리즈-출처
    getSeriesSourcePath() {
      return `${this.getEnglishRootPath()}/series-source` as const;
    },

    // 지문
    // getInstructionPath() {
    //   return `${this.getEnglishRootPath()}/instruction` as const;
    // },

    // 문항
    getQuestionPath() {
      return `${this.getEnglishRootPath()}/question` as const;
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
    getUserInfoEditPage(userId: string | number) {
      return `${this.getSuperAdminPagePath()}/${userId}` as const;
    },
  },
} as const;

export default routePathFactory;
