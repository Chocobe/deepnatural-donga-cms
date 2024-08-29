// react
import {
  useState,
  useCallback,
  memo,
  useRef,
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
  LuSearch,
  LuFileInput,
} from 'react-icons/lu';
// type
import { 
  mathAchievementSearchTypeOptions,
} from './MathAchievementTableActions.type';
// style
import './MathAchievementTableActions.css';

function _MathAchievementTableActions() {
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
    const search = e.target.value;

    setSearch(search);
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

        <TBUTooltip>
          <InputWithIcon
            ref={$searchInputRef}
            containerClassName="searchInput"
            placeholder="검색어를 입력해주세요"
            autoFocus
            value={search}
            onChange={onChangeSearch}
            onKeyDown={onKeyDown}
            EndIcon={LuSearch} />
        </TBUTooltip>
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
