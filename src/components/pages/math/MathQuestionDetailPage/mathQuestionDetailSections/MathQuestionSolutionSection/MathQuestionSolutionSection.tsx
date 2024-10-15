// react
import {
  useMemo,
  useCallback,
  memo,
  ChangeEvent,
} from 'react';
// store
import useMathQuestionPageStore from '@/store/mathStores/mathQuestionPageStore/mathQuestionPageStore';
// hook
import useMathQuestionDetailPreviewButton from '../hooks/useMathQuestionDetailPreviewButton';
// ui
import MathQuestionDetailSectionTemplate from '../../MathQuestionDetailSectionTemplate/MathQuestionDetailSectionTemplate';
import MathQuestionDetailSectionItemTemplate, { 
  TMathQuestionDetailSectionItemTemplateProps,
} from '../../MathQuestionDetailSectionItemTemplate/MathQuestionDetailSectionItemTemplate';
import MathQuestionMathJaxEditor from '../MathQuestionMathJaxEditor/MathQuestionMathJaxEditor';
import MathQuestionDetailPreviewButton from '../MathQuestionDetailPreviewButton/MathQuestionDetailPreviewButton';

function _MathQuestionSolutionSection() {
  //
  // mathQuestionPage store
  //
  const solution = useMathQuestionPageStore(state => state.detailFormState.solution);

  const updateDetailFormState = useMathQuestionPageStore(state => state.updateDetailFormState);

  //
  // hook
  //
  const {
    isShowPreview: isShowSolutionPreview,
    togglePreview: toggleSolutionPreview,
  } = useMathQuestionDetailPreviewButton();

  //
  // callback
  //
  const onChangeInput = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const {
      id,
      value,
    } = e.target;

    updateDetailFormState(old => ({
      ...old,
      [id]: value,
    }));
  }, [updateDetailFormState]);

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
              isShowPreview={isShowSolutionPreview}
              value={solution}
              onChange={onChangeInput} />
          ),
          Actions: [
            (
              <MathQuestionDetailPreviewButton
                isShowPreview={isShowSolutionPreview}
                onClick={toggleSolutionPreview} />
            ),
          ],
        },
      ],
    },
  ], [
    solution,
    isShowSolutionPreview,
    onChangeInput,
    toggleSolutionPreview,
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
