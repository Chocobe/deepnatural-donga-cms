// template
import { 
  sourceMetadataTemplate,
  knowledgeConceptMetadataTemplate,

  textbookMetadataTemplate,
  chapter1MetadataTemplate,
  chapter2MetadataTemplate,
  chapter3MetadataTemplate,

  questionSetCommonTemplate,
} from '@/components/pages/math/MathQuestionToolPage/components/MathFormulaExtractor/MathFormulaAccordions/mathFormulaAccordions.type';
// type
import { 
  TResultItem,
} from './uiSlice.types';

export const createDetailsResultState = () => {
  return {
    [sourceMetadataTemplate.id]: undefined,
    [knowledgeConceptMetadataTemplate.id]: undefined,
    [textbookMetadataTemplate.id]: undefined,
    [chapter1MetadataTemplate.id]: undefined,
    [chapter2MetadataTemplate.id]: undefined,
    [chapter3MetadataTemplate.id]: undefined,
  };
};

export const createQuestionSetResultState = (isFirstIndex = false) => {
  return questionSetCommonTemplate
    .filter(({ onlyFirstIndex }) => {
      return isFirstIndex || !onlyFirstIndex;
    })
    .reduce((template, question) => ({
      ...template,
      [question.id]: question.value,
    }), {} as TResultItem);
};
