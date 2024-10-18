// react
import {
  useRef,
  useMemo,
  useCallback,
  memo,
} from 'react';
// store
import useMathQuestionPageStore from '@/store/mathStores/mathQuestionPageStore/mathQuestionPageStore';
// hook
import useSearchModal from '@/components/shadcn-ui-custom/modals/SearchModal/hook/useSearchModal';
// api
import ApiManager from '@/apis/ApiManager';
// ui
import MathQuestionDetailSectionTemplate from '../../MathQuestionDetailSectionTemplate/MathQuestionDetailSectionTemplate';
import MathQuestionDetailSectionItemTemplate, { 
  TMathQuestionDetailSectionItemTemplateProps,
} from '../../MathQuestionDetailSectionItemTemplate/MathQuestionDetailSectionItemTemplate';
import SearchModalTrigger from '@/components/shadcn-ui-custom/searchModals/SearchModalTrigger/SearchModalTrigger';
import SearchModal from '@/components/shadcn-ui-custom/modals/SearchModal/SearchModal';
import { 
  createColumnHelper,
} from '@tanstack/react-table';
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
import { 
  Input,
} from '@/components/shadcn-ui/ui/input';
// icon
import { 
  LuPlus,
} from 'react-icons/lu';
// type
import { 
  TMathChapter2InfoModel,
  TMathChapter3InfoModel,
  TMathChapterFlattenModel,
} from '@/apis/models/mathModel.type';
import { 
  cmsClassTypeOptions,
  cmsGradeOptions,
  cmsTermMapper,
  cmsTermOptions,
} from '@/apis/models/cmsCommonModel.type';
import { 
  mathChapterSearchTypeOptions,
} from '../../../MathChapterPage/MathChapterTableActions/MathChapterTableActions.type';
import { 
  mathQuestionChaptersSectionChapterKeyMapper,
} from './MathQuestionChaptersSection.type';
import { 
  initialMathQuestionPageStoreState,
} from '@/store/mathStores/mathQuestionPageStore/mathQuestionPageStore.type';
// util
import { 
  flatMathChapterModel,
} from '@/utils/flatModels/flatMathModels';
// style
import './MathQuestionChaptersSection.css';

const chapterColumnHelper = createColumnHelper<TMathChapterFlattenModel>();

const CHAPTER_NAME_PREFIX = 'chapterInfo-';

function _MathQuestionChaptersSection() {
  //
  // mathQuestionPage store
  //
  const chapters_info = useMathQuestionPageStore(state => state.detailFormState.chapters_info);

  const updateDetailFormState = useMathQuestionPageStore(state => state.updateDetailFormState);

  //
  // ref
  //
  const indexOfChapterInfoRef = useRef<number | null>(null);

  //
  // hook
  //
  const {
    isOpenSearchModal: isOpenChapterSearchModal,
    closeSearchModal: closeChapterSearchModal,
    openSearchModal: openChapterSearchModal,
    onChangeIsOpenSearchModal: onChangeIsOpenChapterSearchModal,
  } = useSearchModal();

  //
  // callback
  //
  const _openChapterSearchModal = useCallback((indexOfChapterInfo: number) => {
    indexOfChapterInfoRef.current = indexOfChapterInfo;

    openChapterSearchModal();
  }, [openChapterSearchModal]);

  const _closeChapterSearchModal = useCallback(() => {
    indexOfChapterInfoRef.current = null;

    closeChapterSearchModal();
  }, [closeChapterSearchModal]);

  const addChapter = useCallback(() => {
    updateDetailFormState(old => ({
      ...old,
      chapters_info: [
        ...(old.chapters_info ?? []),
        null,
      ],
    }));
  }, [updateDetailFormState]);

  const deleteChapter = useCallback((
    indexOfChapterInfo: number
  ) => {
    updateDetailFormState(old => {
      const newChaptersInfo = [...(old.chapters_info ?? [])];
      newChaptersInfo.splice(indexOfChapterInfo, 1);

      if (!newChaptersInfo.length) {
        newChaptersInfo.push(null);
      }

      return {
        ...old,
        chapters_info: newChaptersInfo,
      };
    });
  }, [updateDetailFormState]);

  //
  // callback
  //
  const onSelectChapter = useCallback((chapter: TMathChapterFlattenModel) => {
    const indexOfChapterInfo = indexOfChapterInfoRef.current;

    if (indexOfChapterInfo === null) {
      return;
    }

    const chapter2Info: TMathChapter2InfoModel = {
      id: chapter.chapter2.id,
      title: chapter.chapter2.title,
      no: chapter.chapter2.no,
      chapter1: {
        id: chapter.chapter1.id,
        title: chapter.chapter1.title,
        no: chapter.chapter1.no,
        textbook: {
          id: chapter.chapter1.textbook_id,
          title: chapter.chapter1.textbook_title!,
          classtype: chapter.chapter1.textbook_classtype! as any,
          curriculum: chapter.chapter1.textbook_curriculum!,
          grade: chapter.chapter1.textbook_grade!,
          term: chapter.chapter1.textbook_term ?? cmsTermMapper.COMMON,
          author: '',
        },
      },
    };

    const newChapterInfo = chapter.chapter3
      ? {
        id: chapter.chapter3.id,
        title: chapter.chapter3.title,
        no: chapter.chapter3.no,
        chapter2: chapter2Info,
      } as TMathChapter3InfoModel
      : chapter2Info;

    updateDetailFormState(old => {
      const newChaptersInfo = [...(old.chapters_info ?? [])];
      newChaptersInfo.splice(indexOfChapterInfo, 1, newChapterInfo);

      return {
        ...old,
        chapters_info: newChaptersInfo,
      };
    });

    _closeChapterSearchModal();
  }, [
    updateDetailFormState,
    _closeChapterSearchModal,
  ]);

  const extractChapterTitleInfo = useCallback((
    chapterInfo: typeof initialMathQuestionPageStoreState.detailFormState.chapters_info[0]
  ) => {
    let chapterTitleInfo = {
      textbookTitle: '',
      chapter1Title: '',
      chapter2Title: '',
      chapter3Title: '',
    };

    switch (true) {
      case !!(chapterInfo as TMathChapter3InfoModel)?.chapter2: {
        const chapter3Info = chapterInfo as TMathChapter3InfoModel;

        chapterTitleInfo = {
          textbookTitle: chapter3Info.chapter2.chapter1.textbook.title,
          chapter1Title: chapter3Info.chapter2.chapter1.title,
          chapter2Title: chapter3Info.chapter2.title,
          chapter3Title: chapter3Info.title,
        };

        break;
      }

      case !!(chapterInfo as TMathChapter2InfoModel)?.chapter1: {
        const chapter2Info = chapterInfo as TMathChapter2InfoModel;

        chapterTitleInfo = {
          textbookTitle: chapter2Info.chapter1.textbook.title,
          chapter1Title: chapter2Info.chapter1.title,
          chapter2Title: chapter2Info.title,
          chapter3Title: '',
        };

        break;
      }
    }

    return chapterTitleInfo;
  }, []);

  //
  // cache
  //
  const sectionItems = useMemo<TMathQuestionDetailSectionItemTemplateProps[]>(() => {
    const items = chapters_info.map((info, index) => {
      const chapterNumber = index + 1;
      const chapterName = `단원정보 ${chapterNumber}`;
      const chapterId = `${CHAPTER_NAME_PREFIX}${index}`;

      const chapterTitleInfo = extractChapterTitleInfo(info);

      return {
        label: chapterName,
        id: chapterId,
        fluid: true,
        components: [
          {
            Editor: [
              (
                <div 
                  key={`${chapterId}-textbook`}
                  className="chapterSectionItem">
                  <label className="chapterSectionItem-label">
                    교과서
                  </label>

                  <SearchModalTrigger
                    id={mathQuestionChaptersSectionChapterKeyMapper.CHAPTER_1}
                    onOpen={() => _openChapterSearchModal(index)}
                    value={chapterTitleInfo.textbookTitle}
                    isShowSearchIcon />
                </div>
              ),
              (
                <div 
                  key={`${chapterId}-chapter1`}
                  className="chapterSectionItem">
                  <label className="chapterSectionItem-label">
                    대단원
                  </label>

                  <Input
                    isReadOnly
                    value={chapterTitleInfo.chapter1Title} />
                </div>
              ),
              (
                <div 
                  key={`${chapterId}-chapter2`}
                  className="chapterSectionItem">
                  <label className="chapterSectionItem-label">
                    중단원
                  </label>

                  <Input
                    isReadOnly
                    value={chapterTitleInfo.chapter2Title} />
                </div>
              ),
              (
                <div 
                  key={`${chapterId}-chapter3`}
                  className="chapterSectionItem">
                  <label className="chapterSectionItem-label">
                    소단원
                  </label>

                  <Input
                    isReadOnly
                    value={chapterTitleInfo.chapter3Title} />
                </div>
              ),
            ],
            LeftSideActions: [
              index === (chapters_info?.length ?? 1) - 1
                ? (
                  <Button 
                    key={`${chapterId}-addButton`}
                    className="rightSide"
                    variant="default"
                    disabled={!chapters_info[chapters_info.length - 1]}
                    onClick={addChapter}>
                    <LuPlus className="w-4 h-4" />
                    단원정보 추가하기
                  </Button>
                ): null,
            ],
            RightSideActions: [
              (
                <Button
                  key={`${chapterId}-deleteButton`}
                  variant="default"
                  disabled={chapters_info.length < 2}
                  onClick={() => deleteChapter(index)}>
                  삭제
                </Button>
              ),
            ],
          },
        ],
      } as TMathQuestionDetailSectionItemTemplateProps;
    });

    return items;
  }, [
    chapters_info,
    extractChapterTitleInfo,
    _openChapterSearchModal,
    addChapter,
    deleteChapter,
  ]);

  const chapterColumns = useMemo(() => [
    chapterColumnHelper.display({
      id: 'chapterSearchModal_curriculum',
      header: '교육과정',
      cell: props => {
        const curriculum = props.row.original.chapter1.textbook_curriculum;

        return curriculum;
      },
    }),
    chapterColumnHelper.display({
      id: 'chapterSearchModal_classtype',
      header: '학교급',
      cell: props => {
        const classtype = props.row.original.chapter1.textbook_classtype;

        return cmsClassTypeOptions.find(({ value }) => classtype === value)?.text 
          ?? '';
      },
    }),
    chapterColumnHelper.display({
      id: 'chapterSearchModal_grade',
      header: '학년',
      cell: props => {
        const classtype = props.row.original.chapter1.textbook_classtype;
        const grade = props.row.original.chapter1.textbook_grade;

        if (!classtype) {
          return '';
        }

        return cmsGradeOptions[classtype]?.find(({ value }) => Number(value) === grade)?.text
          ?? '';
      },
    }),
    chapterColumnHelper.display({
      id: 'chapterSearchModal_term',
      header: '학기',
      cell: props => {
        const term = props.row.original.chapter1.textbook_term;

        return cmsTermOptions.find(({ value }) => Number(value) === term)?.text
          ?? '';
      },
    }),
    chapterColumnHelper.accessor('chapter1.textbook_title', {
      id: 'chapterSearchModal_textbook',
      header: '교과서',
    }),
    chapterColumnHelper.accessor('chapter1.no', {
      id: 'chapterSearchModal_chapter1_no',
      header: '대단원\n번호',
    }),
    chapterColumnHelper.accessor('chapter1.title', {
      id: 'chapterSearchModal_chapter1_title',
      header: '대단원명',
    }),
    chapterColumnHelper.accessor('chapter2.no', {
      id: 'chapterSearchModal_chapter2_no',
      header: '중단원\n번호',
    }),
    chapterColumnHelper.accessor('chapter2.title', {
      id: 'chapterSearchModal_chapter2_title',
      header: '중단원명',
    }),
    chapterColumnHelper.display({
      id: 'chapterSearchModal_chapter3_no',
      header: '소단원\n번호',
      cell: props => {
        const chapter3 = props.row.original.chapter3;

        return chapter3?.no ?? '';
      },
    }),
    chapterColumnHelper.display({
      id: 'chapterSearchModal_chapter3_title',
      header: '소단원명',
      cell: props => {
        const chapter3 = props.row.original.chapter3;

        return chapter3?.title ?? '';
      }
    })
  ], []);

  return (<>
    <MathQuestionDetailSectionTemplate
      className="MathQuestionChaptersSection" 
      title="단원"
      variant='chapters'>
      {sectionItems.map((item, index) => {
        const {
          id,
          label,
          components,
          fluid,
        } = item;

        return (
          <MathQuestionDetailSectionItemTemplate
            key={id ?? index}
            id={id}
            label={label}
            components={components}
            fluid={fluid} />
        );
      })}
    </MathQuestionDetailSectionTemplate>

    <SearchModal
      className="MathQuestionChaptersSection-chapterSearchModal"
      title="단원정보"
      description="적용할 단원정보를 선택해 주세요."
      isOpen={isOpenChapterSearchModal}
      onChangeIsOpen={onChangeIsOpenChapterSearchModal}
      retrieveData={ApiManager
        .math
        .retrieveMathChaptersApi
        .callWithNoticeMessageGroup
      }
      flatData={flatMathChapterModel}
      searchTypeOptions={mathChapterSearchTypeOptions}
      tableColumns={chapterColumns}
      onClickRow={onSelectChapter} />
  </>);
}

const MathQuestionChaptersSection = memo(_MathQuestionChaptersSection);
export default MathQuestionChaptersSection;
