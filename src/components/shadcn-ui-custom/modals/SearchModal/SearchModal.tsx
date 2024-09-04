// react
import {
  useState,
  useMemo,
  useCallback,
  useEffect,
  memo,
} from 'react';
// ui
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn-ui/ui/dialog';
import SearchModalActions from './SearchModalActions/SearchModalActions';
import SearchModalTable from './SearchModalTable/SearchModalTable';
import SearchModalFooter from './SearchModalFooter/SearchModalFooter';
// type
import { 
  TCommonSelectOptionItem,
} from '../../CommonSelect/CommonSelect.type';
import {
  ColumnDef,
} from '@tanstack/react-table';
import {
  TPaginationModel,
} from '@/apis/models/cmsCommonModel.type';
import { 
  AxiosResponse,
} from 'axios';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './SearchModal.css';

type TSearchModalProps<TModel> = {
  className: string;
  isOpen: boolean;
  onChangeIsOpen: (isOpen: boolean) => void;

  title: string;
  description?: string;

  searchTypeOptions: TCommonSelectOptionItem[];

  retrieveData: (params: any) => Promise<AxiosResponse<TPaginationModel<any>> | undefined>;
  flatData?: (data: any) => TModel[];
  tableColumns: ColumnDef<TModel, any>[];
  onClickRow: (rowData: TModel) => void;
};

function _SearchModal<
  TModel = any
>(props: TSearchModalProps<TModel>) {
  const {
    className,
    isOpen,
    onChangeIsOpen,

    title,
    description,

    searchTypeOptions,

    retrieveData,
    flatData,
    tableColumns,
    onClickRow,
  } = props;

  //
  // state
  //
  const [data, setData] = useState<TPaginationModel<TModel> | null>(null);
  const [searchType, setSearchType] = useState(searchTypeOptions[0]?.value ?? '');
  const [searchValue, setSearchValue] = useState('');

  //
  // callback
  //
  const createParams = useCallback((page: number) => {
    const params = {
      searchParams: {
        page,
        [searchType]: searchValue,
      },
    };

    return params;
  }, [searchType, searchValue]);

  const _retrieverApiFunction = useCallback(async (
    params: any
  ) => {
    const response = await retrieveData(params);

    setData(response?.data ?? null);
  }, [retrieveData]);

  //
  // cache
  //
  const tableData = useMemo(() => {
    if (!data) {
      return [];
    }

    return !flatData
      ? data.results
      : data.results.reduce((result, item) => [
        ...result,
        ...flatData(item),
      ], [] as TModel[]);
  }, [data, flatData]);

  //
  // effect
  //
  useEffect(function cleanup() {
    if (isOpen) {
      return () => {
        setData(null);
      };
    }
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onChangeIsOpen}>
      <DialogTrigger hidden />

      <DialogContent className={cn(
        'SearchModal',
        className
      )}>
        <DialogHeader className="SearchModal-header">
          <DialogTitle className="title">
            {title}
          </DialogTitle>

          <DialogDescription
            className="description"
            hidden={!description}>
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="SearchModal-actions">
          <SearchModalActions
            searchTypeOptions={searchTypeOptions}
            searchType={searchType}
            onChangeSearchKey={setSearchType}
            searchValue={searchValue}
            onChangeSearchValue={setSearchValue}
            data={data}
            createParams={createParams}
            retrieverApiFunction={_retrieverApiFunction} />
        </div>

        <div className="SearchModal-table">
          <SearchModalTable<TModel>
            columns={tableColumns}
            tableData={tableData}
            onClickRow={onClickRow} />
        </div>

        <DialogFooter className="SearchModal-footer">
          <SearchModalFooter 
            title={title}
            data={data}
            createParams={createParams}
            retrieverApiFunction={_retrieverApiFunction}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const SearchModal = memo(_SearchModal) as typeof _SearchModal;
export default SearchModal;
