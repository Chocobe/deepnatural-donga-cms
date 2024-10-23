// type
import { 
  TMathToolSourceModel, 
  TMathToolTextbookModel,
} from '@/apis/mathTool/mathToolApi.type';
import { 
  TSummarizedMetadata, 

  sourceMetadataTemplate,
  knowledgeConceptMetadataTemplate, 

  textbookMetadataTemplate,
  chapter1MetadataTemplate, 
  chapter2MetadataTemplate, 
  chapter3MetadataTemplate, 
} from '@/components/pages/math/MathQuestionToolPage/components/MathFormulaExtractor/MathFormulaAccordions/mathFormulaAccordions.type';
import { 
  TRetrieveKnowledgeConceptListApiResult,

  TRetrieveChapter1ApiResult,
  TRetrieveChapter2ApiResult,
  TRetrieveChapter3ApiResult,
} from '@/components/pages/math/MathQuestionToolPage/network/network.type/searchApi.type';

export type TSubmissionStatistic = {
  numOfSubmission: number;
  numOfQuestionSets: number;
};

export type TErrorModalUiState = {
  isOpen: boolean;
  buttonActionType?: 'close' | 'exit';
  message: string;
};

export type TApiLoadingUiState = {
  isLoading: boolean;
  message: string;
};

export type TCaptureState = {
  // 이미지 확인 Modal isOpen
  isOpenConfirmModal: boolean;

  // 이미지 base64
  imageObjUrl?: string;
};

export type TResultItemPropertyValue = number | string | boolean | TSummarizedMetadata<TRetrieveKnowledgeConceptListApiResult>;

export type TResultItem = {
  [id: string]: TResultItemPropertyValue;
} & {
  [knowledgeConceptMetadataTemplate.id]?: TSummarizedMetadata<TRetrieveKnowledgeConceptListApiResult>;
};

export type TTargetElementState = {
  indexOfResult?: number;
  id?: string;
  cursorIndex?: number;
};

export type TResult = {
  subject: string;
  metadata: {
    [sourceMetadataTemplate.id]?: TSummarizedMetadata<TMathToolSourceModel>;

    [textbookMetadataTemplate.id]?: TSummarizedMetadata<TMathToolTextbookModel>;
    [chapter1MetadataTemplate.id]?: TSummarizedMetadata<TRetrieveChapter1ApiResult>;
    [chapter2MetadataTemplate.id]?: TSummarizedMetadata<TRetrieveChapter2ApiResult>;
    [chapter3MetadataTemplate.id]?: TSummarizedMetadata<TRetrieveChapter3ApiResult>;
  };
  questionSets: TResultItem[];
};

export type TUISliceState = {
  submissionStatistics: TSubmissionStatistic;

  errorModalUiState: TErrorModalUiState;

  apiLoadingUiState: TApiLoadingUiState;

  mathFormulaCaptureState: TCaptureState;
  imageCaptureState: TCaptureState;

  targetElementState: TTargetElementState;

  result: TResult;
};

export const initialUISliceState: TUISliceState = {
  submissionStatistics: {
    numOfSubmission: 0,
    numOfQuestionSets: 0,
  },

  errorModalUiState: {
    isOpen: false,
    buttonActionType: undefined,
    message: '',
  },

  apiLoadingUiState: {
    isLoading: false,
    message: '',
  },

  mathFormulaCaptureState: {
    isOpenConfirmModal: false,
    imageObjUrl: undefined,
  },

  imageCaptureState: {
    isOpenConfirmModal: false,
    imageObjUrl: undefined,
  },

  targetElementState: {
    indexOfResult: undefined,
    id: undefined,
    cursorIndex: undefined,
  },

  result: {
    subject: '',
    metadata: {},
    questionSets: [],
  },
};

export type TUISliceAction = {
  //
  // submissionStatistics
  //
  updateSubmissionStatistics_action: () => void;

  //
  // errorModalUiState
  //
  openErrorModal_action: (params: {
    buttonActionType: 'close' | 'exit';
    message: string;
  }) => void;
  closeErrorModal_action: () => void;

  //
  // apiLoadingState
  //
  resetApiLoadingUiState_action: () => void;
  setApiLoadingUiState_action: (params: TApiLoadingUiState) => void;

  //
  // mathFormulaCaptureState
  //
  resetMathFormulaCaptureState_action: () => void;
  setMathFormulaCaptureState_action: (params: TCaptureState) => void;
  openMathFormulaCaptureModal_action: () => void;
  openMathFormulaConfirmModal_action: (params: string) => void;
  closeMathFormulaConfirmModal_action: () => void;

  //
  // imageCaptureState
  //
  resetImageCaptureState_action: () => void;
  setImageCaptureState_action: (params: TCaptureState) => void;
  openImageCaptureModal_action: () => void;
  openImageConfirmModal_action: (params: string) => void;
  closeImageConfirmModal_action: () => void;

  //
  // targetElementState
  //
  resetTargetElementState_action: () => void;
  setTargetElementState_action: (params: TTargetElementState) => void;

  //
  // result
  //
  initResult_action: () => void;
  setSubject_action: (params: string) => void;
  setMetadataItem_action: (params: {
    metadataKey: string;
    summarizedMetadata: TSummarizedMetadata;
  }) => void;
  clearMetadataItem_action: (params: string) => void;
  addNewQuestionSet_action: () => void;
  setQuestionSetsValue_action: (params: {
    indexOfResult: number;
    id: string;
    value: TResultItemPropertyValue;
  }) => void;
  removeQuestionSet_action: (params: number) => void;
};

export type TUISlice = {
  ui: {
    state: TUISliceState;
    action: TUISliceAction;
  };
};
