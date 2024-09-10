// react
import {
  useCallback,
  memo,
  ChangeEvent,
} from 'react';
// hook
import useOnKeyDownEnterOrESC from '@/components/hooks/useOnKeyDownEnterOrESC';
import useAutoFocus from '@/components/hooks/useAutoFocus';
// ui
import CommonSelect from '@/components/shadcn-ui-custom/CommonSelect/CommonSelect';
import { 
  InputWithIcon,
} from '@/components/shadcn-ui-custom/InputWithIcon/InputWithIcon';
import TBUTooltip from '@/components/shadcn-ui-custom/TBUTooltip/TBUTooltip';
// icon
import { 
  LuSearch,
} from 'react-icons/lu';
// type
import { 
  TCommonSelectOptionItem,
} from '@/components/shadcn-ui-custom/CommonSelect/CommonSelect.type';
import { 
  TPaginationModel,
} from '@/apis/models/cmsCommonModel.type';
// style
import './SearchModalActions.css';

type TSearchModalActionsProps<TModel = any> = {
  searchTypeOptions: TCommonSelectOptionItem[];
  searchType: string;
  onChangeSearchKey: (searchKey: string) => void;

  searchValue: string;
  onChangeSearchValue: (searchValue: string) => void;

  data: TPaginationModel<TModel> | null;

  createParams: (page: number) => any;
  retrieverApiFunction: (
    params: ReturnType<TSearchModalActionsProps['createParams']>
  ) => Promise<void>;
};

function _SearchModalActions(props: TSearchModalActionsProps) {
  const {
    searchTypeOptions,
    searchType,
    onChangeSearchKey,

    searchValue,
    onChangeSearchValue,

    data,

    createParams,
    retrieverApiFunction,
  } = props;

  //
  // callback
  //
  const _onChangeSearchValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;

    onChangeSearchValue(searchValue);
  }, [onChangeSearchValue]);

  const onESC = useCallback(() => {
    onChangeSearchValue('');
  }, [onChangeSearchValue]);

  const onEnter = useCallback(() => {
    $editorRef.current?.blur();

    const params = createParams(data?.current_page ?? 1);

    retrieverApiFunction(params);

    // eslint-disable-next-line
  }, [
    data?.current_page,
    createParams, retrieverApiFunction,
  ]);

  //
  // hook
  //
  const {
    onKeyDown,
  } = useOnKeyDownEnterOrESC(onEnter, onESC);

  const {
    $editorRef,
  } = useAutoFocus(data);

  return (
    <div className="SearchModalActions">
      <div className="SearchModalActions-typeSelect">
        <TBUTooltip className="w-full">
          <CommonSelect
            options={searchTypeOptions}
            value={searchType}
            onChange={onChangeSearchKey} />
        </TBUTooltip>
      </div>

      <div className="SearchModalActions-valueInput">
        <InputWithIcon
          ref={$editorRef}
          value={searchValue}
          onChange={_onChangeSearchValue}
          onKeyDown={onKeyDown}
          placeholder="검색어를 입력해 주세요"
          EndIcon={LuSearch}
          autoFocus />
      </div>
    </div>
  );
}

const SearchModalActions = memo(_SearchModalActions);
export default SearchModalActions;
