// react
import {
  memo,
  useMemo,
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
  TCommonSelectOption,
} from './CommonSelect.type';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';

type TCommonSelectProps<
  TOptions = TCommonSelectOption[]
> = {
  id?: string;
  className?: string;
  placeholder?: string;
  options: TOptions;
  value: string | number;
  onChange: (value: string) => void;
};

function _CommonSelect<TOptions>(props: TCommonSelectProps<TOptions>) {
  const {
    id,
    className,
    placeholder,
    options,
    value,
    onChange,
  } = props;

  const parsedOptions = useMemo(() => {
    return (options as TCommonSelectOption[]).map(option => {
      const {
        text,
        value,
      } = option;

      return {
        text,
        value: String(value),
      };
    });
  }, [options]);

  return (
    <Select
      value={String(value)}
      onValueChange={onChange}>
      <SelectTrigger 
        id={id}
        className={cn(
          'CommonSelect',
          className
        )}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {(parsedOptions as Array<TCommonSelectOption>).map(item => {
          const {
            text,
            value,
          } = item;

          return (
            <SelectItem
              key={value}
              value={String(value)}>
              {text}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

const CommonSelect = memo(_CommonSelect) as typeof _CommonSelect;
export default CommonSelect;
