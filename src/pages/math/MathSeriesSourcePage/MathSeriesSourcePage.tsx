// FIXME: mockup page
import MockupPage from '@/components/pages/MockupPage/MockupPage';

// react
import {
  memo,
} from 'react';

function _MathSeriesSourcePage() {
  return (
    <MockupPage 
      // isTestOverflow
      mockupName="MathSeriesSource Page mockup" />
  );
}

const MathSeriesSourcePage = memo(_MathSeriesSourcePage);
export default MathSeriesSourcePage;
