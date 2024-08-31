// zustand
import { 
  create,
} from 'zustand';
import { 
  devtools,
} from 'zustand/middleware';
// type
import { 
  initialMathSeriesSourcePageStoreState,
  TMathSeriesSourcePageStore,
} from './mathSeriesSourcePageStore.type';

const useMathSeriesSourcePageStore = create(devtools<TMathSeriesSourcePageStore>((set, _get) => ({
  ...initialMathSeriesSourcePageStoreState,

  clearMathSeriesSourcePageStoreState: () => {
    set(initialMathSeriesSourcePageStoreState, false, 'clearMathSeriesSourcePageStoreState');
  },

  clearSearchParamsForRetrieveMathSeriesSourcesApi: () => {
    set(old => ({
      ...old,
      searchParamsForRetrieveMathSeriesSourcesApi: {
        ...initialMathSeriesSourcePageStoreState.searchParamsForRetrieveMathSeriesSourcesApi,
      },
    }), false, 'clearSearchParamsForRetrieveMathSeriesSourcesApi');
  },
  updateSearchParamsForRetrieveMathSeriesSourcesApi: callback => {
    set(old => ({
      ...old,
      searchParamsForRetrieveMathSeriesSourcesApi: {
        ...old.searchParamsForRetrieveMathSeriesSourcesApi,
        ...callback(old.searchParamsForRetrieveMathSeriesSourcesApi),
      },
    }), false, 'updateSearchParamsForRetrieveMathSeriesSourcesApi');
  },

  clearMathSeriesSourcesData: () => {
    set(old => ({
      ...old,
      mathSeriesSourcesData: initialMathSeriesSourcePageStoreState.mathSeriesSourcesData,
    }), false, 'clearMathSeriesSourcesData');
  },
  setMathSeriesSourcesData: mathSeriesSourcesData => {
    set(old => ({
      ...old,
      mathSeriesSourcesData,
    }), false, 'setMathSeriesSourcesData');
  },

  clearSelectedMathSeriesSources: () => {
    set(old => ({
      ...old,
      selectedMathSeriesSources: initialMathSeriesSourcePageStoreState.selectedMathSeriesSources,
    }), false, 'clearSelectedMathSeriesSources');
  },
  setSelectedMathSeriesSources: selectedMathSeriesSources => {
    set(old => ({
      ...old,
      selectedMathSeriesSources,
    }), false, 'setSelectedMathSeriesSources');
  },
}), {
  name: 'MathSeriesSourcePageStore',
}));

export default useMathSeriesSourcePageStore;
