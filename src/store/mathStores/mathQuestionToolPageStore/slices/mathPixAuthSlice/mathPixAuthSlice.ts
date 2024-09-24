// zustand
import { 
  StateCreator,
} from 'zustand';
// type
import { 
  initialMathPixAuthSliceState,
  TMathPixAuthSlice,
} from './mathPixAuthSlice.type';
// type
import { 
  TMathQuestionToolPageStore,
} from '../../mathQuestionToolPageStore.type';
import { 
  TProduceMathPixAppTokenApiResponse,
  TRetrieveMathPixAppKeyApiResponse,
} from '@/apis/mathOCR/mathOCRApi.type';

const createMathPixAuthSlice: StateCreator<
  TMathQuestionToolPageStore,
  [['zustand/devtools', never]],
  [],
  TMathPixAuthSlice
> = ((set, _get) => ({
  mathPixAuth: {
    state: initialMathPixAuthSliceState,
    action: {
      resetMathPixAuthSlice_action: () => {
        set(old => {
          return {
            ...old,
            mathPixAuth: {
              ...old.mathPixAuth,
              state: {
                appKeyInfo: {
                  app_id: undefined,
                  app_key: undefined,
                },
                appTokenInfo: {
                  appToken: undefined,
                  appTokenExpiresAt: undefined,
                },
              },
            },
          };
        }, false, 'resetMathPixAuthSlice_action');
      },

      setMathPixAppKeyInfo_action: (params: TRetrieveMathPixAppKeyApiResponse) => {
        set(old => {
          const {
            app_id,
            app_key,
          } = params;

          return {
            ...old,
            mathPixAuth: {
              ...old.mathPixAuth,
              state: {
                ...old.mathPixAuth.state,
                appKeyInfo: {
                  app_id,
                  app_key,
                },
              },
            },
          };
        }, false, 'setMathPixAppKeyInfo_action');
      },

      setMathPixTokenInfo_action: (params: TProduceMathPixAppTokenApiResponse) => {
        set(old => {
          // 
          const {
            appToken,
            appTokenExpiresAt,
          } = params;

          return {
            ...old,
            mathPixAuth: {
              ...old.mathPixAuth,
              state: {
                ...old.mathPixAuth.state,
                appTokenInfo: {
                  appToken,
                  appTokenExpiresAt,
                },
              },
            },
          };
        }, false, 'setMathPixTokenInfo_action');
      },
    },
  },
}));

export default createMathPixAuthSlice;
