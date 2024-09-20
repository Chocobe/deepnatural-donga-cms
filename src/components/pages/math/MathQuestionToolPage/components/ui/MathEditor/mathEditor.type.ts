export type TMathEditorOnChangeParams = {
    indexOfResult: number;
    id: string;
    latex?: string;
    type: 'latex' | 'number' | 'text';
};
