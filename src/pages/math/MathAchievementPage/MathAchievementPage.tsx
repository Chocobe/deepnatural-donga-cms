// FIXME: mockup page
import MockupPage from '@/components/pages/MockupPage/MockupPage';

// react
import {
  memo,
} from 'react';

function _MathAchievementPage() {
  return (
    <MockupPage 
      // isTestOverflow
      mockupName="MathAchievement Page mockup" />
  );
}

const MathAchievementPage = memo(_MathAchievementPage);
export default MathAchievementPage;
