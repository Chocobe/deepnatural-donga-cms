// ui
import MathAchievementDetailHeader from '@/components/pages/math/MathAchievementDetailPage/MathAchievementDetailHeader/MathAchievementDetailHeader';
import MathAchievement1 from '@/components/pages/math/MathAchievementDetailPage/MathAchievement1/MathAchievement1';
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
        <MathAchievement1 />
      </div>

      <div className="MathAchievementDetailPage-divider" />

      <div className="MathAchievementDetailPage-footer">
        Footer
      </div>
    </div>
  );
}

export default MathAchievementDetailPage;
