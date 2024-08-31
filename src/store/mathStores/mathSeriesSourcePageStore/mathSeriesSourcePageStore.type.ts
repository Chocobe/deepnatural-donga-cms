// type
import { 
  TRetrieveMathSeriesSourcesApiRequestParams,
  TRetrieveMathSeriesSourcesApiResponse,
} from '@/apis/math/mathApi.type';
import { 
  TMathSeriesSourceFlattenModel,
} from '@/apis/models/mathModel.type';

export type TMathSeriesSourcePageStoreState = {
  searchParamsForRetrieveMathSeriesSourcesApi: TRetrieveMathSeriesSourcesApiRequestParams['searchParams'];

  mathSeriesSourcesData?: TRetrieveMathSeriesSourcesApiResponse;

  selectedMathSeriesSources?: TMathSeriesSourceFlattenModel[];
};

export const initialMathSeriesSourcePageStoreState: TMathSeriesSourcePageStoreState = {
  searchParamsForRetrieveMathSeriesSourcesApi: {
    page: undefined,
  },

  mathSeriesSourcesData: undefined,

  selectedMathSeriesSources: undefined,
} as const;

export type TMathSeriesSourcePageStoreAction = {
  clearMathSeriesSourcePageStoreState: () => void;

  clearSearchParamsForRetrieveMathSeriesSourcesApi: () => void;
  updateSearchParamsForRetrieveMathSeriesSourcesApi: (
    callback: (
      searchParamsForRetrieveMathSeriesSourcesApi: TMathSeriesSourcePageStoreState['searchParamsForRetrieveMathSeriesSourcesApi']
    ) => TMathSeriesSourcePageStoreState['searchParamsForRetrieveMathSeriesSourcesApi']
  ) => void;

  clearMathSeriesSourcesData: () => void;
  setMathSeriesSourcesData: (mathSeriesSourcesData: TRetrieveMathSeriesSourcesApiResponse) => void;

  clearSelectedMathSeriesSources: () => void;
  setSelectedMathSeriesSources: (selectedMathSeriesSources: TMathSeriesSourceFlattenModel[]) => void;
};

export type TMathSeriesSourcePageStore =
  & TMathSeriesSourcePageStoreState
  & TMathSeriesSourcePageStoreAction;
