// react
import {
  useState,
  useCallback,
  memo,
  ChangeEvent,
} from 'react';
// store
import useMathChapterPageStore from '@/store/mathStores/mathChapterPageStore/mathChapterPageStore';
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
{/* FIXME: 미사용 처리 */}
// import { 
//   Button,
// } from '@/components/shadcn-ui/ui/button';
// import TBUTooltip from '@/components/shadcn-ui-custom/TBUTooltip/TBUTooltip';
// icon
{/* FIXME: 미사용 처리 */}
// import { 
//   LuFileInput,
// } from 'react-icons/lu';
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

  const updateSearchParamsForRetrieveMathChaptersApi = useMathChapterPageStore(state => state.updateSearchParamsForRetrieveMathChaptersApi);

  //
  // state
  //
  const [searchType, setSearchType] = useState<string>(
    mathChapterSearchTypeOptions[0].value
  );

  //
  // callback
  //
  const onChangeSearchType = useCallback((searchType: string) => {
    updateSearchParamsForRetrieveMathChaptersApi(old => ({
      ...old,
      chapter_title: undefined,
      chapter1_title: undefined,
      chapter2_title: undefined,
      chapter3_title: undefined,
    }));

    setSearchType(searchType);

    setTimeout(() => {
      $editorRef.current?.focus();
    }, 200);

    // eslint-disable-next-line
  }, [updateSearchParamsForRetrieveMathChaptersApi]);

  const onChangeSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;

    updateSearchParamsForRetrieveMathChaptersApi(old => ({
      ...old,
      chapter_title: undefined,
      chapter1_title: undefined,
      chapter2_title: undefined,
      chapter3_title: undefined,
      [searchType]: search,
    }));
  }, [
    searchType,
    updateSearchParamsForRetrieveMathChaptersApi,
  ]);

  const onEnter = useCallback(() => {
    $editorRef.current?.blur();

    const params: TRetrieveMathChaptersApiRequestParams = {
      searchParams: {
        ...searchParamsForRetrieveMathChaptersApi,
      },
    };

    retrieveMathChapters(params);

    // eslint-disable-next-line
  }, [
    searchParamsForRetrieveMathChaptersApi,
    retrieveMathChapters,
  ]);

  const onESC = useCallback(() => {
    updateSearchParamsForRetrieveMathChaptersApi(old => ({
      ...old,
      chapter_title: undefined,
      chapter1_title: undefined,
      chapter2_title: undefined,
      chapter3_title: undefined,
    }));
  }, [updateSearchParamsForRetrieveMathChaptersApi]);

  const SearchButtonAddon = useCallback((props: any) => {
    return (
      <SearchButtonForInputWithAddon
        {...props}
        onClick={() => {
          retrieveMathChapters({
            searchParams: searchParamsForRetrieveMathChaptersApi,
          });
        }} />
    );
  }, [
    searchParamsForRetrieveMathChaptersApi,
    retrieveMathChapters,
  ]);

  //
  // hook
  //
  const {
    onKeyDown,
  } = useOnKeyDownEnterOrESC(onEnter, onESC);

  const {
    $editorRef,
  } = useAutoFocus(mathChaptersData);

  return (
    <div className="MathChapterTableActions">
      <div className="MathChapterTableActions-leftSide">
        <Select
          value={searchType}
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

        <InputWithAddon
          ref={$editorRef}
          containerClassName="searchValue"
          placeholder="검색어를 입력해주세요"
          autoFocus
          value={searchParamsForRetrieveMathChaptersApi[searchType] ?? ''}
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
          RightAddon={SearchButtonAddon} />
      </div>

      <div className="MathChapterTableActions-rightSide">
        {/* FIXME: 미사용 처리 */}
        {/* <TBUTooltip>
          <Button
            className="actionButton"
            disabled>
            <LuFileInput className="icon" />
            다운로드
          </Button>
        </TBUTooltip> */}
      </div>
    </div>
  );
}

const MathChapterTableActions = memo(_MathChapterTableActions);
export default MathChapterTableActions;
