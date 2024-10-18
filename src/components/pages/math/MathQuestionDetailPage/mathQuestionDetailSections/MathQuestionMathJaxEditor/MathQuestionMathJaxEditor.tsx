// react
import {
  useRef,
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
  isShowEditor?: boolean;
  placeholder?: string;
  value: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

function _MathQuestionMathJaxEditor(props: TMathQuestionMathJaxEditorProps) {
  const {
    id,
    isShowEditor,
    placeholder = '',
    value,
    onChange,
  } = props;

  //
  // ref
  //
  const $textareaRef = useRef<HTMLTextAreaElement | null>(null);

  //
  // callback
  //
  const adjustTextarea = useCallback(() => {
    const $textarea = $textareaRef.current;

    if (!$textarea) {
      return;
    }

    if (!isShowEditor) {
      $textarea.style.marginTop = '0';
      $textarea.style.paddingTop = '0';
      $textarea.style.paddingBottom = '0';
      $textarea.style.marginTop = '0';
      $textarea.style.height = '0';
      $textarea.style.borderWidth = '0';
      return;
    }

    $textarea.style.marginTop = '10px';
    $textarea.style.paddingTop = '8px';
    $textarea.style.paddingBottom = '8px';
    $textarea.style.height = '0';
    $textarea.style.borderWidth = '1px';

    const scrollHeight = $textarea.scrollHeight;

    $textarea.style.height = `${scrollHeight}px`;
  }, [isShowEditor]);

  //
  // effect
  //
  useEffect(function onChangeValue() {
    setTimeout(() => {
      adjustTextarea();
    }, 250);
  }, [value, adjustTextarea]);

  useEffect(() => {
    const $textarea = $textareaRef.current;
    if (!$textarea) {
      return;
    }

    if (isShowEditor) {
      $textareaRef.current!.style.marginTop = '10px';
    } else {
      $textareaRef.current!.style.marginTop = '0';
    }
  }, [isShowEditor]);

  return (
    <div className="MathQuestionMathJaxEditor">
      <div className="previewWrapper">
        <div 
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

      <div className="textareaWrapper">
        <Textarea 
          ref={$textareaRef}
          id={id}
          className="textarea"
          placeholder={placeholder}
          value={value}
          onChange={onChange} />
      </div>
    </div>
  );
}

const MathQuestionMathJaxEditor = memo(_MathQuestionMathJaxEditor);
export default MathQuestionMathJaxEditor;
