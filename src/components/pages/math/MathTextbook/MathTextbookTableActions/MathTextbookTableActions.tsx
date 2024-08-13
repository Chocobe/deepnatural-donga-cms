// react
import {
  useState,
  useCallback,
  memo,
  ChangeEvent,
} from 'react';
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
// style
import './MathTextbookTableActions.css';

function _MathTextbookTableActions() {
  //
  // state
  //
  const [searchState, setSearchState] = useState({
    searchType: ' ',
    searchValue: '',
  });

  //
  // callback
  //
  const onChangeSearchType = useCallback((searchType: string) => {
    setSearchState(searchState => ({
      ...searchState,
      searchType,
    }));
  }, []);

  const onChangeSearchValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;

    setSearchState(searchState => ({
      ...searchState,
      searchValue,
    }));
  }, []);

  return (
    <div className="MathTextbookTableActions">
      <div className="MathTextbookTableActions-leftSide">
        <Select
          value={searchState.searchType}
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
          containerClassName="searchValue"
          placeholder="검색어를 입력해주세요"
          value={searchState.searchValue}
          onChange={onChangeSearchValue}
          EndIcon={LuSearch} />
      </div>

      <div className="MathTextbookTableActions-rightSide">
        <Button
          className="actionButton">
          삭제
        </Button>

        <Button
          className="actionButton">
          <LuFileInput className="icon" />
          Export
        </Button>
      </div>
    </div>
  );
}

const MathTextbookTableActions = memo(_MathTextbookTableActions);
export default MathTextbookTableActions;
