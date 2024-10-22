// react
import {
  useRef,
  useState,
  useCallback,
  memo,
  ChangeEvent,
  useEffect,
  useMemo,
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
import { 
  Input,
} from '@/components/shadcn-ui/ui/input';
// icon
import { 
  LuFileDown,
  LuFileOutput,
} from 'react-icons/lu';
// type
import { 
  TImportModalSetTemplateFile,
} from './ImportModalSet.type';
// style
import './ImportModalSet.css';

type TImportModalSetProps = {
  isOpen: boolean;
  description?: string;
  templateFiles?: TImportModalSetTemplateFile[];

  openImportModal: () => void;
  closeImportModal: () => void;

  importApiFunction: (file: File) => Promise<any>;
};

function _ImportModalSet(props: TImportModalSetProps) {
  const {
    isOpen,
    description,
    templateFiles,

    openImportModal,
    closeImportModal,
    importApiFunction,
  } = props;

  //
  // ref
  //
  const $inputRef = useRef<HTMLInputElement | null>(null);

  //
  // state
  //
  const [file, setFile] = useState<File | null>(null);

  //
  // callback
  //
  const onOpenChange = useCallback((isOpen: boolean) => {
    isOpen
      ? openImportModal()
      : closeImportModal();
  }, [
    openImportModal,
    closeImportModal,
  ]);

  const onChangeFileInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;

    setFile(file);
  }, []);

  const onClickImportButton = useCallback(() => {
    if (!file) {
      return;
    }

    importApiFunction(file);
  }, [
    file,
    importApiFunction,
  ]);

  const onClickDownloadTemplate = useCallback(async (
    fileUrl: string
  ) => {
    const fileName = fileUrl.match(/^.+\/(.+\.\w+)$/)?.[1] ?? '템플릿.txt';

    const $anchor = document.createElement('a') as HTMLAnchorElement;
    $anchor.href = fileUrl;
    $anchor.download = fileName;
    $anchor.click();
  }, []);

  //
  // cache
  //
  const displayDescription = useMemo(() => {
    return description
      ? description
      : templateFiles?.length
        ? '아래 템플릿에 부합하는 Excel 및 CSV 파일을 업로드합니다.'
        : 'Excel 및 CSV 파일을 업로드합니다.';
  }, [description, templateFiles]);

  const templateLinks = useMemo(() => {
    return templateFiles?.map((template, index) => {
      const {
        text,
        fileUrl,
      } = template;

      return (
        <Button
          key={index}
          className="downloadLink"
          variant="link"
          onClick={() => onClickDownloadTemplate(fileUrl)}
        >
          <LuFileDown className="w-4 h-4 mr-1" />
          {text}
        </Button>
      );
    }) ?? null;
  }, [
    templateFiles,
    onClickDownloadTemplate,
  ]);

  //
  // effect
  //
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    return () => {
      // eslint-disable-next-line
      const $input = $inputRef.current;

      if (!$input) {
        return;
      }

      $input.value = '';
      setFile(null);
    };

    // 
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          className=""
          variant="default"
          onClick={openImportModal}>
          <LuFileOutput className="mr-2 w-4 h-4" />
          업로드
        </Button>
      </DialogTrigger>

      <DialogContent className="ImportModalSet">
        <DialogHeader className="ImportModalSet-header">
          <DialogTitle className="title">
            업로드
          </DialogTitle>

          <DialogDescription className="description">
            {displayDescription}

            {templateLinks && (
              <span className="templateWrapper">
                {templateLinks}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="ImportModalSet-main">
          <Input
            ref={$inputRef}
            className=""
            type="file"
            accept=".csv, .xls, .xlsx"
            multiple={false}
            onChange={onChangeFileInput} />
        </div>

        <DialogFooter className="ImportModalSet-footer">
          <Button
            className="button"
            variant="outline"
            onClick={closeImportModal}>
            취소
          </Button>

          <Button
            className="button !ml-2.5"
            variant="default"
            disabled={!file}
            onClick={onClickImportButton}>
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const ImportModalSet = memo(_ImportModalSet);
export default ImportModalSet;
