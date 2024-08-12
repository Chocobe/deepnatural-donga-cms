// FIXME: mockup page
import MockupPage from '@/components/pages/MockupPage/MockupPage';

// react
import {
  memo,
} from 'react';

function _EnglishQuestionPage() {
  return (
    <MockupPage
      // isTestOverflow
      mockupName="EnglishQuestion Page mockup" />
  );
}

const EnglishQuestionPage = memo(_EnglishQuestionPage);
export default EnglishQuestionPage;
