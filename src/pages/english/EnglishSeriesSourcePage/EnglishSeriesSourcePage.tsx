// FIXME: mockup page
import MockupPage from '@/components/pages/MockupPage/MockupPage';

// react
import {
  memo,
} from 'react';

function _EnglishSeriesSourcePage() {
  return (
    <MockupPage
      // isTestOverflow
      mockupName="EnglishSeriesSource Page mockup" />
  );
}

const EnglishSeriesSourcePage = memo(_EnglishSeriesSourcePage);
export default EnglishSeriesSourcePage;
