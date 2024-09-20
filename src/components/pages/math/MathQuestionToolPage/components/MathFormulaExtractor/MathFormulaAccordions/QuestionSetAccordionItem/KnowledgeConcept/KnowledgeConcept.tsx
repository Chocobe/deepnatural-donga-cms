// react
import {
  useState,
  useCallback, 
  memo, 
  MouseEvent,
} from 'react';
// store
import useMathQuestionToolPageStore from '@/store/mathStores/mathQuestionToolPageStore/mathQuestionToolPageStore';
// hook
import useResetMetadataConfirmModal from '../../../MathFormulaExtractorHeader/hooks/useResetMetadataConfirmModal';
// ui
import SearchInput from '../../../SearchInput/SearchInput';
import MetadataSearchModal from '../../../MetadataSearchModal/MetadataSearchModal';
// icons
import { 
  SlRefresh,
} from 'react-icons/sl';
// type
import { 
  TSummarizedMetadata,
  knowledgeConceptMetadataTemplate,
} from '../../mathFormulaAccordions.type';
import { 
  TRetrieveKnowledgeConceptListApiPayload,
  TSearchApiPagination,
} from '@/components/pages/math/MathQuestionToolPage/network/network.type/searchApi.type';
// API
// FIXME: API 연동하기
// import ApiManager from '@/network/ApiManager';
import apiFeedbackMessageFactory, {
  createErrorMessage,
} from '@/components/pages/math/MathQuestionToolPage/network/apiFeedbackMessageFactory';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './KnowledgeConcept.css';

type TKnowledgeConceptProps = {
    indexOfResult: number;
    className?: string;
};

function _KnowledgeConcept(props: TKnowledgeConceptProps) {
  const {
    indexOfResult,
    className,
  } = props;

  const {
    id,
    header,
    search: {
      placeholder,
    },
    details,
    summaryKeys,
  } = knowledgeConceptMetadataTemplate;

  //
  // mathQuestionToolPage store
  //
  const kc2State = useMathQuestionToolPageStore(state => state.ui.state.result.questionSets[indexOfResult].kc2_id);

  const openErrorModal_action = useMathQuestionToolPageStore(state => state.ui.action.openErrorModal_action);
  const resetApiLoadingUiState_action = useMathQuestionToolPageStore(state => state.ui.action.resetApiLoadingUiState_action);
  const setApiLoadingUiState_action = useMathQuestionToolPageStore(state => state.ui.action.setApiLoadingUiState_action);
  const setQuestionSetsValue_action = useMathQuestionToolPageStore(state => state.ui.action.setQuestionSetsValue_action);

  //
  // state
  //
  const [searchValue, setSearchValue] = useState('');
  const [summarizedMetadataList, setSummarizedMetadataList] = useState<
    TSummarizedMetadata[] | undefined
  >();
  const [pagination, setPagination] = useState<TSearchApiPagination | undefined>();
  const [isOpenSearchModal, setIsOpenSearchModal] = useState(false);

  //
  // hook
  //
  const {
    openResetMetadataConfirmModal,
  } = useResetMetadataConfirmModal();

  //
  // callback
  //
  const onEnterSearchInput = useCallback((searchValue: string) => {
    setSearchValue(searchValue);
    setIsOpenSearchModal(true);
  }, []);

  const retrieveKnowledgeConceptList = useCallback(async (
    searchValue: string,
    page = 1
  ) => {
    try {
      setApiLoadingUiState_action({
        isLoading: true,
        message: apiFeedbackMessageFactory
          .searchApi
          .retrieveKnowledgeConceptListRequest(),
      });

      const payload: TRetrieveKnowledgeConceptListApiPayload = {
        pathParams: {
          title: searchValue,
          page,
        },
      };

      // FIXME: API 연동 후, 적용하기
      // const response = await ApiManager.retrieveKnowledgeConceptList(payload);
      console.log('retrieveKnowledgeConceptList() - payload: ', payload);

      // FIXME: API 연동 후, 적용하기
      // return response?.data;
      return {
        results: [],
      };
    } catch(error: any) {
      const message = createErrorMessage({
        error,
        createDefaultErrorMessage: apiFeedbackMessageFactory
          .searchApi
          .retrieveKnowledgeConceptListFailure,
      });

      openErrorModal_action({
        buttonActionType: 'close',
        message,
      });

      return null;
    } finally {
      resetApiLoadingUiState_action();
    }
  }, [
    setApiLoadingUiState_action,
    resetApiLoadingUiState_action,
    openErrorModal_action,
  ]);

  const onSearch = useCallback(async (
    value: string, 
    page?: number
  ) => {
    console.group('onSearch()');
    console.log('value: ', value);
    console.log('page: ', page);
    console.groupEnd();

    setSummarizedMetadataList(undefined);

    // FIXME: API 연동 후, `any` 타입 삭제하기
    const data: any = await retrieveKnowledgeConceptList(searchValue, page);

    if (!data) {
      return;
    }

    const {
      currentPage,
      lastPage,
      results,
    } = data;

    const summarizedMetadataList = results.map(metadata => {
      const summary = summaryKeys
        .map(key => {
          return metadata[key as keyof typeof metadata];
        })
        .filter(value => !!value)
        .join(' / ');

      return {
        id,
        summary,
        metadata,
      } as TSummarizedMetadata;
    });

    setSummarizedMetadataList(summarizedMetadataList);
    setPagination({
      currentPage,
      lastPage,
    });
  }, [
    id, searchValue, summaryKeys,
    retrieveKnowledgeConceptList, 
  ]);

  const resetSummarizedMetadataList = useCallback(() => {
    setSummarizedMetadataList(undefined);
  }, []);

  const onSelectSummarizedMetadata = useCallback((
    summarizedMetadata: TSummarizedMetadata
  ) => {
    setQuestionSetsValue_action({
      indexOfResult,
      id,
      value: summarizedMetadata,
    });
  }, [indexOfResult, id, setQuestionSetsValue_action]);

  const onClickClear = useCallback((e: MouseEvent<SVGElement>) => {
    e.stopPropagation();

    openResetMetadataConfirmModal(id);
  }, [id, openResetMetadataConfirmModal]);

  return (<>
    <div className={cn(
      'KnowledgeConcept',
      className
    )}>
      <div className="summaryWrapper">
        <div className="label">
          {header.label}
        </div>

        <div
          className={cn(
            'valueSummary',
            { placeholder: !kc2State }
          )}>
          {kc2State?.summary ?? header.placeholder}
        </div>

        <div className="actionButton">
          <SlRefresh 
            className="actionButton" 
            size="20px"
            onClick={onClickClear} />
        </div>
      </div>

      <div className="detailWrapper">
        <div className="searchWrapper">
          <SearchInput
            placeholder={placeholder}
            onEnter={onEnterSearchInput} />
        </div>

        {kc2State && (
          <div className="details">
            {details.map(detail => {
              const {
                key,
                label,
              } = detail;

              const metadataKey = key as keyof typeof kc2State.metadata;
              const value = kc2State.metadata?.[metadataKey];

              return (
                <div
                  key={`${id}-${detail.key}`}
                  className="detail">
                  <div className="label">
                    {label}
                  </div>

                  <div className="value">
                    {value}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>

    {/* SearchModal */}
    <MetadataSearchModal
      isOpen={isOpenSearchModal}
      searchValue={searchValue}
      summarizedMetadataList={summarizedMetadataList}
      pagination={pagination}

      onChangeIsOpen={setIsOpenSearchModal}

      onEnterSearchInput={onEnterSearchInput}
      onSearch={onSearch}
      resetSummarizedMetadataList={resetSummarizedMetadataList}

      onSelectSummarizedMetadata={onSelectSummarizedMetadata} />
  </>);
}

const KnowledgeConcept = memo(_KnowledgeConcept) as typeof _KnowledgeConcept;
export default KnowledgeConcept;
