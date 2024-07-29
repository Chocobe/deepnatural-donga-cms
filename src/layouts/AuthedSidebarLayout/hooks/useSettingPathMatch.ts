// router
import { 
  useMatch,
} from 'react-router-dom';
import routePathFactory from '@/routes/routePathFactory';

const useSettingPathMatch = () => {
  //
  // hook
  //
  const myPagePathMatch = useMatch(routePathFactory
    .setting
    .getMyPagePath() + '/*'
  );
  const isMyPagePath = !!myPagePathMatch;

  const superAdminPageMatch = useMatch(routePathFactory
    .setting
    .getSuperAdminPagePath() + '/*'
  );
  const isSuperAdminPagePath = !!superAdminPageMatch;

  return {
    myPagePathMatch,
    isMyPagePath,

    superAdminPageMatch,
    isSuperAdminPagePath,
  };
};

export default useSettingPathMatch;
