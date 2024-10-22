export type TImportModalSetTemplateFile = {
  text: string;
  fileUrl: string;
};

export type TImportModalSetApiFunctionData = {
  label: string;
  apiFunction: (file: File) => Promise<any>;
};
