// react
import {
  useState,
  useCallback,
} from 'react';

const useImportModalSet = () => {
  //
  // state
  //
  const [isOpenImportModal, setIsOpenImportModal] = useState(false);

  //
  // callback
  //
  const openImportModal = useCallback(() => {
    setIsOpenImportModal(true);
  }, []);

  const closeImportModal = useCallback(() => {
    setIsOpenImportModal(false);
  }, []);

  return {
    isOpenImportModal,
    openImportModal,
    closeImportModal,
  };
};

export default useImportModalSet;
