// zustand
import { 
  create,
} from 'zustand';
import { 
  devtools,
} from 'zustand/middleware';
// type
import { 
  initialMathTextbookDetailStoreState,
  TMathTextbookDetailStore,
} from './mathTextbookDetailStore.type';

const useMathTextbookDetailStore = create(devtools<TMathTextbookDetailStore>((set, _get) => ({
  ...initialMathTextbookDetailStoreState,

  clearMathTextbookDetailStore: () => {
    set(initialMathTextbookDetailStoreState, false, 'clearMathTextbookDetailStore');
  },

  setSelectedMathTextbook: mathTextbook => {
    set({
      selectedMathTextbook: mathTextbook,
      formState: {
        ...mathTextbook,
      },
    }, false, 'setSelectedMathTextbook');
  },
  clearSelectedMathTextbook: () => {
    set({
      selectedMathTextbook: undefined,
      formState: {
        ...initialMathTextbookDetailStoreState.formState,
      },
    }, false, 'clearSelectedMathTextbook');
  },

  setFormState: formState => {
    set(state => ({
      ...state,
      formState: {
        ...state.formState,
        ...formState,
      },
    }), false, 'setFormState');
  },
  clearFormState: () => {
    set(state => ({
      ...state,
      formState: {
        ...initialMathTextbookDetailStoreState.formState,
      },
    }), false, 'clearFormState');
  },
}), {
  name: 'MathTextbookDetailStore',
}));

export default useMathTextbookDetailStore;
