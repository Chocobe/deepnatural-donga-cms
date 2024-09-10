// react
import {
  useState,
  useCallback,
  memo,
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
  mathSeriesSourceSearchTypeOptions,
} from './MathSeriesSourceTableActions.type';
// style
import './MathSeriesSourceTableActions.css';

function _MathSeriesSourceTableActions() {
  //
  // mathSeriesSourcePage store
  //
  const mathSeriesSourcesData = useMathSeriesSourcePageStore(state => state.mathSeriesSourcesData);

  //
  // state
  //
  // FIXME: mockup
  const [search, _setSearch] = useState('');

  //
  // callback
  //
  const onChangeSearchType = useCallback(() => {
    console.log('onChangeSearchType()');
  }, []);

  const onChangeSearch = useCallback(() => {
    console.log('onChangeSearch()');
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
  }  = useOnKeyDownEnterOrESC(onEnter, onESC);

  const {
    $editorRef,
  } = useAutoFocus(mathSeriesSourcesData);

  return (
    <div className="MathSeriesSourceTableActions">
      <div className="MathSeriesSourceTableActions-leftSide">
        <TBUTooltip>
          <Select
            value={''}
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
        </TBUTooltip>

        <TBUTooltip>
          <InputWithIcon
            ref={$editorRef}
            containerClassName="searchInput"
            placeholder="검색어를 입력해주세요"
            autoFocus
            value={search}
            onChange={onChangeSearch}
            onKeyDown={onKeyDown}
            EndIcon={LuSearch}
            disabled />
        </TBUTooltip>
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
