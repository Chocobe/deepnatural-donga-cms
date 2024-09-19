// react
import {
  useCallback,
  memo,
} from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/ui/select';
// style
import './PdfSelector.css';

type TPdfSelectorProps = {
    value: number;
    pdfFileNameList: string[];
    onChange: (index: number) => void;
};

function _PdfSelector(props: TPdfSelectorProps) {
  const {
    value,
    pdfFileNameList,
    onChange,
  } = props;

  //
  // callback
  //
  const onChangeSelect = useCallback((value: string) => {
    const index = Number(value);
    onChange(index);
  }, [onChange]);

  return (
    <Select
      value={String(value)}
      onValueChange={onChangeSelect}>
      <SelectTrigger className="PdfSelector">
        <SelectValue placeholder="" />
      </SelectTrigger>

      <SelectContent className="">
        {pdfFileNameList.map((pdfFileName, index) => (
          <SelectItem
            key={index}
            value={String(index)}>
            {pdfFileName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

const PdfSelector = memo(_PdfSelector);
export default PdfSelector;
