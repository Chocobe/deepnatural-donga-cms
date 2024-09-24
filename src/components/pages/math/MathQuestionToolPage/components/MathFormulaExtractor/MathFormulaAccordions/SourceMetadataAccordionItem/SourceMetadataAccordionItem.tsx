// react
import { 
  useCallback,
  memo, 
} from 'react';
// store
import useMathQuestionToolPageStore from '@/store/mathStores/mathQuestionToolPageStore/mathQuestionToolPageStore';
// hook
import useMathQuestionToolErrorModal from '../../../ui/MathQuestionToolErrorModal/hooks/useMathQuestionToolErrorModal';
// api
// FIXME: API 연동하기
// import ApiManager from '@/network/ApiManager';
import apiFeedbackMessageFactory, {
  createErrorMessage,
} from '../../../../network/apiFeedbackMessageFactory';
// ui
import MetadataAccordionItemTemplate from '../MetadataAccordionItemTemplate/MetadataAccordionItemTemplate';
// type
import { 
  sourceMetadataTemplate,
} from '../mathFormulaAccordions.type';
import { 
  TRetrieveSourceListApiPayload,
  TRetrieveSourceListApiResponse,
} from '../../../../network/network.type/searchApi.type';

type TSourceMetadataAccordionItemProps = {
  accordionValue: string;
  isTarget: boolean;
}

function _SourceMetadataAccordionItem(props: TSourceMetadataAccordionItemProps) {
  const {
    accordionValue,
    isTarget,
  } = props;

  //
  // mathQuestionToolPage store
  //
  const setApiLoadingUiState_action = useMathQuestionToolPageStore(state => state.ui.action.setApiLoadingUiState_action);
  const resetApiLoadingUiState_action = useMathQuestionToolPageStore(state => state.ui.action.resetApiLoadingUiState_action);

  //
  // hook
  //
  const {
    openErrorModal,
  } = useMathQuestionToolErrorModal();

  //
  // callback
  //
  // FIXME: API 연동 후, `_onSearch()` => `onSearch()` 이름 변경하기
  const _onSearch = useCallback(async (
    searchValue: string,
    page: number = 1
  ) => {
    try {
      setApiLoadingUiState_action({
        isLoading: true,
        message: apiFeedbackMessageFactory
          .searchApi
          .retrieveSourceListRequest(),
      });

      const payload: TRetrieveSourceListApiPayload = {
        pathParams: {
          productName: searchValue,
          page,
        },
      };

      // FIXME: API 연동하기
      // const response = await ApiManager.retrieveSourceList(payload);
      console.log('onSearch() - payload: ', payload);

      // FIXME: API 연동하기
      // return response?.data;
      return Promise.resolve({
        searchValue: 'mock - searchValue', 
        page: 1,
        currentPage: 1,
        lastPage: 1,
        results: [],
      });
    } catch(error: any) {
      const message = createErrorMessage({
        error,
        createDefaultErrorMessage: apiFeedbackMessageFactory
          .searchApi
          .retrieveSourceListFailure,
      });

      openErrorModal({
        buttonActionType: 'close',
        message,
      });

      return null;
    } finally {
      resetApiLoadingUiState_action();
    }
  }, [
    openErrorModal, 
    // dispatch,
    setApiLoadingUiState_action,
    resetApiLoadingUiState_action,
  ]);

  // FIXME: API 연동 후, 주석 처리하기
  const mockOnSearch = useCallback(async (
    searchValue: string,
    page?: string | number
  ) => {
    console.group('onSearch()');
    console.log('searchValue: ', searchValue);
    console.log('page: ', page);
    console.groupEnd();

    const mockMetadataList = {
      "count": 2,
      "next": null,
      "previous": null,
      "results": [
        {
          "id": '3',
          "series": "빨리강해지는수학",
          "schoolLevel": "중등",
          "grade": 1,
          "semester": "공통",
          "subject": "수학",
          "productName": "중1-1 빨리 강해지는 수학 - 유형북 (18판형)",
          "format": "2018",
          "author": "공통",
          "publisher": "동아출판㈜",
          "curriculum": "2015"
        },
        {
          "id": '4',
          "series": "큐브수학",
          "schoolLevel": "초등",
          "grade": 3,
          "semester": "1학기",
          "subject": "수학",
          "productName": "초3-1 큐브수학 개념 Start 북1 (18판형)",
          "format": "2018",
          "author": "공통",
          "publisher": "동아출판㈜",
          "curriculum": "2015"
        }
      ]
    };

    // return new Promise<TRetrieveSourceListResponse>(res => {
    return new Promise<any>(res => {
      setTimeout(() => {
        res(mockMetadataList);
      }, 1000);
    });
  }, []);

  return (
    <MetadataAccordionItemTemplate<TRetrieveSourceListApiResponse>
      accordionValue={accordionValue}
      isTarget={isTarget}
      metadataTemplate={sourceMetadataTemplate}
      // FIXME: API 연동하기
      // onSearch={onSearch}
      onSearch={mockOnSearch}
    />
  );
}

const SourceMetadataAccordionItem = memo(_SourceMetadataAccordionItem) as typeof _SourceMetadataAccordionItem;
export default SourceMetadataAccordionItem;
