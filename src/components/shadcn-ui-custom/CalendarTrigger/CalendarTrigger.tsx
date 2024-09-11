// react
import {
  useState,
  useMemo,
  useCallback,
  memo,
  PropsWithChildren,
} from 'react';
// ui
import { 
  Calendar,
} from '@/components/shadcn-ui/ui/calendar';
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/shadcn-ui/ui/popover';
// icon
import { 
  LuCalendar,
} from 'react-icons/lu';
// dayjs
import dayjs from 'dayjs';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';

type TCalendarTriggerProps = PropsWithChildren<{
  id?: string;
  className?: string;
  format?: string;
  placeholder?: string;
  minDate?: string;
  maxDate?: string;
  value?: string;
  onChange: (
    value?: string,
    id?: string
  ) => void;
}>;

function _CalendarTrigger(props: TCalendarTriggerProps) {
  const {
    id,
    className,
    format = 'YYYY년 MM월 DD일',
    placeholder = '날짜를 선택해주세요',
    minDate,
    maxDate,
    value,
    onChange,
    children,
  } = props;

  //
  // state
  //
  const [isOpen, setIsOpen] = useState(false);

  //
  // cache
  //
  const dateValue = useMemo(() => {
    return value
      ? new Date(value)
      : undefined;
  }, [value]);

  //
  // callback
  //
  const openCalendar = useCallback(() => {
    setIsOpen(true);
  }, []);

  const checkDisabled = useCallback((date: Date) => {
    const isBeforeDate = !!minDate && dayjs(date).isBefore(minDate);
    const isAfterDate = !!maxDate && dayjs(date).isAfter(maxDate);

    return isBeforeDate || isAfterDate;
  }, [minDate, maxDate]);

  const onSelect = useCallback((date?: Date) => {
    const value = date?.toISOString();

    onChange(value, id);
    setIsOpen(false);
  }, [id, onChange]);

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}>
      <PopoverTrigger 
        asChild
        onClick={openCalendar}>
        {children
          ? children
          : (
            <Button
              variant="outline"
              className={cn(
                "w-[240px] pl-3 text-left font-normal",
                !value && "text-muted-foreground",
                className
              )}>
              {value ? (
                dayjs(value).format(format)
              ) : (
                <span className="placeholder">
                  {placeholder}
                </span>
              )}

              <LuCalendar className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          )
        }
      </PopoverTrigger>

      <PopoverContent 
        className="w-auto p-0" 
        align="center">
        <Calendar
          mode="single"
          selected={dateValue}
          onSelect={onSelect}
          disabled={checkDisabled}
          initialFocus />
      </PopoverContent>
    </Popover>
  );
}

const CalendarTrigger = memo(_CalendarTrigger);
export default CalendarTrigger;
