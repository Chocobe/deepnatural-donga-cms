// FIXME: mockup page
import MockupPage from '@/components/pages/MockupPage/MockupPage';

// react
import {
  memo,
} from 'react';

function _MathTextbookPage() {
  return (
    <MockupPage 
      // isTestOverflow
      mockupName="MathTextbook Page mockup" />
  );
}

const MathTextbookPage = memo(_MathTextbookPage);
export default MathTextbookPage;
