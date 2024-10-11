// react
import {
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
import useMathKnowledgeConceptPageStore from '@/store/mathStores/mathKnowledgeConceptPageStore/mathKnowledgeConceptPageStore';
import useResultNoticeModalStore from '@/store/modalStores/resultNoticeModalStore/resultNoticeModalStore';
// api
import ApiManager from '@/apis/ApiManager';
// ui
import { 
  Button,
  ButtonProps,
} from '@/components/shadcn-ui/ui/button';
import TBUTooltip from '@/components/shadcn-ui-custom/TBUTooltip/TBUTooltip';
// icon
import { 
  LuSave,
} from 'react-icons/lu';
// type
import { 
  TProduceMathKnowledgeConceptApiRequestParams,
  TPutMathKnowledgeConceptApiRequestParams,
} from '@/apis/math/mathApi.type';
// style
import './MathKnowledgeConceptDetailFooter.css';

type TMathKnowledgeConceptDetailFooterProps = {
  isDetailMode: boolean;
};

function _MathKnowledgeConceptDetailFooter(props: TMathKnowledgeConceptDetailFooterProps) {
  const {
    isDetailMode,
  } = props;

  //
  // mathKnowledgeConceptPage store
  //
  const detailFormState = useMathKnowledgeConceptPageStore(state => state.detailFormState);

  const clearDetailTargetMathKnowledgeConcept = useMathKnowledgeConceptPageStore(state => state.clearDetailTargetMathKnowledgeConcept);

  //
  // resultNoticeMessage store
  //
  const openNoticeModal = useResultNoticeModalStore(state => state.openSuccessNoticeModal);

  //
  // hook
  //
  const navigate = useNavigate();

  //
  // callback
  //
  const produceMathKnowledgeConcept = useCallback(async () => {
    const {
      title,
      comment,
      achievement3_id,
      kc2_set,
    } = detailFormState;

    if (!achievement3_id) {
      openNoticeModal({
        title: '',
        message: '성취기준을 선택해 주세요.',
        firstButton: {
          text: '확인',
          variant: 'outline',
        },
      });

      return;
    }

    const params: TProduceMathKnowledgeConceptApiRequestParams = {
      payload: {
        title,
        comment,
        achievement3_id,
        kc2_set: kc2_set.map(kc2 => ({
          ...kc2,
          achievement3: String(achievement3_id),
        })),
      },
    };

    const response = await ApiManager
      .math
      .produceMathKnowledgeConceptApi
      .callWithNoticeMessageGroup(params);

    return response?.data;
  }, [
    detailFormState,
    openNoticeModal,
  ]);

  const putMathKnowledgeConcept = useCallback(async () => {
    const {
      id,
      title,
      comment,
      achievement3_id,
      kc2_set,
    } = detailFormState;

    if (!id) {
      return;
    }

    if (!achievement3_id) {
      openNoticeModal({
        title: '',
        message: '성취기준을 선택해 주세요.',
        firstButton: {
          text: '확인',
          variant: 'outline',
        },
      });

      return;
    }

    const params: TPutMathKnowledgeConceptApiRequestParams = {
      pathParams: {
        kc1Id: id,
      },
      payload: {
        achievement3_id,
        title: title,
        comment: comment,
        kc2_set: kc2_set.map(kc2 => ({
          title: kc2.title,
          comment: kc2.comment || null,
          kc1: String(id),
          achievement3: String(achievement3_id),
        })),
      },
    };

    return ApiManager
      .math
      .putMathKnowledgeConceptApi
      .callWithNoticeMessageGroup(params);
  }, [
    detailFormState,
    openNoticeModal,
  ]);

  const onClickAdd = useCallback(async () => {
    const mathKnowledgeConcept = await produceMathKnowledgeConcept();

    if (!mathKnowledgeConcept) {
      return;
    }

    navigate(routePathFactory
      .math
      .getKnowledgeConceptPath()
    );
  }, [
    produceMathKnowledgeConcept, 
    navigate,
  ]);

  const onClickSaveAndAdd = useCallback(async () => {
    await putMathKnowledgeConcept();

    clearDetailTargetMathKnowledgeConcept();

    navigate(routePathFactory
      .math
      .getKnowledgeConceptAddPage()
    );
  }, [
    putMathKnowledgeConcept,
    clearDetailTargetMathKnowledgeConcept,
    navigate,
  ]);

  const onClickSaveAndRemain = useCallback(async () => {
    await putMathKnowledgeConcept();
  }, [putMathKnowledgeConcept]);

  const onClickSave = useCallback(async () => {
    await putMathKnowledgeConcept();

    navigate(routePathFactory
      .math
      .getKnowledgeConceptPath()
    );
  }, [
    putMathKnowledgeConcept,
    navigate,
  ]);

  //
  // cache
  //
  const buttonItems = useMemo(() => {
    return isDetailMode
      ? [
        {
          text: '저장후 추가하기',
          variant: 'secondary',
          onClick: onClickSaveAndAdd,
          IconComponent: undefined,
        },
        {
          text: '저장후 계속해서 수정하기',
          variant: 'secondary',
          onClick: onClickSaveAndRemain,
          IconComponent: undefined,
        },
        {
          text: '저장하기',
          variant: 'default',
          onClick: onClickSave,
          IconComponent: LuSave,
        },
      ]: [
        {
          text: '추가하기',
          variant: 'default',
          onClick: onClickAdd,
          IconComponent: LuSave,
          isTBU: true,
        },
      ];
  }, [
    isDetailMode,
    onClickAdd,
    onClickSaveAndAdd,
    onClickSaveAndRemain,
    onClickSave,
  ]);

  return (
    <div className="MathKnowledgeConceptDetailFooter">
      <div className="MathKnowledgeConceptDetailFooter-rightSide">
        {buttonItems.map((item, index) => {
          const {
            text,
            variant,
            onClick,
            IconComponent,

            isTBU,
          } = item;

          return isTBU
            ? (
              <TBUTooltip
                key={index}
                className="w-full">
                <Button
                  key={index}
                  className="button"
                  variant={variant as ButtonProps['variant']}
                  onClick={onClick}
                  disabled={isTBU}>
                  {IconComponent && (
                    <IconComponent className="icon" />
                  )}

                  {text}
                </Button>
              </TBUTooltip>
            ): (
              <Button
                key={index}
                className="button"
                variant={variant as ButtonProps['variant']}
                onClick={onClick}>
                {IconComponent && (
                  <IconComponent className="icon" />
                )}

                {text}
              </Button>
            );
        })}
      </div>
    </div>
  );
}

const MathKnowledgeConceptDetailFooter = memo(_MathKnowledgeConceptDetailFooter);
export default MathKnowledgeConceptDetailFooter;
