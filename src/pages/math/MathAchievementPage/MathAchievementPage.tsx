// react
import {
  memo,
} from 'react';
// ui
import MathAchievementHeader from '@/components/pages/math/MathAchievementPage/MathAchievementHeader/MathAchievementHeader';
// style
import './MathAchievementPage.css';

function _MathAchievementPage() {
  return (
    <div className="MathAchievementPage">
      <div className="MathAchievementPage-header">
        <MathAchievementHeader />
      </div>

      <div className="MathAchievementPage-actions">
        Actions
      </div>

      <div className="MathAchievementPage-table">
        Table
      </div>

      <div className="MathAchievementPage-footer">
        Footer
      </div>
    </div>
  );
}

const MathAchievementPage = memo(_MathAchievementPage);
export default MathAchievementPage;
