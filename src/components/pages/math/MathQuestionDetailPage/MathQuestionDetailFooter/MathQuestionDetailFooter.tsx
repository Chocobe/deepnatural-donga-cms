// react
import {
  useMemo,
  useCallback,
  memo,
} from 'react';
// router
import { 
  useNavigate,
} from 'react-router-dom';
import routePathFactory from '@/routes/routePathFactory';
// store
import useMathQuestionPageStore from '@/store/mathStores/mathQuestionPageStore/mathQuestionPageStore';
import useResultNoticeModalStore from '@/store/modalStores/resultNoticeModalStore/resultNoticeModalStore';
// api
import ApiManager from '@/apis/ApiManager';
// ui
import { 
  Button,
  ButtonProps,
} from '@/components/shadcn-ui/ui/button';
// icon
import { 
  LuSave,
} from 'react-icons/lu';
// type
import { 
  TPutMathQuestionApiRequestParams,
} from '@/apis/math/mathApi.type';
import { 
  initialMathQuestionPageStoreState,
} from '@/store/mathStores/mathQuestionPageStore/mathQuestionPageStore.type';
import { 
  mathQuestionTypeMapper,
} from '@/apis/models/mathModel.type';
// style
import './MathQuestionDetailFooter.css';

function _MathQuestionDetailFooter() {
  //
  // mathQuestionPage store
  //
  const detailFormState = useMathQuestionPageStore(state => state.detailFormState);

  //
  // resultNoticeModal store
  //
  const openNoticeModal = useResultNoticeModalStore(state => state.openSuccessNoticeModal);

  //
  // hook
  //
  const navigate = useNavigate();

  //
  // callback
  //
  const createPayloadTemplate = useCallback(() => {
    const {
      source: _source,
      instruction: _instruction,
      achievement: _achievement,
      kc2: _kc2,
      chapter1: _chapter1,
      chapter2: _chapter2,
      chapter3: _chapter3,

      ...payloadTemplate
    } = initialMathQuestionPageStoreState.detailFormState;

    return payloadTemplate;
  }, []);

  const createPayload = useCallback(() => {
    const {
      id,

      source,
      instruction,
      achievement,
      kc2,
      chapter1,
      chapter2,
      chapter3,

      textbook: _textbook,

      ...filteredProps
    } = detailFormState;

    const {
      // 객관식-단답형
      // 객관식-다답형
      choice1,
      choice2,
      choice3,
      choice4,
      choice5,

      //
      // 주관식-단답형
      // 주관식-선택형-기본
      // 주관식-선택형-무순
      // 주관식-선택형-유순
      //
      short_answer_count,
      short_answer1,
      short_answer2,
      short_answer3,
      short_answer4,
      short_answer5,
      short_answer6,
      short_answer7,
      short_answer8,
      short_answer9,
      short_answer10,
      short_answer11,
      short_answer12,
      short_answer13,
      short_answer14,
      short_answer15,
      short_answer16,
      short_answer17,
      short_answer18,
      short_answer19,
      short_answer20,

      //
      // 주관식-선택형-기본
      // 주관식-선택형-무순
      // 주관식-선택형-유순
      //
      choice_type,
      choice_count,

      //
      // 주관식-서술형
      // 주관식-그리기형
      // 주관식-선긋기형
      //
      // `short_answer1` 만 사용

      //
      // 주관식-서술형
      //
      evaluation_criteria1,
      evaluation_criteria1_percent,
      evaluation_criteria2,
      evaluation_criteria2_percent,
      evaluation_criteria3,
      evaluation_criteria3_percent,
      evaluation_criteria4,
      evaluation_criteria4_percent,
      evaluation_criteria5,
      evaluation_criteria5_percent,

      ...commonProps
    } = filteredProps;

    switch (true) {
      case !id: {
        return;
      }

      case !source: {
        openNoticeModal({
          title: '',
          message: '출처를 선택해 주세요.',
          firstButton: {
            text: '확인',
          },
        });
        return;
      }

      case !achievement.filter(a => !!a)?.length: {
        openNoticeModal({
          title: '',
          message: '성취기준을 선택해 주세요.',
          firstButton: {
            text: '확인',
          },
        });
        return;
      }

      case !kc2: {
        openNoticeModal({
          title: '',
          message: '지식개념을 선택해 주세요.',
          firstButton: {
            text: '확인',
          },
        });
        return;
      }
    }

    const question_type = commonProps.question_type;

    let payloadTemplate = createPayloadTemplate();
    payloadTemplate = {
      ...payloadTemplate,
      ...commonProps,
      id,
    };

    switch (question_type) {
      case mathQuestionTypeMapper['객관식-단답형']:
      case mathQuestionTypeMapper['객관식-다답형']: {
        payloadTemplate = {
          ...payloadTemplate,
          choice1,
          choice2,
          choice3,
          choice4,
          choice5,
        };

        break;
      }

      case mathQuestionTypeMapper['주관식-단답형']:
      case mathQuestionTypeMapper['주관식-선택형-기본']:
      case mathQuestionTypeMapper['주관식-선택형-무순']:
      case mathQuestionTypeMapper['주관식-선택형-유순']: {
        payloadTemplate = {
          ...payloadTemplate,
          short_answer_count,
          short_answer1,
          short_answer2,
          short_answer3,
          short_answer4,
          short_answer5,
          short_answer6,
          short_answer7,
          short_answer8,
          short_answer9,
          short_answer10,
          short_answer11,
          short_answer12,
          short_answer13,
          short_answer14,
          short_answer15,
          short_answer16,
          short_answer17,
          short_answer18,
          short_answer19,
          short_answer20,
        };

        if (question_type !== mathQuestionTypeMapper['주관식-단답형']) {
          payloadTemplate = {
            ...payloadTemplate,
            choice_type,
            choice_count,
          };
        }

        break;
      }

      case mathQuestionTypeMapper['주관식-서술형']:
      case mathQuestionTypeMapper['주관식-그리기형']:
      case mathQuestionTypeMapper['주관식-선긋기형']: {
        payloadTemplate.short_answer1 = short_answer1;

        if (question_type === mathQuestionTypeMapper['주관식-서술형']) {
          payloadTemplate = {
            ...payloadTemplate,
            evaluation_criteria1,
            evaluation_criteria1_percent,
            evaluation_criteria2,
            evaluation_criteria2_percent,
            evaluation_criteria3,
            evaluation_criteria3_percent,
            evaluation_criteria4,
            evaluation_criteria4_percent,
            evaluation_criteria5,
            evaluation_criteria5_percent,
          };
        }

        break;
      }
    }

    const payload: TPutMathQuestionApiRequestParams['payload'] = {
      id,
      ...payloadTemplate,

      // FIXME: mockup
      source_id: source.id,
      instruction_id: instruction?.id ?? null,
      achievement_ids: achievement
        .filter(achievement => achievement)
        .map(achievement => String(achievement!.id)),
      kc2_id: kc2.id,
      chapter1_ids: chapter1
        .filter(chapter1 => chapter1)
        .map(chapter1 => String(chapter1!.id)),
      chapter2_ids: chapter2
        .filter(chapter2 => chapter2)
        .map(chapter2 => String(chapter2!.id)),
      chapter3_ids: chapter3
        .filter(chapter3 => chapter3)
        .map(chapter3 => String(chapter3!.id)),
    };

    return payload;
  }, [
    detailFormState,
    createPayloadTemplate,
    openNoticeModal,
  ]);

  const putMathQuestion = useCallback(() => {
    const payload = createPayload();

    if (!payload) {
      return;
    }

    const params: TPutMathQuestionApiRequestParams = {
      pathParams: {
        questionId: payload.id,
      },
      payload,
    };

    return ApiManager
      .math
      .putMathQuestionApi
      .callWithNoticeMessageGroup(params);
  }, [createPayload]);

  const onClickSaveAndRemain = useCallback(async () => {
    await putMathQuestion();
  }, [putMathQuestion]);

  const onClickSave = useCallback(async () => {
    const mathQuestion = await putMathQuestion();

    if (!mathQuestion) {
      return;
    }

    navigate(routePathFactory
      .math
      .getQuestionPath()
    );
  }, [putMathQuestion, navigate]);

  //
  // cache
  //
  const buttonItems = useMemo(() => [
    {
      text: '저장후 계속해서 수정하기',
      variant: 'secondary',
      onClick: onClickSaveAndRemain,
      IconComponent: undefined,
    },
    {
      text: '저장하기',
      variant: 'default',
      onClick: onClickSave,
      IconComponent: LuSave,
    },
  ], [
    onClickSaveAndRemain,
    onClickSave,
  ]);

  return (
    <div className="MathQuestionDetailFooter">
      {buttonItems.map((item, index) => {
        const {
          text,
          variant,
          onClick,
          IconComponent,
        } = item;

        return (
          <Button
            key={index}
            className="button"
            variant={variant as ButtonProps['variant']}
            onClick={onClick}>
            {IconComponent && (
              <IconComponent className="icon" />
            )}

            {text}
          </Button>
        );
      })}
    </div>
  );
}

const MathQuestionDetailFooter = memo(_MathQuestionDetailFooter);
export default MathQuestionDetailFooter;
