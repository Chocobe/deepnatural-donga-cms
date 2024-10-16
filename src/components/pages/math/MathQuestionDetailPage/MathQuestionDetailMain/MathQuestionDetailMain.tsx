// react
import {
  memo,
} from 'react';
// store
import useMathQuestionPageStore from '@/store/mathStores/mathQuestionPageStore/mathQuestionPageStore';
// ui
import MathQuestionMetadataSection from '../mathQuestionDetailSections/MathQuestionMetadataSection/MathQuestionMetadataSection';
import MathQuestionInfoSection from '../mathQuestionDetailSections/MathQuestionInfoSection/MathQuestionInfoSection';
import MathQuestionSolutionSection from '../mathQuestionDetailSections/MathQuestionSolutionSection/MathQuestionSolutionSection';
import MathQuestionAttributesSection from '../mathQuestionDetailSections/MathQuestionAttributesSection/MathQuestionAttributesSection';
import MathQuestionChaptersSection from '../mathQuestionDetailSections/MathQuestionChaptersSection/MathQuestionChaptersSection';
import MathQuestionStatusSection from '../mathQuestionDetailSections/MathQuestionStatusSection/MathQuestionStatusSection';
// style
import './MathQuestionDetailMain.css';

function _MathQuestionDetailMain() {
  //
  // mathQuestionPage store
  //
  const id = useMathQuestionPageStore(state => state.detailFormState.id);

  return (
    <div className="MathQuestionDetailMain">
      <div className="MathQuestionDetailMain-title">
        Question Object ({id})
      </div>

      <div className="MathQuestionDetailMain-sectionsWrapper">
        {/* 메타데이터 */}
        <MathQuestionMetadataSection />

        {/* 문항정보 */}
        <MathQuestionInfoSection />

        {/* `문제유형` 에 따른 분기되는 렌더링되는 섹션 */}
        {/* <MathQuestionData /> */}

        {/* 풀이 */}
        <MathQuestionSolutionSection />

        {/* 문항속성 */}
        <MathQuestionAttributesSection />

        {/* 단원 */}
        <MathQuestionChaptersSection />
      </div>

      <div className="MathQuestionDetailMain-section">
        {/* 상태값 섹션 */}
        <MathQuestionStatusSection />
      </div>
    </div>
  );
}

const MathQuestionDetailMain = memo(_MathQuestionDetailMain);
export default MathQuestionDetailMain;
