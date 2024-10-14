// react
import {
  useCallback,
  useEffect,
} from 'react';
// router
import { 
  useParams,
} from 'react-router-dom';
// store
import useMathAchievementPageStore from '@/store/mathStores/mathAchievementPageStore/mathAchievementPageStore';
// api
import ApiManager from '@/apis/ApiManager';
// ui
import MathAchievementDetailHeader from '@/components/pages/math/MathAchievementDetailPage/MathAchievementDetailHeader/MathAchievementDetailHeader';
import MathAchievement1 from '@/components/pages/math/MathAchievementDetailPage/MathAchievement1/MathAchievement1';
import MathAchievementDetailFooter from '@/components/pages/math/MathAchievementDetailPage/MathAchievementDetailFooter/MathAchievementDetailFooter';
// type
import { 
  TRetrieveMathAchievementApiRequestParams,
} from '@/apis/math/mathApi.type';
// style
import './MathAchievementDetailPage.css';

function MathAchievementDetailPage() {
  //
  // mathAchievementPage store
  //
  const setDetailTargetMathAchievement = useMathAchievementPageStore(state => state.setDetailTargetMathAchievement);
  const clearDetailTargetMathAchievement = useMathAchievementPageStore(state => state.clearDetailTargetMathAchievement);

  //
  // hook
  //
  const routeParams = useParams();
  const achievementId = routeParams.achievementId;
  const isDetailMode = !!achievementId;

  //
  // callback
  //
  const retrieveMathAchievement = useCallback(async () => {
    if (!achievementId) {
      return;
    }

    const params: TRetrieveMathAchievementApiRequestParams = {
      pathParams: {
        achievementId,
      },
    };

    const achievementResponse = await ApiManager
      .math
      .retrieveMathAchievementApi
      .callWithNoticeMessageGroup(params);

    const achievementData = achievementResponse?.data;

    if (achievementData) {
      setDetailTargetMathAchievement(achievementData);
    }
  }, [
    achievementId,
    setDetailTargetMathAchievement,
  ]);

  //
  // effect
  //
  useEffect(function _retrieveMathAchievement() {
    retrieveMathAchievement();
  }, [retrieveMathAchievement]);

  useEffect(function cleanup() {
    return () => {
      clearDetailTargetMathAchievement();
    };
  }, [clearDetailTargetMathAchievement]);

  return (
    <div className="MathAchievementDetailPage">
      <div className="MathAchievementDetailPage-header">
        <MathAchievementDetailHeader />
      </div>

      <div className="MathAchievementDetailPage-divider" />

      <div className="MathAchievementDetailPage-main">
        <MathAchievement1 />
      </div>

      <div className="MathAchievementDetailPage-divider" />

      <div className="MathAchievementDetailPage-footer">
        <MathAchievementDetailFooter isDetailMode={isDetailMode} />
      </div>
    </div>
  );
}

export default MathAchievementDetailPage;
