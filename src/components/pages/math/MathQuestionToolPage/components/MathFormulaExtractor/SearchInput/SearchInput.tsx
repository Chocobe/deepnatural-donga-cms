// react
import {
  useRef,
  useState,
  useCallback,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  memo, 
} from 'react';
// ui
import { 
  InputWithIcon,
} from '@/components/shadcn-ui-custom/InputWithIcon/InputWithIcon';
// icons
import { 
  FiSearch,
} from "react-icons/fi";
import { 
  IoMdCloseCircle,
} from "react-icons/io";
// style
import {
  cn,
} from '@/lib/shadcn-ui-utils';

type TSearchInputProps = {
    placeholder?: string;
    disabled?: boolean;
    searchValue?: string;
    onEnter: (value: string) => void;
    onClear?: () => void;
};

function _SearchInput(props: TSearchInputProps) {
  const {
    placeholder,
    disabled = false,
    searchValue,
    onEnter,
    onClear,
  } = props;

  //
  // ref
  //
  const $inputSearchValue = useRef<HTMLInputElement | null>(null);

  //
  // state
  //
  const [tempSearchValue, setTempSearchValue] = useState('');

  //
  // callback
  //
  const onChangeTempSearchValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setTempSearchValue(value);
  }, []);

  const onKeyUp = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;

    if (key.toLowerCase() !== 'enter') {
      return;
    }

    onEnter(tempSearchValue);
  }, [tempSearchValue, onEnter]);

  const onClearSearchValue = useCallback(() => {
    setTempSearchValue('');

    $inputSearchValue.current?.focus();

    onClear?.();
  }, [onClear]);

  //
  // effect
  //
  useEffect(function onChangeSearchValue() {
    if (
      typeof searchValue === 'undefined' ||
            searchValue === tempSearchValue
    ) {
      return;
    }

    setTempSearchValue(searchValue);

    // eslint-disable-next-line
    }, [searchValue]);

  return (
    <div className="SearchInput">
      <div 
        className={cn(
          'searchInputWrapper',
          { disabled }
        )}>
        <InputWithIcon 
          ref={$inputSearchValue}
          className="inputTempSearchValue"
          placeholder={placeholder}
          disabled={disabled}
          value={tempSearchValue}
          onChange={onChangeTempSearchValue}
          onKeyUp={onKeyUp}
          StartIcon={(params: any) => (
            <FiSearch {...params} />
          )}
          EndIcon={(props: any) => (
            <button 
              {...props}
              onClick={onClearSearchValue}>
              <IoMdCloseCircle className="w-5 h-5" />
            </button>
          )}
        />
      </div>
    </div>
  );
}

const SearchInput = memo(_SearchInput);
export default SearchInput;
