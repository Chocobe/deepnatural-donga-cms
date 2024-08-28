// type
import { 
  TRetrieveMathChaptersApiRequestParams,
  TRetrieveMathChaptersApiResponse,
} from '@/apis/math/mathApi.type';
import { 
  TMathChapterFlattenModel,
} from '@/apis/models/mathModel.type';

export type TMathChapterPageStoreState = {
  searchParamsForRetrieveMathChaptersApi: TRetrieveMathChaptersApiRequestParams['searchParams'];

  mathChaptersData?: TRetrieveMathChaptersApiResponse;

  selectedMathChapters?: TMathChapterFlattenModel[];
};

export const initialMathChapterPageStoreState: TMathChapterPageStoreState = {
  searchParamsForRetrieveMathChaptersApi: {
    page: undefined,
    textbook: undefined,
    search: undefined,
  },

  mathChaptersData: undefined,

  selectedMathChapters: undefined,
} as const;

export type TMathChapterPageStoreAction = {
  clearMathChapterPageStoreState: () => void;

  clearSearchParamsForRetrieveMathChaptersApi: () => void;
  updateSearchParamsForRetrieveMathChaptersApi: (
    callback: (
      SearchParamsForRetrieveMathChaptersApi: TMathChapterPageStoreState['searchParamsForRetrieveMathChaptersApi']
    ) => TMathChapterPageStoreState['searchParamsForRetrieveMathChaptersApi']
  ) => void;

  clearMathChaptersData: () => void;
  setMathChaptersData: (mathChaptersData: TRetrieveMathChaptersApiResponse) => void;

  clearSelectedMathChapters: () => void;
  setSelectedMathChapters: (selectedMathChapters: TMathChapterFlattenModel[]) => void;
};

export type TMathChapterPageStore = 
  & TMathChapterPageStoreState
  & TMathChapterPageStoreAction;
