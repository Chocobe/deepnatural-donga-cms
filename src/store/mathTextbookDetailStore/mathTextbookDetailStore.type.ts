// type
import { 
  TMathTextbookModel,
} from '@/apis/models/mathModel.type';

export type TMathTextbookDetailStoreState = {
  selectedMathTextbook?: TMathTextbookModel;
};

export const initialMathTextbookDetailStoreState: TMathTextbookDetailStoreState = {
  selectedMathTextbook: undefined,
};

export type TMathTextbookDetailStoreAction = {
  setSelectedMathTextbook: (mathTextbook: TMathTextbookModel) => void;
  clearSelectedMathTextbook: () => void;
};

export type TMathTextbookDetailStore = 
  & TMathTextbookDetailStoreState 
  & TMathTextbookDetailStoreAction;
