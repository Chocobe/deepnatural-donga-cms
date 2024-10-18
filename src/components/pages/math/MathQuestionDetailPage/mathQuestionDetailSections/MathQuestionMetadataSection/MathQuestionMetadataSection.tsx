// react
import {
  useMemo,
  useCallback,
  memo,
} from 'react';
// store
import useMathQuestionPageStore from '@/store/mathStores/mathQuestionPageStore/mathQuestionPageStore';
// hook
import useHandleMathQuestionDetailEditors from '../hooks/useHandleMathQuestionDetailEditors';
import useSearchModal from '@/components/shadcn-ui-custom/modals/SearchModal/hook/useSearchModal';
// ui
import MathQuestionDetailSectionTemplate from '../../MathQuestionDetailSectionTemplate/MathQuestionDetailSectionTemplate';
import MathQuestionDetailSectionItemTemplate, { 
  TMathQuestionDetailSectionItemTemplateProps,
} from '../../MathQuestionDetailSectionItemTemplate/MathQuestionDetailSectionItemTemplate';
import SearchModalTrigger from '@/components/shadcn-ui-custom/searchModals/SearchModalTrigger/SearchModalTrigger';
import SearchModal from '@/components/shadcn-ui-custom/modals/SearchModal/SearchModal';
import { 
  Input,
} from '@/components/shadcn-ui/ui/input';
import { 
  createColumnHelper,
} from '@tanstack/react-table';
// api
import ApiManager from '@/apis/ApiManager';
// util
import { 
  flatMathSeriesModel,
} from '@/utils/flatModels/flatMathModels';
// type
import { 
  TMathSeriesSourceFlattenModel,
} from '@/apis/models/mathModel.type';
import { 
  cmsClassTypeOptions,
  cmsGradeOptions,
  cmsTermOptions,
} from '@/apis/models/cmsCommonModel.type';
import { 
  mathSeriesSourceSearchTypeOptions,
} from '../../../MathSeriesSourcePage/MathSeriesSourceTableActions/MathSeriesSourceTableActions.type';
// style
import './MathQuestionMetadataSection.css';

const sourceColumnHelper = createColumnHelper<TMathSeriesSourceFlattenModel>();

function _MathQuestionMetadataSection() {
  //
  // mathQuestionPage store
  //
  const internal_id = useMathQuestionPageStore(state => state.detailFormState.internal_id);
  const subject = useMathQuestionPageStore(state => state.detailFormState.subject);
  const source = useMathQuestionPageStore(state => state.detailFormState.source);

  const updateDetailFormState = useMathQuestionPageStore(state => state.updateDetailFormState);

  //
  // hook
  //
  const {
    onChangeInput,
  } = useHandleMathQuestionDetailEditors();

  const {
    isOpenSearchModal: isOpenSourceSearchModal,
    closeSearchModal: closeSourceSearchModal,
    openSearchModal: openSourceSearchModal,
    onChangeIsOpenSearchModal: onChangeIsOpenSourceSearchModal,
  } = useSearchModal();

  //
  // callback
  //
  const onSelectSource = useCallback((mathSeriesSourceFlattenModel: TMathSeriesSourceFlattenModel) => {
    updateDetailFormState(old => ({
      ...old,
      source: mathSeriesSourceFlattenModel.source,
    }));

    closeSourceSearchModal();
  }, [
    updateDetailFormState,
    closeSourceSearchModal,
  ]);

  //
  // cache
  //
  const sectionItems = useMemo<TMathQuestionDetailSectionItemTemplateProps[]>(() => [
    {
      label: 'Internal ID',
      id: 'internal_id',
      components: [
        {
          Editor: (
            <Input
              id="internal_id"
              value={internal_id}
              isReadOnly
              onChange={onChangeInput} />
          ),
        },
      ],
    },
    {
      label: '과목',
      id: 'subject',
      components: [
        {
          Editor: (
            <Input
              id="subject"
              value={subject}
              disabled
              onChange={onChangeInput} />
          ),
        },
      ],
    },
    {
      label: '출처',
      id: 'source',
      components: [
        {
          Editor: (
            <SearchModalTrigger
              id="source"
              onOpen={openSourceSearchModal}
              value={source?.name ?? ''}
              isShowSearchIcon />
          ),
        },
      ],
    },
  ], [
    internal_id,
    subject,
    source,
    onChangeInput,
    openSourceSearchModal,
  ]);

  const sourceColumns = useMemo(() => [
    sourceColumnHelper.accessor('source.curriculum', {
      id: 'sourceSearchModal_curriculum',
      header: '교육과정',
    }),
    sourceColumnHelper.accessor('source.classtype', {
      id: 'sourceSearchModal_classtype',
      header: '학교급',
      cell: props => {
        const classtype = props.cell.getValue();

        return cmsClassTypeOptions.find(({ value }) => classtype === value)?.text 
          ?? '';
      },
    }),
    sourceColumnHelper.accessor('source.grade', {
      id: 'sourceSearchModal_grade',
      header: '학년',
      cell: props => {
        const classtype = props.row.original.source.classtype;
        const grade = props.cell.getValue();

        if (!classtype) {
          return '';
        }

        return cmsGradeOptions[classtype].find(({ value }) => Number(value) === grade)?.text
          ?? '';
      },
    }),
    sourceColumnHelper.accessor('source.term', {
      id: 'sourceSearchModal_term',
      header: '학기',
      cell: props => {
        const term = props.cell.getValue();

        return cmsTermOptions.find(({ value }) => Number(value) === term)?.text
          ?? '';
      }
    }),
    sourceColumnHelper.accessor('source.serviceyear', {
      id: 'sourceSearchModal_serviceyear',
      header: '판형',
    }),
    sourceColumnHelper.accessor('series.title', {
      id: 'sourceSearchModal_title',
      header: '시리즈',
    }),
    sourceColumnHelper.accessor('source.name', {
      id: 'sourceSearchModal_name',
      header: '제품명',
    }),
    sourceColumnHelper.accessor('source.source_type', {
      id: 'sourceSearchModal_source_type',
      header: '제품 분류',
    }),
  ], []);

  return (<>
    <MathQuestionDetailSectionTemplate>
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
      className="MathQuestionMetadataSection-sourceSearchModal"
      title="출처"
      description="적용할 출처를 선택해 주세요."
      isOpen={isOpenSourceSearchModal}
      onChangeIsOpen={onChangeIsOpenSourceSearchModal}
      retrieveData={ApiManager
        .math
        .retrieveMathSeriesSourcesApi
        .callWithNoticeMessageGroup
      }
      searchTypeOptions={mathSeriesSourceSearchTypeOptions}
      tableColumns={sourceColumns}
      flatData={flatMathSeriesModel}
      onClickRow={onSelectSource} />
  </>);
}

const MathQuestionMetadataSection = memo(_MathQuestionMetadataSection);
export default MathQuestionMetadataSection;
