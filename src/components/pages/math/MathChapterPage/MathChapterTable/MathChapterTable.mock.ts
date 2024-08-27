// type
import { 
  TMathChapter1Model,
} from '@/apis/models/mathModel.type';
import { 
  TPaginationModel,
} from '@/apis/models/cmsCommonModel.type';

const mockMathChapterData: TPaginationModel<TMathChapter1Model> = {
  current_page: 1,
  last_page: 2,
  page_size: 100,
  count: 155,
  previous: null,
  next: "http://qmaster.dongahub.com/cms/api/chapters/?page=2",
  results: [
    {
      id: 1152,
      title: "다항식",
      no: "01",
      textbook_title: "수학",
      chapter2_set: [
        {
          id: 4284,
          title: "다항식의 연산",
          no: "01",
          chapter3_set: [
            {
              id: 2020,
              title: "다항식의 연산",
              no: "01"
            },
            {
              id: 2021,
              title: "나머지정리",
              no: "02"
            },
            {
              id: 2022,
              title: "인수분해",
              no: "03"
            },
          ],
        },
      ],
    },
    {
      id: 1153,
      title: "식의 계산",
      no: "02",
      textbook_title: "수학 2 (강)",
      chapter2_set: [
        {
          id: 4285,
          title: "곱의 거듭제곱과 분수의 거듭제곱",
          no: "03",
          chapter3_set: []
        },
        {
          id: 4286,
          title: "거듭제곱의 곱셈과 거듭제곱의 거듭제곱",
          no: "01",
          chapter3_set: []
        },
        {
          id: 4287,
          title: "단항식의 곱셈과 나눗셈",
          no: "04",
          chapter3_set: []
        },
        {
          id: 4288,
          title: "거듭제곱의 나눗셈",
          no: "02",
          chapter3_set: []
        },
        {
          id: 4378,
          title: "단항식과 다항식의 곱셈, 나눗셈",
          no: "06",
          chapter3_set: []
        },
        {
          id: 4410,
          title: "다항식의 덧셈과 뺄셈",
          no: "05",
          chapter3_set: []
        },
      ],
    },
    {
      id: 1154,
      title: "방정식과 부등식",
      no: "02",
      textbook_title: "수학",
      chapter2_set: [
        {
          id: 4289,
          title: "복소수와 이차방정식",
          no: "01",
          chapter3_set: [
            {
              id: 2023,
              title: "복소수의 뜻과 성질",
              no: "01"
            },
            {
              id: 2024,
              title: "이차방정식의 판별식",
              no: "02"
            },
            {
              id: 2025,
              title: "이차방정식의 근과 계수의 관계",
              no: "03"
            },
          ],
        },
      ],
    },
  ],
};

export default mockMathChapterData;
