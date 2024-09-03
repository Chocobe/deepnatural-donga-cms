// type
import { 
  TMathAchievement1Model,
  TMathAchievementFlattenModel,
  TMathChapter1Model,
  TMathChapterFlattenModel,
  TMathKnowledgeConcept1Model,
  TMathKnowledgeConceptFlattenModel,
  TMathSeriesModel, 
  TMathSeriesSourceFlattenModel,
} from '@/apis/models/mathModel.type';

/**
 * 수학 Chapter model 평탄화 유틸
 */
export function flatMathChapterModel(chapter1: TMathChapter1Model) {
  return chapter1.chapter2_set.reduce((result, chapter2) => {
    const flattenChapter = {
      chapter1,
      chapter2,
    } as TMathChapterFlattenModel;

    if (!chapter2.chapter3_set?.length) {
      return [
        ...result,
        flattenChapter,
      ];
    }

    return [
      ...result,
      ...chapter2.chapter3_set.map(chapter3 => ({
        ...flattenChapter,
        chapter3,
      } as TMathChapterFlattenModel)),
    ];
  }, [] as TMathChapterFlattenModel[]);
}

/**
 * 수학 Achievement model 평탄화 유틸
 */
export function flatMathAchievementModel(achievement1: TMathAchievement1Model) {
  return achievement1.achievement2_set.reduce((result, achievement2) => {
    const flattenAchievement = {
      achievement1,
      achievement2,
    } as TMathAchievementFlattenModel;

    if (!achievement2.achievement3_set?.length) {
      return [
        ...result,
        flattenAchievement,
      ];
    }

    return [
      ...result,
      ...achievement2.achievement3_set.map(achievement3 => ({
        ...flattenAchievement,
        achievement3,
      } as TMathAchievementFlattenModel)),
    ];
  }, [] as TMathAchievementFlattenModel[]);
}

/**
 * 수학 KnowledgeConcept model 평탄화 유틸
 */
export function flatMathKnowledgeConceptModel(kc1: TMathKnowledgeConcept1Model) {
  return kc1.kc2_set.reduce((result, kc2) => {
    const flattenKnowledgeConcept = {
      kc1,
      kc2,
    } as TMathKnowledgeConceptFlattenModel;

    return [
      ...result,
      flattenKnowledgeConcept,
    ];
  }, [] as TMathKnowledgeConceptFlattenModel[]);
}

/**
 * 수학 Series model 평탄화 유틸
 */
export function flatMathSeriesModel(series: TMathSeriesModel) {
  return series.source_set.map(source => {
    const flattenSeries = {
      series,
      source,
    } as TMathSeriesSourceFlattenModel;

    return flattenSeries;
  });
}
