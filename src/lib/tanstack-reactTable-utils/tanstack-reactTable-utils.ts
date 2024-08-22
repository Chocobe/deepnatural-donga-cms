const EXTRACT_ID_REGEXP = /(.*_)?(.*)$/;

export const extractID = (value: string) => {
  const match = value.match(EXTRACT_ID_REGEXP);

  return match?.[2]
    ? match[2]
    : null;
};

export const TABLE_ROW_SELECTION_CHECKBOX_ID = 'table-row-selector';

export type TListItemWithOriginItemIndex<T> = T & {
  originItemIndex: number;
};

export const addOriginItemIndexToTableData = <T>(
  tableData: T[]
): TListItemWithOriginItemIndex<T>[] => {
  return tableData.map((item, originItemIndex) => {
    return typeof item !== 'object'
      ? item as TListItemWithOriginItemIndex<T>
      : {
        ...item,
        originItemIndex,
      };
  });
};
