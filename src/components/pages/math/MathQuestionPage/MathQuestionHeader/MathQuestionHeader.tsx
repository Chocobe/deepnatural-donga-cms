// react
import {
  useState,
  useMemo,
  useCallback,
  memo,
} from 'react';
// router
import routePathFactory from '@/routes/routePathFactory';
// store
import useMathQuestionPageStore from '@/store/mathStores/mathQuestionPageStore/mathQuestionPageStore';
// hook
import useImportModalSet from '@/components/shadcn-ui-custom/modals/ImportModalSet/hook/useImportModalSet';
// api
import ApiManager from '@/apis/ApiManager';
// ui
import MathKCFilterModalSet from '../../MathQuestionDetailPage/MathKCFilterModalSet/MathKCFilterModalSet';
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
  LuPencil,
} from 'react-icons/lu';
import { 
  mathCurriculumFilterOptions,
} from '@/apis/models/mathModel.type';
import { 
  cmsClassTypeFilterOptions,
  cmsGradeFilterOptions,
  cmsTermFilterOptions,
  SELECT_OPTION_ITEM_ALL,
  TCMSClassType,
} from '@/apis/models/cmsCommonModel.type';
import { 
  TProduceMathQuestionImportApiRequestParams,
  TRetrieveMathQuestionsApiRequestParams,
} from '@/apis/math/mathApi.type';
import { 
  TKC1SelectionMapper,
} from '../../MathQuestionDetailPage/MathKCFilterModalSet/MathKCSelectionSection/MathKCSelectionSection.type';
import { 
  TImportModalSetApiFunctionData,
} from '@/components/shadcn-ui-custom/modals/ImportModalSet/ImportModalSet.type';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './MathQuestionHeader.css';

type TMathQuestionHeaderProps = {
  retrieveMathQuestions: (params: TRetrieveMathQuestionsApiRequestParams) => Promise<void>;
};

function _MathQuestionHeader(props: TMathQuestionHeaderProps) {
  const {
    retrieveMathQuestions,
  } = props;

  //
  // mathQuestionPage store
  //
  const searchParamsForRetrieveMathQuestionsApi = useMathQuestionPageStore(state => state.searchParamsForRetrieveMathQuestionsApi);
  const {
    curriculum,
    source_classtype,
    source_grade,
    source_term,
  } = searchParamsForRetrieveMathQuestionsApi;

  const updateSearchParamsForRetrieveMathQuestionsApi = useMathQuestionPageStore(state => state.updateSearchParamsForRetrieveMathQuestionsApi);

  //
  // state
  //
  const [accordionValue, setAccordionValue] = useState('filters');

  const {
    isOpenImportModal,
    openImportModal,
    closeImportModal,
  } = useImportModalSet();

  //
  // callback
  //
  const addMathQuestion = useCallback(() => {
    window.open(
      routePathFactory.math.getQuestionToolPath(),
      '_blank',
    );
  }, []);

  const onChangeSelect = useCallback((
    value: string,
    id?: string
  ) => {
    if (!id) {
      return;
    }

    const correctedValue = value?.trim()?.length
      ? value
      : undefined;

    updateSearchParamsForRetrieveMathQuestionsApi(old => {
      const params: TRetrieveMathQuestionsApiRequestParams = {
        searchParams: {
          ...old,
          [id]: correctedValue,
        },
      };

      retrieveMathQuestions(params);

      return params.searchParams;
    });
  }, [
    retrieveMathQuestions,
    updateSearchParamsForRetrieveMathQuestionsApi,
  ]);

  const onChangeClassType = useCallback((classtype: string) => {
    updateSearchParamsForRetrieveMathQuestionsApi(old => {
      const source_classtype = classtype.trim().length
        ? classtype as TCMSClassType
        : undefined;

      const params: TRetrieveMathQuestionsApiRequestParams = {
        searchParams: {
          ...old,
          source_classtype,
          source_grade: undefined,
        },
      };

      retrieveMathQuestions(params);

      return params.searchParams;
    });
  }, [
    retrieveMathQuestions,
    updateSearchParamsForRetrieveMathQuestionsApi,
  ]);

  const onChangeKC2 = useCallback((kc1SelectionConfirmMapper: TKC1SelectionMapper) => {
    const kc2Ids = Object
      .values(kc1SelectionConfirmMapper)
      .flatMap(kc1Selection => {
        const kc2Ids = Object
          .values(kc1Selection.kc2SelectionMapper)
          .map(({ kc2 }) => String(kc2.id));

        return kc2Ids;
      });

    updateSearchParamsForRetrieveMathQuestionsApi(old => {
      const params: TRetrieveMathQuestionsApiRequestParams = {
        searchParams: {
          ...old,
          kc2: kc2Ids,
        },
      };

      retrieveMathQuestions(params);

      return params.searchParams;
    });
  }, [
    retrieveMathQuestions,
    updateSearchParamsForRetrieveMathQuestionsApi,
  ]);

  //
  // cache
  //
  const filterItems = useMemo(() => [
    {
      id: 'curriculum',
      label: '교육과정',
      Component: (
        <CommonSelect
          id="curriculum"
          className="editor"
          options={mathCurriculumFilterOptions}
          value={curriculum ?? SELECT_OPTION_ITEM_ALL.value}
          onChange={onChangeSelect} />
      ),
    },
    {
      id: 'source_classtype',
      label: '학교급',
      Component: (
        <CommonSelect
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
          id="source_term"
          className="editor"
          options={cmsTermFilterOptions}
          value={source_term ?? cmsTermFilterOptions[0].value}
          onChange={onChangeSelect} />
      ),
    },
    {
      id: 'kc',
      label: 'KC',
      Component: (
        <MathKCFilterModalSet onChangeKC2={onChangeKC2} />
      ),
    },
  ], [
    curriculum,
    source_classtype,
    source_grade,
    source_term,
    onChangeSelect,
    onChangeClassType,
    onChangeKC2,
  ]);

  const importApiFunctions = useMemo<TImportModalSetApiFunctionData[]>(() => [
    {
      label: '수학 문항',
      apiFunction: async (file: File) => {
        if (!file) {
          return null;
        }

        const params: TProduceMathQuestionImportApiRequestParams = {
          payload: {
            file,
          },
        };

        // FIXME: 현재 500 응답 받는 상태
        const response = await ApiManager
          .math
          .produceMathQuestionImportApi
          .callWithNoticeMessageGroup(params);

        console.log('response.data: ', response?.data);

        closeImportModal();
      },
    },
  ], [closeImportModal]);

  return (<>
    <div className="MathQuestionHeader">
      <Accordion
        className="MathQuestionHeader-accordion"
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
              문항 / Filter
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

      <div className="MathQuestionHeader-actions">
        <ImportModalSet
          isOpen={isOpenImportModal}
          importApiFunctions={importApiFunctions}
          openImportModal={openImportModal}
          closeImportModal={closeImportModal} />

        <Button
          className="actionButton"
          onClick={addMathQuestion}>
          <LuPencil className="icon" />
          신규문항 등록도구
        </Button>
      </div>
    </div>
  </>);
}

const MathQuestionHeader = memo(_MathQuestionHeader);
export default MathQuestionHeader;
