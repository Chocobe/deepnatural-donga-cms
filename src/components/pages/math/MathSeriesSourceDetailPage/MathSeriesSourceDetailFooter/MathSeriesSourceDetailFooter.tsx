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
import useMathSeriesSourcePageStore from '@/store/mathStores/mathSeriesSourcePageStore/mathSeriesSourcePageStore';
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
// dayjs
import dayjs from 'dayjs';
// type
import { 
  TProduceMathSeriesSourceApiRequestParams,
} from '@/apis/math/mathApi.type';
// style
import './MathSeriesSourceDetailFooter.css';

function _MathSeriesSourceDetailFooter() {
  //
  // mathSeriesSourcePage store
  //
  const detailFormState = useMathSeriesSourcePageStore(state => state.detailFormState);

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

  const produceMathSeriesSource = useCallback(async () => {
    const {
      title,
      source_set,
    } = detailFormState;

    const params: TProduceMathSeriesSourceApiRequestParams = {
      payload: {
        title,
        source_set: source_set.map(source => {
          const {
            id: _id,
            ...sourceData
          } = source;

          return {
            ...sourceData,
            expiration_date: dayjs(source.expiration_date).format('YYYY-MM-DD'),
          };
        }),
      },
    };

    const response = await ApiManager
      .math
      .produceMathSeriesSourceApi(params);

    return response?.data;
  }, [detailFormState]);

  const onClickAdd = useCallback(async () => {
    const mathSeriesSource = await produceMathSeriesSource();

    if (!mathSeriesSource) {
      return;
    }

    navigate(routePathFactory
      .math
      .getSeriesSourcePath()
    );
  }, [
    produceMathSeriesSource, 
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
          isTBU: false,
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
    <div className="MathSeriesSourceDetailFooter">
      <div className="MathSeriesSourceDetailFooter-rightSide">
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

const MathSeriesSourceDetailFooter = memo(_MathSeriesSourceDetailFooter);
export default MathSeriesSourceDetailFooter;
