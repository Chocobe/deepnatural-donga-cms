type TNoticeMessage = {
  title: string;
  message: string;
};

type TNoticeMessageFunction = (...params: Array<any>) => TNoticeMessage;

export type TNoticeMessageGroup = {
  loadingMessage: TNoticeMessageFunction;
  errorMessage: TNoticeMessageFunction;
  successMessage?: TNoticeMessageFunction;
};

const createNetworkErrorMessage = (
  target: string
) => ({
  title: '',
  message: `${target}, 네트워크 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.`,
});

// FIXME: apis, math 분리하기
const noticeMessageGroupFactory: {
  apis: {
    auth: {
      login: TNoticeMessageGroup;
      logout: TNoticeMessageGroup;
      randomPassword: TNoticeMessageGroup;
      signup: TNoticeMessageGroup;
      findPassword: TNoticeMessageGroup;
      retrieveUserInfo: TNoticeMessageGroup;
      retrieveGroups: TNoticeMessageGroup;
      retrieveUsersCount: TNoticeMessageGroup;
      retrieveUsers: TNoticeMessageGroup;
      patchUser: TNoticeMessageGroup;
    };
    // FIXME: textbook, chapter, etc. 분리하기
    math: {
      // 교과서
      retrieveMathTextbooks: TNoticeMessageGroup;
      retrieveMathTextbook: TNoticeMessageGroup;
      patchMathTextbook: TNoticeMessageGroup;
      produceMathTextbook: TNoticeMessageGroup;
      deleteMathTextbook: TNoticeMessageGroup;
      retrieveMathTextbookHistories: TNoticeMessageGroup;

      // 단원정보
      retrieveMathChapters: TNoticeMessageGroup;
      produceMathChapter: TNoticeMessageGroup;

      // 성취기준
      retrieveMathAchievements: TNoticeMessageGroup;
      produceMathAchievement: TNoticeMessageGroup;

      // 지식개념
      retrieveMathKnowledgeConcepts: TNoticeMessageGroup;
      produceMathKnowledgeConcept: TNoticeMessageGroup;

      // 시리즈-출처
      retrieveMathSeriesSources: TNoticeMessageGroup;
      produceMathSeriesSources: TNoticeMessageGroup;

      // 지문
      retrieveMathInstructions: TNoticeMessageGroup;

      // 문항
      retrieveMathQuestions: TNoticeMessageGroup;
    };
  };

  uis: {
    math: {
      confirmDeleteMathTextbooks: TNoticeMessageFunction;
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

      // 임시 비밀번호 생성
      randomPassword: {
        loadingMessage: () => ({
          title: '',
          message: '임시 비밀번호를 생성 중입니다.',
        }),
        errorMessage: () => ({
          ...createNetworkErrorMessage('임시 비밀번호 생성 중'),
        }),
        successMessage: undefined,
      },

      // 회원가입
      signup: {
        loadingMessage: () => ({
          title: '',
          message: '신규 사용자를 등록하는 중입니다.',
        }),
        errorMessage: () => ({
          ...createNetworkErrorMessage('신규 사용자를 등록하는 중'),
        }),
        successMessage: () => ({
          title: '',
          message: '신규 사용자 등록이 완료되었습니다.',
        }),
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

      // (GET) 사용자 수
      retrieveUsersCount: {
        loadingMessage: () => ({
          title: '',
          message: '전체 사용자 수를 파악하고 있습니다.',
        }),
        errorMessage: () => ({
          ...createNetworkErrorMessage('전체 사용자 수를 파악하는 도중'),
        }),
        successMessage: undefined,
      },

      // (GET) 사용자 목록
      retrieveUsers: {
        loadingMessage: () => ({
          title: '',
          message: '사용자 목록을 조회 중입니다.',
        }),
        errorMessage: () => ({
          ...createNetworkErrorMessage('사용자 목록 조회 중'),
        }),
        successMessage: () => ({
          title: '',
          message: '',
        }),
      },

      // (PATCH) 사용자 수정
      patchUser: {
        loadingMessage: () => ({
          title: '',
          message: '입력하신 내용을 저장 중입니다.',
        }),
        errorMessage: () => ({
          ...createNetworkErrorMessage('사용자 수정 중'),
        }),
        successMessage: () => ({
          title: '',
          message: '입력하신 내용이 성공적으로 저장되었습니다.',
        }),
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

      // (GET) 수학 교과서 조회
      retrieveMathTextbook: {
        loadingMessage: () => ({
          title: '',
          message: '수학 교과서 상세정보를 불러오고 있습니다.'
        }),
        errorMessage: () => ({
          ...createNetworkErrorMessage('수학 교과서 상세정보 조회 중'),
        }),
        successMessage: undefined,
      },

      // (PATCH) 수학 교과서 수정
      patchMathTextbook: {
        loadingMessage: () => ({
          title: '',
          message: '교과서 정보를 수정 중입니다.',
        }),
        errorMessage: () => ({
          ...createNetworkErrorMessage('교과서 정보 수정 중'),
        }),
        successMessage: () => ({
          title: '',
          message: '입력하신 교과서 정보를 성공적으로 수정 완료하였습니다.',
        }),
      },

      // (POST) 수학 교과서 생성
      produceMathTextbook: {
        loadingMessage: () => ({
          title: '',
          message: '신규 교과서를 등록 중입니다.',
        }),
        errorMessage: () => ({
          ...createNetworkErrorMessage('신규 교과서 등록 중'),
        }),
        successMessage: () => ({
          title: '',
          message: '신규 교과서 등록을 성공적으로 완료하였습니다.',
        }),
      },

      // (DELETE) 수학 교과서 삭제
      deleteMathTextbook: {
        loadingMessage: () => ({
          title: '',
          message: '선택한 교과서를 삭제 중입니다.',
        }),
        errorMessage: () => ({
          ...createNetworkErrorMessage('교과서 삭제 중'),
          title: '삭제 오류',
        }),
        successMessage: () => ({
          title: '',
          message: '교과서 삭제를 성공적으로 완료 하였습니다.',
        }),
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
        successMessage: undefined,
      },

      // --- --- --- --- --- --- --- --- --- ---

      // (GET) 수학 단원 목록
      retrieveMathChapters: {
        loadingMessage: () => ({
          title: '',
          message: '수학 단원 정보를 조회 중입니다.',
        }),
        errorMessage: () => ({
          ...createNetworkErrorMessage('수학 단원 정보를 조회 중'),
        }),
        successMessage: undefined,
      },

      // (POST) 수학 단원 생성
      produceMathChapter: {
        loadingMessage: () => ({
          title: '',
          message: '신규 수학 단원을 추가 중입니다.'
        }),
        errorMessage: () => ({
          title: '추가하기 오류',
          message: '오류가 발생하여 추가되지 않았습니다. 다시 시도해주세요.',
        }),
        successMessage: () => ({
          title: '추가하기 완료',
          message: '입력하신 내용이 성공적으로 추가되었습니다.',
        }),
      },

      // --- --- --- --- --- --- --- --- --- ---

      // (GET) 수학 성취기준 목록
      retrieveMathAchievements: {
        loadingMessage: () => ({
          title: '',
          message: '수학 성취기준 정보를 조회 중입니다.',
        }),
        errorMessage: () => ({
          ...createNetworkErrorMessage('수학 성취기준 정보를 조회 중'),
        }),
        successMessage: undefined,
      },

      // (POST) 수학 성취기준 생성
      produceMathAchievement: {
        loadingMessage: () => ({
          title: '',
          message: '신규 수학 성취기준을 추가 중입니다.',
        }),
        errorMessage: () => ({
          title: '추가하기 오류',
          message: '오류가 발생하여 추가되지 않았습니다. 다시 시도해주세요.',
        }),
        successMessage: () => ({
          title: '추가하기 완료',
          message: '입력하신 내용이 성공적으로 추가되었습니다.',
        }),
      },

      // --- --- --- --- --- --- --- --- --- ---

      // (GET) 수학 지식개념 목록
      retrieveMathKnowledgeConcepts: {
        loadingMessage: () => ({
          title: '',
          message: '수학 지식개념 정보를 조회 중입니다.',
        }),
        errorMessage: () => ({
          ...createNetworkErrorMessage('수학 지식개념 정보 조회 중'),
        }),
        successMessage: undefined,
      },

      // (POST) 수학 지식개념 생성
      produceMathKnowledgeConcept: {
        loadingMessage: () => ({
          title: '',
          message: '신규 수학 지식개념을 추가 중입니다.',
        }),
        errorMessage: () => ({
          title: '추가하기 오류',
          message: '오류가 발생하여 추가되지 않았습니다. 다시 시도해주세요.',
        }),
        successMessage: () => ({
          title: '추가하기 완료',
          message: '입력하신 내용이 성공적으로 추가되었습니다.',
        }),
      },

      // --- --- --- --- --- --- --- --- --- ---

      // (GET) 수학 시리즈-출처 목록
      retrieveMathSeriesSources: {
        loadingMessage: () => ({
          title: '',
          message: '수학 시리즈-출처 정보를 조회 중입니다.',
        }),
        errorMessage: () => ({
          ...createNetworkErrorMessage('수학 시리즈-출처 정보 조회 중'),
        }),
        successMessage: undefined,
      },

      // (POST) 수학 시리즈-출처 생성
      produceMathSeriesSources: {
        loadingMessage: () => ({
          title: '',
          message: '신규 수학 시리즈-출처를 추가 중입니다.',
        }),
        errorMessage: () => ({
          title: '추가하기 오류',
          message: '오류가 발생하여 추가되지 않았습니다. 다시 시도해주세요.',
        }),
        successMessage: () => ({
          title: '추가하기 완료',
          message: '입력하신 내용이 성공적으로 추가되었습니다.',
        }),
      },

      // --- --- --- --- --- --- --- --- --- ---

      // (GET) 수학 지문 목록
      retrieveMathInstructions: {
        loadingMessage: () => ({
          title: '',
          message: '수학 지문 정보를 조회 중입니다.',
        }),
        errorMessage: () => ({
          ...createNetworkErrorMessage('수학 지문 정보 조회 중'),
        }),
        successMessage: undefined,
      },

      // --- --- --- --- --- --- --- --- --- ---

      // (GET) 수학 문항 목록
      retrieveMathQuestions: {
        loadingMessage: () => ({
          title: '',
          message: '수학 문항 정보를 조회 중입니다.',
        }),
        errorMessage: () => ({
          ...createNetworkErrorMessage('수학 문항 정보 조회 중'),
        }),
        successMessage: undefined,
      },
    },
  },

  uis: {
    math: {
      confirmDeleteMathTextbooks: () => ({
        title: '교과서 삭제',
        message: '선택한 교과서를 삭제합니다.\n정말로 삭제 하시겠습니까?',
      }),
    },
  },
} as const;

export default noticeMessageGroupFactory;
