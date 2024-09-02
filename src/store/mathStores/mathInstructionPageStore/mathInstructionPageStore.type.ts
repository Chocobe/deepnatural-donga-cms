// type
import { 
  TRetrieveMathInstructionsApiRequestParams,
  TRetrieveMathInstructionsApiResponse,
} from '@/apis/math/mathApi.type';
import { 
  TMathInstructionModel,
} from '@/apis/models/mathModel.type';

export type TMathInstructionPageStoreState = {
  searchParamsForRetrieveMathInstructionsApi: TRetrieveMathInstructionsApiRequestParams['searchParams'];

  mathInstructionsData?: TRetrieveMathInstructionsApiResponse;

  selectedMathInstructions?: TMathInstructionModel[];
};

export const initialMathInstructionPageStoreState: TMathInstructionPageStoreState = {
  searchParamsForRetrieveMathInstructionsApi: {
    page: undefined,
  },

  mathInstructionsData: undefined,

  selectedMathInstructions: undefined,
} as const;

export type TMathInstructionPageStoreAction = {
  clearMathInstructionPageStoreState: () => void;

  clearSearchParamsForRetrieveMathInstructionsApi: () => void;
  updateSearchParamsForRetrieveMathInstructionsApi: (
    callback: (
      searchParamsForRetrieveMathInstructionsApi: TMathInstructionPageStoreState['searchParamsForRetrieveMathInstructionsApi']
    ) => TMathInstructionPageStoreState['searchParamsForRetrieveMathInstructionsApi']
  ) => void;

  clearMathInstructionsData: () => void;
  setMathInstructionsData: (mathInstructionsData: TRetrieveMathInstructionsApiResponse) => void;

  clearSelectedMathInstructions: () => void;
  setSelectedMathInstructions: (selectedMathInstructions: TMathInstructionModel[]) => void;
};

export type TMathInstructionPageStore =
  & TMathInstructionPageStoreState
  & TMathInstructionPageStoreAction;
