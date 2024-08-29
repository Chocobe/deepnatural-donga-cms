// react
import {
  useRef,
  useCallback,
  memo,
  ChangeEvent,
  useEffect,
} from 'react';
// store
import useMathChapterPageStore from '@/store/mathChapterPageStore/mathChapterPageStore';
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
import TBUTooltip from '@/components/shadcn-ui-custom/TBUTooltip/TBUTooltip';
// icon
import { 
  LuFileInput,
  LuSearch,
} from 'react-icons/lu';
// type
import { 
  mathChapterSearchTypeOptions,
} from './MathChapterTableActions.type';
import { 
  TRetrieveMathChaptersApiRequestParams,
} from '@/apis/math/mathApi.type';
// style
import './MathChapterTableActions.css';

type TMathChapterTableActionsProps = {
  retrieveMathChapters: (params: TRetrieveMathChaptersApiRequestParams) => Promise<void>;
};

function _MathChapterTableActions(props: TMathChapterTableActionsProps) {
  const {
    retrieveMathChapters,
  } = props;

  //
  // mathChapterPage store
  //
  const mathChaptersData = useMathChapterPageStore(state => state.mathChaptersData);

  const searchParamsForRetrieveMathChaptersApi = useMathChapterPageStore(state => state.searchParamsForRetrieveMathChaptersApi);
  const {
    search = '',
  } = searchParamsForRetrieveMathChaptersApi;

  const updateSearchParamsForRetrieveMathChaptersApi = useMathChapterPageStore(state => state.updateSearchParamsForRetrieveMathChaptersApi);

  //
  // ref
  //
  const $searchInputRef = useRef<HTMLInputElement | null>(null);

  //
  // callback
  //
  const onChangeSearchType = useCallback(() => {
    console.log('onChangeSearchType()');
  }, []);

  const onChangeSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;

    updateSearchParamsForRetrieveMathChaptersApi(old => ({
      ...old,
      search,
    }));
  }, [updateSearchParamsForRetrieveMathChaptersApi]);

  const onEnter = useCallback(() => {
    $searchInputRef.current?.blur();

    const params: TRetrieveMathChaptersApiRequestParams = {
      searchParams: {
        ...searchParamsForRetrieveMathChaptersApi,
      },
    };

    retrieveMathChapters(params);
  }, [
    searchParamsForRetrieveMathChaptersApi,
    retrieveMathChapters,
  ]);

  const onESC = useCallback(() => {
    updateSearchParamsForRetrieveMathChaptersApi(old => ({
      ...old,
      search: undefined,
    }));
  }, [updateSearchParamsForRetrieveMathChaptersApi]);

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
  }, [mathChaptersData]);

  return (
    <div className="MathChapterTableActions">
      <div className="MathChapterTableActions-leftSide">
        <TBUTooltip>
          <Select
            value={''}
            onValueChange={onChangeSearchType}>
            <SelectTrigger className="searchTypeSelect">
              <SelectValue placeholder="검색 항목 선택" />
            </SelectTrigger>

            <SelectContent>
              {mathChapterSearchTypeOptions.map(item => {
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
        </TBUTooltip>

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

      <div className="MathChapterTableActions-rightSide">
        <TBUTooltip>
          <Button
            className="actionButton"
            disabled>
            <LuFileInput className="icon" />
            Export
          </Button>
        </TBUTooltip>
      </div>
    </div>
  );
}

const MathChapterTableActions = memo(_MathChapterTableActions);
export default MathChapterTableActions;
