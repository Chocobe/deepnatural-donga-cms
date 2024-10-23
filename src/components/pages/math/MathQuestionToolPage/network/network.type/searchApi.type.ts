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

//
// retrieveChapter1List
// 
// FIXME: CMS의 Chapter1Model과 혼용 불가
export type TRetrieveChapter1ApiPathParams = {
    title: string;
    textbookTitle: string;
    page?: number;
};

// FIXME: CMS의 Chapter1Model과 혼용 불가
export type TRetrieveChapter1ApiPayload = {
    pathParams: TRetrieveChapter1ApiPathParams;
};

// FIXME: CMS의 Chapter1Model과 혼용 불가
export type TRetrieveChapter1ApiResult = {
    id: string;
    textbook: string;
    no: string | number;
    title: string;
};

// FIXME: CMS의 Chapter1Model과 혼용 불가
export type TRetrieveChapter1ApiResponse = TSearchApiPagination & {
    results:  TRetrieveChapter1ApiResult[];
};

// 
// retrieveChapter2List
// 
// FIXME: CMS의 Chapter2Model과 혼용 불가
export type TRetrieveChapter2ApiPathParams = {
    title: string;
    textbookTitle: string;
    chapter1Title: string;
    page?: number;
};

// FIXME: CMS의 Chapter2Model과 혼용 불가
export type TRetrieveChapter2ApiPayload = {
    pathParams: TRetrieveChapter2ApiPathParams;
};

// FIXME: CMS의 Chapter2Model과 혼용 불가
export type TRetrieveChapter2ApiResult = {
    id: string;
    textbook: string;
    chapter1: string;
    no: string | number;
    title: string;
};

// FIXME: CMS의 Chapter2Model과 혼용 불가
export type TRetrieveChapter2ApiResponse = TSearchApiPagination & {
    results:  TRetrieveChapter2ApiResult[];
};

//
// retrieveChapter3List
//
// FIXME: CMS의 Chapter3Model과 혼용 불가
export type TRetrieveChapter3ApiPathParams = {
    title: string;
    textbookTitle: string;
    chapter1Title: string;
    chapter2Title: string;
    page?: number;
};

// FIXME: CMS의 Chapter3Model과 혼용 불가
export type TRetrieveChapter3ApiPayload = {
    pathParams: TRetrieveChapter3ApiPathParams;
};

// FIXME: CMS의 Chapter3Model과 혼용 불가
export type TRetrieveChapter3ApiResult = {
    id: string;
    textbook: string;
    chapter1: string;
    chapter2: string;
    no: string | number;
    title: string;
};

// FIXME: CMS의 Chapter3Model과 혼용 불가
export type TRetrieveChapter3ApiResponse = TSearchApiPagination & {
    results: TRetrieveChapter3ApiResult[];
};
