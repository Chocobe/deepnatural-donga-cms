// react
import {
  useRef,
  useState,
  useCallback,
  useEffect,
  memo,
  ChangeEvent,
} from 'react';
// ui
import { 
  Textarea,
} from '@/components/shadcn-ui/ui/textarea';
// mathjax
import { 
  MathJax,
} from 'better-react-mathjax';
// style
import './MathQuestionMathJaxEditor.css';

type TMathQuestionMathJaxEditorProps = {
  id?: string;
  isShowPreview?: boolean;
  placeholder?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

function _MathQuestionMathJaxEditor(props: TMathQuestionMathJaxEditorProps) {
  const {
    id,
    isShowPreview,
    placeholder = '',
    value,
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

  //
  // effect
  //
  useEffect(function onChangeValue() {
    setTimeout(() => {
      adjustTextarea();
    }, 250);
  }, [value, adjustTextarea]);

  useEffect(function adjustScrollHeightWrapper() {
    if (!isShowPreview) {
      setPreviewWrapperHeight('0');
      return;
    }

    setTimeout(() => {
      const $scrollHeightWrapper = $scrollHeightWrapperRef.current;

      if (!value || !$scrollHeightWrapper) {
        setPreviewWrapperHeight('0');

        if ($scrollHeightWrapper) {
          $scrollHeightWrapper.style.marginTop = '0';
        }

        return;
      }

      $scrollHeightWrapper.style.marginTop = '10px';

      const scrollHeight = $scrollHeightWrapper.clientHeight + 10;
      setPreviewWrapperHeight(`${scrollHeight}px`);
    }, 250);
  }, [value, isShowPreview]);

  return (
    <div className="MathQuestionMathJaxEditor">
      <div className="textareaWrapper">
        <Textarea 
          ref={$textareaRef}
          id={id}
          className="textarea"
          placeholder={placeholder}
          value={value}
          onChange={onChange} />
      </div>

      {value && (
        <div 
          className="previewWrapper"
          style={{
            height: previewWrapperHeight,
          }}>
          <div 
            ref={$scrollHeightWrapperRef}
            className="scrollHeightWrapper">
            <div className="MathEditor-preview">
              <MathJax
                dynamic
                dangerouslySetInnerHTML={{
                  __html: value,
                }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const MathQuestionMathJaxEditor = memo(_MathQuestionMathJaxEditor);
export default MathQuestionMathJaxEditor;
