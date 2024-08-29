// react
import {
  memo,
} from 'react';
// ui
import MathAchievementHeader from '@/components/pages/math/MathAchievementPage/MathAchievementHeader/MathAchievementHeader';
import MathAchievementTableActions from '@/components/pages/math/MathAchievementPage/MathAchievementTableActions/MathAchievementTableActions';
import MathAchievementTable from '@/components/pages/math/MathAchievementPage/MathAchievementTable/MathAchievementTable';
import MathAchievementFooter from '@/components/pages/math/MathAchievementPage/MathAchievementFooter/MathAchievementFooter';
// style
import './MathAchievementPage.css';

function _MathAchievementPage() {
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
        <MathAchievementFooter />
      </div>
    </div>
  );
}

const MathAchievementPage = memo(_MathAchievementPage);
export default MathAchievementPage;
