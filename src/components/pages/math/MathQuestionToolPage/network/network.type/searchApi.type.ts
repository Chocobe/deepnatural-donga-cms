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
// retrieveSourceList
//
// FIXME: CMS의 SourceModel과 혼용 불가
export type TRetrieveSourceListApiPathParams = {
    productName: string;
    page?: number;
};

// FIXME: CMS의 SourceModel과 혼용 불가
export type TRetrieveSourceListApiPayload = {
    pathParams: TRetrieveSourceListApiPathParams;
};

// FIXME: CMS의 SourceModel과 혼용 불가
export type TRetrieveSourceListApiResult = {
    id: string;
    series: string;
    schoolLevel: string;
    grade: number;
    semester: string;
    subject: string;
    productName: string;
    format: string;
    author: string;
    publisher: string;
    curriculum: string;
};

// FIXME: CMS의 SourceModel과 혼용 불가
export type TRetrieveSourceListApiResponse = TSearchApiPagination & {
    results: TRetrieveSourceListApiResult[];
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
// retrieveTextbookList
//
// FIXME: CMS의 TextbookModel과 혼용 불가
export type TRetrieveTextbookApiPathParams = {
    title: string;
    page?: number;
};

// FIXME: CMS의 TextbookModel과 혼용 불가
export type TRetrieveTextbookApiPayload = {
    pathParams: TRetrieveTextbookApiPathParams;
};

// FIXME: CMS의 TextbookModel과 혼용 불가
export type TRetrieveTextbookApiResult = {
    id: string;
    semester: string;
    grade: string;
    schoolLevel: string;
    title: string;
    author: string;
};

// FIXME: CMS의 TextbookModel과 혼용 불가
export type TRetrieveTextbookApiResponse = TSearchApiPagination & {
    results: TRetrieveTextbookApiResult[];
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
