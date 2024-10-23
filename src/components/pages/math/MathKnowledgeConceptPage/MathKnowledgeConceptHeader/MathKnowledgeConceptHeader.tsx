// react
import {
  useState,
  useCallback,
  useMemo,
  memo,
} from 'react';
// router
import { 
  useNavigate,
} from 'react-router-dom';
import routePathFactory from '@/routes/routePathFactory';
// store
import useMathKnowledgeConceptPageStore from '@/store/mathStores/mathKnowledgeConceptPageStore/mathKnowledgeConceptPageStore';
// hook
import useImportModalSet from '@/components/shadcn-ui-custom/modals/ImportModalSet/hook/useImportModalSet';
// // api
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
  SELECT_OPTION_ITEM_ALL,
  TCMSClassType,
} from '@/apis/models/cmsCommonModel.type';
import { 
  cmsGradeClusterFilterOptions,
} from '@/apis/models/cmsCommonModel.type';
import { 
  TProduceMathKnowledgeConcept1ImportApiRequestParams,
  TProduceMathKnowledgeConcept2ImportApiRequestParams,
  TRetrieveMathKnowledgeConceptsApiRequestParams,
} from '@/apis/math/mathApi.type';
import { 
  mathCurriculumFilterOptions,
} from '@/apis/models/mathModel.type';
import { 
  TImportModalSetApiFunctionData,
} from '@/components/shadcn-ui-custom/modals/ImportModalSet/ImportModalSet.type';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './MathKnowledgeConceptHeader.css';

type TMathKnowledgeConceptHeaderProps = {
  retrieveMathKnowledgeConcepts: (params: TRetrieveMathKnowledgeConceptsApiRequestParams) => Promise<void>;
};

function _MathKnowledgeConceptHeader(props: TMathKnowledgeConceptHeaderProps) {
  const {
    retrieveMathKnowledgeConcepts,
  } = props;

  //
  // mathKnowledgeConceptPage store
  //
  const searchParamsForRetrieveMathKnowledgeConceptsApi = useMathKnowledgeConceptPageStore(state => state.searchParamsForRetrieveMathKnowledgeConceptsApi);
  const {
    achievement1_classtype,
    achievement1_curriculum,
    achievement1_grade_cluster,
  } = searchParamsForRetrieveMathKnowledgeConceptsApi;

  const updateSearchParamsForRetrieveMathKnowledgeConceptsApi = useMathKnowledgeConceptPageStore(state => state.updateSearchParamsForRetrieveMathKnowledgeConceptsApi);

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

    updateSearchParamsForRetrieveMathKnowledgeConceptsApi(old => {
      const correctedValue = value?.trim()?.length
        ? value
        : undefined;
  
      const params: TRetrieveMathKnowledgeConceptsApiRequestParams = {
        searchParams: {
          ...old,
          [id]: correctedValue,
        },
      };

      retrieveMathKnowledgeConcepts(params);

      return params.searchParams;
    });
  }, [
    retrieveMathKnowledgeConcepts,
    updateSearchParamsForRetrieveMathKnowledgeConceptsApi,
  ]);

  const onChangeClassType = useCallback((
    classtype: string
  ) => {
    updateSearchParamsForRetrieveMathKnowledgeConceptsApi(old => {
      const achievement1_classtype = classtype?.trim()?.length
        ? classtype as TCMSClassType
        : undefined;

      const params: TRetrieveMathKnowledgeConceptsApiRequestParams = {
        searchParams: {
          ...old,
          achievement1_classtype,
          achievement1_grade_cluster: undefined,
        },
      };

      retrieveMathKnowledgeConcepts(params);

      return params.searchParams;
    });
  }, [
    retrieveMathKnowledgeConcepts,
    updateSearchParamsForRetrieveMathKnowledgeConceptsApi,
  ]);

  const addMathKnowledgeConcept = useCallback(() => {
    navigate(routePathFactory
      .math
      .getKnowledgeConceptAddPage()
    );
  }, [navigate]);

  //
  // cache
  //
  const filterItems = useMemo(() => [
    {
      id: 'achievement1_curriculum',
      label: '교육과정',
      Component: (
        <CommonSelect
          id="achievement1_curriculum"
          className="editor"
          options={mathCurriculumFilterOptions}
          value={achievement1_curriculum ?? mathCurriculumFilterOptions[0].value}
          onChange={onChangeSelect} />
      ),
    },
    {
      id: 'achievement1_classtype',
      label: '학교급',
      Component: (
        <CommonSelect
          id="achievement1_classtype"
          className="editor"
          options={cmsClassTypeFilterOptions}
          value={achievement1_classtype ?? cmsClassTypeFilterOptions[0].value}
          onChange={onChangeClassType} />
      ),
    },
    {
      id: 'achievement1_grade_cluster',
      label: '학년(군)',
      Component: (
        <CommonSelect
          id="achievement1_grade_cluster"
          className="editor"
          options={achievement1_classtype
            ? cmsGradeClusterFilterOptions[achievement1_classtype]
            : cmsGradeClusterFilterOptions[SELECT_OPTION_ITEM_ALL.value]
          }
          value={achievement1_grade_cluster ?? cmsGradeClusterFilterOptions[SELECT_OPTION_ITEM_ALL.value][0].value}
          onChange={onChangeSelect} />
      ),
    },
  ], [
    achievement1_curriculum,
    achievement1_classtype,
    achievement1_grade_cluster,
    onChangeSelect,
    onChangeClassType,
  ]);

  const importApiFunctions = useMemo<TImportModalSetApiFunctionData[]>(() => [
    {
      label: '지식개념1',
      apiFunction: async (file: File) => {
        if (!file) {
          return null;
        }

        const params: TProduceMathKnowledgeConcept1ImportApiRequestParams = {
          payload: {
            file,
          },
        };

        await ApiManager
          .math
          .produceMathKnowledgeConcept1ImportApi
          .callWithNoticeMessageGroup(params);

        closeImportModal();
      },
    },
    {
      label: '지식개념2',
      apiFunction: async (file: File) => {
        if (!file) {
          return null;
        }

        const params: TProduceMathKnowledgeConcept2ImportApiRequestParams = {
          payload: {
            file,
          },
        };

        await ApiManager
          .math
          .produceMathKnowledgeConcept2ImportApi
          .callWithNoticeMessageGroup(params);

        closeImportModal();
      },
    },
  ], [closeImportModal]);

  return (
    <div className="MathKnowledgeConceptHeader">
      <Accordion
        className="MathKnowledgeConceptHeader-accordion"
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
              지식개념 / Filter
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

      <div className="MathKnowledgeConceptHeader-actions">
        <ImportModalSet
          isOpen={isOpenImportModal}
          openImportModal={openImportModal}
          closeImportModal={closeImportModal}
          importApiFunctions={importApiFunctions} />

        <Button
          className="actionButton"
          onClick={addMathKnowledgeConcept}>
          <LuPlus className="icon" />
          지식개념 추가
        </Button>
      </div>
    </div>
  );
}

const MathKnowledgeConceptHeader = memo(_MathKnowledgeConceptHeader);
export default MathKnowledgeConceptHeader;
