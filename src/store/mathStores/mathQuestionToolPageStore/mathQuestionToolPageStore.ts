// zustand
import { 
  create,
} from 'zustand';
import { 
  devtools,
} from 'zustand/middleware';
import { 
  TMathQuestionToolPageStore,
} from './mathQuestionToolPageStore.type';
// slice
import createUISlice from './slices/uiSlice/uiSlice';
import createMathPixAuthSlice from './slices/mathPixAuthSlice/mathPixAuthSlice';

const useMathQuestionToolPageStore = create<TMathQuestionToolPageStore>()(devtools((...params) => ({
  ui: createUISlice(...params).ui,
  mathPixAuth: createMathPixAuthSlice(...params).mathPixAuth,
}), {
  name: 'MathQuestionToolPageStore',
}));

export default useMathQuestionToolPageStore;
