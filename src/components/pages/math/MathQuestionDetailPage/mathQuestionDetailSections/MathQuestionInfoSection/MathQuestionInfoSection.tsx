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
import useHandleMathQuestionDetailEditors from '../hooks/useHandleMathQuestionDetailEditors';
import useMathQuestionDetailPreviewButton from '../hooks/useMathQuestionDetailPreviewButton';
// ui
import MathQuestionDetailSectionTemplate from '../../MathQuestionDetailSectionTemplate/MathQuestionDetailSectionTemplate';
import MathQuestionDetailSectionItemTemplate, { 
  TMathQuestionDetailSectionItemTemplateProps,
} from '../../MathQuestionDetailSectionItemTemplate/MathQuestionDetailSectionItemTemplate';
import MathQuestionMathJaxEditor from '../MathQuestionMathJaxEditor/MathQuestionMathJaxEditor';
import MathQuestionDetailPreviewButton from '../MathQuestionDetailPreviewButton/MathQuestionDetailPreviewButton';
import CommonSelect from '@/components/shadcn-ui-custom/CommonSelect/CommonSelect';
// type
import { 
  mathQuestionTypeOptions,
} from '@/apis/models/mathModel.type';

function _MathQuestionInfoSection() {
  //
  // mathQuestionPage store
  //
  const instruction = useMathQuestionPageStore(state => state.detailFormState.instruction);
  const inquiry = useMathQuestionPageStore(state => state.detailFormState.inquiry);
  const question_type = useMathQuestionPageStore(state => state.detailFormState.question_type);

  const updateDetailFormState = useMathQuestionPageStore(state => state.updateDetailFormState);

  //
  // hook
  //
  const {
    onChangeInput,
    onChangeSelect,
  } = useHandleMathQuestionDetailEditors();

  const {
    isShowPreview: isShowInquiryPreview,
    togglePreview: toggleInquiryPreview,
  } = useMathQuestionDetailPreviewButton();

  const {
    isShowPreview: isShowInstructionPreview,
    togglePreview: toggleInstructionPreview,
  } = useMathQuestionDetailPreviewButton();

  //
  // callback
  //
  const onChangeInstruction = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const {
      value,
    } = e.target;

    updateDetailFormState(old => ({
      ...old,
      instruction: old.instruction
        ? {
          ...old.instruction,
          content: value,
        }: old.instruction,
    }));
  }, [updateDetailFormState]);

  //
  // cache
  //
  const sectionItems = useMemo<TMathQuestionDetailSectionItemTemplateProps[]>(() => [
    {
      label: '지문',
      id: 'instruction',
      fluid: true,
      isHide: !instruction,
      components: [
        {
          Editor: (
            <MathQuestionMathJaxEditor
              id="instruction"
              isShowPreview={isShowInstructionPreview}
              value={instruction?.content ?? ''}
              onChange={onChangeInstruction} />
          ),
          LeftSideActions: [
            (
              <MathQuestionDetailPreviewButton
                isShowPreview={isShowInstructionPreview}
                onClick={toggleInstructionPreview} />
            ),
          ],
        },
      ],
    },
    {
      label: '발문',
      id: 'inquiry',
      fluid: true,
      components: [
        {
          Editor: (
            <MathQuestionMathJaxEditor
              id="inquiry"
              isShowPreview={isShowInquiryPreview}
              value={inquiry}
              onChange={onChangeInput}
            />
          ),
          LeftSideActions: [
            (
              <MathQuestionDetailPreviewButton
                isShowPreview={isShowInquiryPreview}
                onClick={toggleInquiryPreview} />
            ),
          ],
        },
      ],
    },
    {
      label: '문제유형',
      id: 'question_type',
      components: [
        {
          Editor: (
            <CommonSelect
              id="question_type"
              options={mathQuestionTypeOptions}
              value={question_type}
              onChange={onChangeSelect} />
          )
        }
      ]
    }
  ], [
    instruction,
    inquiry,
    question_type,
    isShowInquiryPreview,
    isShowInstructionPreview,
    onChangeInstruction,
    onChangeInput,
    onChangeSelect,
    toggleInquiryPreview,
    toggleInstructionPreview,
  ]);

  return (
    <MathQuestionDetailSectionTemplate title="문항정보">
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

const MathQuestionInfoSection = memo(_MathQuestionInfoSection);
export default MathQuestionInfoSection;
