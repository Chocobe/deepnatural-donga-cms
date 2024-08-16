// react
import {
  useCallback,
  memo,
} from 'react';
// store
import useHistoryModalStore from '@/store/historyModalStore/historyModalStore';
// ui
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
// icon
import { 
  LuHistory,
} from 'react-icons/lu';
// type
import { 
  mockHistoryModalData, 
  THistoryModalData,
} from '@/components/shadcn-ui-custom/modals/HistoryModal/HistoryModal.type';
// style
import './MathTextbookDetailHeader.css';

type TMathTextbookDetailHeaderProps = {
  isDetailMode: boolean;
}

function _MathTextbookDetailHeader(props: TMathTextbookDetailHeaderProps) {
  const {
    isDetailMode,
  } = props;

  //
  // historyModal store
  //
  const openHistoryModal = useHistoryModalStore(state => state.openHistoryModal);

  //
  // callback
  //
  const retrieveMathTextbookHistory = useCallback(async () => {
    return new Promise<THistoryModalData[]>(res => {
      setTimeout(() => {
        res(mockHistoryModalData);
      }, Math.random() * 2_000);
    });
  }, []);

  const _openHistoryModal = useCallback(async () => {
    openHistoryModal(retrieveMathTextbookHistory);
  }, [retrieveMathTextbookHistory, openHistoryModal]);

  return (
    <div className="MathTextbookDetailHeader">
      <div className="wrapper">
        <h3 className="title">
          교과서
        </h3>

        <div className="description">
          교과서를 수정하거나, 추가할 수 있습니다.
        </div>
      </div>

      <div className="actionsWrapper">
        {isDetailMode && (
          <Button
            className="historyButton"
            onClick={_openHistoryModal}>
            <LuHistory className="icon" />
            History
          </Button>
        )}
      </div>
    </div>
  );
}

const MathTextbookDetailHeader = memo(_MathTextbookDetailHeader);
export default MathTextbookDetailHeader;
