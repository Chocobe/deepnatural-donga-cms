// react
import {
  useState,
  useCallback,
  memo,
} from 'react';
// ui
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn-ui/ui/dialog';
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
import CommonSelect from '../../CommonSelect/CommonSelect';
// icon
import { 
  LuFileOutput,
} from 'react-icons/lu';
// type
import { 
  exportModalSetFileFormatMapper,
  exportModalSetFileFormatOptions,
  TExportModalSetFileFormat,
} from './ExportModalSet.type';
import { 
  TProduceMathQuestionsExportApiResponse,
} from '@/apis/math/mathApi.type';
// style
import './ExportModalSet.css';

type TExportModalSetProps = {
  isOpen: boolean;
  openExportModal: () => void;
  closeExportModal: () => void;

  exportApiFunction: (fileFormat: TExportModalSetFileFormat) => Promise<TProduceMathQuestionsExportApiResponse>;
};

function _ExportModalSet(props: TExportModalSetProps) {
  const {
    isOpen,
    openExportModal,
    closeExportModal,
    exportApiFunction,
  } = props;

  //
  // state
  //
  const [fileFormat, setFileFormat] = useState<TExportModalSetFileFormat>(
    exportModalSetFileFormatMapper.XLSX
  );

  //
  // callback
  //
  const onChangeFileFormat = useCallback((fileFormat: TExportModalSetFileFormat) => {
    setFileFormat(fileFormat);
  }, []);

  const onOpenChange = useCallback((isOpen: boolean) => {
    isOpen
      ? openExportModal()
      : closeExportModal();
  }, [
    openExportModal,
    closeExportModal,
  ]);

  const onClickExportButton = useCallback(() => {
    exportApiFunction(fileFormat);
  }, [
    fileFormat,
    exportApiFunction,
  ]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          className=""
          variant="default"
          onClick={openExportModal}>
          <LuFileOutput className="mr-2 w-4 h-4" />
          다운로드
        </Button>
      </DialogTrigger>

      <DialogContent className="ExportModalSet">
        <DialogHeader className="ExportModalSet-header">
          <DialogTitle className="title">
            다운로드
          </DialogTitle>

          <DialogDescription className="description">
            선택하신 문항을 내보내기 합니다.
          </DialogDescription>
        </DialogHeader>

        <div className="ExportModalSet-main">
          <CommonSelect
            options={exportModalSetFileFormatOptions}
            value={fileFormat}
            onChange={onChangeFileFormat}
          />
        </div>

        <DialogFooter className="ExportModalSet-footer">
          <Button
            className="button"
            variant="outline"
            onClick={closeExportModal}>
            취소
          </Button>

          <Button
            className="button !ml-2.5"
            variant="default"
            onClick={onClickExportButton}>
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const ExportModalSet = memo(_ExportModalSet);
export default ExportModalSet;
