// react
import {
  useState,
  useEffect,
  memo,
} from 'react';
// store
import useMathQuestionToolPageStore from '@/store/mathStores/mathQuestionToolPageStore/mathQuestionToolPageStore';
// ui
import MathFormulaAccordions from '../MathFormulaAccordions/MathFormulaAccordions';
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
// icons
import { 
  FiPlus,
} from "react-icons/fi";
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './MathQuestionToolWorkingSection.css';

type TMathQuestionToolWorkingSectionProps = {
    className: string;
};

function _MathQuestionToolWorkingSection(props: TMathQuestionToolWorkingSectionProps) {
  const {
    className,
  } = props;

  //
  // mathQuestionToolPage store
  //
  const submissionStatisticsState = useMathQuestionToolPageStore(state => state.ui.state.submissionStatistics);

  const addNewQuestionSet_action = useMathQuestionToolPageStore(state => state.ui.action.addNewQuestionSet_action);
  const resetTargetElementState_action = useMathQuestionToolPageStore(state => state.ui.action.resetTargetElementState_action);
  const setTargetElementState_action = useMathQuestionToolPageStore(state => state.ui.action.setTargetElementState_action);

  //
  // state
  //
  const [introFlag, setIntroFlag] = useState(false);

  //
  // effect
  //
  useEffect(function toggleIntroFlag() {
    setIntroFlag(prev => !prev);
  }, [submissionStatisticsState]);

  useEffect(function initHandleSelection() {
    function handleSelection() {
      const $el = document.activeElement as HTMLTextAreaElement;

      const id = $el.id;
      const cursorIndex = $el.selectionStart;
      const indexOfResult = $el.dataset.indexOfResult;
      const type = $el.dataset.type;
      const tagName = $el.tagName.toLowerCase();

      if (tagName !== 'textarea') {
        return;
      }

      if (
        !id || 
                typeof indexOfResult === 'undefined' || 
                type !== 'latex' ||
                cursorIndex === null
      ) {
        resetTargetElementState_action();
        return;
      }

      setTargetElementState_action({
        indexOfResult: Number(indexOfResult),
        id,
        cursorIndex,
      });
    }

    document.addEventListener('selectionchange', handleSelection);

    return () => {
      document.removeEventListener('selectionchange', handleSelection);
    };
  }, [
    resetTargetElementState_action,
    setTargetElementState_action,
  ]);

  return (
    <div className={cn(
      'MathQuestionToolWorkingSection',
      className
    )}>
      <div className="title">
        좌측 문서를 보고 아래 항목을 입력해주세요.
      </div>

      <div className="inner">
        <MathFormulaAccordions />

        <div className="actionsWrapper">
          <Button
            className="addButton"
            variant="default"
            onClick={addNewQuestionSet_action}>
            <FiPlus 
              className="icon"
              color="#fff" 
              size="20px" />

            <div className="text">
              문항 추가
            </div>
          </Button>
        </div>
      </div>

      <div 
        className={cn(
          'intro',
          `showIntroFlag-${introFlag}`
        )}>
        Loading...
      </div>
    </div>
  );
}

const MathQuestionToolWorkingSection = memo(_MathQuestionToolWorkingSection);
export default MathQuestionToolWorkingSection;
