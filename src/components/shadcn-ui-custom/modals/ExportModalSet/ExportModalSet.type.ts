// type
import { 
  TCommonSelectOptionItem,
} from '../../CommonSelect/CommonSelect.type';

export const exportModalSetFileFormatMapper = {
  CSV: 'csv',
  XLSX: 'xlsx',
  XLSX_MATH_ML: 'xlsx(MathML)',
  MATH_ML_HTML: 'MathML(HTML)',
} as const;
export type TExportModalSetFileFormat = typeof exportModalSetFileFormatMapper[keyof typeof exportModalSetFileFormatMapper];

export const exportModalSetFileFormatOptions: TCommonSelectOptionItem[] = Object
  .values(exportModalSetFileFormatMapper)
  .map(value => ({
    text: value,
    value,
  }));
