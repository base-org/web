/* Copied From neymar react SDK */

import { NeynarFrame } from 'apps/web/src/components/NeymarFrame';

export const NEYNAR_API_URL = 'https://sdk-api.neynar.com';
export const SDK_VERSION = '0.7.2';

export const customFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
  options.headers = {
    ...options.headers,
    'x-sdk': 'react',
    'x-sdk-version': SDK_VERSION,
  };

  return fetch(url, options);
};

// TODO: There's way more that neymar returns but we only need this fo rnow
export type NeymarCastData = {
  cast: {
    frames: NeynarFrame[];
    hash: string;
  };
};
export async function fetchCastByIdentifier({
  type,
  identifier,
  viewerFid,
  clientId,
}: {
  type: 'url' | 'hash';
  identifier: string;
  viewerFid?: number;
  clientId: string;
}): Promise<NeymarCastData['cast'] | null> {
  try {
    let requestUrl = `${NEYNAR_API_URL}/v2/farcaster/cast?type=${type}&identifier=${identifier}${
      viewerFid ? `&viewer_fid=${viewerFid}` : ''
    }&client_id=${clientId}`;
    const response = await customFetch(requestUrl);
    const data = (await response.json()) as NeymarCastData;
    return data?.cast || null;
  } catch (error) {
    console.error('Error fetching cast by identifier', error);
    return null;
  }
}

export async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout = 8000,
): Promise<Response> {
  return Promise.race([
    customFetch(url, options),
    new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), timeout),
    ),
  ]);
}
