// type
import { 
  TUISlice,
} from './slices/uiSlice/uiSlice.types';
import { 
  TMathPixAuthSlice,
} from './slices/mathPixAuthSlice/mathPixAuthSlice.type';

export type TMathQuestionToolPageStore = {
  ui: TUISlice['ui'];
  mathPixAuth: TMathPixAuthSlice['mathPixAuth'];
};
