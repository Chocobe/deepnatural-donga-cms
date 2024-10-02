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
                  app_token: undefined,
                  app_token_expires_at: undefined,
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
          const {
            app_token,
            app_token_expires_at,
          } = params;

          return {
            ...old,
            mathPixAuth: {
              ...old.mathPixAuth,
              state: {
                ...old.mathPixAuth.state,
                appTokenInfo: {
                  app_token,
                  app_token_expires_at,
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
