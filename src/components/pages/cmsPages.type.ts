// type
import { 
  cmsCommonModelClassTypeMapper,
  cmsCommonModelElementaryGradeMapper,
  cmsCommonModelMiddleHighGradeMapper, 
  cmsCommonModelTermMapper,
} from '@/apis/models/cmsCommonModel.type';
import { 
  TFormSelectOptionItem,
} from '../shadcn-ui-custom/FormSelect/FormSelect.type';

//
// 학교급 선택지
//
export const textbookClassTypeOptions: TFormSelectOptionItem[] = [
  {
    text: '초등학교',
    value: cmsCommonModelClassTypeMapper.ELEMENTARY,
  },
  {
    text: '중학교',
    value: cmsCommonModelClassTypeMapper.MIDDLE,
  },
  {
    text: '고등학교',
    value: cmsCommonModelClassTypeMapper.HIGH,
  },
] as const;

//
// 학년 선택지
//
export const textbookGradeOptions: {
  [cmsCommonModelClassTypeMapper.ELEMENTARY]: TFormSelectOptionItem[];
  [cmsCommonModelClassTypeMapper.MIDDLE]: TFormSelectOptionItem[];
  [cmsCommonModelClassTypeMapper.HIGH]: TFormSelectOptionItem[];
} = {
  [cmsCommonModelClassTypeMapper.ELEMENTARY]: Object
    .values(cmsCommonModelElementaryGradeMapper)
    .sort((a, b) => a - b > 0 ? 1 : -1)
    .map(grade => ({
      text: grade === cmsCommonModelElementaryGradeMapper.COMMON
        ? '공통'
        : `${grade}학년`,
      value: String(grade),
    })),
  [cmsCommonModelClassTypeMapper.MIDDLE]: Object
    .values(cmsCommonModelMiddleHighGradeMapper)
    .sort((a, b) => a - b > 0 ? 1 : -1)
    .map(grade => ({
      text: grade === cmsCommonModelMiddleHighGradeMapper.COMMON
        ? '공통'
        : `${grade}학년`,
      value: String(grade),
    })),
  [cmsCommonModelClassTypeMapper.HIGH]: Object
    .values(cmsCommonModelMiddleHighGradeMapper)
    .sort((a, b) => a - b > 0 ? 1 : -1)
    .map(grade => ({
      text: grade === cmsCommonModelMiddleHighGradeMapper.COMMON
        ? '공통'
        : `${grade}학년`,
      value: String(grade),
    })),
} as const;

//
// 학기 선택지
//
export const textbookTermOptions: TFormSelectOptionItem[] = Object
  .values(cmsCommonModelTermMapper)
  .sort((a, b) => a - b > 0 ? 1 : -1)
  .map(term => ({
    text: term === cmsCommonModelTermMapper.COMMON
      ? '공통'
      : `${term}학기`,
    value: String(term),
  }));
