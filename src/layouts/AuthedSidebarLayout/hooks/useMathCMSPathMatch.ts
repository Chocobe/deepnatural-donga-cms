// router
import {
  useMatch,
} from 'react-router-dom';
import routePathFactory from '@/routes/routePathFactory';

const useMathCMSPathMatch = () => {
  //
  // hook
  //
  // 교과서
  const mathTextbookPathMatch = useMatch(routePathFactory
    .math
    .getTextbookPath() + '/*'
  );
  const isMathTextbookPath = !!mathTextbookPathMatch;

  // 교과서 단원
  const mathChapterPathMatch = useMatch(routePathFactory
    .math
    .getChapterPath() + '/*'
  );
  const isMathChapterPath = !!mathChapterPathMatch;

  // 성취기준
  const mathAchievementPathMatch = useMatch(routePathFactory
    .math
    .getAchievementPath() + '/*'
  );
  const isMathAchievementPath = !!mathAchievementPathMatch;

  // 지식개념
  const mathKnowledgeConceptPathMatch = useMatch(routePathFactory
    .math
    .getKnowledgeConceptPath() + '/*'
  );
  const isMathKnowledgeConceptPath = !!mathKnowledgeConceptPathMatch;

  // 시리즈-출처
  const mathSeriesSourcePathMatch = useMatch(routePathFactory
    .math
    .getSeriesSourcePath() + '/*'
  );
  const isMathSeriesSourcePath = !!mathSeriesSourcePathMatch;

  // 지문
  // const mathInstructionPathMatch = useMatch(routePathFactory
  //   .math
  //   .getInstructionPath() + '/*'
  // );
  // const isMathInstructionPath = !!mathInstructionPathMatch;

  // 문항
  const mathQuestionPathMatch = useMatch(routePathFactory
    .math
    .getQuestionPath() + '/*'
  );
  const isMathQuestionPath = !!mathQuestionPathMatch;

  return {
    // 교과서
    isMathTextbookPath,
    mathTextbookPathMatch,
    // 교과서 단원
    isMathChapterPath,
    mathChapterPathMatch,
    // 성취기준
    isMathAchievementPath,
    mathAchievementPathMatch,
    // 지식개념
    isMathKnowledgeConceptPath,
    mathKnowledgeConceptPathMatch,
    // 시리즈-출처
    isMathSeriesSourcePath,
    mathSeriesSourcePathMatch,
    // 지문
    // isMathInstructionPath,
    // mathInstructionPathMatch,
    // 문항
    isMathQuestionPath,
    mathQuestionPathMatch,
  };
};

export default useMathCMSPathMatch;
