// zustand
import { 
  create,
} from 'zustand';
import { 
  devtools,
} from 'zustand/middleware';
// type
import { 
  initialMathAchievementPageStoreState,
  TMathAchievementPageStore,
} from './mathAchievementPageStore.type';

const useMathAchievementPageStore = create(devtools<TMathAchievementPageStore>((set, _get) => ({
  ...initialMathAchievementPageStoreState,

  clearMathAchievementPageStoreState: () => {
    set(initialMathAchievementPageStoreState, false, 'clearMathAchievementPageStoreState');
  },

  clearSearchParamsForRetrieveMathAchievementsApi: () => {
    set(old => ({
      ...old,
      searchParamsForRetrieveMathAchievementsApi: {
        ...initialMathAchievementPageStoreState.searchParamsForRetrieveMathAchievementsApi,
      },
    }), false, 'clearSearchParamsForRetrieveMathAchievementsApi');
  },
  updateSearchParamsForRetrieveMathAchievementsApi: callback => {
    set(old => ({
      ...old,
      searchParamsForRetrieveMathAchievementsApi: {
        ...old.searchParamsForRetrieveMathAchievementsApi,
        ...callback(old.searchParamsForRetrieveMathAchievementsApi),
      },
    }), false, 'updateSearchParamsForRetrieveMathAchievementsApi');
  },

  clearMathAchievementsData: () => {
    set(old => ({
      ...old,
      mathAchievementsData: initialMathAchievementPageStoreState.mathAchievementsData,
    }), false, 'clearMathAchievementsData');
  },
  setMathAchievementsData: mathAchievementsData => {
    set(old => ({
      ...old,
      mathAchievementsData,
    }), false, 'setMathAchievementsData');
  },

  clearDetailTargetMathAchievement: () => {
    set(old => ({
      ...old,
      detailTargetAchievement: undefined,
      detailFormState: initialMathAchievementPageStoreState.detailFormState,
    }), false, 'clearDetailTargetMathAchievement');
  },
  setDetailTargetMathAchievement: detailTargetAchievement => {
    set(old => ({
      ...old,
      detailTargetAchievement,
      detailFormState: detailTargetAchievement,
    }), false, 'setDetailTargetMathAchievement');
  },
  updateDetailFormState: callback => {
    set(old => ({
      ...old,
      detailFormState: {
        ...old.detailFormState,
        ...callback(old.detailFormState),
      },
    }), false, 'updateDetailFormState');
  },

  clearSelectedMathAchievements: () => {
    set(old => ({
      ...old,
      selectedMathAchievements: initialMathAchievementPageStoreState.selectedMathAchievements,
    }), false, 'clearSelectedMathAchievements');
  },
  setSelectedMathAchievements: selectedMathAchievements => {
    set(old => ({
      ...old,
      selectedMathAchievements,
    }), false, 'setSelectedMathAchievements');
  },
}), {
  name: 'MathAchievementPageStore',
}));

export default useMathAchievementPageStore;
