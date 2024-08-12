// FIXME: mockup page
import MockupPage from '@/components/pages/MockupPage/MockupPage';

// react
import {
  memo,
} from 'react';

function _MathChapterPage() {
  return (
    <MockupPage 
      // isTestOverflow
      mockupName="MathChapter Page mockup" />
  );
}

const MathChapterPage = memo(_MathChapterPage);
export default MathChapterPage;
