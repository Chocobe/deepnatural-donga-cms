// react
import {
  useRef,
  useCallback,
} from 'react';

// --- --- --- --- --- --- --- --- --- ---
//
// 저장 후, 액션
//
// --- --- --- --- --- --- --- --- --- ---
export const detailPageNextActionAfterSubmitMapper = {
  ADD: 'add',
  REMAIN: 'remain',
  DEFAULT: 'default',
} as const;
export type TDetailPageNextActionAfterSubmit = typeof detailPageNextActionAfterSubmitMapper[keyof typeof detailPageNextActionAfterSubmitMapper];

const useDetailPageNextActionAfterSubmit = () => {
  //
  // ref
  //
  const nextActionAfterSubmitRef = useRef<TDetailPageNextActionAfterSubmit>(
    detailPageNextActionAfterSubmitMapper.DEFAULT
  );

  //
  // callback
  //
  const addAfterSubmit = useCallback(() => {
    nextActionAfterSubmitRef.current = detailPageNextActionAfterSubmitMapper.ADD;
  }, []);

  const remainAfterSubmit = useCallback(() => {
    nextActionAfterSubmitRef.current = detailPageNextActionAfterSubmitMapper.REMAIN;
  }, []);

  const defaultAfterSubmit = useCallback(() => {
    nextActionAfterSubmitRef.current = detailPageNextActionAfterSubmitMapper.DEFAULT;
  }, []);

  return {
    nextActionAfterSubmitRef,
    addAfterSubmit,
    remainAfterSubmit,
    defaultAfterSubmit,
  };
};

export default useDetailPageNextActionAfterSubmit;
