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

export const exportModalSetFileExtensionMapper = {
  [exportModalSetFileFormatMapper.CSV]: 'csv',
  [exportModalSetFileFormatMapper.XLSX]: 'xlsx',
  [exportModalSetFileFormatMapper.XLSX_MATH_ML]: 'xlsx',
  [exportModalSetFileFormatMapper.MATH_ML_HTML]: 'html',
} as const;
