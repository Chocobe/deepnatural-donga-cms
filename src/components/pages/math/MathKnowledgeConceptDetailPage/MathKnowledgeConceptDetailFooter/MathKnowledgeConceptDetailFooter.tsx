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
} from '@/apis/math/mathApi.type';
// style
import './MathKnowledgeConceptDetailFooter.css';

function _MathKnowledgeConceptDetailFooter() {
  //
  // mathKnowledgeConceptPage store
  //
  const detailFormState = useMathKnowledgeConceptPageStore(state => state.detailFormState);

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
  const onClickSaveAndAdd = useCallback(() => {
    console.log('저장후 추가하기');
  }, []);

  const onClickSaveAndRemain = useCallback(() => {
    console.log('저장후 계속해서 수정하기');
  }, []);

  const onClickSave = useCallback(() => {
    console.log('저장하기');
  }, []);

  const produceMathKnowledgeConcept = useCallback(async () => {
    const {
      title,
      comment,
      kc2_set,
    } = detailFormState;

    const hasEmptyAchievement = kc2_set.some(kc2 => {
      return !kc2.achievement3;
    });

    if (hasEmptyAchievement) {
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
        kc2_set: kc2_set.map(kc2 => ({
          ...kc2,
          achievement3_id: kc2.achievement3?.id as number,
        })),
      },
    };

    const response = await ApiManager
      .math
      .produceMathKnowledgeConceptApi(params);

    return response?.data;
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

  // FIXME: props 로 받아오기
  const isAdditionMode = true;

  //
  // cache
  //
  const buttonItems = useMemo(() => {
    return isAdditionMode
      ? [
        {
          text: '추가하기',
          variant: 'default',
          onClick: onClickAdd,
          IconComponent: LuSave,
          isTBU: true,
        },
      ]: [
        {
          text: '저장후 추가하기',
          variant: 'secondary',
          onClick: onClickSaveAndAdd,
          IconComponent: undefined,
          isTBU: true,
        },
        {
          text: '저장후 계속해서 수정하기',
          variant: 'secondary',
          onClick: onClickSaveAndRemain,
          IconComponent: undefined,
          isTBU: true,
        },
        {
          text: '저장하기',
          variant: 'default',
          onClick: onClickSave,
          IconComponent: LuSave,
          isTBU: true,
        },
      ];
  }, [
    isAdditionMode,
    onClickAdd,
    onClickSaveAndAdd,
    onClickSaveAndRemain,
    onClickSave,
  ]);

  return (
    <div className="MathChapterDetailFooter">
      <div className="MathChapterDetailFooter-rightSide">
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
