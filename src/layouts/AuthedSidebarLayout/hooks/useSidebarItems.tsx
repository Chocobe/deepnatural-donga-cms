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
  LuBookOpen,
  LuList,
  LuTrophy,
  LuFlagTriangleRight,
  LuTags,
  LuAlignLeft,
  LuFileSpreadsheet,
} from "react-icons/lu";
import useMockStore from '@/store/mockStore/mockStore';
import useMathCMSPathMatch from './useMathCMSPathMatch';

type TSidebarItem = {
  text: string;
  IconComponent: IconType;
  isActive: boolean;
  isHide?: boolean;
  onClick: () => void;
};

const useSidebarItems = () => {
  const isSuperAdmin = useMockStore(state => state.isSuperAdmin);

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

  const {
    isMathTextbookPath,
    isMathChapterPath,
    isMathAchievementPath,
    isMathKnowledgeConceptPath,
    isMathSeriesSourcePath,
    isMathInstructionPath,
    isMathQuestionPath,
  } = useMathCMSPathMatch();

  //
  // cache
  //
  const settingItems = useMemo<TSidebarItem[]>(() => [
    {
      text: 'My Page',
      IconComponent: LuUser,
      isActive: isMyPagePath,
      onClick: () => navigate(routePathFactory
        .setting
        .getMyPagePath()
      ),
    },
    {
      text: 'Super Admin 관리',
      IconComponent: LuUsers,
      isActive: isSuperAdminPagePath,
      isHide: !isSuperAdmin,
      onClick: () => navigate(routePathFactory
        .setting
        .getSuperAdminPagePath()
      ),
    },
  ], [
    isMyPagePath, isSuperAdminPagePath, isSuperAdmin,
    navigate,
  ]);

  const mathCMSItems = useMemo<TSidebarItem[]>(() => [
    {
      text: '교과서',
      IconComponent: LuBookOpen,
      isActive: isMathTextbookPath,
      isHide: false,
      onClick: () => navigate(routePathFactory
        .math
        .getTextbookPath()
      ),
    },
    {
      text: '교과서 단원',
      IconComponent: LuList,
      isActive: isMathChapterPath,
      isHide: false,
      onClick: () => navigate(routePathFactory
        .math
        .getChapterPath()
      ),
    },
    {
      text: '성취기준',
      IconComponent: LuTrophy,
      isActive: isMathAchievementPath,
      isHide: false,
      onClick: () => navigate(routePathFactory
        .math
        .getAchievementPath()
      ),
    },
    {
      text: '지식개념',
      IconComponent: LuFlagTriangleRight,
      isActive: isMathKnowledgeConceptPath,
      isHide: false,
      onClick: () => navigate(routePathFactory
        .math
        .getKnowledgeConceptPath()
      ),
    },
    {
      text: '시리즈-출처',
      IconComponent: LuTags,
      isActive: isMathSeriesSourcePath,
      isHide: false,
      onClick: () => navigate(routePathFactory
        .math
        .getSeriesSourcePath()
      ),
    },
    {
      text: '지문',
      IconComponent: LuAlignLeft,
      isActive: isMathInstructionPath,
      isHide: false,
      onClick: () => navigate(routePathFactory
        .math
        .getInstructionPath()
      ),
    },
    {
      text: '문항',
      IconComponent: LuFileSpreadsheet,
      isActive: isMathQuestionPath,
      isHide: false,
      onClick: () => navigate(routePathFactory
        .math
        .getQuestionPath()
      ),
    },
  ], [
    isMathTextbookPath, isMathChapterPath, isMathAchievementPath,
    isMathKnowledgeConceptPath, isMathSeriesSourcePath, isMathInstructionPath,
    isMathQuestionPath,
    navigate,
  ]);

  const sidebarItems = useMemo(() => {
    switch(true) {
      case isSettingPath: 
        return settingItems;
      case isMathCMSPath: 
        return mathCMSItems;
      case isEnglishCMSPath: 
        return [
          //
        ];
      default: 
        return null;
    }
  }, [
    isSettingPath, isMathCMSPath, isEnglishCMSPath, 
    settingItems, mathCMSItems,
  ]);

  return {
    sidebarItems,
  };
};

export default useSidebarItems;
