// react
import {
  useRef,
  useCallback,
  useEffect,
  memo,
  ChangeEvent,
} from 'react';
// store
import useMathAchievementPageStore from '@/store/mathStores/mathAchievementPageStore/mathAchievementPageStore';
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
  LuSearch,
  LuFileInput,
} from 'react-icons/lu';
// type
import { 
  mathAchievementSearchTypeOptions,
} from './MathAchievementTableActions.type';
import { 
  TRetrieveMathAchievementsApiRequestParams,
} from '@/apis/math/mathApi.type';
// style
import './MathAchievementTableActions.css';

type TMathAchievementTableActionsProps = {
  retrieveMathAchievements: (params: TRetrieveMathAchievementsApiRequestParams) => Promise<void>;
};

function _MathAchievementTableActions(props: TMathAchievementTableActionsProps) {
  const {
    retrieveMathAchievements,
  } = props;

  //
  // mathAchievementPage store
  //
  const mathAchievementsData = useMathAchievementPageStore(state => state.mathAchievementsData);

  const searchParamsForRetrieveMathAchievementsApi = useMathAchievementPageStore(state => state.searchParamsForRetrieveMathAchievementsApi);
  const search = searchParamsForRetrieveMathAchievementsApi.search ?? '';

  const updateSearchParamsForRetrieveMathAchievementsApi = useMathAchievementPageStore(state => state.updateSearchParamsForRetrieveMathAchievementsApi);

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

    updateSearchParamsForRetrieveMathAchievementsApi(old => ({
      ...old,
      search,
    }));
  }, [updateSearchParamsForRetrieveMathAchievementsApi]);

  const onEnter = useCallback(() => {
    $searchInputRef.current?.blur();

    const params: TRetrieveMathAchievementsApiRequestParams = {
      searchParams: searchParamsForRetrieveMathAchievementsApi,
    };

    retrieveMathAchievements(params);
  }, [
    searchParamsForRetrieveMathAchievementsApi,
    retrieveMathAchievements,
  ]);

  const onESC = useCallback(() => {
    updateSearchParamsForRetrieveMathAchievementsApi(old => ({
      ...old,
      search: undefined,
    }));
  }, [updateSearchParamsForRetrieveMathAchievementsApi]);

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
  }, [mathAchievementsData]);

  return (
    <div className="MathAchievementTableActions">
      <div className="MathAchievementTableActions-leftSide">
        <TBUTooltip>
          <Select
            value={''}
            onValueChange={onChangeSearchType}>
            <SelectTrigger className="searchTypeSelect">
              <SelectValue placeholder="검색 항목 선택" />
            </SelectTrigger>

            <SelectContent>
              {mathAchievementSearchTypeOptions.map(item => {
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
          containerClassName="searchInput"
          placeholder="검색어를 입력해주세요"
          autoFocus
          value={search}
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
          EndIcon={LuSearch} />
      </div>

      <div className="MathAchievementTableActions-rightSide">
        <TBUTooltip>
          <Button
            className="actionButton"
            disabled>
            삭제
          </Button>
        </TBUTooltip>

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

const MathAchievementTableActions = memo(_MathAchievementTableActions);
export default MathAchievementTableActions;
