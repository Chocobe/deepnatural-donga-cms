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
// API
import ApiManager from '@/apis/ApiManager';
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
  TSearchApiPagination,
  TRetrieveMathToolKnowledgeConceptsApiRequestParams,
  TRetrieveMathToolKnowledgeConceptsApiResponse,
} from '@/apis/mathTool/mathToolApi.type';
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

  const retrieveKnowledgeConcepts = useCallback(async (
    searchValue: string,
    page = 1
  ) => {
    const params: TRetrieveMathToolKnowledgeConceptsApiRequestParams = {
      searchParams: {
        title: searchValue,
        page,
      },
    };

    const response = await ApiManager
      .mathTool
      .retrieveMathToolKnowledgeConceptsApi
      .callWithNoticeMessageGroup(params);

    return response?.data ?? {} as TRetrieveMathToolKnowledgeConceptsApiResponse;
  }, []);

  const onSearch = useCallback(async (
    value: string, 
    page?: number
  ) => {
    setSummarizedMetadataList(undefined);

    const data = await retrieveKnowledgeConcepts(searchValue, page);

    if (!data) {
      return;
    }

    const {
      current_page,
      last_page,
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
      current_page,
      last_page,
    });
  }, [
    id, searchValue, summaryKeys,
    retrieveKnowledgeConcepts, 
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
