// FIXME: mockup page
import MockupPage from '@/components/pages/MockupPage/MockupPage';

// react
import {
  memo,
} from 'react';

function _EnglishInstructionPage() {
  return (
    <MockupPage
      // isTestOverflow
      mockupName="EnglishInstruction Page mockup" />
  );
}

const EnglishInstructionPage = memo(_EnglishInstructionPage);
export default EnglishInstructionPage;
