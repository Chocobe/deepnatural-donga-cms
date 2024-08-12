// router
import {
  useMatch,
} from 'react-router-dom';
import routePathFactory from '@/routes/routePathFactory';

const useEnglishCMSPathMatch = () => {
  //
  // hook
  //
  // 교과서
  const englishTextbookPathMatch = useMatch(routePathFactory
    .english
    .getTextbookPath()
  );
  const isEnglishTextbookPath = !!englishTextbookPathMatch;

  // 교과서 단원
  const englishChapterPathMatch = useMatch(routePathFactory
    .english
    .getChapterPath()
  );
  const isEnglishChapterPath = !!englishChapterPathMatch;

  // 성취기준
  const englishAchievementPathMatch = useMatch(routePathFactory
    .english
    .getAchievementPath()
  );
  const isEnglishAchievementPath = !!englishAchievementPathMatch;

  // 지식개념
  const englishKnowledgeConceptPathMatch = useMatch(routePathFactory
    .english
    .getKnowledgeConceptPath()
  );
  const isEnglishKnowledgeConceptPath = !!englishKnowledgeConceptPathMatch;

  // 시리즈-출처
  const englishSeriesSourcePathMatch = useMatch(routePathFactory
    .english
    .getSeriesSourcePath()
  );
  const isEnglishSeriesSourcePath = !!englishSeriesSourcePathMatch;

  // 지문
  const englishInstructionPathMatch = useMatch(routePathFactory
    .english
    .getInstructionPath()
  );
  const isEnglishInstructionPath = !!englishInstructionPathMatch;

  // 문항
  const englishQuestionPathMatch = useMatch(routePathFactory
    .english
    .getQuestionPath()
  );
  const isEnglishQuestionPath = !!englishQuestionPathMatch;

  return {
    // 교과서
    isEnglishTextbookPath,
    englishTextbookPathMatch,
    // 교과서 단원
    isEnglishChapterPath,
    englishChapterPathMatch,
    // 성취기준
    isEnglishAchievementPath,
    englishAchievementPathMatch,
    // 지식개념
    isEnglishKnowledgeConceptPath,
    englishKnowledgeConceptPathMatch,
    // 시리즈-출처
    isEnglishSeriesSourcePath,
    englishSeriesSourcePathMatch,
    // 지문
    isEnglishInstructionPath,
    englishInstructionPathMatch,
    // 문항
    isEnglishQuestionPath,
    englishQuestionPathMatch,
  };
};

export default useEnglishCMSPathMatch;
