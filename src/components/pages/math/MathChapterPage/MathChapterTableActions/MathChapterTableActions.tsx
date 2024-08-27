// react
import {
  useRef,
  useState,
  useCallback,
  memo,
  ChangeEvent,
} from 'react';
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
// style
import './MathChapterTableActions.css';

function _MathChapterTableActions() {
  //
  // ref
  //
  const $searchInputRef = useRef<HTMLInputElement | null>(null);

  //
  // state
  //
  const [search, setSearch] = useState('');

  //
  // callback
  //
  const onChangeSearchType = useCallback(() => {
    console.log('onChangeSearchType()');
  }, []);

  const onChangeSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearch(value);
  }, []);

  const onEnter = useCallback(() => {
    console.log('onEnter()');
  }, []);

  const onESC = useCallback(() => {
    console.log('onESC()');
  }, []);

  //
  // hook
  //
  const {
    onKeyDown,
  } = useOnKeyDownEnterOrESC(onEnter, onESC);

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

        <TBUTooltip>
          <InputWithIcon
            ref={$searchInputRef}
            containerClassName="searchValue"
            placeholder="검색어를 입력해주세요"
            autoFocus
            value={search}
            onChange={onChangeSearch}
            onKeyDown={onKeyDown}
            EndIcon={LuSearch} />
        </TBUTooltip>
      </div>

      <div className="MathChapterTableActions-rightSide">
        <TBUTooltip>
          <Button
            className="actionButton">
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
