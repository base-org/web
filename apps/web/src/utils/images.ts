import { StaticImageData } from 'next/image';

import { Cloudinary, transformationStringFromObject } from '@cloudinary/url-gen';

// Create and configure your Cloudinary instance.
const cloudinaryClient = new Cloudinary({
  cloud: {
    cloudName: 'coinbase',
  },
});

export const STATIC_IMAGE_FOLDER = '/_next/static/';
export const PUBLIC_IMAGE_FOLDER = '/images/';

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

  // Any other image, don't load via base.org / nextjs image proxy
  return false;
};

function isDataUrl(url: string) {
  return /^data:image\/[a-zA-Z]+;base64,/.test(url);
}

type GetCloudinaryMediaUrlParams = {
  media: string;
  width: number;
};

export function getCloudinaryMediaUrl({
  media,
  width,
}: // transformation = '',
// cloudName = 'coin-nft-dev',
GetCloudinaryMediaUrlParams) {
  // const parts = [`https://res.cloudinary.com/${cloudName}/image/fetch`];

  if (isDataUrl(media)) return media;

  // * 2 for high pixel density screens
  const transformation = transformationStringFromObject([{ width: width * 2 }]);

  let image = cloudinaryClient
    .image(media)
    .addTransformation(transformation)
    .setDeliveryType('fetch');
  return image.toURL();
}
