import {
  cdpBaseRpcEndpoint,
  cdpBaseSepoliaRpcEndpoint,
  cdpBaseUri,
} from 'apps/web/src/cdp/constants';
import { generateCdpJwt } from 'apps/web/src/cdp/jwt';
import { Response } from 'node-fetch';
import { createPublicClient, http } from 'viem';
import { base, baseSepolia } from 'viem/chains';

export async function cdpGet(endpoint: string, authed: boolean): Promise<Response> {
  const url = `https://${cdpBaseUri}/${endpoint}`;
  const headers = new Headers();
  if (authed) {
    const jwt = await generateCdpJwt('GET', endpoint);
    headers.set('Authorization', `Bearer ${jwt}`);
  }
  return fetch(url, {
    method: 'GET',
    headers,
  });
}

export function getPublicClient(chainId: number) {
  switch (chainId) {
    case baseSepolia.id:
      return createPublicClient({
        chain: baseSepolia,
        transport: http(cdpBaseSepoliaRpcEndpoint),
      });
    case base.id:
      return createPublicClient({
        chain: base,
        transport: http(cdpBaseRpcEndpoint),
      });
    default:
      throw new Error(`Unsupported chainId: ${chainId}`);
  }
}
