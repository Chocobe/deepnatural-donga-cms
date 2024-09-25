// react
import {
  useState,
  useCallback,
  memo,
  ChangeEvent,
} from 'react';
// store
import useMathKnowledgeConceptPageStore from '@/store/mathStores/mathKnowledgeConceptPageStore/mathKnowledgeConceptPageStore';
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
  mathKnowledgeConceptSearchTypeOptions,
} from './MathKnowledgeConceptTableActions.type';
import { 
  TRetrieveMathKnowledgeConceptsApiRequestParams,
} from '@/apis/math/mathApi.type';
// style
import './MathKnowledgeConceptTableActions.css';

type TMathKnowledgeConceptTableActionsProps = {
  retrieveMathKnowledgeConcepts: (params: TRetrieveMathKnowledgeConceptsApiRequestParams) => Promise<void>;
};

function _MathKnowledgeConceptTableActions(props: TMathKnowledgeConceptTableActionsProps) {
  const {
    retrieveMathKnowledgeConcepts,
  } = props;

  //
  // mathKnowledgeConceptPage store
  //
  const mathKnowledgeConceptsData = useMathKnowledgeConceptPageStore(state => state.mathKnowledgeConceptsData);
  const searchParamsForRetrieveMathKnowledgeConceptsApi = useMathKnowledgeConceptPageStore(state => state.searchParamsForRetrieveMathKnowledgeConceptsApi);

  const updateSearchParamsForRetrieveMathKnowledgeConceptsApi = useMathKnowledgeConceptPageStore(state => state.updateSearchParamsForRetrieveMathKnowledgeConceptsApi);

  //
  // state
  //
  const [searchType, setSearchType] = useState(mathKnowledgeConceptSearchTypeOptions[0].value);

  //
  // callback
  //
  const onChangeSearchType = useCallback((searchType: string) => {
    updateSearchParamsForRetrieveMathKnowledgeConceptsApi(old => ({
      ...old,
      kc1_title: undefined,
      kc2_title: undefined,
      kc_search: undefined,
    }));

    setSearchType(searchType);

    setTimeout(() => {
      $editorRef.current?.focus();
    }, 100);

    // eslint-disable-next-line
  }, [updateSearchParamsForRetrieveMathKnowledgeConceptsApi]);

  const onChangeSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;

    updateSearchParamsForRetrieveMathKnowledgeConceptsApi(old => ({
      ...old,
      kc1_title: undefined,
      kc2_title: undefined,
      kc_search: undefined,
      [searchType]: search,
    }));
  }, [
    searchType,
    updateSearchParamsForRetrieveMathKnowledgeConceptsApi,
  ]);

  const onEnter = useCallback(() => {
    $editorRef.current?.blur();

    const params: TRetrieveMathKnowledgeConceptsApiRequestParams = {
      searchParams: searchParamsForRetrieveMathKnowledgeConceptsApi,
    };

    retrieveMathKnowledgeConcepts(params);

    // eslint-disable-next-line
  }, [
    searchParamsForRetrieveMathKnowledgeConceptsApi,
    retrieveMathKnowledgeConcepts,
  ]);

  const onESC = useCallback(() => {
    updateSearchParamsForRetrieveMathKnowledgeConceptsApi(old => ({
      ...old,
      kc1_title: undefined,
      kc2_title: undefined,
      kc_search: undefined,
    }));
  }, [updateSearchParamsForRetrieveMathKnowledgeConceptsApi]);

  //
  // hook
  //
  const {
    onKeyDown,
  } = useOnKeyDownEnterOrESC(onEnter, onESC);

  const {
    $editorRef,
  } = useAutoFocus(mathKnowledgeConceptsData);

  return (
    <div className="MathKnowledgeConceptTableActions">
      <div className="MathKnowledgeConceptTableActions-leftSide">
        <Select
          value={searchType}
          onValueChange={onChangeSearchType}>
          <SelectTrigger className="searchTypeSelect">
            <SelectValue placeholder="검색 항목 선택" />
          </SelectTrigger>

          <SelectContent>
            {mathKnowledgeConceptSearchTypeOptions.map(item => {
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
          ref={$editorRef}
          containerClassName="searchValue"
          placeholder="검색어를 입력해주세요"
          autoFocus
          value={searchParamsForRetrieveMathKnowledgeConceptsApi[searchType] ?? ''}
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
          EndIcon={LuSearch} />
      </div>

      <div className="MathKnowledgeConceptTableActions-rightSide">
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

const MathKnowledgeConceptTableActions = memo(_MathKnowledgeConceptTableActions);
export default MathKnowledgeConceptTableActions;
