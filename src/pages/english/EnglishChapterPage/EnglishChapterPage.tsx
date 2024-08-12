// FIXME: mockup page
import MockupPage from '@/components/pages/MockupPage/MockupPage';

// react
import {
  memo,
} from 'react';

function _EnglishChapterPage() {
  return (
    <MockupPage
      // isTestOverflow
      mockupName="EnglishChapter Page mockup" />
  );
}

const EnglishChapterPage = memo(_EnglishChapterPage);
export default EnglishChapterPage;
