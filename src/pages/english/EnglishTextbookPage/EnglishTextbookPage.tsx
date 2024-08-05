// FIXME: mockup page
import MockupPage from '@/components/pages/MockupPage/MockupPage';

// react
import {
  memo,
} from 'react';

function _EnglishTextbookPage() {
  return (
    <MockupPage
      // isTestOverflow
      mockupName="EnglishTextbook Page mockup" />
  );
}

const EnglishTextbookPage = memo(_EnglishTextbookPage);
export default EnglishTextbookPage;
