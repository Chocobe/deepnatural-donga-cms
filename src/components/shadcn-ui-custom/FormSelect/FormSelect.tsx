// react
import {
  useMemo,
  useCallback,
  memo,
  ReactNode,
} from 'react';
// ui
import { 
  Select, 
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/shadcn-ui/ui/select';
// type
import { 
  TFormSelectOptionItem,
} from './FormSelect.type';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './FormSelect.css';

type TFormSelectProps = {
  id?: string;
  className?: string;
  options: TFormSelectOptionItem[];
  placeholder?: string;
  disabled?: boolean;
  value: string;
  onChange: (
    value: string,
    id?: string
  ) => void;
  displayValue?: (targetOption: TFormSelectOptionItem) => ReactNode;
};

function _FormSelect(props: TFormSelectProps) {
  const {
    id,
    className,
    options,
    placeholder,
    disabled,
    value,
    onChange,
    displayValue,
  } = props;

  //
  // cache
  //
  const targetOption = useMemo(() => {
    return options.find(option => option.value === value);
  }, [value, options]);

  //
  // callback
  //
  const onChangeValue = useCallback((value: string) => {
    onChange(value, id);
  }, [id, onChange]);

  return (
    <Select
      value={value}
      onValueChange={onChangeValue}>
      <SelectTrigger
        id={id}
        disabled={disabled}
        className={cn(
          'FormSelect',
          className
        )}>
        <SelectValue 
          className="FormSelect-value"
          placeholder={placeholder}>
          {displayValue && targetOption
            ? displayValue(targetOption)
            : targetOption?.text 
              ?? ''
          }
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {options.map(option => {
          const {
            text,
            value,
          } = option;

          return (
            <SelectItem
              key={`${text}-${value}`}
              value={value}>
              {text}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

const FormSelect = memo(_FormSelect)  as typeof _FormSelect;
export default FormSelect;
