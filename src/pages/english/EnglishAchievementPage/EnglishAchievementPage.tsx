// FIXME: mockup page
import MockupPage from '@/components/pages/MockupPage/MockupPage';

// react
import {
  memo,
} from 'react';

function _EnglishAchievementPage() {
  return (
    <MockupPage
      // isTestOverflow
      mockupName="EnglishAchievement Page mockup" />
  );
}

const EnglishAchievementPage = memo(_EnglishAchievementPage);
export default EnglishAchievementPage;
