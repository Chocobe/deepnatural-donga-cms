// react
import {
  useCallback,
  useEffect,
  memo,
} from 'react';
// UI Components
import SearchInput from '../SearchInput/SearchInput';
import MetadataList from './MetadataList/MetadataList';
import TextbookList from './TextbookList/TextbookList';
import Pagination from './Pagination/Pagination';
// ui
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn-ui/ui/dialog';
// type
import { 
  TSummarizedMetadata,
} from '../MathFormulaAccordions/mathFormulaAccordions.type';
import { 
  TSearchApiPagination,
} from '@/apis/mathTool/mathToolApi.type';
// style
import './MetadataSearchModal.css';

type TMetadataSearchModalProps<T = TSummarizedMetadata> = {
  isOpen: boolean;
  searchValue: string;
  summarizedMetadataList?: T[];
  pagination?: TSearchApiPagination;

  variant?: 'common' | 'textbook';
  textbookItemTemplate?: Readonly<Array<{
    key: string;
    label: string;
  }>>;

  onChangeIsOpen: (isOpen: boolean) => void;

  onEnterSearchInput: (searchValue: string) => void;
  onSearch: (
    value: string,
    page?: number
  ) => Promise<void>;
  resetSummarizedMetadataList: () => void;

  onSelectSummarizedMetadata: (summarizedMetadata: T) => void;
};

function _MetadataSearchModal<T extends TSummarizedMetadata>(props: TMetadataSearchModalProps<T>) {
  const {
    isOpen,
    searchValue,
    summarizedMetadataList,
    pagination,

    variant = 'common',
    textbookItemTemplate,

    onChangeIsOpen,

    onEnterSearchInput,
    onSearch,
    resetSummarizedMetadataList,

    onSelectSummarizedMetadata,
  } = props;

  //
  // callback
  //
  const _onEnterSearchInput = useCallback((value: string) => {
    onEnterSearchInput(value);
  }, [onEnterSearchInput]);

  const onClearSearchInput = useCallback(() => {
    onEnterSearchInput('');
    resetSummarizedMetadataList();
  }, [onEnterSearchInput, resetSummarizedMetadataList]);

  const onClickMetadata = useCallback((metadata: T) => {
    onSelectSummarizedMetadata(metadata);
    onChangeIsOpen(false);
  }, [onSelectSummarizedMetadata, onChangeIsOpen]);

  useEffect(function onChangeSearchValue() {
    if (!isOpen) {
      return;
    }

    onSearch(searchValue);

    // eslint-disable-next-line
    }, [isOpen, searchValue]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onChangeIsOpen}>
      <DialogTrigger hidden />

      <DialogContent className="MetadataSearchModal">
        <DialogHeader className="MetadataSearchModal-header">
          <DialogTitle 
            hidden
            className="hidden" />
          <DialogDescription
            hidden
            className="hidden" />
          <SearchInput
            searchValue={searchValue}
            onEnter={_onEnterSearchInput}
            onClear={onClearSearchInput} />
        </DialogHeader>

        <div className="MetadataSearchModal-body">
          {variant === 'textbook'
            ? (
              <TextbookList<T>
                searchValue={searchValue}
                summarizedMetadataList={summarizedMetadataList}
                textbookItemTemplate={textbookItemTemplate}
                onClickItem={onClickMetadata} />
            ): (
              <MetadataList<T>
                searchValue={searchValue}
                summarizedMetadataList={summarizedMetadataList}
                onClickItem={onClickMetadata} />
            )
          }

          {!!summarizedMetadataList?.length && (
            <Pagination 
              className="pagination" 
              pagination={pagination}
              searchValue={searchValue}
              onSearch={onSearch} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

const MetadataSearchModal = memo(_MetadataSearchModal) as typeof _MetadataSearchModal;
export default MetadataSearchModal;
