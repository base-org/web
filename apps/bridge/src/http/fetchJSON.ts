/* eslint-disable @typescript-eslint/parameter-properties */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
export class HTTPError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    readonly message: string,
    readonly description?: string,
    readonly errorDetail?: Record<string, string | number | boolean>,
  ) {
    super(message);
  }
}

type FetchMethod = 'GET' | 'POST' | 'DELETE';
type Headers = Record<string, string | undefined>;
type FetchResponse<T> = { status: number; body: T; headers: Headers };
type ResponseHeaders =
  | (globalThis.Headers & { entries: () => IterableIterator<[string, string]> })
  | null
  | undefined;

export type FetchOptions = {
  method: FetchMethod;
  additionalHeaders?: Headers;
  returnHeaders?: boolean;
};

/**
 * Throws HTTPError in case of non-200 response code.
 */

export async function request<T>(
  endpoint: string,
  body: string | null | undefined,
  method: string,
): Promise<FetchResponse<T>> {
  const url = new URL(endpoint);

  if (method === 'GET' && body) {
    url.search = body;
  }

  // Trim trailing slash
  const fullURL = url.toString().replace(/\/$/, '');
  const headers = {
    Accept: 'application/json',
  };
  const initOptions = ['POST', 'DELETE'].includes(method) ? { method, body } : null;
  const init: RequestInit = {
    headers,
    ...initOptions,
  };

  const response = await fetch(fullURL, init);

  if (response.status >= 400) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { error } = await response.json();
    throw new HTTPError(
      response.status,
      error?.code,
      error?.message,
      error?.description,
      error?.errorDetail,
    );
  }

  return {
    status: response.status,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    body: response.ok ? await response.json() : null,
    headers: Object.fromEntries((response.headers as ResponseHeaders)?.entries() ?? []),
  };
}

async function fetchJSON<T>(
  endpoint: string,
  body: string | null | undefined,
  method: string,
): Promise<FetchResponse<T>> {
  return request<T>(endpoint, body, method);
}

async function getFetchResponse<T>(
  endpoint: string,
  params: Record<string, string>,
): Promise<FetchResponse<T>> {
  const searchParams = new URLSearchParams(params).toString();
  return fetchJSON<T>(endpoint, searchParams, 'GET');
}

export async function getJSON<T>(endpoint: string, params: Record<string, string>): Promise<T> {
  return (await getFetchResponse<T>(endpoint, params)).body;
}
