// FIXME: CMS 파일구조와 통합하기
// FIXME: CMS 파일구조와 통합하기
// FIXME: CMS 파일구조와 통합하기

export type TSearchApiPagination = {
    currentPage: number;
    lastPage: number;
};

export type TSearchApiBaseGeneric = TSearchApiPagination & {
    results: Array<any>;
};

//
// retrieveKnowledgeConceptList
//
// FIXME: CMS의 KnowledgeConceptModel과 혼용 불가
export type TRetrieveKnowledgeConceptListApiPathPararms = {
    title: string;
    page?: number;
};

// FIXME: CMS의 KnowledgeConceptModel과 혼용 불가
export type TRetrieveKnowledgeConceptListApiPayload = {
    pathParams: TRetrieveKnowledgeConceptListApiPathPararms;
};

// FIXME: CMS의 KnowledgeConceptModel과 혼용 불가
export type TRetrieveKnowledgeConceptListApiResult = {
    id: string;
    title: string;
    kc1: string;
    achievement3: string;
    achievement2: string;
    achievement1: string;

    comment: any;
};

// FIXME: CMS의 KnowledgeConceptModel과 혼용 불가
export type TRetrieveKnowledgeConceptListApiResponse = TSearchApiPagination & {
    results: TRetrieveKnowledgeConceptListApiResult[];
};
