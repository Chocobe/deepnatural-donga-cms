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
// icon
import { 
  LuPlus,
} from 'react-icons/lu';
// type
import { 
  TMathChapterFlattenModel,
  TMathTextbookModel,
} from '@/apis/models/mathModel.type';
import { 
  cmsClassTypeMapper,
  cmsClassTypeOptions,
  cmsGradeOptions,
  cmsTermOptions,
} from '@/apis/models/cmsCommonModel.type';
import { 
  mathTextbookSearchTypeOptions,
} from '../../../MathTextbookPage/MathTextbookTableActions/MathTextbookTableActions.type';
import { 
  mathChapterSearchTypeOptions,
} from '../../../MathChapterPage/MathChapterTableActions/MathChapterTableActions.type';
import { 
  mathQuestionChaptersSectionChapterKeyMapper,
  mathQuestionChaptersSectionChapterNameMapper,
  TMathQuestionChaptersSectionChapterKey,
} from './MathQuestionChaptersSection.type';
// util
import { 
  flatMathChapterModel,
} from '@/utils/flatModels/flatMathModels';
// style
import './MathQuestionChaptersSection.css';

const textbookColumnHelper = createColumnHelper<TMathTextbookModel>();
const chapterColumnHelper = createColumnHelper<TMathChapterFlattenModel>();

function _MathQuestionChaptersSection() {
  //
  // mathQuestionPage store
  //
  const textbook = useMathQuestionPageStore(state => state.detailFormState.textbook);

  const chapter1 = useMathQuestionPageStore(state => state.detailFormState.chapter1);
  const chapter2 = useMathQuestionPageStore(state => state.detailFormState.chapter2);
  const chapter3 = useMathQuestionPageStore(state => state.detailFormState.chapter3);

  const updateDetailFormState = useMathQuestionPageStore(state => state.updateDetailFormState);

  //
  // ref
  //
  const chapterKeyRef = useRef<TMathQuestionChaptersSectionChapterKey>('');
  const chapterIndexRef = useRef<number | null>(null);

  //
  // hook
  //
  const {
    isOpenSearchModal: isOpenTextbookSearchModal,
    closeSearchModal: closeTextbookSearchModal,
    openSearchModal: openTextbookSearchModal,
    onChangeIsOpenSearchModal: onChangeIsOpenTextbookSearchModal,
  } = useSearchModal();

  const {
    isOpenSearchModal: isOpenChapterSearchModal,
    closeSearchModal: closeChapterSearchModal,
    openSearchModal: openChapterSearchModal,
    onChangeIsOpenSearchModal: onChangeIsOpenChapterSearchModal,
  } = useSearchModal();

  //
  // callback
  //
  const _openChapterSearchModal = useCallback((
    chapterKey: string,
    chapterIndex: number
  ) => {
    chapterKeyRef.current = chapterKey as TMathQuestionChaptersSectionChapterKey;
    chapterIndexRef.current = chapterIndex;

    openChapterSearchModal();
  }, [openChapterSearchModal]);

  const _closeChapterSearchModal = useCallback(() => {
    chapterKeyRef.current = mathQuestionChaptersSectionChapterKeyMapper.NONE;
    chapterIndexRef.current = null;

    closeChapterSearchModal();
  }, [closeChapterSearchModal]);

  const addChapter = useCallback((
    chapterKey: string
  ) => {
    updateDetailFormState(old => {
      const chapter = old[chapterKey] ?? [];

      const lastChapter = chapter[chapter?.length - 1] ?? null;
      const isInvalid = lastChapter === null;

      const newDetailFormState = {
        ...old,
        [chapterKey]: isInvalid
          ? old[chapterKey]
          : [
            ...(old[chapterKey] ?? []),
            null,
          ],
      };

      if (!isInvalid) {
        _openChapterSearchModal(chapterKey, newDetailFormState[chapterKey]!.length - 1);
      }

      return newDetailFormState;
    });
  }, [
    updateDetailFormState,
    _openChapterSearchModal,
  ]);

  const deleteChapter = useCallback((
    chapterKey: string,
    chapterIndex: number
  ) => {
    updateDetailFormState(old => {
      const chapter = [...(old[chapterKey] ?? [])];
      chapter.splice(chapterIndex, 1);

      if (!chapter.length) {
        chapter.push(null);
      }

      return {
        ...old,
        [chapterKey]: chapter,
      };
    });
  }, [updateDetailFormState]);

  //
  // callback
  //
  const onSelectTextbook = useCallback((textbook: TMathTextbookModel) => {
    updateDetailFormState(old => ({
      ...old,
      textbook,
    }));

    closeTextbookSearchModal();
  }, [
    updateDetailFormState,
    closeTextbookSearchModal,
  ]);

  const onSelectChapter = useCallback((chapter: TMathChapterFlattenModel) => {
    const chapterKey = chapterKeyRef.current;
    const chapterIndex = chapterIndexRef.current;

    if (!chapterKey || chapterIndex === null) {
      return;
    }

    updateDetailFormState(old => {
      const newChapters = [...(old[chapterKey] ?? [])];
      newChapters.splice(
        chapterIndex,
        1,
        chapter[chapterKey]!
      );

      return {
        ...old,
        [chapterKey]: newChapters,
      };
    });

    _closeChapterSearchModal();
  }, [
    updateDetailFormState,
    _closeChapterSearchModal,
  ]);

  //
  // cache
  //
  const sectionItems = useMemo<TMathQuestionDetailSectionItemTemplateProps[]>(() => [
    {
      label: '교과서',
      id: 'textbook',
      components: [
        {
          Editor: (
            <SearchModalTrigger
              id="textbook"
              onOpen={openTextbookSearchModal}
              value={textbook?.title ?? ''}
              isShowSearchIcon />
          ),
        },
      ],
    },
    {
      label: '대단원',
      id: mathQuestionChaptersSectionChapterKeyMapper.CHAPTER_1,
      components: Array.from(
        { length: Math.max(chapter1.length, 1) },
        (_, indexOfChapter1) => {
          return {
            Editor: (
              <SearchModalTrigger
                id={mathQuestionChaptersSectionChapterKeyMapper.CHAPTER_1}
                onOpen={() => _openChapterSearchModal(
                  mathQuestionChaptersSectionChapterKeyMapper.CHAPTER_1,
                  indexOfChapter1
                )}
                value={chapter1?.[indexOfChapter1]?.title ?? ''}
                isShowSearchIcon />
            ),
            Actions: [
              (
                <Button onClick={() => deleteChapter(
                  mathQuestionChaptersSectionChapterKeyMapper.CHAPTER_1,
                  indexOfChapter1
                )}>
                  삭제
                </Button>
              ),
              indexOfChapter1 === (chapter1.length - 1)
                ? (
                  <Button onClick={() => addChapter(
                    mathQuestionChaptersSectionChapterKeyMapper.CHAPTER_1
                  )}>
                    <LuPlus className="ml-1 w-4 h-4" />
                    대단원 추가하기
                  </Button>
                ): null
            ],
          };
        }
      ),
    },
    {
      label: '중단원',
      id: mathQuestionChaptersSectionChapterKeyMapper.CHAPTER_2,
      components: Array.from(
        { length: Math.max(chapter2.length, 1) },
        (_, indexOfChapter2) => {
          return {
            Editor: (
              <SearchModalTrigger
                id={mathQuestionChaptersSectionChapterKeyMapper.CHAPTER_2}
                onOpen={() => _openChapterSearchModal(
                  mathQuestionChaptersSectionChapterKeyMapper.CHAPTER_2,
                  indexOfChapter2
                )}
                value={chapter2?.[indexOfChapter2]?.title ?? ''}
                isShowSearchIcon />
            ),
            Actions: [
              (
                <Button onClick={() => deleteChapter(
                  mathQuestionChaptersSectionChapterKeyMapper.CHAPTER_2,
                  indexOfChapter2
                )}>
                  삭제
                </Button>
              ),
              indexOfChapter2 === (chapter2.length - 1)
                ? (
                  <Button onClick={() => addChapter(
                    mathQuestionChaptersSectionChapterKeyMapper.CHAPTER_2
                  )}>
                    <LuPlus className="ml-1 w-4 h-4" />
                    중단원 추가하기
                  </Button>
                ): null
            ],
          };
        }
      ),
    },
    {
      label: '소단원',
      id: mathQuestionChaptersSectionChapterKeyMapper.CHAPTER_3,
      components: Array.from(
        { length: Math.max(chapter3.length, 1) },
        (_, indexOfChapter3) => {
          return {
            Editor: (
              <SearchModalTrigger
                id={mathQuestionChaptersSectionChapterKeyMapper.CHAPTER_3}
                onOpen={() => _openChapterSearchModal(
                  mathQuestionChaptersSectionChapterKeyMapper.CHAPTER_3,
                  indexOfChapter3
                )}
                value={chapter3?.[indexOfChapter3]?.title ?? ''}
                isShowSearchIcon />
            ),
            Actions: [
              (
                <Button onClick={() => deleteChapter(
                  mathQuestionChaptersSectionChapterKeyMapper.CHAPTER_3,
                  indexOfChapter3
                )}>
                  삭제
                </Button>
              ),
              indexOfChapter3 === (chapter3.length - 1)
                ? (
                  <Button onClick={() => addChapter(
                    mathQuestionChaptersSectionChapterKeyMapper.CHAPTER_3
                  )}>
                    <LuPlus className="ml-1 w-4 h-4" />
                    소단원 추가하기
                  </Button>
                ): null
            ],
          };
        }
      ),
    },
  ], [
    textbook,
    chapter1,
    chapter2,
    chapter3,
    openTextbookSearchModal,
    _openChapterSearchModal,
    addChapter,
    deleteChapter,
  ]);

  const textbookColumns = useMemo(() => [
    textbookColumnHelper.accessor('curriculum', {
      id: 'textbookSearchModal_curriculum',
      header: '교육과정',
    }),
    textbookColumnHelper.accessor('classtype', {
      id: 'textbookSearchModal_classtype',
      header: '학교급',
      cell: props => {
        const {
          cell,
        } = props;

        const valueItem = cmsClassTypeOptions.find(({ value }) => value === cell.getValue());
        return valueItem?.text ?? ' ';
      },
    }),
    textbookColumnHelper.accessor('grade', {
      id: 'textbookSearchModal_grade',
      header: '학년',
      cell: props => {
        const {
          cell,
        } = props;

        const valueItem = cmsGradeOptions[
          cmsClassTypeMapper.ELEMENTARY
        ].find(({ value }) => value === String(cell.getValue()));

        return valueItem?.text ?? ' ';
      },
    }),
    textbookColumnHelper.accessor('term', {
      id: 'textbookSearchModal_term',
      header: '학기',
      cell: props => {
        const {
          cell,
        } = props;

        const valueItem = cmsTermOptions
          .find(({ value }) => value === String(cell.getValue()));

        return valueItem?.text ?? ' ';
      },
    }),
    textbookColumnHelper.accessor('title', {
      id: 'textbookSearchModal_title',
      header: '교과서명',
    }),
    textbookColumnHelper.accessor('author', {
      id: 'textbookSearchModal_author',
      header: '저자',
    }),
  ], []);

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

  const chapterSearchModalName = mathQuestionChaptersSectionChapterNameMapper[
    chapterKeyRef.current
  ];

  return (<>
    <MathQuestionDetailSectionTemplate 
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
      className="MathQuestionChaptersSection-textbookSearchModal"
      title="교과서"
      description="적용할 교과서를 선택해 주세요."
      isOpen={isOpenTextbookSearchModal}
      onChangeIsOpen={onChangeIsOpenTextbookSearchModal}
      retrieveData={ApiManager
        .math
        .retrieveMathTextbooksApi
        .callWithNoticeMessageGroup
      }
      searchTypeOptions={mathTextbookSearchTypeOptions}
      tableColumns={textbookColumns}
      onClickRow={onSelectTextbook} />

    <SearchModal
      className="MathQuestionChaptersSection-chapterSearchModal"
      title={chapterSearchModalName}
      description={`적용할 ${chapterSearchModalName}을 선택해 주세요.`}
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
