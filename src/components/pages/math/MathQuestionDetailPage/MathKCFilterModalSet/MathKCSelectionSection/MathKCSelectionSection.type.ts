// type
import { 
  TMathKnowledgeConcept1Model, 
  TMathKnowledgeConcept2Model,
} from '@/apis/models/mathModel.type';
import { 
  CheckedState,
} from '@radix-ui/react-checkbox';

export type TKC2Selection = {
  checked: CheckedState;
  kc2: TMathKnowledgeConcept2Model;
};

export type TKC1Selection = {
  checked: CheckedState;
  kc1: TMathKnowledgeConcept1Model;
  kc2SelectionMapper: {
    [kc2Id: string]: TKC2Selection;
  };
};

export type TKC1SelectionMapper = {
  [kc1Id: string]: TKC1Selection;
};
