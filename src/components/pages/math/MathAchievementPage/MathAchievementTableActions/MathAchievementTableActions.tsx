// react
import {
  useState,
  useCallback,
  memo,
  ChangeEvent,
} from 'react';
// store
import useMathAchievementPageStore from '@/store/mathStores/mathAchievementPageStore/mathAchievementPageStore';
// hook
import useOnKeyDownEnterOrESC from '@/components/hooks/useOnKeyDownEnterOrESC';
import useAutoFocus from '@/components/hooks/useAutoFocus';
// ui
import { 
  Select, 
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/shadcn-ui/ui/select';
import { 
  InputWithAddon,
  SearchButtonForInputWithAddon,
} from '@/components/shadcn-ui-custom/InputWithAddon';
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
import TBUTooltip from '@/components/shadcn-ui-custom/TBUTooltip/TBUTooltip';
// icon
import { 
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

  const updateSearchParamsForRetrieveMathAchievementsApi = useMathAchievementPageStore(state => state.updateSearchParamsForRetrieveMathAchievementsApi);

  //
  // state
  //
  const [searchType, setSearchType] = useState(mathAchievementSearchTypeOptions[0].value);

  //
  // callback
  //
  const onChangeSearchType = useCallback((searchType: string) => {
    updateSearchParamsForRetrieveMathAchievementsApi(old => ({
      ...old,
      achievement_title: undefined,
      achievement1_title: undefined,
      achievement2_title: undefined,
      achievement3_title: undefined,
      achievement_code: undefined,
    }));

    setSearchType(searchType);

    setTimeout(() => {
      $editorRef.current?.focus();
    }, 100);

    // eslint-disable-next-line
  }, [updateSearchParamsForRetrieveMathAchievementsApi]);

  const onChangeSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const correctedValue = value?.trim()?.length
      ? value
      : undefined;

    updateSearchParamsForRetrieveMathAchievementsApi(old => ({
      ...old,
      achievement_title: undefined,
      achievement1_title: undefined,
      achievement2_title: undefined,
      achievement3_title: undefined,
      achievement_code: undefined,
      [searchType]: correctedValue,
    }));
  }, [
    searchType,
    updateSearchParamsForRetrieveMathAchievementsApi,
  ]);

  const onEnter = useCallback(() => {
    $editorRef.current?.blur();

    const params: TRetrieveMathAchievementsApiRequestParams = {
      searchParams: searchParamsForRetrieveMathAchievementsApi,
    };

    retrieveMathAchievements(params);

    // eslint-disable-next-line
  }, [
    searchParamsForRetrieveMathAchievementsApi,
    retrieveMathAchievements,
  ]);

  const onESC = useCallback(() => {
    updateSearchParamsForRetrieveMathAchievementsApi(old => ({
      ...old,
      achievement_title: undefined,
      achievement1_title: undefined,
      achievement2_title: undefined,
      achievement3_title: undefined,
      achievement_code: undefined,
    }));
  }, [updateSearchParamsForRetrieveMathAchievementsApi]);

  const SearchButtonAddon = useCallback((props: any) => {
    return (
      <SearchButtonForInputWithAddon
        {...props}
        onClick={() => {
          retrieveMathAchievements({
            searchParams: searchParamsForRetrieveMathAchievementsApi,
          });
        }} />
    );

    // eslint-disable-next-line
  }, [
    searchParamsForRetrieveMathAchievementsApi,
    retrieveMathAchievements,
  ]);

  //
  // hook
  //
  const {
    onKeyDown,
  } = useOnKeyDownEnterOrESC(onEnter, onESC);

  const {
    $editorRef,
  } = useAutoFocus(mathAchievementsData);

  return (
    <div className="MathAchievementTableActions">
      <div className="MathAchievementTableActions-leftSide">
        <Select
          value={searchType}
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

        <InputWithAddon
          ref={$editorRef}
          containerClassName="searchValue"
          placeholder="검색어를 입력해주세요"
          autoFocus
          value={searchParamsForRetrieveMathAchievementsApi[searchType] ?? ''}
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
          RightAddon={SearchButtonAddon} />
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
