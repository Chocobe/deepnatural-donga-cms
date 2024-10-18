// react
import {
  useMemo,
  memo,
} from 'react';
// store
import useMathQuestionPageStore from '@/store/mathStores/mathQuestionPageStore/mathQuestionPageStore';
// hook
import useHandleMathQuestionDetailEditors from '../hooks/useHandleMathQuestionDetailEditors';
import useMathQuestionDetailCollapseButton from '../hooks/useMathQuestionDetailCollapseButton';
// ui
import MathQuestionDetailSectionTemplate from '../../MathQuestionDetailSectionTemplate/MathQuestionDetailSectionTemplate';
import MathQuestionDetailSectionItemTemplate, { 
  TMathQuestionDetailSectionItemTemplateProps,
} from '../../MathQuestionDetailSectionItemTemplate/MathQuestionDetailSectionItemTemplate';
import MathQuestionMathJaxEditor from '../MathQuestionMathJaxEditor/MathQuestionMathJaxEditor';
import MathQuestionDetailCollapseButton from '../MathQuestionDetailPreviewButton/MathQuestionDetailPreviewButton';

function _MathQuestionSolutionSection() {
  //
  // mathQuestionPage store
  //
  const solution = useMathQuestionPageStore(state => state.detailFormState.solution);

  //
  // hook
  //
  const {
    onChangeInput,
  } = useHandleMathQuestionDetailEditors();

  const {
    isShow: isShowSolutionEditor,
    toggleCollapse: toggleSolutionEditor,
  } = useMathQuestionDetailCollapseButton();

  //
  // cache
  //
  const sectionItems = useMemo<TMathQuestionDetailSectionItemTemplateProps[]>(() => [
    {
      label: '풀이',
      id: 'solution',
      fluid: true,
      components: [
        {
          Editor: (
            <MathQuestionMathJaxEditor
              id="solution"
              isShowEditor={isShowSolutionEditor}
              value={solution}
              onChange={onChangeInput} />
          ),
          LeftSideActions: [
            (
              <MathQuestionDetailCollapseButton
                isShow={isShowSolutionEditor}
                onClick={toggleSolutionEditor} />
            ),
          ],
        },
      ],
    },
  ], [
    solution,
    isShowSolutionEditor,
    onChangeInput,
    toggleSolutionEditor,
  ]);

  return (
    <MathQuestionDetailSectionTemplate title="풀이">
      {sectionItems.map((item, index) => {
        const {
          id,
          label,
          components,
          fluid,
          isHide,
        } = item;

        return (
          <MathQuestionDetailSectionItemTemplate
            key={id ?? index}
            id={id}
            label={label}
            components={components}
            fluid={fluid}
            isHide={isHide} />
        );
      })}
    </MathQuestionDetailSectionTemplate>
  );
}

const MathQuestionSolutionSection = memo(_MathQuestionSolutionSection);
export default MathQuestionSolutionSection;
