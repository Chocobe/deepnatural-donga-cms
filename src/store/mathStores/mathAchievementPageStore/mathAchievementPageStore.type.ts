// type
import { 
  TRetrieveMathAchievementsApiRequestParams,
  TRetrieveMathAchievementsApiResponse,
} from '@/apis/math/mathApi.type';
import { 
  cmsClassTypeMapper, 
  cmsGradeClusterMapper,
} from '@/apis/models/cmsCommonModel.type';
import { 
  mathCurriculumMapper,
  TMathAchievement1Model,
  TMathAchievement2Model,
  TMathAchievement3Model,
  TMathAchievementFlattenModel,
} from '@/apis/models/mathModel.type';

export type TMathAchievementPageStoreDetailAchievement3 =
  & Omit<TMathAchievement3Model, 'id'>
  & Partial<Pick<TMathAchievement3Model, 'id'>>;

export type TMathAchievementPageStoreDetailAchievement2 =
  & Omit<TMathAchievement2Model, 'id' | 'achievement3_set'>
  & Partial<Pick<TMathAchievement2Model, 'id'>>
  & {
    achievement3_set: TMathAchievementPageStoreDetailAchievement3[];
  };

export type TMathAchievementPageStoreDetailAchievement1 =
  & Omit<TMathAchievement1Model, 'id' | 'achievement2_set'>
  & Partial<Pick<TMathAchievement1Model, 'id'>>
  & {
    achievement2_set: TMathAchievementPageStoreDetailAchievement2[];
  };

export type TMathAchievementPageStoreState = {
  searchParamsForRetrieveMathAchievementsApi: TRetrieveMathAchievementsApiRequestParams['searchParams'];

  mathAchievementsData?: TRetrieveMathAchievementsApiResponse;

  detailTargetAchievement?: TMathAchievement1Model;
  detailFormState: TMathAchievementPageStoreDetailAchievement1;

  selectedMathAchievements?: TMathAchievementFlattenModel[];
};

export const initialMathAchievementPageStoreDetailAchievement3: TMathAchievementPageStoreDetailAchievement3 = {
  id: undefined,
  no: '',
  title: '',
  code: '',
} as const;

export const initialMathAchievementPageStoreDetailAchievement2: TMathAchievementPageStoreDetailAchievement2 = {
  id: undefined,
  no: '',
  title: '',
  achievement3_set: [
    initialMathAchievementPageStoreDetailAchievement3,
  ],
} as const;

export const initialMathAchievementPageStoreState: TMathAchievementPageStoreState = {
  searchParamsForRetrieveMathAchievementsApi: {
    achievement2: undefined,
    achievement3: undefined,
    curriculum: undefined,
    classtype: undefined,
    grade_cluster: undefined,

    page: undefined,
    title: undefined,
    search: undefined,
  },

  mathAchievementsData: undefined,

  detailTargetAchievement: undefined,
  detailFormState: {
    id: undefined,
    no: '성취기준 번호',
    title: '성취기준 제목',
    classtype: cmsClassTypeMapper.ELEMENTARY,
    curriculum: mathCurriculumMapper[2015],
    grade_cluster: cmsGradeClusterMapper.ELEMENTARY_3_4,
    achievement2_set: [
      {
        ...initialMathAchievementPageStoreDetailAchievement2,
      },
    ],
  },

  selectedMathAchievements: undefined,
} as const;

export type TMathAchievementPageStoreAction = {
  clearMathAchievementPageStoreState: () => void;

  clearSearchParamsForRetrieveMathAchievementsApi: () => void;
  updateSearchParamsForRetrieveMathAchievementsApi: (
    callback: (
      searchParamsForRetrieveMathAchievementsApi: TMathAchievementPageStoreState['searchParamsForRetrieveMathAchievementsApi']
    ) => TMathAchievementPageStoreState['searchParamsForRetrieveMathAchievementsApi']
  ) => void;

  clearMathAchievementsData: () => void;
  setMathAchievementsData: (mathAchievementsData: TRetrieveMathAchievementsApiResponse) => void;

  clearDetailTargetMathAchievement: () => void;
  setDetailTargetMathAchievement: (detailTargetAchievement: TMathAchievement1Model) => void;
  updateDetailFormState: (
    callback: (
      detailFormState: Partial<TMathAchievementPageStoreState['detailFormState']>
    ) => Partial<TMathAchievementPageStoreState['detailFormState']>
  ) => void;

  clearSelectedMathAchievements: () => void;
  setSelectedMathAchievements: (selectedMathAchievements: TMathAchievementFlattenModel[]) => void;
};

export type TMathAchievementPageStore =
  & TMathAchievementPageStoreState
  & TMathAchievementPageStoreAction;
