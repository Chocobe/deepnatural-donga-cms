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
  TMathChapter2InfoModel,
  TMathChapter3InfoModel,
} from '@/apis/models/mathModel.type';
// util
import { 
  checkChangedAchievement,
  checkChangedChapter,
  checkChangedInstruction,
  checkChangedKC2,
  checkChangedSource,
} from './MathQuestionDetailFooter.util';
// style
import './MathQuestionDetailFooter.css';

function _MathQuestionDetailFooter() {
  //
  // mathQuestionPage store
  //
  const detailFormState = useMathQuestionPageStore(state => state.detailFormState);
  const originMathQuestion = useMathQuestionPageStore(state => state.detailTargetMathQuestion);

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
      instruction_id: _instruction_id,
      achievement: _achievement,
      kc2: _kc2,
      chapter1: _chapter1,
      chapter2: _chapter2,
      chapter3: _chapter3,
      chapters_info: _chapters_info,

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
      chapters_info,

      instruction_id: _instruction_id,
      textbook: _textbook,
      chapter1: _chapter1,
      chapter2: _chapter2,
      chapter3: _chapter3,

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

    // Object 또는 Array 타입 속성은 변경 여부 파악
    // => 변경되지 않은 속성은 Key 자체를 제거
    // => 변경된 속성은 그 속성값 전체를 적용
    const payload: TPutMathQuestionApiRequestParams['payload'] = {
      ...payloadTemplate,
      id,
    };

    // 1. 출처(`source`) 변경사항 있을 경우, payload 추가
    if (checkChangedSource(
      originMathQuestion?.source,
      source
    )) {
      payload.source_id = source!.id;
    }

    // 2. 성취기준(`achievement`) 변경사항 있을 경우, payload 추가
    if (checkChangedAchievement(
      originMathQuestion?.achievement,
      achievement
    )) {
      payload.achievement_ids = achievement.map(achievement => String(achievement!.id));
    }

    // 3. 지문(`instruction`) 변경사항 있을 경우, payload 추가
    if (checkChangedInstruction(
      originMathQuestion?.instruction,
      instruction
    )) {
      payload.instruction = {
        id: instruction!.id,
        content: instruction!.content,
      };
    }

    // 4. 지식개념(kc2) 변경사항 있을 경우, payload 추가
    if (checkChangedKC2(
      originMathQuestion?.kc2,
      kc2
    )) {
      payload.kc2_id = kc2.id;
    }

    // 5. 단원(chapter1, 2, 3) 변경사항 있을 경우, payload 추가
    let chapter1_ids: string[] = [];
    let chapter2_ids: string[] = [];
    let chapter3_ids: string[] = [];

    chapters_info
      .filter(info => !!info)
      .forEach(info => {
        switch (true) {
          case !!(info as TMathChapter3InfoModel)?.chapter2: {
            const typedInfo = info as TMathChapter3InfoModel;

            chapter3_ids.push(String(typedInfo.id));
            chapter2_ids.push(String(typedInfo.chapter2.id));
            chapter1_ids.push(String(typedInfo.chapter2.chapter1.id));

            break;
          }

          case !!(info as TMathChapter2InfoModel)?.chapter1: {
            const typedInfo = info as TMathChapter2InfoModel;

            chapter2_ids.push(String(typedInfo.id));
            chapter1_ids.push(String(typedInfo.chapter1.id));

            break;
          }
        }
      });

    chapter1_ids = Array.from(new Set(chapter1_ids));
    chapter2_ids = Array.from(new Set(chapter2_ids));
    chapter3_ids = Array.from(new Set(chapter3_ids));

    if (checkChangedChapter(
      originMathQuestion?.chapter1,
      chapter1_ids
    )) {
      payload.chapter1_ids = chapter1_ids;
    }

    if (checkChangedChapter(
      originMathQuestion?.chapter2,
      chapter2_ids
    )) {
      payload.chapter2_ids = chapter2_ids;
    }

    if (checkChangedChapter(
      originMathQuestion?.chapter3,
      chapter3_ids
    )) {
      payload.chapter3_ids = chapter3_ids;
    }

    return payload;
  }, [
    detailFormState,
    originMathQuestion,
    createPayloadTemplate,
    openNoticeModal,
  ]);

  const putMathQuestion = useCallback(() => {
    const payload = createPayload();

    if (!payload || !payload.id) {
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
