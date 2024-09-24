// FIXME: CMS 파일구조와 통합하기
// FIXME: CMS 파일구조와 통합하기
// FIXME: CMS 파일구조와 통합하기

export type TResultItemOfSubmitApiPayload = {
    [id: string]: string | number | boolean | null;
};

//
// submitTask
//
export type TSubmitApiPayload = {
    metadata: TResultItemOfSubmitApiPayload;
    results: TResultItemOfSubmitApiPayload[];
};

export type TSubmitApiResponse = {
    message: string;
};
