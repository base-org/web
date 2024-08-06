import { StaticImageData } from 'next/image';
import { cid } from 'is-ipfs';

export type IpfsUri = `ipfs://${string}`;

export const STATIC_IMAGE_FOLDER = '/_next/static/';
export const PUBLIC_IMAGE_FOLDER = '/images/';
export const VERCEL_BLOB_HOSTNAME = 'zku9gdedgba48lmr.public.blob.vercel-storage.com';
export const IPFS_URI_PROTOCOL = 'ipfs://';
export const CLOUDFARE_IPFS_PROXY = 'https://cloudflare-ipfs.com';

// ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ

// https://cloudflare-ipfs.com/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ

export const getImageAbsoluteSource = (src: string | StaticImageData): string => {
  return typeof src === 'string' ? src : src.src;
};

export const shouldUseNextImage = (src: string | StaticImageData): boolean => {
  const absoluteImageSource = getImageAbsoluteSource(src);

  // Images imported from within a component
  const isStaticImage = absoluteImageSource.startsWith(STATIC_IMAGE_FOLDER);
  if (isStaticImage) return true;

  // Images in public folder
  const isPublicImage = absoluteImageSource.startsWith(PUBLIC_IMAGE_FOLDER);
  if (isPublicImage) return true;

  // Vercel blolb images (Basename Avatar)
  const url = new URL(absoluteImageSource);
  const isVercelBlobImage = url.protocol === 'https:' && url.hostname === VERCEL_BLOB_HOSTNAME;
  if (isVercelBlobImage) return true;

  // Any other image, don't load via base.org / nextjs image proxy
  return false;
};

export const IsValidIpfsUri = (ipfsUri: IpfsUri): boolean => {
  try {
    const url = new URL(ipfsUri);
    const ipfsCid = url.pathname.replace('//', '');
    const isValidCid = cid(ipfsCid);
    const isValidIpfsUrl = url.protocol === 'ipfs:' && isValidCid;
    return isValidIpfsUrl;
  } catch (error) {
    return false;
  }
};

export const getIpfsGatewayUrl = (ipfsUri?: IpfsUri): string | undefined => {
  if (!ipfsUri) return;

  const url = new URL(ipfsUri);
  const ipfsCid = url.pathname.replace('//', '');

  const isValidCid = cid(ipfsCid);
  const isValidIpfsUrl = url.protocol === 'ipfs:' && isValidCid;
  console.log({ isValidIpfsUrl });
  if (!isValidIpfsUrl) return;

  return `${CLOUDFARE_IPFS_PROXY}/ipfs/${ipfsCid}`;
};
