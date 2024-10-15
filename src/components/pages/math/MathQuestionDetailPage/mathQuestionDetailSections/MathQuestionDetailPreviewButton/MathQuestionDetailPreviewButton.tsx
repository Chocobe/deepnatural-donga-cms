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

type TMathQuestionDetailPreviewButtonProps = {
  isShowPreview: boolean;
  onClick: () => void;
};

function _MathQuestionDetailPreviewButton(props: TMathQuestionDetailPreviewButtonProps) {
  const {
    isShowPreview,
    onClick,
  } = props;

  return (
    <Button
      className="MathQuestionDetailPreviewButton"
      variant="default"
      onClick={onClick}>
      <LuMonitor className="icon" />
      <span className="text">
        미리보기 {isShowPreview && '닫기'}
      </span>
    </Button>
  );
}

const MathQuestionDetailPreviewButton = memo(_MathQuestionDetailPreviewButton);
export default MathQuestionDetailPreviewButton;
