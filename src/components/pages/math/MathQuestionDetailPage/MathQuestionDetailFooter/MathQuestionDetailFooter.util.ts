// type
import { 
  TMathAchievement3Model,
  TMathChapterCommonModel,
  TMathInstructionModel,
  TMathKnowledgeConceptCommonModel,
  TMathSourceModel,
} from '@/apis/models/mathModel.type';

/** 
 * `출처` 변경 여부 검사
 * 
 * * 변경사항 있을 경우, true
 */
export const checkChangedSource = (
  originSource?: TMathSourceModel,
  source?: TMathSourceModel
) => {
  return originSource?.id !== source?.id;
};

/** 
 * `성취기준` 변경 여부 검사
 * 
 * * 변경사항 있을 경우, true
 */
export const checkChangedAchievement = (
  originAchievement?: TMathAchievement3Model[],
  achievement?: (TMathAchievement3Model | null)[]
) => {
  const originAchievementIdSet = originAchievement
    ?.reduce((achievementSet, achievement) => {
      if (achievement?.id) {
        achievementSet.add(achievement.id);
      }

      return achievementSet;
    }, new Set<string | number>());

  const filteredAchievements = achievement
    ?.filter(achievement => achievement) ?? [] as TMathAchievement3Model[];

  const hasChangedAchievement = !originAchievementIdSet ||
    originAchievementIdSet.size !== filteredAchievements.length ||
    filteredAchievements
      .some(achievement => {
        return !originAchievementIdSet.has(achievement!.id);
      });

  return hasChangedAchievement;
};

/** 
 * `지문` 변경 여부 검사
 * 
 * * 변경사항 있을 경우, true
 */
export const checkChangedInstruction = (
  originInstruction?: TMathInstructionModel | null,
  instruction?: TMathInstructionModel | null
) => {
  return originInstruction?.content !== instruction?.content;
};

/** 
 * `지식개념` 변경 여부 검사
 * 
 * * 변경사항 있을 경우, true
 */
export const checkChangedKC2 = (
  originKC2?: (TMathKnowledgeConceptCommonModel & {
    kc1: TMathKnowledgeConceptCommonModel | null;
  }),
  kc2?: (TMathKnowledgeConceptCommonModel & {
    kc1: TMathKnowledgeConceptCommonModel | null;
  })
) => {
  return originKC2?.id !== kc2?.id;
};

/** 
 * `단원` 변경 여부 검사
 * 
 * * 변경사항 있을 경우, true
 */
export const checkChangedChapter = (
  originChapter?: Omit<TMathChapterCommonModel, "textbook_id">[],
  chapterIds?: string[]
) => {
  const originChapterIdSet = originChapter
    ?.reduce((chapterSet, chapter) => {
      if (chapter.id) {
        chapterSet.add(chapter.id);
      }

      return chapterSet;
    }, new Set<string | number>());

  const hasChangedChapter = !originChapterIdSet ||
    originChapterIdSet.size !== chapterIds?.length ||
    chapterIds.some(chapterId => {
      return !originChapterIdSet.has(Number(chapterId));
    });

  return hasChangedChapter;
};
