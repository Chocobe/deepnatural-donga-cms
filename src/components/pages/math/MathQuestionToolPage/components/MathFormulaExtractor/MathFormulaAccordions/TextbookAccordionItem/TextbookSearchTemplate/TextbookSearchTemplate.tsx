// react
import {
  useState,
  useCallback,
  memo,
} from 'react';
// store
import useMathQuestionToolPageStore from '@/store/mathStores/mathQuestionToolPageStore/mathQuestionToolPageStore';
// ui
import SearchInput from '../../../SearchInput/SearchInput';
import MetadataSearchModal from '../../../MetadataSearchModal/MetadataSearchModal';
// type
import { 
  TSummarizedMetadata,
  TTextbookSubMetadataTemplate,
} from '../../mathFormulaAccordions.type';
import { 
  TSearchApiPagination,
  TSearchApiBaseGeneric,
} from '@/components/pages/math/MathQuestionToolPage/network/network.type/searchApi.type';
// style
import './TextbookSearchTemplate.css';

type TTextbookSearchTemplateProps<T> = {
  metadataTemplate: Readonly<TTextbookSubMetadataTemplate>;
  onSearch: (
    searchValue: string,
    pagge?: number
  ) => Promise<T | null>;
  disabled?: boolean;
};

function _TextbookSearchTemplate<T extends TSearchApiBaseGeneric>(props: TTextbookSearchTemplateProps<T>) {
  const {
    metadataTemplate: {
      id,
      search: {
        label,
        placeholder,
      },
      summaryKeys,
      searchModalItemDetails,
    },
    onSearch,
    disabled,
  } = props;

  //
  // mathQuestionToolPage store
  //
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
  // callback
  //
  const openSearchModal = useCallback((searchValue: string) => {
    setSearchValue(searchValue);
    setIsOpenSearchModal(true);
  }, []);

  const onEnterSearchInput = useCallback((searchValue: string) => {
    setSearchValue(searchValue);
  }, []);

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
  }, [id, summaryKeys, onSearch]);

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
    <div className="TextbookSearchTemplate">
      <div className="label">
        {label}
      </div>

      <div className="searchInputWrapper">
        <SearchInput
          searchValue={searchValue}
          placeholder={placeholder}
          disabled={disabled}
          onEnter={openSearchModal} />
      </div>
    </div>

    {/* SearchModal */}
    <MetadataSearchModal
      isOpen={isOpenSearchModal}
      searchValue={searchValue}
      summarizedMetadataList={summarizedMetadataList}
      pagination={pagination}

      variant="textbook"
      textbookItemTemplate={searchModalItemDetails}

      onChangeIsOpen={setIsOpenSearchModal}

      onEnterSearchInput={onEnterSearchInput}
      onSearch={_onSearch}
      resetSummarizedMetadataList={resetSummarizedMetadataList}

      onSelectSummarizedMetadata={onSelectSummarizedMetadata} />
  </>);
}

const TextbookSearchTemplate = memo(_TextbookSearchTemplate) as typeof _TextbookSearchTemplate;
export default TextbookSearchTemplate;
