// react
import {
  useCallback,
  memo,
} from 'react';
import { 
  Checkbox,
} from '@/components/shadcn-ui/ui/checkbox';
// type
import { 
  TBooleanEditorOnChangeParams,
} from './booleanEditor.type';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './BooleanEditor.css';

type TBooleanEditorProps = {
  indexOfResult: number;
  id: string;
  className?: string;
  label: string;
  placeholder?: string;
  readonly?: boolean;
  value: boolean;
  onChange: (params: TBooleanEditorOnChangeParams) => void;
};

function _BooleanEditor(props: TBooleanEditorProps) {
  const {
    indexOfResult,
    id,
    className,
    label,
    placeholder,
    readonly,
    value = false,
    onChange,
  } = props;

  //
  // callback
  //
  const onChangeCheckbox = useCallback((checked: boolean | string) => {
    onChange({
      id,
      indexOfResult,
      value: !!checked,
      type: 'boolean',
    });
  }, [
    id, indexOfResult, 
    onChange,
  ]);

  return (
    <div className={cn(
      'BooleanEditor',
      className
    )}>
      <label 
        htmlFor={`${indexOfResult}-${id}`}
        className="label">
        {label}
      </label>

      <div className="checkboxWrapper">
        <Checkbox 
          id={`${indexOfResult}-${id}`}
          className="checkbox"
          disabled={readonly}
          checked={value}
          onCheckedChange={onChangeCheckbox} />

        {placeholder && (
          <label 
            className="placeholder"
            htmlFor={`${indexOfResult}-${id}`}>
            {placeholder}
          </label>
        )}
      </div>
    </div>
  );
}

const BooleanEditor = memo(_BooleanEditor);
export default BooleanEditor;
