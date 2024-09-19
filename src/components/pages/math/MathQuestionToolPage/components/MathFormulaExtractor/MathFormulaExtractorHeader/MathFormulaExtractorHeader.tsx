// react
import {
  useCallback,
  memo, 
} from 'react';
// store
import useMathQuestionToolPageStore from '@/store/mathStores/mathQuestionToolPageStore/mathQuestionToolPageStore';
import useResultNoticeModalStore from '@/store/modalStores/resultNoticeModalStore/resultNoticeModalStore';
// hook
import useExitConfirmModal from './hooks/useExitConfirmModal';
import useSubmitConfirmModal from './hooks/useSubmitConfirmModal';
// ui
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './MathFormulaExtractorHeader.css';

type TMathFormulaExtractorHeaderProps = {
    className: string;
};

function _MathFormulaExtractorHeader(props: TMathFormulaExtractorHeaderProps) {
  const {
    className,
  } = props;

  //
  // mathQuestionToolPage store
  //
  const submissionStatisticsState = useMathQuestionToolPageStore(state => state.ui.state.submissionStatistics);
  const {
    numOfSubmission,
    numOfQuestionSets,
  } = submissionStatisticsState;

  //
  // resultNoticeModal store
  //
  const openNoticeModal = useResultNoticeModalStore(state => state.openSuccessNoticeModal);

  //
  // hook
  //
  const {
    exitConfirmModalTitle,
    exitConfirmModalMessage,
    exitConfirmModalConfirmButtonText,
    exitConfirmModalCancelButtonText,
    onConfirmExitConfirmModal,
  } = useExitConfirmModal();

  const {
    submitConfirmModalTitle,
    submitConfirmModalMessage,
    submitConfirmModalConfirmButtonText,
    submitConfirmModalCancelButtonText,
    onConfirmSubmitConfirmModal,
  } = useSubmitConfirmModal();

  //
  // callback
  //
  const openExitConfirmModal = useCallback(() => {
    openNoticeModal({
      title: exitConfirmModalTitle,
      message: exitConfirmModalMessage,
      firstButton: {
        text: exitConfirmModalCancelButtonText,
        variant: 'outline',
      },
      secondButton: {
        text: exitConfirmModalConfirmButtonText,
        variant: 'default',
        onClick: onConfirmExitConfirmModal,
      },
    });
  }, [
    exitConfirmModalTitle,
    exitConfirmModalMessage,
    exitConfirmModalCancelButtonText,
    exitConfirmModalConfirmButtonText,
    onConfirmExitConfirmModal,
    openNoticeModal,
  ]);

  const openSubmitConfirmModal = useCallback(() => {
    openNoticeModal({
      title: submitConfirmModalTitle,
      message: submitConfirmModalMessage,
      firstButton: {
        text: submitConfirmModalCancelButtonText,
        variant: 'outline',
      },
      secondButton: {
        text: submitConfirmModalConfirmButtonText,
        variant: 'default',
        onClick: onConfirmSubmitConfirmModal,
      },
    });
  }, [
    submitConfirmModalTitle,
    submitConfirmModalMessage,
    submitConfirmModalCancelButtonText,
    submitConfirmModalConfirmButtonText,
    onConfirmSubmitConfirmModal,
    openNoticeModal,
  ]);

  return (<>
    <div className={cn(
      'MathFormulaExtractorHeader',
      className
    )}>
      <figure className="logoWrapper">
        <img
          src="/images/donga-logo.png"
          alt="labelr"
          width={56}
          height={24} />
      </figure>

      <div className="rightSide">
        <div className="submissionStatistics">
          <div className="statistics">
                        제출 통계
          </div>

          <div className="divider" />

          <div className="statistics">
                        총 제출: {numOfSubmission}
          </div>

          <div className="statistics">
                        문항: {numOfQuestionSets}
          </div>
        </div>

        <div className="actionsWrapper">
          <Button
            className="actionButton exit"
            variant="outline"
            onClick={openExitConfirmModal}>
              나가기
          </Button>

          <Button
            className="actionButton submit"
            variant="default"
            onClick={openSubmitConfirmModal}>
            제출하기
          </Button>
        </div>
      </div>
    </div>
  </>);
}

const MathFormulaExtractorHeader = memo(_MathFormulaExtractorHeader);
export default MathFormulaExtractorHeader;
