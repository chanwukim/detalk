export type FetcherResponse<T = unknown> = {
  json: <Body = T>() => Promise<Body>;
} & Response;

export interface ResponsePromise<T = unknown>
  extends Promise<FetcherResponse<T>> {
  arrayBuffer: () => Promise<ArrayBuffer>;
  blob: () => Promise<Blob>;
  formData: () => Promise<FormData>;
  json: <Body = T>() => Promise<Body>;
  text: () => Promise<string>;
}
