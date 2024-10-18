// react
import {
  memo,
} from 'react';
// ui
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
// icon
import { 
  LuMonitor,
} from 'react-icons/lu';
// style
import './MathQuestionDetailPreviewButton.css';

type TMathQuestionDetailCollapseButtonProps = {
  isShow: boolean;
  onClick: () => void;
};

function _MathQuestionDetailCollapseButton(props: TMathQuestionDetailCollapseButtonProps) {
  const {
    isShow: isShow,
    onClick,
  } = props;

  return (
    <Button
      className="MathQuestionDetailPreviewButton"
      variant="default"
      onClick={onClick}>
      <LuMonitor className="icon" />
      <span className="text">
        {isShow
          ? '원문 닫기'
          : '원문 보기'
        }
      </span>
    </Button>
  );
}

const MathQuestionDetailCollapseButton = memo(_MathQuestionDetailCollapseButton);
export default MathQuestionDetailCollapseButton;
