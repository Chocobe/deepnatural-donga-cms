type TNoticeMessage = {
  title: string;
  message: string;
};

export type TNoticeMessageGroup = {
  loadingMessage: () => TNoticeMessage;
  errorMessage: () => TNoticeMessage;
  successMessage?: () => TNoticeMessage;
};

const createNetworkErrorMessage = (
  target: string
) => ({
  title: '',
  message: `${target}, 네트워크 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.`,
});

const noticeMessageGroupFactory: {
  apis: {
    auth: {
      login: TNoticeMessageGroup;
      logout: TNoticeMessageGroup;
      findPassword: TNoticeMessageGroup;
      retrieveUserInfo: TNoticeMessageGroup;
      retrieveGroups: TNoticeMessageGroup;
    };
    math: {
      retrieveMathTextbooks: TNoticeMessageGroup;
      retrieveMathTextbookHistories: TNoticeMessageGroup;
    };
  };
} = {
  apis: {
    auth: {
      // 로그인
      login: {
        loadingMessage: () => ({
          title: '',
          message: '로그인 중입니다.',
        }),
        errorMessage: () => ({
          title: '',
          message: '아이디 또는 비밀번호가 일치하지 않습니다.',
        }),
        successMessage: undefined,
      },

      // 로그아웃
      logout: {
        loadingMessage: () => ({
          title: '',
          message: '로그아웃 중입니다.',
        }),
        errorMessage: () => ({
          ...createNetworkErrorMessage('로그아웃 중'),
        }),
        successMessage: undefined,
      },

      // 비밀번호 찾기
      findPassword: {
        loadingMessage: () => ({
          title: '',
          message: '임시 비밀번호를 발급 중입니다.',
        }),
        errorMessage: () => ({
          ...createNetworkErrorMessage('비밀번호 찾기 중'),
        }),
        successMessage: () => ({
          title: '비밀번호 찾기',
          message: '등록된 이메일로 임시발급된 비밀번호를 보내드렸습니다.',
        }),
      },

      // (GET) 현재 계정의 사용자 정보
      retrieveUserInfo: {
        loadingMessage: () => ({
          title: '',
          message: '',
        }),
        errorMessage: () => ({
          ...createNetworkErrorMessage('사용자 정보 조회 중'),
        }),
        successMessage: () => ({
          title: '',
          message: '',
        }),
      },

      // (GET) 그룹 목록
      retrieveGroups: {
        loadingMessage: () => ({
          title: '',
          message: '',
        }),
        errorMessage: () => ({
          ...createNetworkErrorMessage('그룹 목록 조회 중'),
        }),
        successMessage: undefined,
      },
    } as const,

    math: {
      // (GET) 수학 교과서 목록
      retrieveMathTextbooks: {
        loadingMessage: () => ({
          title: '',
          message: '수학 교과서 목록을 불러오고 있습니다.',
        }),
        errorMessage: () => ({
          ...createNetworkErrorMessage('수학 교과서 목록을 불러오는 중'),
        }),
        successMessage: undefined,
      },

      // (GET) 수학 교과서 히스토리 목록
      retrieveMathTextbookHistories: {
        loadingMessage: () => ({
          title: '',
          message: '수학 교과서 히스토리를 불러오고 있습니다.',
        }),
        errorMessage: () => ({
          ...createNetworkErrorMessage('수학 교과서 히스토리를 불러오는 중'),
        }),
      },
    },
  },
} as const;

export default noticeMessageGroupFactory;
