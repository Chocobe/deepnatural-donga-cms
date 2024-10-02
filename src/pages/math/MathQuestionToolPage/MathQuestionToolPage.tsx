// hook
import useInitUserInfoAndGroups from '@/layouts/AuthedHeaderLayout/hooks/useInitUserInfoAndGroups';
// ui
import MathFormulaExtractor from '@/components/pages/math/MathQuestionToolPage/components/MathFormulaExtractor/MathFormulaExtractor';

function MathQuestionToolPage() {
  //
  // hook
  //
  useInitUserInfoAndGroups();

  return (
    <MathFormulaExtractor />
  );
}

export default MathQuestionToolPage;
