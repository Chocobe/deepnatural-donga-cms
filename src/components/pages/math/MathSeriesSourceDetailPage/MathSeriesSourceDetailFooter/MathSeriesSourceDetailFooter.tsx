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
// icon
import { 
  LuSave,
} from 'react-icons/lu';
// dayjs
import dayjs from 'dayjs';
// type
import { 
  TProduceMathSeriesSourceApiRequestParams,
  TPutMathSeriesSourceApiRequestParams,
} from '@/apis/math/mathApi.type';
// style
import './MathSeriesSourceDetailFooter.css';

type TMathSeriesSourceDetailFooterProps = {
  isDetailMode: boolean;
};

function _MathSeriesSourceDetailFooter(props: TMathSeriesSourceDetailFooterProps) {
  const {
    isDetailMode,
  } = props;

  //
  // mathSeriesSourcePage store
  //
  const detailFormState = useMathSeriesSourcePageStore(state => state.detailFormState);

  const clearDetailTargetMathSeries = useMathSeriesSourcePageStore(state => state.clearDetailTargetMathSeries);

  //
  // hook
  //
  const navigate = useNavigate();

  //
  // callback
  //
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
      .produceMathSeriesSourceApi
      .callWithNoticeMessageGroup(params);

    return response?.data;
  }, [detailFormState]);

  const putMathSeriesSource = useCallback(async () => {
    const {
      id,
      title,
      source_set,
    } = detailFormState;

    if (!id) {
      return;
    }

    const params: TPutMathSeriesSourceApiRequestParams = {
      pathParams: {
        seriesId: id,
      },
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

    return ApiManager
      .math
      .putMathSeriesSourceApi
      .callWithNoticeMessageGroup(params);
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

  const onClickSaveAndAdd = useCallback(async () => {
    await putMathSeriesSource();

    clearDetailTargetMathSeries();

    navigate(routePathFactory
      .math
      .getSeriesSourceAddPage()
    );
  }, [
    putMathSeriesSource,
    clearDetailTargetMathSeries,
    navigate,
  ]);

  const onClickSaveAndRemain = useCallback(async () => {
    await putMathSeriesSource();
  }, [putMathSeriesSource]);

  const onClickSave = useCallback(async () => {
    await putMathSeriesSource();

    navigate(routePathFactory
      .math
      .getSeriesSourcePath()
    );
  }, [
    putMathSeriesSource,
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
    <div className="MathSeriesSourceDetailFooter">
      <div className="MathSeriesSourceDetailFooter-rightSide">
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

const MathSeriesSourceDetailFooter = memo(_MathSeriesSourceDetailFooter);
export default MathSeriesSourceDetailFooter;
