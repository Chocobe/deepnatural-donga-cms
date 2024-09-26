// type
import { 
  TRetrieveMathSeriesSourcesApiRequestParams,
  TRetrieveMathSeriesSourcesApiResponse,
} from '@/apis/math/mathApi.type';
import { 
  cmsClassTypeMapper,
  cmsElementaryGradeMapper,
  cmsSourceTypeMapper,
  cmsTermMapper,
} from '@/apis/models/cmsCommonModel.type';
import { 
  mathCurriculumMapper,
  TMathSeriesModel,
  TMathSeriesSourceFlattenModel,
  TMathSourceModel,
} from '@/apis/models/mathModel.type';

export type TMathSeriesSourcePageStoreDetailSource =
  & Omit<TMathSourceModel, 'id'>
  & Partial<Pick<TMathSourceModel, 'id'>>;

export type TMathSeriesSourcePageStoreDetailSeries =
  & Omit<TMathSeriesModel, 'id' | 'source_set'>
  & Partial<Pick<TMathSeriesModel, 'id'>>
  & {
    source_set: TMathSeriesSourcePageStoreDetailSource[];
  };

export type TMathSeriesSourcePageStoreState = {
  searchParamsForRetrieveMathSeriesSourcesApi: TRetrieveMathSeriesSourcesApiRequestParams['searchParams'];

  mathSeriesSourcesData?: TRetrieveMathSeriesSourcesApiResponse;

  detailTargetMathSeries?: TMathSeriesModel;
  detailFormState: TMathSeriesSourcePageStoreDetailSeries;

  selectedMathSeriesSources?: TMathSeriesSourceFlattenModel[];
};

export const initialMathSeriesSourcePageStoreDetailSource: TMathSeriesSourcePageStoreDetailSource = {
  id: undefined,
  name: '',
  curriculum: mathCurriculumMapper[2015],
  classtype: cmsClassTypeMapper.ELEMENTARY,
  grade: cmsElementaryGradeMapper.COMMON,
  term: cmsTermMapper.COMMON,
  serviceyear: '',
  publisher: '',
  expiration_date: new Date(9999, 11, 31, 23, 59, 59).toISOString(),
  source_type: cmsSourceTypeMapper['기타'],
  isview: false,
} as const;

export const initialMathSeriesSourcePageStoreState: TMathSeriesSourcePageStoreState = {
  searchParamsForRetrieveMathSeriesSourcesApi: {
    source_classtype: undefined,
    source_curriculum: undefined,
    source_grade: undefined,
    source_term: undefined,
    series_source: undefined,
    series_title: undefined,
    source_name: undefined,
    page: undefined,
  },

  mathSeriesSourcesData: undefined,

  detailTargetMathSeries: undefined,
  detailFormState: {
    id: undefined,
    title: '',
    source_set: [
      {
        ...initialMathSeriesSourcePageStoreDetailSource,
      },
    ],
  },

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

  clearDetailTargetMathSeries: () => void;
  setDetailTargetMathSeries: (detailTargetMathSeries: TMathSeriesModel) => void;
  updateDetailFormState: (
    callback: (
      detailFormState: Partial<TMathSeriesSourcePageStoreState['detailFormState']>
    ) => Partial<TMathSeriesSourcePageStoreState['detailFormState']>
  ) => void;

  clearSelectedMathSeriesSources: () => void;
  setSelectedMathSeriesSources: (selectedMathSeriesSources: TMathSeriesSourceFlattenModel[]) => void;
};

export type TMathSeriesSourcePageStore =
  & TMathSeriesSourcePageStoreState
  & TMathSeriesSourcePageStoreAction;
