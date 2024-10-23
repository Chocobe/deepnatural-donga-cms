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
import CommonSelect from '../../CommonSelect/CommonSelect';
// icon
import { 
  LuFileDown,
  LuFileOutput,
} from 'react-icons/lu';
// type
import { 
  TImportModalSetApiFunctionData,
  TImportModalSetTemplateFile,
} from './ImportModalSet.type';
import { 
  TCommonSelectOptionItem,
} from '../../CommonSelect/CommonSelect.type';
// style
import './ImportModalSet.css';

type TImportModalSetProps = {
  isOpen: boolean;
  description?: string;
  templateFiles?: TImportModalSetTemplateFile[];
  importApiFunctions: TImportModalSetApiFunctionData[];

  openImportModal: () => void;
  closeImportModal: () => void;
};

function _ImportModalSet(props: TImportModalSetProps) {
  const {
    isOpen,
    description,
    templateFiles,
    importApiFunctions,

    openImportModal,
    closeImportModal,
  } = props;

  //
  // ref
  //
  const $inputRef = useRef<HTMLInputElement | null>(null);

  //
  // state
  //
  const [file, setFile] = useState<File | null>(null);
  const [importApiLabel, setImportApiLabel] = useState<string>(
    importApiFunctions[0]?.label ?? ''
  );

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

  const onChangeImportApiLabel = useCallback((importApiLabel: string) => {
    setImportApiLabel(importApiLabel);
  }, []);

  const onChangeFileInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;

    setFile(file);
  }, []);

  const onClickImportButton = useCallback(() => {
    if (!file) {
      return;
    }

    const importApiFunctionData = importApiFunctions.find(({ label }) => {
      return label === importApiLabel;
    });

    importApiFunctionData?.apiFunction?.(file);
  }, [
    file,
    importApiLabel,
    importApiFunctions,
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
    return description || 
      '아래 템플릿 파일에 부합하는 Excel 및 CSV 파일을 업로드합니다.';
  }, [description]);

  const defaultTemplateFiles = useMemo<TImportModalSetTemplateFile[]>(() => [
    {
      text: 'Excel 템플릿 파일 다운로드',
      fileUrl: 'https://donga-cms-files.s3.ap-northeast-2.amazonaws.com/import/template.xlsx',
    },
    {
      text: 'CSV 템플릿 파일 다운로드',
      fileUrl: 'https://donga-cms-files.s3.ap-northeast-2.amazonaws.com/import/template.csv',
    },
  ], []);

  const templateLinks = useMemo(() => {
    const templates = templateFiles ?? defaultTemplateFiles;

    return templates.map((template, index) => {
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
    defaultTemplateFiles,
    onClickDownloadTemplate,
  ]);

  const importApiFunctionOptions = useMemo<TCommonSelectOptionItem[]>(() => {
    return importApiFunctions.map(data => ({
      text: data.label,
      value: data.label,
    }));
  }, [importApiFunctions]);

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
          <div className="item">
            <div className="label">
              업로드 유형
            </div>

            <CommonSelect
              value={importApiLabel}
              onChange={onChangeImportApiLabel}
              options={importApiFunctionOptions} />
          </div>

          <div className="item">
            <div className="label">
              파일
            </div>

            <Input
              ref={$inputRef}
              className=""
              type="file"
              accept=".csv, .xls, .xlsx"
              multiple={false}
              onChange={onChangeFileInput} />
          </div>
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
            업로드
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const ImportModalSet = memo(_ImportModalSet);
export default ImportModalSet;
