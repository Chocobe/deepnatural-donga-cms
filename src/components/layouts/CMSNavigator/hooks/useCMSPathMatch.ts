// router
import { 
  useMatch,
} from 'react-router-dom';
import routePathFactory from '@/routes/routePathFactory';

const useCMSPathMatch = () => {
  //
  // hook
  //
  const dashboardPathMatch = useMatch(routePathFactory
    .dashboard
    .getDashboardRootPath() + '/*'
  );
  const isDashboardPath = !!dashboardPathMatch;

  const mathCMSPathMatch = useMatch(routePathFactory
    .math
    .getMathRootPath() + '/*'
  );
  const isMathCMSPath = !!mathCMSPathMatch;

  const englishCMSPathMatch = useMatch(routePathFactory
    .english
    .getEnglishRootPath() + '/*'
  );
  const isEnglishCMSPath = !!englishCMSPathMatch;

  const settingPathMatch = useMatch(routePathFactory
    .setting
    .getSettingRootPath() + '/*'
  );
  const isSettingPath = !!settingPathMatch;

  return {
    dashboardPathMatch,
    isDashboardPath,

    mathCMSPathMatch,
    isMathCMSPath,

    englishCMSPathMatch,
    isEnglishCMSPath,

    settingPathMatch,
    isSettingPath,
  };
};

export default useCMSPathMatch;
