// react
import {
  useEffect,
  MutableRefObject,
} from 'react';

const useTableWrapperInitScrollEffect = (params: {
  $tableRef: MutableRefObject<HTMLTableElement | null>;
  effectDef: Array<any>;
}) => {
  const {
    $tableRef,
    effectDef,
  } = params;

  //
  // effect
  //
  useEffect(function initTableWrapperScroll() {
    const $tableWrapper = $tableRef.current?.parentElement as HTMLDivElement;

    $tableWrapper?.scrollTo({
      top: 0,
      behavior: 'instant',
    });

    // eslint-disable-next-line
  }, [effectDef]);
};

export default useTableWrapperInitScrollEffect;
