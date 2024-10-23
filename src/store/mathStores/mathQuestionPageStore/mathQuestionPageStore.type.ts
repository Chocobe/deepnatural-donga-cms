// type
import { 
  TRetrieveMathQuestionApiResponse,
  TRetrieveMathQuestionsApiRequestParams,
  TRetrieveMathQuestionsApiResponse,
} from '@/apis/math/mathApi.type';
import { 
  cmsDifficultyMapper, 
  cmsSubjectMapper,
} from '@/apis/models/cmsCommonModel.type';
import { 
  mathBehaviorDomainMapper,
  mathCurriculumMapper,
  mathQuestionTypeMapper,
  TMathAchievement3Model,
  TMathChapter2InfoModel,
  TMathChapter3InfoModel,
  TMathChapterCommonModel,
  TMathQuestionModel,
} from '@/apis/models/mathModel.type';

export type TMathQuestionPageStoreState = {
  searchParamsForRetrieveMathQuestionsApi: TRetrieveMathQuestionsApiRequestParams['searchParams'];

  mathQuestionsData?: TRetrieveMathQuestionsApiResponse;

  detailTargetMathQuestion?: TRetrieveMathQuestionApiResponse;
  detailFormState: Omit<TMathQuestionModel, 'id' | 'instruction_id' | 'source' | 'textbook' | 'kc2' | 'achievement' | 'chapter1' | 'chapter2' | 'chapter3' | 'chapters_info'>
    & Partial<Pick<TMathQuestionModel, 'id' | 'instruction_id' | 'source' | 'textbook' | 'kc2'>>
    & {
      achievement: Array<TMathAchievement3Model | null>;
      chapter1: Array<Omit<TMathChapterCommonModel, 'textbook_id'> | null>;
      chapter2: Array<Omit<TMathChapterCommonModel, 'textbook_id'> | null>;
      chapter3: Array<Omit<TMathChapterCommonModel, 'textbook_id'> | null>;
      chapters_info: Array<TMathChapter2InfoModel | TMathChapter3InfoModel | null>;
    };

  selectedMathQuestions?: TMathQuestionModel[];
  previewMathQuestion?: TMathQuestionModel;
};

export const initialMathQuestionPageStoreState: TMathQuestionPageStoreState = {
  searchParamsForRetrieveMathQuestionsApi: {
    curriculum: undefined,
    source_classtype: undefined,
    source_grade: undefined,
    source_term: undefined,
    internal_id: undefined,
    instruction_inquiry: undefined,
    page: undefined,

    content: undefined,
    // FIXME: mockup 지문있는 문항
    // content: '743145',
    // FIXME: mockup 단원 많은 문항
    // content: '741589',

    inquiry: undefined,
    instruction: undefined,
  },

  mathQuestionsData: undefined,

  detailTargetMathQuestion: undefined,
  detailFormState: {
    id: undefined,
    internal_id: '',

    source: undefined,
    instruction: null,
    instruction_id: null,

    achievement: [
      null,
    ],
    curriculum: mathCurriculumMapper[2015],
    subject: cmsSubjectMapper.MATH,

    keyword: '',
    behavior_domain: mathBehaviorDomainMapper['이해'],
    inquiry: '',

    choice1: '',
    choice2: '',
    choice3: '',
    choice4: '',
    choice5: '',
    choice_answer: '',

    short_answer_count: null,
    short_answer1: '',
    short_answer2: '',
    short_answer3: '',
    short_answer4: '',
    short_answer5: '',
    short_answer6: '',
    short_answer7: '',
    short_answer8: '',
    short_answer9: '',
    short_answer10: '',
    short_answer11: '',
    short_answer12: '',
    short_answer13: '',
    short_answer14: '',
    short_answer15: '',
    short_answer16: '',
    short_answer17: '',
    short_answer18: '',
    short_answer19: '',
    short_answer20: '',

    solution: '',
    evaluation_criteria1: '',
    evaluation_criteria1_percent: '',
    evaluation_criteria2: '',
    evaluation_criteria2_percent: '',
    evaluation_criteria3: '',
    evaluation_criteria3_percent: '',
    evaluation_criteria4: '',
    evaluation_criteria4_percent: '',
    evaluation_criteria5: '',
    evaluation_criteria5_percent: '',

    difficulty: cmsDifficultyMapper[1],
    question_type: mathQuestionTypeMapper['객관식-다답형'],

    choice_type: null,
    choice_count: null,

    is_set: false,

    representation_question_id: null,
    individual_questioning: false,
    source_page_no: 1,
    source_question_no: '',

    is_reviewed: false,

    textbook: undefined,
    chapter1: [
      null,
    ],
    chapter2: [
      null,
    ],
    chapter3: [
      null,
    ],
    chapters_info: [
      null,
    ],
    kc2: undefined,

    aidt_info: '',
  },

  selectedMathQuestions: undefined,
  previewMathQuestion: undefined,
} as const;

export type TMathQuestionPageStoreAction = {
  clearMathQuestionPageStoreState: () => void;

  clearSearchParamsForRetrieveMathQuestionsApi: () => void;
  updateSearchParamsForRetrieveMathQuestionsApi: (
    callback: (
      searchParamsForRetrieveMathQuestionsApi: TMathQuestionPageStoreState['searchParamsForRetrieveMathQuestionsApi']
    ) => TMathQuestionPageStoreState['searchParamsForRetrieveMathQuestionsApi']
  ) => void;

  clearMathQuestionsData: () => void;
  setMathQuestionsData: (mathQuestionsData: TRetrieveMathQuestionsApiResponse) => void;

  clearDetailTargetMathQuestion: () => void;
  setDetailTargetMathQuestion: (mathQuestion: TRetrieveMathQuestionApiResponse) => void;
  updateDetailFormState: (
    callback: (
      detailFormState: Partial<TMathQuestionPageStoreState['detailFormState']>
    ) => Partial<TMathQuestionPageStoreState['detailFormState']>
  ) => void;

  clearSelectedMathQuestions: () => void;
  setSelectedMathQuestions: (selectedMathQuestions: TMathQuestionModel[]) => void;

  clearPreviewMathQuestion: () => void;
  setPreviewMathQuestion: (previewMathQuestion: TMathQuestionModel) => void;
};

export type TMathQuestionPageStore =
  & TMathQuestionPageStoreState
  & TMathQuestionPageStoreAction;
