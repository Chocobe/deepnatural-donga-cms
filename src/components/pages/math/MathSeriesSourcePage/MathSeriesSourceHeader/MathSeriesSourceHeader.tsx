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
import useMathSeriesSourcePageStore from '@/store/mathStores/mathSeriesSourcePageStore/mathSeriesSourcePageStore';
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
  TProduceMathSeriesImportApiRequestParams,
  TProduceMathSourceImportApiRequestParams,
  TRetrieveMathSeriesSourcesApiRequestParams,
} from '@/apis/math/mathApi.type';
import { 
  TImportModalSetTemplateFile,
  TImportModalSetApiFunctionData,
} from '@/components/shadcn-ui-custom/modals/ImportModalSet/ImportModalSet.type';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './MathSeriesSourceHeader.css';

type TMathSeriesSourceHeaderProps = {
  retrieveMathSeriesSources: (params: TRetrieveMathSeriesSourcesApiRequestParams) => Promise<void>;
};

function _MathSeriesSourceHeader(props: TMathSeriesSourceHeaderProps) {
  const {
    retrieveMathSeriesSources,
  } = props;

  //
  // mathSeriesSourcePage store
  //
  const searchParamsForRetrieveMathSeriesSourcesApi = useMathSeriesSourcePageStore(state => state.searchParamsForRetrieveMathSeriesSourcesApi);
  const {
    source_curriculum,
    source_classtype,
    source_grade,
    source_term,
  } = searchParamsForRetrieveMathSeriesSourcesApi;

  const updateSearchParamsForRetrieveMathSeriesSourcesApi = useMathSeriesSourcePageStore(state => state.updateSearchParamsForRetrieveMathSeriesSourcesApi);

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
  // callback
  //
  const onChangeSelect = useCallback((
    value: string,
    id?: string
  ) => {
    if (!id) {
      return;
    }

    updateSearchParamsForRetrieveMathSeriesSourcesApi(old => {
      const correctedValue = value?.trim()?.length
        ? value
        : undefined;

      const params: TRetrieveMathSeriesSourcesApiRequestParams = {
        searchParams: {
          ...old,
          [id]: correctedValue,
        },
      };

      retrieveMathSeriesSources(params);

      return params.searchParams;
    });
  }, [
    retrieveMathSeriesSources,
    updateSearchParamsForRetrieveMathSeriesSourcesApi
  ]);

  const onChangeClassType = useCallback((
    classtype: string
  ) => {
    updateSearchParamsForRetrieveMathSeriesSourcesApi(old => {
      const source_classtype = classtype.trim().length
        ? classtype as TCMSClassType
        : undefined;

      const params: TRetrieveMathSeriesSourcesApiRequestParams = {
        searchParams: {
          ...old,
          source_classtype,
          source_grade: undefined,
        },
      };

      retrieveMathSeriesSources(params);

      return params.searchParams;
    });
  }, [
    retrieveMathSeriesSources,
    updateSearchParamsForRetrieveMathSeriesSourcesApi,
  ]);

  const addMathSeriesSource = useCallback(() => {
    navigate(routePathFactory
      .math
      .getSeriesSourceAddPage()
    );
  }, [navigate]);

  //
  // cache
  //
  const filterItems = useMemo(() => [
    {
      id: 'source_curriculum',
      label: '교육과정',
      Component: (
        <CommonSelect
          key="source_curriculum"
          id="source_curriculum"
          className="editor"
          options={mathCurriculumFilterOptions}
          value={source_curriculum ?? mathCurriculumFilterOptions[0].value}
          onChange={onChangeSelect} />
      ),
    },
    {
      id: 'source_classtype',
      label: '학교급',
      Component: (
        <CommonSelect
          key="source_classtype"
          id="source_classtype"
          className="editor"
          options={cmsClassTypeFilterOptions}
          value={source_classtype ?? cmsClassTypeFilterOptions[0].value}
          onChange={onChangeClassType} />
      ),
    },
    {
      id: 'source_grade',
      label: '학년',
      Component: (
        <CommonSelect
          key="source_grade"
          id="source_grade"
          className="editor"
          options={source_classtype
            ? cmsGradeFilterOptions[source_classtype]
            : cmsGradeFilterOptions[SELECT_OPTION_ITEM_ALL.value]
          }
          value={source_grade ?? cmsGradeFilterOptions[SELECT_OPTION_ITEM_ALL.value][0].value}
          onChange={onChangeSelect} />
      ),
    },
    {
      id: 'source_term',
      label: '학기',
      Component: (
        <CommonSelect
          key="source_term"
          id="source_term"
          className="editor"
          options={cmsTermFilterOptions}
          value={typeof source_term === 'undefined'
            ? cmsTermFilterOptions[0].value
            : source_term
          }
          onChange={onChangeSelect} />
      ),
    },
  ], [
    source_curriculum,
    source_classtype,
    source_grade,
    source_term,
    onChangeSelect,
    onChangeClassType,
  ]);

  const importModalSetTemplateFiles = useMemo<TImportModalSetTemplateFile[]>(() => [
    {
      // FIXME: mockup
      // FIXME: 실제 템플릿 파일 적용하기
      text: '(mockup) 시리즈 .csv 템플릿 다운로드',
      fileUrl: `${import.meta.env.BASE_URL}src/components/shadcn-ui-custom/modals/ImportModalSet/templateFiles/문항_템플릿.csv`,
    },
    {
      // FIXME: mockup
      // FIXME: 실제 템플릿 파일 적용하기
      text: '(mockup) 출처 .csv 템플릿 다운로드',
      fileUrl: `${import.meta.env.BASE_URL}src/components/shadcn-ui-custom/modals/ImportModalSet/templateFiles/문항_템플릿.csv`,
    },
  ], []);

  const importApiFunctions = useMemo<TImportModalSetApiFunctionData[]>(() => [
    {
      label: '시리즈',
      apiFunction: async (file: File) => {
        if (!file) {
          return null;
        }

        const params: TProduceMathSeriesImportApiRequestParams = {
          payload: {
            file,
          },
        };

        await ApiManager
          .math
          .produceMathSeriesImportApi
          .callWithNoticeMessageGroup(params);

        closeImportModal();
      },
    },
    {
      label: '출처',
      apiFunction: async (file: File) => {
        if (!file) {
          return null;
        }

        const params: TProduceMathSourceImportApiRequestParams = {
          payload: {
            file,
          },
        };

        await ApiManager
          .math
          .produceMathSourceImportApi
          .callWithNoticeMessageGroup(params);

        closeImportModal();
      },
    },
  ], [closeImportModal]);

  return (
    <div className="MathSeriesSourceHeader">
      <Accordion
        className="MathSeriesSourceHeader-accordion"
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
              시리즈-출처 / Filter
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

      <div className="MathSeriesSourceHeader-actions">
        <ImportModalSet
          isOpen={isOpenImportModal}
          openImportModal={openImportModal}
          closeImportModal={closeImportModal}
          templateFiles={importModalSetTemplateFiles}
          importApiFunctions={importApiFunctions} />

        <Button
          className="actionButton"
          onClick={addMathSeriesSource}>
          <LuPlus className="icon" />
          시리즈-출처 추가
        </Button>
      </div>
    </div>
  );
}

const MathSeriesSourceHeader = memo(_MathSeriesSourceHeader);
export default MathSeriesSourceHeader;
