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
    .filter(value => value !== cmsCommonModelElementaryGradeMapper.COMMON)
    .map(value => ({
      text: `${value}학년`,
      value: String(value),
    })),
  [cmsCommonModelClassTypeMapper.MIDDLE]: Object
    .values(cmsCommonModelMiddleHighGradeMapper)
    .filter(value => value !== cmsCommonModelMiddleHighGradeMapper.COMMON)
    .map(value => ({
      text: `${value}학년`,
      value: String(value),
    })),
  [cmsCommonModelClassTypeMapper.HIGH]: Object
    .values(cmsCommonModelMiddleHighGradeMapper)
    .filter(value => value !== cmsCommonModelMiddleHighGradeMapper.COMMON)
    .map(value => ({
      text: `${value}학년`,
      value: String(value),
    })),
} as const;

//
// 학기 선택지
//
export const textbookTermOptions: TFormSelectOptionItem[] = [
  {
    text: '공통',
    value: String(cmsCommonModelTermMapper.COMMON),
  },
  {
    text: '1학기',
    value: String(cmsCommonModelTermMapper.FIRST_TERM),
  },
  {
    text: '2학기',
    value: String(cmsCommonModelTermMapper.SECOND_TERM),
  },
] as const;
