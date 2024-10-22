// react
import {
  useState,
  useCallback,
} from 'react';

const useExportModalSet = () => {
  //
  // state
  //
  const [isOpenExportModal, setIsOpenExportModal] = useState(false);

  //
  // callback
  //
  const openExportModal = useCallback(() => {
    setIsOpenExportModal(true);
  }, []);

  const closeExportModal = useCallback(() => {
    setIsOpenExportModal(false);
  }, []);

  return {
    isOpenExportModal,
    openExportModal,
    closeExportModal,
  };
};

export default useExportModalSet;
