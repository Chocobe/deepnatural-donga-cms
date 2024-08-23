// react
import {
  useRef,
  useCallback,
  useEffect,
  memo,
  ChangeEvent,
} from 'react';
// store
import useMathTextbookPageStore from '@/store/mathTextbookPageStore/mathTextbookPageStore';
// hook
import useOnKeyDownEnterOrESC from '@/components/hooks/useOnKeyDownEnterOrESC';
// ui
import { 
  Select, 
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/shadcn-ui/ui/select';
import { 
  InputWithIcon,
} from '@/components/shadcn-ui-custom/InputWithIcon/InputWithIcon';
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
// icon
import {
  LuSearch,
  LuFileInput,
} from 'react-icons/lu';
// type
import { 
  mathTextbookSearchTypeOptions,
} from './MathTextbookTableActions.type';
import { 
  TRetrieveMathTextbooksApiRequestParams,
} from '@/apis/math/mathApi.type';
// style
import './MathTextbookTableActions.css';

type TMathTextbookTableActionsProps = {
  retrieveMathTextbooks: (params: TRetrieveMathTextbooksApiRequestParams) => Promise<void>;
};

function _MathTextbookTableActions(props: TMathTextbookTableActionsProps) {
  const {
    retrieveMathTextbooks,
  } = props;

  //
  // mathTextbookPage store
  //
  const mathTextbooksData = useMathTextbookPageStore(state => state.mathTextbooksData);

  const searchParamsForRetrieveMathTextbooksApi = useMathTextbookPageStore(state => state.searchParamsForRetrieveMathTextbooksApi);
  const {
    search = '',
  } = searchParamsForRetrieveMathTextbooksApi;

  const updateSearchParamsForRetrieveMathTextbooksApi = useMathTextbookPageStore(state => state.updateSearchParamsForRetrieveMathTextbooksApi);

  //
  // ref
  //
  const $searchInputRef = useRef<HTMLInputElement | null>(null);

  //
  // callback
  //
  // FIXME: 제외 가능성 높은 기능
  const onChangeSearchType = useCallback((searchType: string) => {
    console.log('onChangeSearchType() - searchType: ', searchType);
  }, []);

  const onChangeSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;

    updateSearchParamsForRetrieveMathTextbooksApi(searchParamsForRetrieveMathTextbooksApi => ({
      ...searchParamsForRetrieveMathTextbooksApi,
      search,
    }));
  }, [updateSearchParamsForRetrieveMathTextbooksApi]);

  const onEnter = useCallback(() => {
    $searchInputRef.current?.blur();

    const params: TRetrieveMathTextbooksApiRequestParams = {
      searchParams: {
        ...searchParamsForRetrieveMathTextbooksApi,
      },
    };

    retrieveMathTextbooks(params);
  }, [
    searchParamsForRetrieveMathTextbooksApi,
    retrieveMathTextbooks,
  ]);

  const onESC = useCallback(() => {
    updateSearchParamsForRetrieveMathTextbooksApi(searchParamsForRetrieveMathTextbooksApi => ({
      ...searchParamsForRetrieveMathTextbooksApi,
      search: undefined,
    }));
  }, [updateSearchParamsForRetrieveMathTextbooksApi]);

  //
  // hook
  //
  const {
    onKeyDown,
  } = useOnKeyDownEnterOrESC(onEnter, onESC);

  //
  // effect
  //
  useEffect(function focusSearchInput() {
    $searchInputRef.current?.focus();
  }, [mathTextbooksData]);

  return (
    <div className="MathTextbookTableActions">
      <div className="MathTextbookTableActions-leftSide">
        {/* FIXME: 제외 가능성 높은 기능 */}
        <Select
          value={''}
          onValueChange={onChangeSearchType}>
          <SelectTrigger className="searchTypeSelect">
            <SelectValue placeholder="검색 항목 선택" />
          </SelectTrigger>

          <SelectContent>
            {mathTextbookSearchTypeOptions.map(item => {
              const {
                text,
                value,
              } = item;

              return (
                <SelectItem
                  key={value}
                  value={value}>
                  {text}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        <InputWithIcon
          ref={$searchInputRef}
          containerClassName="searchValue"
          placeholder="검색어를 입력해주세요"
          autoFocus
          value={search}
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
          EndIcon={LuSearch} />
      </div>

      <div className="MathTextbookTableActions-rightSide">
        <Button
          className="actionButton"
          disabled>
          삭제
        </Button>

        <Button
          className="actionButton"
          disabled>
          <LuFileInput className="icon" />
          Export
        </Button>
      </div>
    </div>
  );
}

const MathTextbookTableActions = memo(_MathTextbookTableActions);
export default MathTextbookTableActions;
