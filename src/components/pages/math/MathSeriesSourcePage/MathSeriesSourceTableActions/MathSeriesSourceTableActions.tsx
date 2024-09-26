// react
import {
  useState,
  useCallback,
  memo,
  ChangeEvent,
} from 'react';
// store
import useMathSeriesSourcePageStore from '@/store/mathStores/mathSeriesSourcePageStore/mathSeriesSourcePageStore';
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
  mathSeriesSourceSearchTypeOptions,
} from './MathSeriesSourceTableActions.type';
import { 
  TRetrieveMathSeriesSourcesApiRequestParams,
} from '@/apis/math/mathApi.type';
// style
import './MathSeriesSourceTableActions.css';

type TMathSeriesSourceTableActionProps = {
  retrieveMathSeriesSources: (params: TRetrieveMathSeriesSourcesApiRequestParams) => Promise<void>;
};

function _MathSeriesSourceTableActions(props: TMathSeriesSourceTableActionProps) {
  const {
    retrieveMathSeriesSources,
  } = props;

  //
  // mathSeriesSourcePage store
  //
  const mathSeriesSourcesData = useMathSeriesSourcePageStore(state => state.mathSeriesSourcesData);

  const searchParamsForRetrieveMathSeriesSourcesApi = useMathSeriesSourcePageStore(state => state.searchParamsForRetrieveMathSeriesSourcesApi);

  const updateSearchParamsForRetrieveMathSeriesSourcesApi = useMathSeriesSourcePageStore(state => state.updateSearchParamsForRetrieveMathSeriesSourcesApi);

  //
  // state
  //
  // FIXME: mockup
  const [searchType, setSearchType] = useState(mathSeriesSourceSearchTypeOptions[0].value);

  //
  // callback
  //
  const onChangeSearchType = useCallback((searchType: string) => {
    updateSearchParamsForRetrieveMathSeriesSourcesApi(old => ({
      ...old,
      series_source: undefined,
      series_title: undefined,
      source_name: undefined,
    }));

    setSearchType(searchType);

    setTimeout(() => {
      $editorRef.current?.focus();
    }, 100);

    // eslint-disable-next-line
  }, [updateSearchParamsForRetrieveMathSeriesSourcesApi]);

  const onChangeSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;

    updateSearchParamsForRetrieveMathSeriesSourcesApi(old => ({
      ...old,
      series_source: undefined,
      series_title: undefined,
      source_name: undefined,
      [searchType]: search,
    }));
  }, [
    searchType,
    updateSearchParamsForRetrieveMathSeriesSourcesApi,
  ]);

  const onEnter = useCallback(() => {
    $editorRef.current?.blur();

    const params: TRetrieveMathSeriesSourcesApiRequestParams = {
      searchParams: {
        ...searchParamsForRetrieveMathSeriesSourcesApi,
      },
    };

    retrieveMathSeriesSources(params);

    // eslint-disable-next-line
  }, [
    searchParamsForRetrieveMathSeriesSourcesApi,
    retrieveMathSeriesSources
  ]);

  const onESC = useCallback(() => {
    updateSearchParamsForRetrieveMathSeriesSourcesApi(old => ({
      ...old,
      series_source: undefined,
      series_title: undefined,
      source_name: undefined,
    }));
  }, [updateSearchParamsForRetrieveMathSeriesSourcesApi]);

  const SearchButtonAddon = useCallback((props: any) => {
    return (
      <SearchButtonForInputWithAddon
        {...props}
        onClick={() => {
          retrieveMathSeriesSources({
            searchParams: searchParamsForRetrieveMathSeriesSourcesApi,
          });
        }} />
    );

    // eslint-disable-next-line
  }, [
    searchParamsForRetrieveMathSeriesSourcesApi,
    retrieveMathSeriesSources,
  ]);

  //
  // hook
  //
  const {
    onKeyDown,
  }  = useOnKeyDownEnterOrESC(onEnter, onESC);

  const {
    $editorRef,
  } = useAutoFocus(mathSeriesSourcesData);

  return (
    <div className="MathSeriesSourceTableActions">
      <div className="MathSeriesSourceTableActions-leftSide">
        <Select
          value={searchType}
          onValueChange={onChangeSearchType}>
          <SelectTrigger className="searchTypeSelect">
            <SelectValue placeholder="검색 항목 선택" />
          </SelectTrigger>

          <SelectContent>
            {mathSeriesSourceSearchTypeOptions.map(item => {
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
          value={searchParamsForRetrieveMathSeriesSourcesApi[searchType] ?? ''}
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
          RightAddon={SearchButtonAddon} />
      </div>

      <div className="MathSeriesSourceTableActions-rightSide">
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

const MathSeriesSourceTableActions = memo(_MathSeriesSourceTableActions);
export default MathSeriesSourceTableActions;
