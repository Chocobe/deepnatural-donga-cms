// react
import {
  useState,
  useMemo,
  useCallback,
  memo,
} from 'react';
// router
import { 
  useNavigate,
} from 'react-router-dom';
import routePathFactory from '@/routes/routePathFactory';
// store
import useMathChapterPageStore from '@/store/mathStores/mathChapterPageStore/mathChapterPageStore';
// hook
import useImportModalSet from '@/components/shadcn-ui-custom/modals/ImportModalSet/hook/useImportModalSet';
// api
import ApiManager from '@/apis/ApiManager';
// ui
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/shadcn-ui/ui/accordion';
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
import { 
  Label,
} from '@/components/shadcn-ui/ui/label';
import CommonSelect from '@/components/shadcn-ui-custom/CommonSelect/CommonSelect';
import ImportModalSet from '@/components/shadcn-ui-custom/modals/ImportModalSet/ImportModalSet';
// icon
import {
  LuChevronDown,
  LuPlus,
} from 'react-icons/lu';
// type
import { 
  cmsClassTypeFilterOptions,
  cmsGradeFilterOptions,
  cmsTermFilterOptions,
  SELECT_OPTION_ITEM_ALL,
  TCMSClassType,
} from '@/apis/models/cmsCommonModel.type';
import { 
  mathCurriculumFilterOptions,
} from '@/apis/models/mathModel.type';
import { 
  TRetrieveMathChaptersApiRequestParams,
  TProduceMathChapter1ImportApiRequestParams,
  TProduceMathChapter2ImportApiRequestParams,
  TProduceMathChapter3ImportApiRequestParams,
} from '@/apis/math/mathApi.type';
import { 
  TImportModalSetTemplateFile,
  TImportModalSetApiFunctionData,
} from '@/components/shadcn-ui-custom/modals/ImportModalSet/ImportModalSet.type';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './MathChapterHeader.css';

type TMathChapterHeaderProps = {
  retrieveMathChapters: (params: TRetrieveMathChaptersApiRequestParams) => Promise<void>;
};

function _MathChapterHeader(props: TMathChapterHeaderProps) {
  const {
    retrieveMathChapters,
  } = props;

  //
  // mathChapterPage store
  //
  const searchParamsForRetrieveMathChaptersApi = useMathChapterPageStore(state => state.searchParamsForRetrieveMathChaptersApi);
  const {
    textbook_classtype,
    textbook_curriculum,
    textbook_grade,
    textbook_term,
  } = searchParamsForRetrieveMathChaptersApi;

  const updateSearchParamsForRetrieveMathChaptersApi = useMathChapterPageStore(state => state.updateSearchParamsForRetrieveMathChaptersApi);

  //
  // state
  //
  const [accordionValue, setAccordionValue] = useState('filters');

  //
  // hook
  //
  const navigate = useNavigate();

  const {
    isOpenImportModal,
    openImportModal,
    closeImportModal,
  } = useImportModalSet();

  //
  // callbakc
  //
  const onChangeClassType = useCallback((
    classtype: string
  ) => {
    updateSearchParamsForRetrieveMathChaptersApi(old => {
      const textbook_classtype = classtype.trim().length
        ? classtype as TCMSClassType
        : undefined;

      const params: TRetrieveMathChaptersApiRequestParams = {
        searchParams: {
          ...old,
          textbook_classtype,
          textbook_grade: undefined,
        },
      };

      retrieveMathChapters(params);

      return params.searchParams;
    });
  }, [
    retrieveMathChapters,
    updateSearchParamsForRetrieveMathChaptersApi,
  ]);

  const onChangeFilter = useCallback((
    value: string,
    id?: string
  ) => {
    if (!id) {
      return;
    }

    const correctedValue = value?.trim()?.length
      ? value
      : undefined;

    updateSearchParamsForRetrieveMathChaptersApi(old => {
      const params: TRetrieveMathChaptersApiRequestParams = {
        searchParams: {
          ...old,
          [id]: correctedValue,
        },
      };

      retrieveMathChapters(params);

      return params.searchParams;
    });
  }, [
    retrieveMathChapters,
    updateSearchParamsForRetrieveMathChaptersApi,
  ]);

  //
  // cache
  //
  const filterItems = useMemo(() => [
    {
      id: 'textbook_curriculum',
      label: '교육과정',
      Component: (
        <CommonSelect
          key="textbook_curriculum"
          id="textbook_curriculum"
          className="editor"
          options={mathCurriculumFilterOptions}
          value={textbook_curriculum ?? mathCurriculumFilterOptions[0].value}
          onChange={onChangeFilter} />
      ),
    },
    {
      id: 'textbook_classtype',
      label: '학교급',
      Component: (
        <CommonSelect
          key="textbook_classtype"
          id="textbook_classtype"
          className="editor"
          options={cmsClassTypeFilterOptions}
          value={textbook_classtype ?? cmsClassTypeFilterOptions[0].value}
          onChange={onChangeClassType} />
      ),
    },
    {
      id: 'textbook_grade',
      label: '학년',
      Component: (
        <CommonSelect
          key="textbook_grade"
          id="textbook_grade"
          className="editor"
          options={textbook_classtype
            ? cmsGradeFilterOptions[textbook_classtype]
            : cmsGradeFilterOptions[SELECT_OPTION_ITEM_ALL.value]
          }
          value={textbook_grade ?? cmsGradeFilterOptions[SELECT_OPTION_ITEM_ALL.value][0].value}
          onChange={onChangeFilter} />
      ),
    },
    {
      id: 'textbook_term',
      label: '학기',
      Component: (
        <CommonSelect
          key="textbook_term"
          id="textbook_term"
          className="editor"
          options={cmsTermFilterOptions}
          value={typeof textbook_term === 'undefined'
            ? cmsTermFilterOptions[0].value
            : textbook_term
          }
          onChange={onChangeFilter} />
      ),
    },
  ], [
    textbook_curriculum,
    textbook_classtype,
    textbook_grade,
    textbook_term,
    onChangeClassType,
    onChangeFilter,
  ]);

  const importModalSetTemplateFiles = useMemo<TImportModalSetTemplateFile[]>(() => [
    {
      // FIXME: mockup
      // FIXME: 실제 템플릿 파일 적용하기
      text: '(mockup) 대단원 .csv 템플릿 다운로드',
      fileUrl: `${import.meta.env.BASE_URL}src/components/shadcn-ui-custom/modals/ImportModalSet/templateFiles/문항_템플릿.csv`,
    },
    {
      // FIXME: mockup
      // FIXME: 실제 템플릿 파일 적용하기
      text: '(mockup) 중단원 .csv 템플릿 다운로드',
      fileUrl: `${import.meta.env.BASE_URL}src/components/shadcn-ui-custom/modals/ImportModalSet/templateFiles/문항_템플릿.csv`,
    },
    {
      // FIXME: mockup
      // FIXME: 실제 템플릿 파일 적용하기
      text: '(mockup) 소단원 .csv 템플릿 다운로드',
      fileUrl: `${import.meta.env.BASE_URL}src/components/shadcn-ui-custom/modals/ImportModalSet/templateFiles/문항_템플릿.csv`,
    },
  ], []);

  const importApiFunctions = useMemo<TImportModalSetApiFunctionData[]>(() => [
    {
      label: '대단원',
      apiFunction: async (file: File) => {
        if (!file) {
          return null;
        }

        const params: TProduceMathChapter1ImportApiRequestParams = {
          payload: {
            file,
          },
        };

        await ApiManager
          .math
          .produceMathChapter1ImportApi
          .callWithNoticeMessageGroup(params);

        closeImportModal();
      },
    },
    {
      label: '중단원',
      apiFunction: async (file: File) => {
        if (!file) {
          return null;
        }

        const params: TProduceMathChapter2ImportApiRequestParams = {
          payload: {
            file,
          },
        };

        await ApiManager
          .math
          .produceMathChapter2ImportApi
          .callWithNoticeMessageGroup(params);

        closeImportModal();
      },
    },
    {
      label: '소단원',
      apiFunction: async (file: File) => {
        if (!file) {
          return null;
        }

        const params: TProduceMathChapter3ImportApiRequestParams = {
          payload: {
            file,
          },
        };

        await ApiManager
          .math
          .produceMathChapter3ImportApi
          .callWithNoticeMessageGroup(params);

        closeImportModal();
      },
    },
  ], [closeImportModal]);

  //
  // callback
  //
  const addMathChapter = useCallback(() => {
    navigate(routePathFactory
      .math
      .getChapterAddPath()
    );
  }, [navigate]);

  return (
    <div className="MathChapterHeader">
      <Accordion
        className="MathChapterHeader-accordion"
        type="single"
        value={accordionValue}
        onValueChange={setAccordionValue}
        collapsible>
        <AccordionItem
          className="border-0"
          value="filters">
          <AccordionTrigger 
            className="trigger" 
            isHideChevronIcon>
            <div className="title">
              교과서 단원 / Filter
              <LuChevronDown className={cn(
                'icon',
                accordionValue ? 'open' : 'close'
              )} />
            </div>
          </AccordionTrigger>

          <AccordionContent className="filters">
            {filterItems.map(item => {
              const {
                id,
                label,
                Component,
              } = item;

              return (
                <div 
                  key={id}
                  className="filterItem">
                  <Label 
                    htmlFor={id}
                    className="label">
                    {label}
                  </Label>

                  {Component}
                </div>
              );
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="MathChapterHeader-actions">
        <ImportModalSet
          isOpen={isOpenImportModal}
          openImportModal={openImportModal}
          closeImportModal={closeImportModal}
          templateFiles={importModalSetTemplateFiles}
          importApiFunctions={importApiFunctions} />

        <Button
          className="actionButton"
          onClick={addMathChapter}>
          <LuPlus className="icon" />
          교과서 대단원 추가
        </Button>
      </div>
    </div>
  );
}

const MathChapterHeader = memo(_MathChapterHeader);
export default MathChapterHeader;
