// FIXME: mockup page
import MockupPage from '@/components/pages/MockupPage/MockupPage';

// react
import {
  memo,
} from 'react';

function _MathInstructionPage() {
  return (
    <MockupPage 
      // isTestOverflow
      mockupName="MathInstruction Page mockup" />
  );
}

const MathInstructionPage = memo(_MathInstructionPage);
export default MathInstructionPage;
