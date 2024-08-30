// type
import { 
  TRetrieveMathAchievementsApiRequestParams,
  TRetrieveMathAchievementsApiResponse,
} from '@/apis/math/mathApi.type';
import { 
  TMathAchievementFlattenModel,
} from '@/apis/models/mathModel.type';

export type TMathAchievementPageStoreState = {
  searchParamsForRetrieveMathAchievementsApi: TRetrieveMathAchievementsApiRequestParams['searchParams'];

  mathAchievementsData?: TRetrieveMathAchievementsApiResponse;

  selectedMathAchievements?: TMathAchievementFlattenModel[];
};

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

  clearSelectedMathAchievements: () => void;
  setSelectedMathAchievements: (selectedMathAchievements: TMathAchievementFlattenModel[]) => void;
};

export type TMathAchievementPageStore =
  & TMathAchievementPageStoreState
  & TMathAchievementPageStoreAction;
