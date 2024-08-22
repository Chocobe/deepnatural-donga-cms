type TGenericParams<T = void> = T extends void
  ? {/** */}
  : T;

type TApiRequestPathParams<TPathParams = void> = TPathParams extends void
  ? TGenericParams<TPathParams>
  : TGenericParams<{ pathParams: TPathParams }>;

type TApiRequestSearchParams<TSearchParams = void> = TSearchParams extends void
  ? TGenericParams<TSearchParams>
  : TGenericParams<{ searchParams: TSearchParams }>;

type TApiRequestPayload<TPayload = void> = TPayload extends void
  ? TGenericParams<TPayload>
  : TGenericParams<{ payload: TPayload }>;

/** 
 * API 요청 params (`body`가 없는 요청 params) 
 * @property { TPathParams } 요청 URL 의 `dynamic path`
 * @property { TSearchParams } 요청 URL 의 `query string`
 */
export type TApiRequestNonBodyParams<
  TPathParams = void,
  TSearchParams = void
> = 
  & TApiRequestPathParams<TPathParams>
  & TApiRequestSearchParams<TSearchParams>;

/** 
 * API 요청 params (`body`가 있는 요청 params) 
 * @property { TPathParams } 요청 URL 의 `dynamic path`
 * @property { TSearchParams } 요청 URL 의 `query string`
 * @property { TPayload } 요청 `body` 의 `payload`
 */
export type TApiRequestBodyParams<
  TPathParams = void,
  TSearchParams = void,
  TPayload = void
> = 
  & TApiRequestPathParams<TPathParams>
  & TApiRequestSearchParams<TSearchParams>
  & TApiRequestPayload<TPayload>;
