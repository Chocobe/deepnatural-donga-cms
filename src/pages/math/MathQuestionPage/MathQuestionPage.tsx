// FIXME: mockup page
import MockupPage from '@/components/pages/MockupPage/MockupPage';

// react
import {
  memo,
} from 'react';

function _MathQuestionPage() {
  return (
    <MockupPage 
      // isTestOverflow
      mockupName="MathQuestion Page mockup" />
  );
}

const MathQuestionPage = memo(_MathQuestionPage);
export default MathQuestionPage;
