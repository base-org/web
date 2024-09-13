import { cid } from 'is-ipfs';

export type IpfsUrl = `ipfs://${string}`;
export const VERCEL_BLOB_HOSTNAME = 'zku9gdedgba48lmr.public.blob.vercel-storage.com';
export const IPFS_URI_PROTOCOL = 'ipfs://';
export const CLOUDFARE_IPFS_PROXY = process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL
  ? `https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}`
  : 'https://cloudflare-ipfs.com';

export type QueryParams = Record<string, string>;

export const encodeUrlQueryParams = (queryParams: QueryParams) => {
  return Object.entries(queryParams)
    .map((kv) => kv.map(encodeURIComponent).join('='))
    .join('&');
};
export const urlWithQueryParams = (url: string, queryParams: QueryParams) => {
  return `${url}?${encodeUrlQueryParams(queryParams)}`;
};

export function isValidUrl(string?: string) {
  if (!string) return false;
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

export const IsValidIpfsUrl = (ipfsUrl: IpfsUrl): boolean => {
  try {
    const url = new URL(ipfsUrl);
    const ipfsCid = url.pathname.replace('//', '');
    const isValidCid = cid(ipfsCid);
    const isValidIpfsUrl = url.protocol === 'ipfs:' && isValidCid;
    return isValidIpfsUrl;
  } catch (error) {
    return false;
  }
};

export const IsValidVercelBlobUrl = (source: string): boolean => {
  try {
    const url = new URL(source);
    const isVercelBlobImage = url.protocol === 'https:' && url.hostname === VERCEL_BLOB_HOSTNAME;
    return isVercelBlobImage;
  } catch (error) {
    return false;
  }
};

export const getIpfsGatewayUrl = (ipfsUrl?: IpfsUrl): string | undefined => {
  if (!ipfsUrl) return;

  try {
    const url = new URL(ipfsUrl);
    const ipfsCid = url.pathname.replace('//', '');

    const isValidCid = cid(ipfsCid);
    const isValidIpfsUrl = url.protocol === 'ipfs:' && isValidCid;
    if (!isValidIpfsUrl) return;

    return `${CLOUDFARE_IPFS_PROXY}/ipfs/${ipfsCid}`;
  } catch (error) {
    return;
  }
};
