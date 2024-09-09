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
import useMathAchievementPageStore from '@/store/mathStores/mathAchievementPageStore/mathAchievementPageStore';
// api
import ApiManager from '@/apis/ApiManager';
// ui
import { 
  Button,
  ButtonProps,
} from '@/components/shadcn-ui/ui/button';
// icon
import { 
  LuPlus, 
  LuSave,
} from 'react-icons/lu';
// type
import { 
  initialMathAchievementPageStoreDetailAchievement2,
} from '@/store/mathStores/mathAchievementPageStore/mathAchievementPageStore.type';
import { 
  TProduceMathAchievementApiRequestParams,
} from '@/apis/math/mathApi.type';
// style
import './MathAchievementDetailFooter.css';

function _MathAchievementDetailFooter() {
  //
  // mathAchievementPage store
  //
  const detailFormState = useMathAchievementPageStore(state => state.detailFormState);

  const updateDetailFormState = useMathAchievementPageStore(state => state.updateDetailFormState);

  //
  // hook
  //
  const navigate = useNavigate();

  //
  // callback
  //
  const addMathAchievement2 = useCallback(() => {
    updateDetailFormState(old => ({
      ...old,
      achievement2_set: [
        ...(old.achievement2_set ?? []),
        {
          ...initialMathAchievementPageStoreDetailAchievement2,
        },
      ],
    }));
  }, [updateDetailFormState]);

  const onClickSaveAndAdd = useCallback(() => {
    console.log('저장후 추가하기');
  }, []);

  const onClickSaveAndRemain = useCallback(() => {
    console.log('저장후 계속해서 수정하기');
  }, []);

  const onClickSave = useCallback(() => {
    console.log('저장하기');
  }, []);

  const produceMathAchievement = useCallback(async () => {
    const {
      no,
      title,
      classtype,
      curriculum,
      grade_cluster,
      achievement2_set,
    } = detailFormState;

    const params: TProduceMathAchievementApiRequestParams = {
      payload: {
        no,
        title,
        classtype,
        curriculum,
        grade_cluster,
        achievement2_set,
      },
    };

    const response = await ApiManager
      .math
      .produceMathAchievementApi
      .callWithNoticeMessageGroup(params);

    return response?.data;
  }, [detailFormState]);

  const onClickAdd = useCallback(async () => {
    const mathAchievement = await produceMathAchievement();

    if (!mathAchievement) {
      return;
    }

    navigate(routePathFactory
      .math
      .getAchievementPath()
    );
  }, [produceMathAchievement, navigate]);

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
        },
      ]: [
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
      ];
  }, [
    isAdditionMode,
    onClickAdd,
    onClickSaveAndAdd,
    onClickSaveAndRemain,
    onClickSave,
  ]);

  return (
    <div className="MathAchievementDetailFooter">
      <div className="MathAchievementDetailFooter-leftSide">
        <Button
          className="button"
          variant="default"
          onClick={addMathAchievement2}>
          <LuPlus className="icon" />
          성취기준(중)
        </Button>
      </div>

      <div className="MathAchievementDetailFooter-rightSide">
        {buttonItems.map((item, index) => {
          const {
            text,
            variant,
            onClick,
            IconComponent,
          } = item;

          return (
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

const MathAchievementDetailFooter = memo(_MathAchievementDetailFooter);
export default MathAchievementDetailFooter;
