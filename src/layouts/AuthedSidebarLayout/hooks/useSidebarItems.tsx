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
import useCMSPathMatch from '@/components/layouts/CMSNavigator/hooks/useCMSPathMatch';
import useSettingPathMatch from './useSettingPathMatch';
// icon
import { 
  IconType,
} from 'react-icons';
import { 
  LuUser,
  LuUsers,
} from "react-icons/lu";

type TSidebarItem = {
  text: string;
  IconComponent: IconType;
  isActive: boolean;
  onClick: () => void;
};

const useSidebarItems = () => {
  //
  // hook
  //
  const navigate = useNavigate();

  const {
    isMathCMSPath,
    isEnglishCMSPath,
    isSettingPath,
  } = useCMSPathMatch();

  const {
    isMyPagePath,
    isSuperAdminPagePath,
  } = useSettingPathMatch();

  //
  // cache
  //
  const settingItems = useMemo<TSidebarItem[]>(() => [
    {
      text: 'My Page',
      IconComponent: LuUsers,
      isActive: isMyPagePath,
      onClick: () => navigate(routePathFactory
        .setting
        .getMyPagePath()
      ),
    },
    {
      text: 'Super Admin 관리',
      IconComponent: LuUser,
      isActive: isSuperAdminPagePath,
      onClick: () => navigate(routePathFactory
        .setting
        .getSuperAdminPagePath()
      ),
    },
  ], [
    isMyPagePath, isSuperAdminPagePath,
    navigate,
  ]);

  const sidebarItems = useMemo(() => {
    switch(true) {
      case isMathCMSPath: return [
        //
      ];

      case isEnglishCMSPath: return [
        //
      ];

      case isSettingPath: 
        return settingItems;
      default: 
        return null;
    }
  }, [
    isMathCMSPath, isEnglishCMSPath, isSettingPath,
    settingItems,
  ]);

  return {
    sidebarItems,
  };
};

export default useSidebarItems;
