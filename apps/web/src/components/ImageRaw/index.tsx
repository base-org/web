'use client';

import { getImageAbsoluteSource, getCloudinaryMediaUrl } from 'apps/web/src/utils/images';
import { isDataUrl } from 'apps/web/src/utils/urls';
import { StaticImageData } from 'next/image';
import { CSSProperties, useEffect, useState } from 'react';

type ImageRawProps = {
  src: string | StaticImageData;
  alt: string;
  title?: string;
  width?: number | `${number}` | undefined;
  height?: number | `${number}` | undefined;
  className?: string;
  onLoad?: React.ReactEventHandler<HTMLImageElement>;
  onError?: React.ReactEventHandler<HTMLImageElement>;
  style?: CSSProperties;
};

// This image component is to purposefully avoid loading images via base.org
export default function ImageRaw({
  src,
  alt,
  title,
  width,
  height,
  className,
  onLoad,
  onError,
  style,
}: ImageRawProps) {
  const imageSrc = getImageAbsoluteSource(src);
  const dataUrl = isDataUrl(imageSrc);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Some image can be proxied directly ("fetch")
  const cloudinaryFetchUrl = getCloudinaryMediaUrl({
    media: imageSrc,
    width: width,
  });

  useEffect(() => {
    // Some image needs to be upload befored being proxied

    // dataUrl & long Urls (dataUrl in disguise) needs to be uploaded to Cloudinary

    if (dataUrl || imageSrc.length > 1000) {
      async function handleGetCloudinaryUrl() {
        try {
          const response = await fetch('/api/cloudinaryUrl', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              media: imageSrc,
              width: width,
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to get Cloudinary URL');
          }

          const data = await response.json();
          const url = data?.url as unknown;
          if (url) {
            setImageUrl(url);
          }
        } catch (error) {
          console.error('Error getting Cloudinary URL:', error);
        }
      }

      handleGetCloudinaryUrl()
        .then()
        .catch((error) => console.log(error));
    }
  }, [dataUrl, imageSrc, width]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageUrl ?? cloudinaryFetchUrl}
      className={className}
      alt={alt}
      title={title}
      onLoad={onLoad}
      onError={onError}
      width={width}
      height={height}
      style={style}
    />
  );
}
