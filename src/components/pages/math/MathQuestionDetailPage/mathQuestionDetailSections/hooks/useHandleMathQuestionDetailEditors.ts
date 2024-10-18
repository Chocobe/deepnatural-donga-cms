// react
import {
  useCallback,
  ChangeEvent,
} from 'react';
// store
import useMathQuestionPageStore from '@/store/mathStores/mathQuestionPageStore/mathQuestionPageStore';

const useHandleMathQuestionDetailEditors = () => {
  //
  // mathQuestionPage store
  //
  const updateDetailFormState = useMathQuestionPageStore(state => state.updateDetailFormState);

  //
  // callback
  //
  const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      id,
      value,
    } = e.target;

    updateDetailFormState(old => ({
      ...old,
      [id]: value,
    }));
  }, [updateDetailFormState]);

  const onChangeSelect = useCallback((
    value: string,
    id?: string
  ) => {
    if (!id) {
      return;
    }

    updateDetailFormState(old => ({
      ...old,
      [id]: value,
    }));
  }, [updateDetailFormState]);

  return {
    onChangeInput,
    onChangeSelect,
  };
};

export default useHandleMathQuestionDetailEditors;
