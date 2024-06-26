export type QueryParams = Record<string, string>;

export const encodeUrlQueryParams = (queryParams: QueryParams) => {
  return Object.entries(queryParams)
    .map((kv) => kv.map(encodeURIComponent).join('='))
    .join('&');
};
export const urlWithQueryParams = (url: string, queryParams: QueryParams) => {
  return `${url}?${encodeUrlQueryParams(queryParams)}`;
};
