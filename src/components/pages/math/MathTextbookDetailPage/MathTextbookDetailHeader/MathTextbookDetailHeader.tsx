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
// style
import './MathTextbookDetailHeader.css';
import ApiManager from '@/apis/ApiManager';

type TMathTextbookDetailHeaderProps = {
  isDetailMode: boolean;
  textbookId?: string;
}

function _MathTextbookDetailHeader(props: TMathTextbookDetailHeaderProps) {
  const {
    isDetailMode,
    textbookId,
  } = props;

  //
  // historyModal store
  //
  const openHistoryModal = useHistoryModalStore(state => state.openHistoryModal);

  //
  // callback
  //
  const _openHistoryModal = useCallback(async () => {
    if (!textbookId) {
      return;
    }

    openHistoryModal(() => ApiManager
      .math
      .retrieveMathTextbookHistoriesApi
      .callWithNoticeMessageGroup(textbookId)
    );
  }, [textbookId, openHistoryModal]);

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
