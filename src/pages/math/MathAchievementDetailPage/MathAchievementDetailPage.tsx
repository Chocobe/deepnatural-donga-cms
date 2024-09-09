// ui
import MathAchievementDetailHeader from '@/components/pages/math/MathAchievementDetailPage/MathAchievementDetailHeader/MathAchievementDetailHeader';
// style
import './MathAchievementDetailPage.css';

function MathAchievementDetailPage() {
  return (
    <div className="MathAchievementDetailPage">
      <div className="MathAchievementDetailPage-header">
        <MathAchievementDetailHeader />
      </div>

      <div className="MathAchievementDetailPage-divider" />

      <div className="MathAchievementDetailPage-main">
        Actions
      </div>

      <div className="MathAchievementDetailPage-divider" />

      <div className="MathAchievementDetailPage-footer">
        Footer
      </div>
    </div>
  );
}

export default MathAchievementDetailPage;
