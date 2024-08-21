const EXTRACT_ID_REGEXP = /(.*_)?(.*)$/;

export const extractID = (value: string) => {
  const match = value.match(EXTRACT_ID_REGEXP);

  return match?.[2]
    ? match[2]
    : null;
};

export const TABLE_ROW_SELECTION_CHECKBOX_ID = 'table-row-selector';
