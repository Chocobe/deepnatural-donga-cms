// react
import {
  useCallback,
  memo,
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
  TEnumEditorOnChangeParams,
} from './enumEditor.type';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './EnumEditor.css';

type TEnumEditorProps = {
  indexOfResult: number;
  id: string;
  className?: string;
  label: string;
  options?: Array<{
    label: string;
    value: string | number;
  }>;
  placeholder?: string;
  readonly?: boolean;
  value: string;
  onChange: (params: TEnumEditorOnChangeParams) => void;
};

function _EnumEditor(props: TEnumEditorProps) {
  const {
    indexOfResult,
    id,
    className,
    label,
    options,
    placeholder,
    readonly,
    value,
    onChange,
  } = props;

  //
  // callback
  //
  const onChangeSelect = useCallback((value: string) => {
    onChange({
      id,
      indexOfResult,
      value,
      type: 'enum',
    });
  }, [
    id, indexOfResult,
    onChange,
  ]);

  return (
    <div className={cn(
      'EnumEditor',
      className
    )}>
      <label
        htmlFor={`${indexOfResult}-${id}`}
        className="label">
        {label}
      </label>

      <Select
        value={value}
        onValueChange={onChangeSelect}>
        <SelectTrigger
          className="select"
          disabled={readonly}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options?.map(option => {
            const {
              label,
              value,
            } = option;

            return (
              <SelectItem
                key={`${indexOfResult}-${id}-${value}`}
                className="option"
                value={value as string}>
                {label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}

const EnumEditor = memo(_EnumEditor);
export default EnumEditor;
