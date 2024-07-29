// react
import {
  useMemo,
} from 'react';
// router
import { 
  useNavigate,
} from 'react-router-dom';
import routePathFactory from '@/routes/routePathFactory';
// hook
import useCMSPathMatch from './useCMSPathMatch';

const useCMSNavigatorItems = () => {
  //
  // hook
  //
  const navigate = useNavigate();
  const {
    isDashboardPath,
    isMathCMSPath,
    isEnglishCMSPath,
  } = useCMSPathMatch();

  //
  // cache
  //
  const cmsNavigatorItems = useMemo(() => [
    {
      text: 'Dashboard',
      isActive: isDashboardPath,
      onClick: () => navigate(routePathFactory
        .dashboard
        .getDashboardPagePath(),
      ),
    },
    {
      text: '수학 CMS',
      isActive: isMathCMSPath,
      onClick: () => navigate(routePathFactory
        .math
        .getTextbookPath(),
      ),
    },
    {
      text: '영어 CMS',
      isActive: isEnglishCMSPath,
      onClick: () => navigate(routePathFactory
        .english
        .getTextbookPath(),
      ),
    },
  ], [
    isDashboardPath, isMathCMSPath, isEnglishCMSPath,
    navigate
  ]);

  return {
    isDashboardPath, isMathCMSPath, isEnglishCMSPath,
    cmsNavigatorItems,
  };
};

export default useCMSNavigatorItems;
