// react
import {
  useCallback,
  useEffect,
} from 'react';
// store
import useMathAchievementPageStore from '@/store/mathAchievementPageStore/mathAchievementPageStore';
// api
import ApiManager from '@/apis/ApiManager';
// ui
import MathAchievementHeader from '@/components/pages/math/MathAchievementPage/MathAchievementHeader/MathAchievementHeader';
import MathAchievementTableActions from '@/components/pages/math/MathAchievementPage/MathAchievementTableActions/MathAchievementTableActions';
import MathAchievementTable from '@/components/pages/math/MathAchievementPage/MathAchievementTable/MathAchievementTable';
import MathAchievementFooter from '@/components/pages/math/MathAchievementPage/MathAchievementFooter/MathAchievementFooter';
// type
import { 
  TRetrieveMathAchievementsApiRequestParams,
} from '@/apis/math/mathApi.type';
// style
import './MathAchievementPage.css';

function MathAchievementPage() {
  //
  // mathAchievementPage store
  //
  const searchParamsForRetrieveMathAchievementsApi = useMathAchievementPageStore(state => state.searchParamsForRetrieveMathAchievementsApi);

  const setMathAchievementsData = useMathAchievementPageStore(state => state.setMathAchievementsData);
  const clearMathAchievementsData = useMathAchievementPageStore(state => state.clearMathAchievementsData);
  const clearSelectedMathAchievements = useMathAchievementPageStore(state => state.clearSelectedMathAchievements);

  //
  // callback
  //
  const retrieveMathAchievements = useCallback(async (
    params: TRetrieveMathAchievementsApiRequestParams
  ) => {
    const response = await ApiManager
      .math
      .retrieveMathAchievementsApi
      .callWithNoticeMessageGroup(params);

    if (response?.data) {
      setMathAchievementsData(response.data);
    }
  }, [setMathAchievementsData]);

  //
  // effect
  //
  useEffect(function init() {
    retrieveMathAchievements({
      searchParams: searchParamsForRetrieveMathAchievementsApi,
    });

    // eslint-disable-next-line
  }, [retrieveMathAchievements]);

  useEffect(function cleanup() {
    return () => {
      clearSelectedMathAchievements();
      clearMathAchievementsData();
    };

    // eslint-disable-next-line
  }, [clearSelectedMathAchievements]);

  return (
    <div className="MathAchievementPage">
      <div className="MathAchievementPage-header">
        <MathAchievementHeader />
      </div>

      <div className="MathAchievementPage-actions">
        <MathAchievementTableActions />
      </div>

      <div className="MathAchievementPage-table">
        <MathAchievementTable />
      </div>

      <div className="MathAchievementPage-footer">
        <MathAchievementFooter retrieveMathAchievements={retrieveMathAchievements} />
      </div>
    </div>
  );
}

export default MathAchievementPage;
