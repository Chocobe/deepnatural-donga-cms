// react
import { 
  useEffect,
} from 'react';
// store
import useMathQuestionToolPageStore from '@/store/mathStores/mathQuestionToolPageStore/mathQuestionToolPageStore';
// hook
import useInitMathPixAppKey from './hooks/useInitMathPixAppKey';
// ui
import MathFormulaExtractorHeader from './MathFormulaExtractorHeader/MathFormulaExtractorHeader';
import MathQuestionToolViewerSection from './MathQuestonToolViewerSection/MathQuestionToolViewerSection';
import MathQuestionToolWorkingSection from './MathQuestionToolWorkingSection/MathQuestionToolWorkingSection';
// import ApiLoadingModal from '../ui/ApiLoadingModal/ApiLoadingModal';
import MathQuestionToolErrorModal from '../ui/MathQuestionToolErrorModal/MathQuestionToolErrorModal';
// style
import './MathFormulaExtractor.css';

function MathFormulaExtractor() {
  //
  // mathQuestionToolPage store
  //
  const initResult_action = useMathQuestionToolPageStore(state => state.ui.action.initResult_action);

  //
  // hook
  //
  useInitMathPixAppKey();

  //
  // effect
  //
  useEffect(function initTool() {
    initResult_action();
  }, [initResult_action]);

  return (
    <div className="MathFormulaExtractor">
      <MathFormulaExtractorHeader className="toolHeader" />

      <div className="toolBody">
        <MathQuestionToolViewerSection className="viewerSection" />

        <MathQuestionToolWorkingSection className="workingSection" />
      </div>

      {/* TODO: 작업도구 ApiManager를 CMS ApiManager에 병합한다면, `<ApiLoadingModal />` 지우기 */}
      {/* TODO: => `callWith...()` 사용 */}
      {/* <ApiLoadingModal /> */}

      <MathQuestionToolErrorModal />
    </div>
  );
}

export default MathFormulaExtractor;
