// react
import {
  useCallback,
} from 'react';
// store
import useMathQuestionToolPageStore from '@/store/mathStores/mathQuestionToolPageStore/mathQuestionToolPageStore';
// hook
import useMathQuestionToolErrorModal from '../../ui/MathQuestionToolErrorModal/hooks/useMathQuestionToolErrorModal';
import { 
  TSubmitApiPayload,
} from '../../../network/network.type/taskApi.type';
import { 
  TSummarizedMetadata,
  chapter1MetadataTemplate,
  chapter2MetadataTemplate,
  questionSetCommonTemplate,
  questionTypeOptionsMapper, 
  questionTypeTemplateMapper, 
  sourceMetadataTemplate, 
  textbookMetadataTemplate,
} from '../MathFormulaAccordions/mathFormulaAccordions.type';
import { 
  TRetrieveKnowledgeConceptListApiResult,
} from '../../../network/network.type/searchApi.type';
// api
// FIXME: API 연동 후, 적용하기
// import ApiManager from '../../../network/ApiManager';
import apiFeedbackMessageFactory, {
  createErrorMessage,
} from '../../../network/apiFeedbackMessageFactory';

class CustomError extends Error {
  detail: string;
  status?: number;

  constructor(params: {
    detail: string;
    status?: number;
  }) {
    super();
    this.detail = params.detail;
    this.status = params.status;
  }
}
const errorAccentColor = '#F42549';

const requiredMetadataTemplateList = [
  sourceMetadataTemplate,
  textbookMetadataTemplate,
  chapter1MetadataTemplate,
  chapter2MetadataTemplate,
];

const useOnClickSubmit = () => {
  //
  // mathQuestionToolPage store
  //
  const metadataState = useMathQuestionToolPageStore(state => state.ui.state.result.metadata);
  const questionSetsState = useMathQuestionToolPageStore(state => state.ui.state.result.questionSets);
  const subjectState = useMathQuestionToolPageStore(state => state.ui.state.result.subject);

  const initResult_action = useMathQuestionToolPageStore(state => state.ui.action.initResult_action);
  const setApiLoadingUiState_action = useMathQuestionToolPageStore(state => state.ui.action.setApiLoadingUiState_action);
  const resetApiLoadingUiState_action = useMathQuestionToolPageStore(state => state.ui.action.resetApiLoadingUiState_action);
  const updateSubmissionStatistics_action = useMathQuestionToolPageStore(state => state.ui.action.updateSubmissionStatistics_action);

  //
  // hook
  //
  // const toast = useToast();
  const { 
    openErrorModal,
  } = useMathQuestionToolErrorModal();

  //
  // callback
  //
  const createMetadataPayload = useCallback(() => {
    return Object
      .entries(metadataState)
      .reduce((payload, [key, summarizedMetadata]) => {
        const requiredTemplate = requiredMetadataTemplateList.find(({ id }) => id === key);

        if (requiredTemplate && !summarizedMetadata) {
          const label = (requiredTemplate as any).header?.label
            ?? requiredTemplate.search.label;

          throw new CustomError({
            detail: `<span style="color: ${errorAccentColor}; font-weight: 500;">${label}</span>을(를) 입력해주세요`,
          });
        }

        if (!summarizedMetadata) {
          return payload;
        }

        const {
          metadata: {
            id: value,
          },
        } = summarizedMetadata;

        return {
          ...payload,
          [key]: value,
        };
      }, {} as TSubmitApiPayload['metadata']);
  }, [metadataState]);

  const _createInitialResult = useCallback((): Record<string, any> => {
    return {
      ...questionSetCommonTemplate.reduce((initialObj, item) => {
        const {
          id,
          type,
        } = item;

        let initialValue: any = null;

        switch(type) {
          case 'text':
          case 'latex':
            initialValue = '';
            break;
          case 'boolean':
            initialValue = false;
            break;
        }

        return {
          ...initialObj,
          [id]: initialValue,
        };
      }, {}),

      ...Object.values(questionTypeTemplateMapper).reduce((initialTemplate, template) => {
        return {
          ...initialTemplate,
          ...template().reduce((initialObj, item) => {
            const {
              id,
              type,
            } = item;

            let initialValue: any = null;

            switch (type) {
              case 'text':
              case 'latex':
                initialValue = '';
                break;
              case 'boolean':
                initialValue = false;
                break;
              case 'number':
              case 'enum/number':
                initialValue = 0;
                break;
            }

            return {
              ...initialObj,
              [id]: initialValue,
            };
          }, {}),
        };
      }, {}),
    };
  }, []);

  const createResultsPayload = useCallback(() => {
    if (!subjectState) {
      throw new CustomError({
        detail: `<span style="color: ${errorAccentColor}; font-weight: 500;">과목</span>을 입력해주세요.`,
      });
    }

    const results = questionSetsState.map((questionSet, indexOfQuestionSets) => {
      // 1. result 초기화
      const result = _createInitialResult();

      // 2. common 값 추출
      questionSetCommonTemplate.forEach(template => {
        const {
          id,
          type,
          label,
          required,
        } = template;

        let value = questionSet[id];

        // 2-1. type 에 대한 값 보정 처리
        switch(type) {
          case 'number':
          case 'enum/number': {
            if (value !== 0 && !value) {
              throw new CustomError({
                detail: `<span style="color: ${errorAccentColor}; font-weight: 500;">문항${indexOfQuestionSets + 1}</span>의 <span style="color: ${errorAccentColor}; font-weight: 500;">${label}</span>을(를) 입력해주세요`,
              });
            }

            value = Number(value);
            break;
          }
          case 'text':
          case 'enum/string':
          case 'latex': {
            if (id === 'instruction' && questionSetsState.length < 2) {
              value = '';
            } else {
              value = value ?? '';
            }

            break;
          }
          case 'boolean': {
            value = !!value;
            break;
          }
          case 'kc2': {
            value = (value as TSummarizedMetadata<TRetrieveKnowledgeConceptListApiResult>)
              ?.metadata
              ?.id;
            break;
          }
        }

        // 2-2. instruction (지문) 검사
        if (
          id === 'instruction' && 
          indexOfQuestionSets === 0 &&
          questionSetsState.length > 1 &&
          !value
        ) {
          throw new CustomError({
            detail: `<span style="color: ${errorAccentColor}; font-weight: 500;">문항1</span>의 "지문"을 입력해주세요.`,
          });
        }

        // 2-3. 지문 (instruction) 이외 필수 입력값 검사
        if (
          id !== 'instruction' &&
          required &&
          value !== 0 &&
          !value
        ) {
          throw new CustomError({
            detail: `<span style="color: ${errorAccentColor}; font-weight: 500;">문항${indexOfQuestionSets + 1}</span>의 <span style="color: ${errorAccentColor}; font-weight: 500;">${label}</span>을(를) 입력해주세요`,
          });
        }

        result[id] = value;
      });

      // 3. 문제유형에 대한 값 추출
      const questionType = result.question_type as keyof typeof questionTypeTemplateMapper;
      const typeTemplateFactory = questionTypeTemplateMapper[questionType];
      let typeTemplate: ReturnType<typeof typeTemplateFactory>;

      if (!typeTemplateFactory) {
        throw new CustomError({
          detail: `<span style="color: ${errorAccentColor}; font-weight: 500;">문항${indexOfQuestionSets + 1}</span>의 <span style="color: ${errorAccentColor}; font-weight: 500;">문제유형</span>을 입력해주세요`,
        });
      }

      switch(questionType) {
        // 주관식(단/다답형) 일 때, "선택지 개수 (choice_count)" 검사
        case questionTypeOptionsMapper['주관식(단답형)']:
        case questionTypeOptionsMapper['주관식(선택형)']: {
          const shortAnswerCount = questionSet['short_answer_count'];

          if (!shortAnswerCount) {
            throw new CustomError({
              detail: `<span style="color: ${errorAccentColor}; font-weight: 500;">문항${indexOfQuestionSets + 1}</span>의 <span style="color: ${errorAccentColor}; font-weight: 500;">주관식 정답 입력 개수</span>가 누락되었습니다.`,
            });
          }

          if (isNaN(Number(shortAnswerCount))) {
            throw new CustomError({
              detail: `<span style="color: ${errorAccentColor}; font-weight: 500;">문항${indexOfQuestionSets + 1}</span>의 <span style="color: ${errorAccentColor}; font-weight: 500;">주관식 정답 입력 개수</span>에 <span style="color: ${errorAccentColor}; font-weight: 500;">숫자</span>만 입력해주세요.`,
            });
          }

          typeTemplate = typeTemplateFactory(Number(shortAnswerCount));
          break;
        }
        default: {
          typeTemplate = typeTemplateFactory();
          break;
        }
      }

      // 4. 대상 template 에 대한 값 추출
      typeTemplate.forEach(template => {
        const {
          id,
          type,
          required,
          label,
        } = template;

        let value = questionSet[id];

        switch (type) {
          case 'boolean': {
            value = !!questionSet[id];
            break;
          }
          case 'number':
          case 'enum/number': {
            if (required && value !== 0 && !value) {
              throw new CustomError({
                detail: `<span style="color: ${errorAccentColor}; font-weight: 500;">문항${indexOfQuestionSets + 1}</span>의 <span style="color: ${errorAccentColor}; font-weight: 500;">${label}</span>을(를) 입력해주세요`,
              });
            }

            value = value
              ? Number(value)
              : 0;

            if (isNaN(value)) {
              throw new CustomError({
                detail: `<span style="color: ${errorAccentColor}; font-weight: 500;">문항${indexOfQuestionSets + 1}</span>의 <span style="color: ${errorAccentColor}; font-weight: 500;">${label}</span> 은(는) 숫자만 입력가능합니다.`,
              });
            }

            break;
          }
          default:
            if (required && !value) {
              throw new CustomError({
                detail: `<span style="color: ${errorAccentColor}; font-weight: 500;">문항${indexOfQuestionSets + 1}</span>의 <span style="color: ${errorAccentColor}; font-weight: 500;">${label}</span>을(를) 입력해주세요`,
              });
            }

            value = questionSet[id] ?? '';
            break;
        }

        result[id] = value;
      });

      // 5. 과목 (subject) 바인딩
      result['subject'] = subjectState;

      return result;
    });

    return results;
  }, [
    questionSetsState, subjectState,
    _createInitialResult,
  ]);

  const onClickSubmit = useCallback(async () => {
    setApiLoadingUiState_action({
      isLoading: true,
      message: apiFeedbackMessageFactory
        .taskApi
        .submitRequest(),
    });

    try {
      const payload: TSubmitApiPayload = {
        metadata: createMetadataPayload(),
        results: createResultsPayload(),
      };

      // FIXME: API 연동 후, 적용하기
      // await ApiManager.submit(payload);
      console.log('submit payload: ', payload);

      // FIXME: toast 적용하기
      // toast({
      //   title: '제출 되었습니다.',
      //   status: 'success',
      //   position: 'top',
      //   isClosable: true,
      //   duration: 5000,
      // });

      updateSubmissionStatistics_action();
      initResult_action();
    } catch(error: any) {
      const message = createErrorMessage({
        error,
        createDefaultErrorMessage: apiFeedbackMessageFactory
          .taskApi
          .submitFailure,
      });

      openErrorModal({
        buttonActionType: 'close',
        message,
      });
    } finally {
      resetApiLoadingUiState_action();
    }
  }, [
    // toast,
    createMetadataPayload, 
    createResultsPayload,
    openErrorModal,
    initResult_action,
    resetApiLoadingUiState_action,
    setApiLoadingUiState_action,
    updateSubmissionStatistics_action,
  ]);

  return onClickSubmit;
};

export default useOnClickSubmit;
