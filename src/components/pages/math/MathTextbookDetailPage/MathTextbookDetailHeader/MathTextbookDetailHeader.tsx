// react
import {
  useCallback,
  memo,
} from 'react';
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

type TMathTextbookDetailHeaderProps = {
  isDetailMode: boolean;
}

function _MathTextbookDetailHeader(props: TMathTextbookDetailHeaderProps) {
  const {
    isDetailMode,
  } = props;

  //
  // callback
  //
  const openHistoryModal = useCallback(() => {
    console.log('openHistoryModal()');
  }, []);

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
            onClick={openHistoryModal}>
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
