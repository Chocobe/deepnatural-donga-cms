// react
import {
  useMemo,
  memo,
  useState,
  useCallback,
} from 'react';
// store
import useMathQuestionPageStore from '@/store/mathStores/mathQuestionPageStore/mathQuestionPageStore';
// hook
import useHandleMathQuestionDetailEditors from '../hooks/useHandleMathQuestionDetailEditors';
// ui
import MathQuestionDetailSectionTemplate from '../../MathQuestionDetailSectionTemplate/MathQuestionDetailSectionTemplate';
import MathQuestionDetailSectionItemTemplate, { 
  TMathQuestionDetailSectionItemTemplateProps,
} from '../../MathQuestionDetailSectionItemTemplate/MathQuestionDetailSectionItemTemplate';
import MathQuestionMathJaxEditor from '../MathQuestionMathJaxEditor/MathQuestionMathJaxEditor';
import MathQuestionDetailPreviewButton from '../MathQuestionDetailPreviewButton/MathQuestionDetailPreviewButton';
import CommonSelect from '@/components/shadcn-ui-custom/CommonSelect/CommonSelect';
import { 
  Input,
} from '@/components/shadcn-ui/ui/input';
// type
import { 
  mathChoiceTypeOptions, 
  mathQuestionTypeMapper,
} from '@/apis/models/mathModel.type';

function _MathQuestionDataSection() {
  //
  // mathQuestionPage store
  //
  const detailFormState = useMathQuestionPageStore(state => state.detailFormState);

  //
  // hook
  //
  const {
    onChangeInput,
    onChangeSelect,
  } = useHandleMathQuestionDetailEditors();

  const [previewState, setPreviewState] = useState({
    // 객관식 선지
    choice1: false,
    choice2: false,
    choice3: false,
    choice4: false,
    choice5: false,

    // 주관식 정답
    ...Array.from(
      { length: 20 },
      (_, i) => `short_answer${i + 1}`
    ).reduce((shortAnswerObj, key) => ({
      ...shortAnswerObj,
      [key]: false,
    }), {}),

    // 서술형 평가 기준
    ...Array.from(
      { length: 5 },
      (_, i) => `evaluation_criteria${i + 1}`
    ).reduce((criteriaObj, key) => ({
      ...criteriaObj,
      [key]: false,
    }), {}),
  });

  //
  // callback
  //
  const togglePreviewState = useCallback((id: string) => {
    setPreviewState(old => ({
      ...old,
      [id]: !old[id],
    }));
  }, []);

  //
  // cache
  //
  const sectionItems = useMemo<Array<
    TMathQuestionDetailSectionItemTemplateProps | null
  >>(() => [
    //
    // 객관식-단답형
    // 객관식-다답형
    //
    ...Array.from(
      { length: 5 },
      (_, i) => {
        const question_type = detailFormState.question_type;

        const choiceNumber = i + 1;
        const choiceId = `choice${choiceNumber}`;
        const choiceName = `객관식 선지${choiceNumber}`;

        if (
          question_type !== mathQuestionTypeMapper['객관식-단답형'] &&
          question_type !== mathQuestionTypeMapper['객관식-다답형']
        ) {
          return null;
        }

        return {
          label: choiceName,
          id: choiceId,
          fluid: true,
          components: [
            {
              Editor: (
                <MathQuestionMathJaxEditor
                  id={choiceId}
                  isShowPreview={previewState[choiceId]}
                  value={detailFormState[choiceId]}
                  onChange={onChangeInput} />
              ),
              Actions: [
                (
                  <MathQuestionDetailPreviewButton
                    isShowPreview={previewState[choiceId]}
                    onClick={() => togglePreviewState(choiceId)} />
                ),
              ],
            },
          ],
        };
      }
    ),

    //
    // 주관식-단답형
    // 주관식-선택형-기본
    // 주관식-선택형-무순
    // 주관식-선택형-유순
    //
    ...(
      detailFormState.question_type === mathQuestionTypeMapper['주관식-단답형'] ||
      detailFormState.question_type === mathQuestionTypeMapper['주관식-선택형-기본'] ||
      detailFormState.question_type === mathQuestionTypeMapper['주관식-선택형-무순'] ||
      detailFormState.question_type === mathQuestionTypeMapper['주관식-선택형-유순']
    )? (() => {
      const short_answer_count = detailFormState.short_answer_count ?? 0;

      const shortAnswerCountItem = {
        label: '주관식 정답 입력 개수',
        id: 'short_answer_count',
        components: [
          {
            Editor: (
              <MathQuestionMathJaxEditor
                id="short_answer_count"
                value={String(short_answer_count ?? '')}
                onChange={onChangeInput}
              />
            ),
          },
        ],
      };

      const shortAnswerItems = Array.from(
        { length: Math.min(short_answer_count, 20) },
        (_, i) => {
          const shortAnswerNumber = i + 1;
          const shortAnswerId = `short_answer${shortAnswerNumber}`;
          const shortAnswerName = `주관식 정답${shortAnswerNumber}`;

          return {
            label: shortAnswerName,
            id: shortAnswerId,
            fluid: true,
            components: [
              {
                Editor: (
                  <MathQuestionMathJaxEditor
                    id={shortAnswerId}
                    value={detailFormState[shortAnswerId]}
                    isShowPreview={previewState[shortAnswerId]}
                    onChange={onChangeInput} />
                ),
                Actions: [
                  (
                    <MathQuestionDetailPreviewButton
                      isShowPreview={previewState[shortAnswerId]}
                      onClick={() => togglePreviewState(shortAnswerId)} />
                  ),
                ],
              },
            ],
          };
        }
      );

      if (detailFormState.question_type === '주관식-단답형') {
        return [
          shortAnswerCountItem,
          ...shortAnswerItems,
        ];
      }

      return [
        shortAnswerCountItem,
        {
          label: '선택지 유형',
          id: 'choice_type',
          components: [
            {
              Editor: (
                <CommonSelect
                  id="choice_type"
                  value={detailFormState.choice_type}
                  options={mathChoiceTypeOptions}
                  onChange={onChangeSelect} />
              ),
            },
          ],
        },
        {
          label: '선택지 개수',
          id: 'choice_count',
          components: [
            {
              Editor: (
                <Input
                  id="choice_count"
                  value={String(detailFormState.choice_count ?? '')}
                  onChange={onChangeInput} />
              ),
            },
          ],
        },
        ...shortAnswerItems,
      ];
    })(): [],

    //
    // 주관식-서술형
    // 주관식-그리기형
    // 주관식-선긋기형
    //
    (
      detailFormState.question_type === mathQuestionTypeMapper['주관식-서술형'] ||
      detailFormState.question_type === mathQuestionTypeMapper['주관식-그리기형'] ||
      detailFormState.question_type === mathQuestionTypeMapper['주관식-선긋기형']
    )? {
      label: '주관식 정답',
      id: 'short_answer1',
      fluid: true,
      components: [
        {
          Editor: (
            <MathQuestionMathJaxEditor
              id='short_answer1'
              value={detailFormState.short_answer1}
              isShowPreview={previewState['short_answer1']}
              onChange={onChangeInput} />
          ),
          LeftSideActions: [
            (
              <MathQuestionDetailPreviewButton
                isShowPreview={previewState['short_answer1']}
                onClick={() => togglePreviewState('short_answer1')} />
            ),
          ],
        },
      ],
    }: null,

    //
    // 주관식-서술형
    //
    ...(
      detailFormState.question_type === mathQuestionTypeMapper['주관식-서술형']
    )? Array.from(
      { length: 5 },
      (_, i) => {
        const criteriaNumber = i + 1;

        const criteriaId = `evaluation_criteria${criteriaNumber}`;
        const criteriaName = `서술형 평가 기준${criteriaNumber}`;

        const criteriaPercentId = `${criteriaId}_percent`;
        const criteriaPercentName = `${criteriaName} (%)`;

        return [
          {
            label: criteriaName,
            id: criteriaId,
            fluid: true,
            components: [
              {
                Editor: (
                  <MathQuestionMathJaxEditor
                    id={criteriaId}
                    value={detailFormState[criteriaId]}
                    isShowPreview={previewState[criteriaId]}
                    onChange={onChangeInput} />
                ),
                Actions: [
                  (
                    <MathQuestionDetailPreviewButton
                      isShowPreview={previewState[criteriaId]}
                      onClick={() => togglePreviewState(criteriaId)} />
                  ),
                ],
              },
            ],
          },
          {
            label: criteriaPercentName,
            id: criteriaPercentId,
            components: [
              {
                Editor: (
                  <Input
                    id={criteriaPercentId}
                    value={detailFormState[criteriaPercentId]}
                    onChange={onChangeInput} />
                ),
              },
            ],
          },
        ];
      }
    ).flat(): [],
  ], [
    detailFormState,
    previewState,
    onChangeInput,
    onChangeSelect,
    togglePreviewState,
  ]);

  return (
    <MathQuestionDetailSectionTemplate title={detailFormState.question_type}>
      {sectionItems.map((item, index) => {
        if (!item) {
          return null;
        }

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

const MathQuestionDataSection = memo(_MathQuestionDataSection);
export default MathQuestionDataSection;
