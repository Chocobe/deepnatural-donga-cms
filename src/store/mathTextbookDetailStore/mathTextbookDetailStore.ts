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

  setSelectedMathTextbook: mathTextbook => {
    set({
      selectedMathTextbook: mathTextbook,
    }, false, 'setSelectedMathTextbook');
  },

  clearSelectedMathTextbook: () => {
    set({
      selectedMathTextbook: undefined,
    }, false, 'clearSelectedMathTextbook');
  },
}), {
  name: 'MathTextbookDetailStore',
}));

export default useMathTextbookDetailStore;
