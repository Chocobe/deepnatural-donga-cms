// react
import {
  useState,
  useCallback,
} from 'react';

const useSearchModal = () => {
  //
  // state
  //
  const [isOpenSearchModal, setIsOpenSearchModal] = useState(false);

  //
  // callback
  //
  const onChangeIsOpenSearchModal = useCallback((isOpen: boolean) => {
    setIsOpenSearchModal(isOpen);
  }, []);

  const openSearchModal = useCallback(() => {
    setIsOpenSearchModal(true);
  }, []);

  const closeSearchModal = useCallback(() => {
    setIsOpenSearchModal(false);
  }, []);

  return {
    isOpenSearchModal,
    onChangeIsOpenSearchModal,
    openSearchModal,
    closeSearchModal,
  };
};

export default useSearchModal;
