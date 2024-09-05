// type
import { 
  TRetrieveMathChaptersApiRequestParams,
  TRetrieveMathChaptersApiResponse,
} from '@/apis/math/mathApi.type';
import { 
  TMathChapter1Model,
  TMathChapter2Model,
  TMathChapter3Model,
  TMathChapterFlattenModel,
  TMathTextbookModel,
} from '@/apis/models/mathModel.type';

export type TMathChapterPageStoreDetailChapter3 =
  & Omit<TMathChapter3Model, 'id'>
  & Partial<Pick<TMathChapter3Model, 'id'>>;

export type TMathChapterPageStoreDetailChapter2 =
  & Omit<TMathChapter2Model, 'id' | 'chapter3_set'>
  & Partial<Pick<TMathChapter2Model, 'id'>> 
  & {
    chapter3_set: TMathChapterPageStoreDetailChapter3[];
  };

export type TMathChapterPageStoreDetailChapter1 =
  & Omit<TMathChapter1Model, 'id' | 'textbook_title' | 'chapter2_set'>
  & Partial<Pick<TMathChapter1Model, 'id' | 'textbook_title'>> 
  & {
    chapter2_set: TMathChapterPageStoreDetailChapter2[];
  };

export type TMathChapterPageStoreState = {
  searchParamsForRetrieveMathChaptersApi: TRetrieveMathChaptersApiRequestParams['searchParams'];

  mathChaptersData?: TRetrieveMathChaptersApiResponse;

  detailTargetMathChapter?: TMathChapter1Model;
  detailFormState: TMathChapterPageStoreDetailChapter1;
  detailFormStateReference: {
    textbook?: TMathTextbookModel;
  };

  selectedMathChapters?: TMathChapterFlattenModel[];
};

export const initialMathChapterPageStoreState: TMathChapterPageStoreState = {
  searchParamsForRetrieveMathChaptersApi: {
    page: undefined,
    textbook: undefined,
    search: undefined,
  },

  mathChaptersData: undefined,

  detailTargetMathChapter: undefined,
  detailFormState: {
    id: undefined,
    no: '',
    title: '',
    chapter2_set: [
      {
        id: undefined,
        no: '',
        title: '',
        chapter3_set: [
          // FIXME: API 연동 후, 지우기
          {
            id: undefined,
            no: '1',
            title: 'title-1',
          },
          {
            id: undefined,
            no: '2',
            title: 'title-2',
          },
        ],
      },
      // FIXME: API 연동 후, 지우기
      {
        id: undefined,
        no: '',
        title: '',
        chapter3_set: [
          {
            id: undefined,
            no: '1',
            title: 'title-1',
          },
          {
            id: undefined,
            no: '2',
            title: 'title-2',
          },
        ],
      },
    ],
  },
  detailFormStateReference: {
    textbook: undefined,
  },

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

  clearDetailTargetMathChapter: () => void;
  setDetailTargetMathChapter: (detailTargetMathChapter: TMathChapter1Model) => void;
  updateDetailFormState: (
    callback: (
      detailFormState: Partial<TMathChapterPageStoreState['detailFormState']>
    ) => TMathChapterPageStoreState['detailFormState']
  ) => void;
  updateDetailFormStateReference: (
    callback: (
      reference: TMathChapterPageStoreState['detailFormStateReference']
    ) => TMathChapterPageStoreState['detailFormStateReference']
  ) => void;

  clearSelectedMathChapters: () => void;
  setSelectedMathChapters: (selectedMathChapters: TMathChapterFlattenModel[]) => void;
};

export type TMathChapterPageStore = 
  & TMathChapterPageStoreState
  & TMathChapterPageStoreAction;
