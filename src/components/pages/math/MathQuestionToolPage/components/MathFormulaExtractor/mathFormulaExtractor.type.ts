// type
import { 
  TResult,
} from '@/store/mathStores/mathQuestionToolPageStore/slices/uiSlice/uiSlice.types';

export const resultIdList: Readonly<string[]> = [
  '지문',
  '발문',

  // 객관식 선지
  ...Array.from(
    { length: 5 },
    (_, index) => `객관식_선지-${index + 1}`
  ),

  // 주관식 선지
  ...Array.from(
    { length: 20 },
    (_, index) => `주관식_선지-${index + 1}`
  ),

  '풀이',

  // 평가 기준
  ...Array.from(
    { length: 3 },
    (_, index) => `평가_기준-${index + 1}`
  ),
];

export const createInitialResult = () => {
  return resultIdList.reduce((mapper, id) => {
    return {
      ...mapper,
      [id]: {
        id,
        label: id.replace(/-|_/g, ' '),
        latex: '',
        mathML: '',
      },
    };
  }, {} as TResult);
};
