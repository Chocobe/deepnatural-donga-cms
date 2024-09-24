// zustand
import { 
  StateCreator,
} from 'zustand';
// util
import { 
  createDetailsResultState,
  createQuestionSetResultState,
} from './uiSlice.util';
// type
import { 
  TMathQuestionToolPageStore,
} from '../../mathQuestionToolPageStore.type';
import { 
  initialUISliceState,
  TApiLoadingUiState,
  TCaptureState,
  TResultItemPropertyValue,
  TTargetElementState,
  TUISlice,
} from './uiSlice.types';
import { 
  subjectOptions, 
  TSummarizedMetadata,
} from '@/components/pages/math/MathQuestionToolPage/components/MathFormulaExtractor/MathFormulaAccordions/mathFormulaAccordions.type';
// lodash
import _ from 'lodash';

const createUISlice: StateCreator<
  TMathQuestionToolPageStore,
  [['zustand/devtools', never]],
  [],
  TUISlice
> = (set, _get) => ({
  ui: {
    state: initialUISliceState,
    action: {
      //
      // submissionStatistics
      //
      updateSubmissionStatistics_action: () => {
        set(old => {
          const state = old.ui.state;

          const numOfSubmission = state.submissionStatistics.numOfSubmission + 1;

          const numOfQuestionSets = 
          state.submissionStatistics.numOfQuestionSets + 
          state.result.questionSets.length;

          const submissionStatistics = {
            numOfSubmission,
            numOfQuestionSets,
          };

          return {
            ...old,
            ui: {
              ...old.ui,
              state: {
                ...old.ui.state,
                submissionStatistics,
              },
            },
          };
        }, false, 'updateSubmissionStatistics_action');
      },

      //
      // errorModalUiState
      //
      openErrorModal_action: params => {
        set(old => {
          const {
            buttonActionType,
            message,
          } = params;

          const errorModalUiState = {
            isOpen: true,
            buttonActionType,
            message,
          };

          return {
            ...old,
            ui: {
              ...old.ui,
              state: {
                ...old.ui.state,
                errorModalUiState,
              },
            },
          };
        }, false, 'openErrorModal_action');
      },
      closeErrorModal_action: () => {
        set(old => {
          const errorModalUiState = {
            isOpen: false,
            buttonActionType: undefined,
            message: '',
          };

          return {
            ...old,
            ui: {
              ...old.ui,
              state: {
                ...old.ui.state,
                errorModalUiState,
              },
            },
          };
        }, false, 'closeErrorModal_action');
      },

      //
      // apiLoadingState
      //
      resetApiLoadingUiState_action: () => {
        set(old => {
          const apiLoadingUiState = {
            isLoading: false,
            message: '',
          };

          return {
            ...old,
            ui: {
              ...old.ui,
              state: {
                ...old.ui.state,
                apiLoadingUiState,
              },
            },
          };
        }, false, 'resetApiLoadingUiState_action');
      },
      setApiLoadingUiState_action: (params: TApiLoadingUiState) => {
        set(old => ({
          ...old,
          ui: {
            ...old.ui,
            state: {
              ...old.ui.state,
              apiLoadingUiState: params,
            },
          },
        }), false, 'setApiLoadingUiState_action');
      },

      //
      // mathFormulaCaptureState
      //
      resetMathFormulaCaptureState_action: () => {
        set(old => {
          const mathFormulaCaptureState = {
            isOpenConfirmModal: false,
            imageObjUrl: undefined,
          };

          return {
            ...old,
            ui: {
              ...old.ui,
              state: {
                ...old.ui.state,
                mathFormulaCaptureState,
              },
            },
          };
        }, false, 'resetMathFormulaCaptureState_action');
      },
      setMathFormulaCaptureState_action: (params: TCaptureState) => {
        set(old => {
          const state = old.ui.state;

          const mathFormulaCaptureState = {
            ...state.mathFormulaCaptureState,
            ...params,
          };

          return {
            ...old,
            ui: {
              ...old.ui,
              state: {
                ...old.ui.state,
                mathFormulaCaptureState,
              },
            },
          };
        }, false, 'setMathFormulaCaptureState_action');
      },
      openMathFormulaCaptureModal_action: () => {
        set(old => {
          return {
            ...old,
            ui: {
              ...old.ui,
              state: {
                ...old.ui.state,
                mathFormulaCaptureState: {
                  ...old.ui.state.mathFormulaCaptureState,
                  imageObjUrl: undefined,
                },
              },
            },
          };
        }, false, 'openMathFormulaCaptureModal_action');
      },
      openMathFormulaConfirmModal_action: (params: string) => {
        set(old => {
          return {
            ...old,
            ui: {
              ...old.ui,
              state: {
                ...old.ui.state,
                mathFormulaCaptureState: {
                  ...old.ui.state.mathFormulaCaptureState,
                  isOpenConfirmModal: true,
                  imageObjUrl: params,
                },
              },
            },
          };
        }, false, 'openMathFormulaConfirmModal_action');
      },
      closeMathFormulaConfirmModal_action: () => {
        set(old => {
          return {
            ...old,
            ui: {
              ...old.ui,
              state: {
                ...old.ui.state,
                mathFormulaCaptureState: {
                  isOpenConfirmModal: false,
                  imageObjUrl: undefined,
                },
              },
            },
          };
        }, false, 'closeMathFormulaConfirmModal_action');
      },

      //
      // imageCaptureState
      //
      resetImageCaptureState_action: () => {
        set(old => {
          return {
            ...old,
            ui: {
              ...old.ui,
              state: {
                ...old.ui.state,
                imageCaptureState: {
                  isOpenConfirmModal: false,
                  imageObjUrl: undefined,
                },
              },
            },
          };
        }, false, 'resetImageCaptureState_action');
      },
      setImageCaptureState_action: (params: TCaptureState) => {
        set(old => {
          return {
            ...old,
            ui: {
              ...old.ui,
              state: {
                ...old.ui.state,
                imageCaptureState: {
                  ...old.ui.state.imageCaptureState,
                  ...params,
                },
              },
            },
          };
        }, false, 'setImageCaptureState_action');
      },
      openImageCaptureModal_action: () => {
        set(old => {
          return {
            ...old,
            ui: {
              ...old.ui,
              state: {
                ...old.ui.state,
                imageCaptureState: {
                  ...old.ui.state.imageCaptureState,
                  imageObjUrl: undefined,
                },
              },
            },
          };
        }, false, 'openImageCaptureModal_action');
      },
      openImageConfirmModal_action: (params: string) => {
        set(old => {
          return {
            ...old,
            ui: {
              ...old.ui,
              state: {
                ...old.ui.state,
                imageCaptureState: {
                  isOpenConfirmModal: true,
                  imageObjUrl: params,
                },
              },
            },
          };
        }, false, 'openImageConfirmModal_action');
      },
      closeImageConfirmModal_action: () => {
        set(old => {
          return {
            ...old,
            ui: {
              ...old.ui,
              state: {
                ...old.ui.state,
                imageCaptureState: {
                  isOpenConfirmModal: false,
                  imageObjUrl: undefined,
                },
              },
            },
          };
        }, false, 'closeImageConfirmModal_action');
      },

      //
      // targetElementState
      //
      resetTargetElementState_action: () => {
        set(old => {
          return {
            ...old,
            ui: {
              ...old.ui,
              state: {
                ...old.ui.state,
                targetElementState: {
                  id: undefined,
                  cursorIndex: undefined,
                },
              },
            },
          };
        }, false, 'resetTargetElementState_action');
      },
      setTargetElementState_action: (params: TTargetElementState) => {
        set(old => {
          const id = params.id;

          return {
            ...old,
            ui: {
              ...old.ui,
              state: {
                ...old.ui.state,
                targetElementState: {
                  ...params,
                  id: id?.replace(/^.*-/, ''),
                },
              },
            },
          };
        }, false, 'setTargetElementState_action');
      },

      //
      // result
      //
      initResult_action: () => {
        set(old => {
          const state = old.ui.state;

          const newMetadata = createDetailsResultState();
          const newQuestionSet = createQuestionSetResultState(true);

          const newSubject = state.result.subject ||
            subjectOptions[0].value;

          return {
            ...old,
            ui: {
              ...old.ui,
              state: {
                ...old.ui.state,
                result: {
                  ...old.ui.state.result,
                  subject: newSubject,
                  metadata: {
                    ...newMetadata,
                    ...old.ui.state.result.metadata,
                  },
                  questionSets: [newQuestionSet],
                },
              },
            },
          };
        }, false, 'initResult_action');
      },
      setSubject_action: (params: string) => {
        set(old => {
          return {
            ...old,
            ui: {
              ...old.ui,
              state: {
                ...old.ui.state,
                result: {
                  ...old.ui.state.result,
                  subject: params,
                },
              },
            },
          }; 
        }, false, 'setSubject_action');
      },
      setMetadataItem_action: (params: {
        metadataKey: string;
        summarizedMetadata: TSummarizedMetadata;
      }) => {
        const {
          metadataKey,
          summarizedMetadata,
        } = params;

        if (!metadataKey) {
          return;
        }

        set(old => {
          const clonedMetadata = _.cloneDeep(old.ui.state.result.metadata);
          const key = metadataKey as keyof typeof clonedMetadata;

          switch(key) {
            case 'textbook_id':
              clonedMetadata['chapter1_id'] = undefined;
              clonedMetadata['chapter2_id'] = undefined;
              clonedMetadata['chapter3_id'] = undefined;
              break;
            case 'chapter1_id':
              clonedMetadata['chapter2_id'] = undefined;
              clonedMetadata['chapter3_id'] = undefined;
              break;
            case 'chapter2_id':
              clonedMetadata['chapter3_id'] = undefined;
              break;
          }

          clonedMetadata[key] = summarizedMetadata;

          return {
            ...old,
            ui: {
              ...old.ui,
              state: {
                ...old.ui.state,
                result: {
                  ...old.ui.state.result,
                  metadata: clonedMetadata,
                },
              },
            },
          };
        }, false, 'setMetadataItem_action');

      },
      clearMetadataItem_action: (params: string) => {
        set(old => {
          const metadata = old.ui.state.result.metadata;
          const metadataKey = params as keyof typeof metadata;

          return {
            ...old,
            ui: {
              ...old.ui,
              state: {
                ...old.ui.state,
                result: {
                  ...old.ui.state.result,
                  metadata: {
                    ...metadata,
                    [metadataKey]: undefined,
                  },
                },
              },
            },
          };
        }, false, 'clearMetadataItem_action');
      },
      addNewQuestionSet_action: () => {
        set(old => {
          const newQuestionSet = createQuestionSetResultState();

          return {
            ...old,
            ui: {
              ...old.ui,
              state: {
                ...old.ui.state,
                result: {
                  ...old.ui.state.result,
                  questionSets: [
                    ...old.ui.state.result.questionSets,
                    newQuestionSet,
                  ],
                },
              },
            },
          };
        }, false, 'addNewQuestionSet_action');
      },
      setQuestionSetsValue_action: (params: {
        indexOfResult: number;
        id: string;
        value: TResultItemPropertyValue;
      }) => {
        set(old => {
          const {
            indexOfResult,
            id,
            value,
          } = params;

          const newQuestionSets = [...old.ui.state.result.questionSets];
          const targetQuestionSet = _.cloneDeep(newQuestionSets[indexOfResult]);
          targetQuestionSet[id] = value;

          newQuestionSets.splice(indexOfResult, 1, targetQuestionSet);

          return {
            ...old,
            ui: {
              ...old.ui,
              state: {
                ...old.ui.state,
                result: {
                  ...old.ui.state.result,
                  questionSets: newQuestionSets,
                },
              },
            },
          };
        }, false, 'setQuestionSetsValue_action');
      },
      removeQuestionSet_action: (params: number) => {
        set(old => {
          return {
            ...old,
            ui: {
              ...old.ui,
              state: {
                ...old.ui.state,
                result: {
                  ...old.ui.state.result,
                  questionSets: old.ui.state.result.questionSets.filter((_, index) => {
                    return index != params;
                  }),
                },
              },
            },
          };
        }, false, 'removeQuestionSet_action');
      },
    },
  },
});

export default createUISlice;
