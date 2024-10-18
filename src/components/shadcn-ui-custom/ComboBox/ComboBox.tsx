// react
import {
  useRef,
  useImperativeHandle,
  useState,
  useMemo,
  forwardRef,
  memo,
  Ref,
} from 'react';
// ui
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/shadcn-ui/ui/command';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/shadcn-ui/ui/popover';
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
// icon
import { 
  Check, 
  ChevronsUpDown,
} from 'lucide-react';
// type
import { 
  TComboBoxOptionItem,
} from './ComboBox.type';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';

type TComboBoxProps<T> = {
  id?: string | number;
  className?: string;
  options: TComboBoxOptionItem<T>[];
  optionsEmptyMessage?: string;
  placeholder?: string;
  disabled?: boolean;
  value: T | null;
  onChange: (item: TComboBoxOptionItem<T> | null) => void;
};

const _ComboBox = <T = any,>(
  props: TComboBoxProps<T>, 
  ref: Ref<HTMLButtonElement | null>
) => {
  const {
    className,
    options,
    optionsEmptyMessage = '선택지가 없습니다',
    placeholder = '선택해주세요',
    value,
    onChange,
  } = props;

  const $triggerButtonRef = useRef<HTMLButtonElement | null>(null);

  const [open, setOpen] = useState(false);
  const [commandWidth, setCommandWidth] = useState<number>(0);

  const selectedOption = useMemo(() => {
    return options
      .find(option => option.data === value);
  }, [options, value]);

  const displayText = useMemo(() => {
    return selectedOption?.text ?? placeholder;
  }, [selectedOption, placeholder]);

  useImperativeHandle(ref, () => {
    const rr = $triggerButtonRef.current;

    const { 
      width = 0,
    } = rr?.getBoundingClientRect() ?? {};

    setCommandWidth(width);

    return rr;
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={$triggerButtonRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between focus-visible:ring-0"
          style={{
            color: value ? 'inherit' : '#989898'
          }}>
          <span className="w-full text-start overflow-hidden text-ellipsis">
            {displayText}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent 
        asChild
        className={cn(
          'w-full p-0',
          className
        )}>
        <Command className="">
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>
              {optionsEmptyMessage}
            </CommandEmpty>

            <CommandGroup style={{
              width: `${commandWidth}px`,
            }}>
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  value={`${option.id}-${option.text}`}
                  onSelect={(_currentValue) => {
                    onChange(option);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      option.data === selectedOption?.data ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.text}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const ForwardedComboBox = forwardRef(_ComboBox) as <T>(props: 
  & TComboBoxProps<T> 
  & { 
    ref?: Ref<HTMLButtonElement> 
  }
) => ReturnType<typeof _ComboBox>;

const ComboBox = memo(ForwardedComboBox) as typeof ForwardedComboBox;
export default ComboBox;
