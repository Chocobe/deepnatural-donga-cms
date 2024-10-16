// react
import {
  useMemo,
  useCallback,
  memo,
} from 'react';
// ui
import { 
  Button,
  ButtonProps,
} from '@/components/shadcn-ui/ui/button';
// icon
import { 
  LuSave,
} from 'react-icons/lu';
// style
import './MathQuestionDetailFooter.css';

function _MathQuestionDetailFooter() {
  //
  // callback
  //
  const putMathQuestion = useCallback(() => {
    console.log('putMathQuestion()');
  }, []);

  const onClickSaveAndRemain = useCallback(() => {
    console.group('onClickSaveAndRemain()');
    putMathQuestion();
    console.groupEnd();
  }, [putMathQuestion]);

  const onClickSave = useCallback(() => {
    console.group('onClickSave()');
    putMathQuestion();
    console.groupEnd();
  }, [putMathQuestion]);

  //
  // cache
  //
  const buttonItems = useMemo(() => [
    {
      text: '저장후 계속해서 수정하기',
      variant: 'secondary',
      onClick: onClickSaveAndRemain,
      IconComponent: undefined,
    },
    {
      text: '저장하기',
      variant: 'default',
      onClick: onClickSave,
      IconComponent: LuSave,
    },
  ], [
    onClickSaveAndRemain,
    onClickSave,
  ]);

  return (
    <div className="MathQuestionDetailFooter">
      {buttonItems.map((item, index) => {
        const {
          text,
          variant,
          onClick,
          IconComponent,
        } = item;

        return (
          <Button
            key={index}
            className="button"
            variant={variant as ButtonProps['variant']}
            onClick={onClick}>
            {IconComponent && (
              <IconComponent className="icon" />
            )}

            {text}
          </Button>
        );
      })}
    </div>
  );
}

const MathQuestionDetailFooter = memo(_MathQuestionDetailFooter);
export default MathQuestionDetailFooter;
