// react
import {
  useRef,
  useState,
  useCallback,
  useEffect,
  memo,
  ChangeEvent,
} from 'react';
// mathjax
import { 
  MathJax,
} from 'better-react-mathjax';
// type
import { 
  TMathEditorOnChangeParams,
} from './mathEditor.type';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './MathEditor.css';

type TMathEditorProps = {
  indexOfResult: number;
  id: string;
  className?: string;
  label: string;
  placeholder?: string;
  type: 'latex' | 'number' | 'text';
  readonly?: boolean;
  value: string;
  mathML: string;
  flagForAdjust: boolean;
  onChange: (params: TMathEditorOnChangeParams) => void;
};

function _MathEditor(props: TMathEditorProps) {
  const {
    indexOfResult,
    id,
    className,
    label,
    placeholder = '',
    type,
    readonly,
    value,
    // mathML,
    flagForAdjust,
    onChange,
  } = props;

  //
  // ref
  //
  const $textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const $scrollHeightWrapperRef = useRef<HTMLDivElement | null>(null);

  //
  // state
  //
  const [previewWrapperHeight, setPreviewWrapperHeight] = useState('0');

  //
  // callback
  //
  const adjustTextarea = useCallback(() => {
    const $textarea = $textareaRef.current;

    if (!$textarea) {
      return;
    }

    $textarea.style.height = '0';
    const scrollHeight = $textarea.scrollHeight;

    $textarea.style.height = `${scrollHeight}px`;
  }, []);

  const onChangeTextarea = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    onChange({
      indexOfResult,
      id,
      type,
      latex: value,
    });
  }, [
    id, indexOfResult, type,
    onChange, 
  ]);

  //
  // effect
  //
  useEffect(function onChangeValue() {
    setTimeout(() => {
      adjustTextarea();
    }, 300);
  }, [value, adjustTextarea]);

  useEffect(function onChangeFlagForAdjust() {
    if (!flagForAdjust) {
      return;
    }

    setTimeout(() => {
      adjustTextarea();
    }, 300);
  }, [flagForAdjust, adjustTextarea]);

  useEffect(function adjustScrollHeightWrapper() {
    if (!flagForAdjust || type !== 'latex') {
      return;
    }

    setTimeout(() => {
      const $scrollHeightWrapper = $scrollHeightWrapperRef.current;

      if (!value || !$scrollHeightWrapper) {
        setPreviewWrapperHeight('0');
        return;
      }

      const scrollHeight = $scrollHeightWrapper.clientHeight;
      setPreviewWrapperHeight(`${scrollHeight}px`);
    }, 500);
  }, [value, type, flagForAdjust]);

  return (
    <div className={cn(
      'MathEditor',
      className
    )}>
      <div className="textareaWrapper">
        <label 
          htmlFor={`${indexOfResult}-${id}`}
          className="textareaLabel">
          {label}
        </label>

        <textarea 
          ref={$textareaRef}
          id={`${indexOfResult}-${id}`}
          data-index-of-result={indexOfResult}
          data-type={type}
          className="textarea"
          placeholder={placeholder}
          disabled={readonly}
          value={value}
          onChange={onChangeTextarea} />
      </div>

      <div 
        className="previewWrapper"
        style={{
          height: previewWrapperHeight,
          marginTop: (value && type === 'latex') 
            ? '20px' 
            : '0',
        }}>
        <div 
          ref={$scrollHeightWrapperRef}
          className="scrollHeightWrapper">
          <div className="labelWrapper">
            <label className="previewLabel">
              미리보기
            </label>
          </div>

          <div className="MathEditor-preview">
            <MathJax 
              dynamic
              dangerouslySetInnerHTML={{
                __html: value,
              }} />
          </div>
        </div>
      </div>
    </div>
  );
}

const MathEditor = memo(_MathEditor);
export default MathEditor;
