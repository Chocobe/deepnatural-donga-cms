// zustand
import { 
  create,
} from 'zustand';
import { 
  devtools,
} from 'zustand/middleware';
// type
import { 
  initialMathSeriesSourcePageStoreDetailSource,
  initialMathSeriesSourcePageStoreState,
  TMathSeriesSourcePageStore,
  TMathSeriesSourcePageStoreState,
} from './mathSeriesSourcePageStore.type';
import { 
  TMathSeriesModel,
} from '@/apis/models/mathModel.type';

function parseSeriesToDetailFormState(
  series: TMathSeriesModel
): TMathSeriesSourcePageStoreState['detailFormState'] {
  const {
    source_set,
    ...seriesData
  } = series;

  return {
    ...seriesData,
    source_set: source_set?.length
      ? source_set
      : [
        initialMathSeriesSourcePageStoreDetailSource,
      ],
  };
}

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
      searchParamsForRetrieveMathSeriesSourcesApi: callback(old.searchParamsForRetrieveMathSeriesSourcesApi),
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

  clearDetailTargetMathSeries: () => {
    set(old => ({
      ...old,
      detailTargetMathSeries: initialMathSeriesSourcePageStoreState.detailTargetMathSeries,
      detailFormState: initialMathSeriesSourcePageStoreState.detailFormState,
    }), false, 'clearDetailTargetMathSeries');
  },
  setDetailTargetMathSeries: detailTargetMathSeries => {
    set(old => ({
      ...old,
      detailTargetMathSeries,
      detailFormState: parseSeriesToDetailFormState(detailTargetMathSeries),
    }), false, 'setDetailTargetMathSeries');
  },
  updateDetailFormState: callback => {
    set(old => ({
      ...old,
      detailFormState: {
        ...old.detailFormState,
        ...callback(old.detailFormState),
      },
    }), false, 'updateDetailFormState');
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
