import { StaticImageData } from 'next/image';

export const STATIC_IMAGE_FOLDER = '/_next/static/';
export const PUBLIC_IMAGE_FOLDER = '/images/';
export const VERCEL_BLOB_HOSTNAME = 'https://zku9gdedgba48lmr.public.blob.vercel-storage.com';

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
  const isVercelBlobImage = absoluteImageSource.startsWith(VERCEL_BLOB_HOSTNAME);
  if (isVercelBlobImage) return true;

  // Any other image, don't load via base.org / nextjs image proxy
  return false;
};
