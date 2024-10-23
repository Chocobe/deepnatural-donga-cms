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
import useResetMetadataConfirmModal from '../../MathFormulaExtractorHeader/hooks/useResetMetadataConfirmModal';
// UI Components
import SearchInput from '../../SearchInput/SearchInput';
import MetadataSearchModal from '../../MetadataSearchModal/MetadataSearchModal';
// ui
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/shadcn-ui/ui/accordion';
// icons
import { 
  SlRefresh,
} from "react-icons/sl";
// type
import { 
  TMetadataTemplate,
  TSummarizedMetadata,
} from '../mathFormulaAccordions.type';
import { 
  TSearchApiPagination,
  TSearchApiBaseGeneric,
} from '@/apis/mathTool/mathToolApi.type';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './MetadataAccordionItemTemplate.css';

type TMetadataAccordionItemTemplateProps<T> = {
  accordionValue: string;
  isTarget: boolean;
  metadataTemplate: Readonly<TMetadataTemplate>;
  onSearch: (
    searchValue: string,
    page?: number
  ) => Promise<T | null>;
};

function _MetadataAccordionItemTemplate<T extends TSearchApiBaseGeneric>(
  props: TMetadataAccordionItemTemplateProps<T>
) {
  const {
    accordionValue,
    isTarget,
    metadataTemplate: {
      id,
      header,
      summaryKeys,
      search: {
        placeholder,
      },
      details,
    },
    onSearch,
  } = props;

  //
  // mathQuestionToolPage store
  //
  const metadataState = useMathQuestionToolPageStore(state => state.ui.state.result.metadata);
  const summarizedMetadata = metadataState[id as keyof typeof metadataState];

  const setMetadataItem_action = useMathQuestionToolPageStore(state => state.ui.action.setMetadataItem_action);

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
  const openSearchModal = useCallback((searchValue: string) => {
    setSearchValue(searchValue);
    setIsOpenSearchModal(true);
  }, []);

  const onEnterSearchInput = useCallback((searchValue: string) => {
    setSearchValue(searchValue);
  }, []);

  const onClickClear = useCallback((e: MouseEvent<SVGElement>) => {
    e.stopPropagation();

    openResetMetadataConfirmModal(id);

  }, [id, openResetMetadataConfirmModal]);

  const _onSearch = useCallback(async (
    searchValue: string,
    page: number = 1
  ) => {
    setSummarizedMetadataList(undefined);

    const data = await onSearch(searchValue, page);

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
    id, summaryKeys, 
    onSearch,
  ]);

  const resetSummarizedMetadataList = useCallback(() => {
    setSummarizedMetadataList(undefined);
  }, []);

  const onSelectSummarizedMetadata = useCallback((
    summarizedMetadata: TSummarizedMetadata
  ) => {
    setMetadataItem_action({
      metadataKey: id,
      summarizedMetadata,
    });
  }, [id, setMetadataItem_action]);

  return (<>
    <AccordionItem 
      className={cn(
        'MetadataAccordionItemTemplate',
        isTarget ? 'isTarget': ''
      )}
      value={accordionValue}>
      <AccordionTrigger>
        <div className="MetadataAccordionItemTemplate-trigger">
          <div className="itemName">
            {header.label}
          </div>

          <div 
            className={cn(
              'valueSummary',
              { placeholder: !summarizedMetadata }
            )}>
            {summarizedMetadata?.summary ?? header.placeholder}
          </div>

          <div className="actionsWrapper">
            <SlRefresh 
              className="actionButton" 
              size="20px"
              onClick={onClickClear} />
          </div>
        </div>
      </AccordionTrigger>

      <AccordionContent className="p-4 h-auto">
        <div className="MetadataAccordionItemTemplate-content">
          <div className="searchWrapper">
            <SearchInput
              placeholder={placeholder}
              onEnter={openSearchModal} />
          </div>

          {summarizedMetadata && (
            <div className="detailsWrapper">
              {details.map(detail => {
                const {
                  key,
                  label,
                } = detail;

                const metadataKey = key as keyof typeof summarizedMetadata.metadata;
                const value = summarizedMetadata.metadata?.[metadataKey];

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
      </AccordionContent>
    </AccordionItem>

    {/* SearchModal */}
    <MetadataSearchModal
      isOpen={isOpenSearchModal}
      searchValue={searchValue}
      summarizedMetadataList={summarizedMetadataList}
      pagination={pagination}

      onChangeIsOpen={setIsOpenSearchModal}

      onEnterSearchInput={onEnterSearchInput}
      onSearch={_onSearch}
      resetSummarizedMetadataList={resetSummarizedMetadataList}

      onSelectSummarizedMetadata={onSelectSummarizedMetadata} />
  </>);
}

const MetadataAccordionItemTemplate = memo(_MetadataAccordionItemTemplate) as typeof _MetadataAccordionItemTemplate;
export default MetadataAccordionItemTemplate;
