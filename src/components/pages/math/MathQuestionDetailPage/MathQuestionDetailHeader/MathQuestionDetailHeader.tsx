// react
import {
  useCallback,
  memo,
} from 'react';
// router
import { 
  useParams,
} from 'react-router-dom';
// store
import useHistoryModalStore from '@/store/modalStores/historyModalStore/historyModalStore';
// api
import ApiManager from '@/apis/ApiManager';
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
  THistoryModalData,
} from '@/components/shadcn-ui-custom/modals/HistoryModal/HistoryModal.type';
import { 
  TRetrieveMathQuestionHistoriesApiRequestParams,
} from '@/apis/math/mathApi.type';
// style
import './MathQuestionDetailHeader.css';

function _MathQuestionDetailHeader() {
  //
  // hook
  //
  const routeParams = useParams();
  const questionId = routeParams.questionId;

  //
  // historyModal store
  //
  const openHistoryModal = useHistoryModalStore(state => state.openHistoryModal);

  //
  // callback
  //
  const retrieveMathQuestionHistories = useCallback(async () => {
    if (!questionId) {
      return;
    }

    const params: TRetrieveMathQuestionHistoriesApiRequestParams = {
      pathParams: {
        questionId,
      },
    };

    const response = await ApiManager
      .math
      .retrieveMathQuestionHistoriesApi
      .callWithNoticeMessageGroup(params);

    const historyData: THistoryModalData[] = response?.data.results.map(history => {
      const {
        history_user,
        history_change_reason,
        history_date,
      } = history;

      return {
        username: history_user?.username ?? '-',
        action: history_change_reason ?? '-',
        createdAt: history_date,
      };
    }) ?? [];

    return historyData;
  }, [questionId]);

  const _openHistoryModal = useCallback(() => {
    openHistoryModal(retrieveMathQuestionHistories);
  }, [
    openHistoryModal,
    retrieveMathQuestionHistories,
  ]);

  return (
    <div className="MathQuestionDetailHeader">
      <div className="MathQuestionDetailHeader-titleWrapper">
        <div className="title">
          문항
        </div>

        <div className="description">
          문항을 수정하거나, 추가할 수 있습니다.
        </div>
      </div>

      <div className="MathQuestionDetailHeader-actionsWrapper">
        <Button
          className="button"
          variant="default"
          onClick={() => console.log('삭제')}>
          삭제
        </Button>

        <Button
          className="button"
          variant="default"
          onClick={_openHistoryModal}>
          <LuHistory className="icon" />
          히스토리
        </Button>
      </div>
    </div>
  );
}

const MathQuestionDetailHeader = memo(_MathQuestionDetailHeader);
export default MathQuestionDetailHeader;
