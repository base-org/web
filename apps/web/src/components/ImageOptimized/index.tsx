import Image, { ImageProps, StaticImageData } from 'next/image';
import { shouldUseNextImage } from 'apps/web/src/utils/images';
import ImageRaw from 'apps/web/src/components/ImageRaw';

type ImageOptimizedProps = ImageProps & {
  // Fix next's js bad import
  src: string | StaticImageData;
};

export default function ImageOptimized({
  priority,
  src,
  alt,
  title,
  width,
  height,
  className,
  onLoad,
  placeholder,
  quality,
  style,
  fill,
}: ImageOptimizedProps) {
  const useNextImage = shouldUseNextImage(src);

  return useNextImage ? (
    <Image
      src={src}
      className={className}
      alt={alt}
      title={title}
      placeholder={placeholder}
      onLoad={onLoad}
      width={width}
      height={height}
      quality={quality}
      style={style}
      priority={priority}
      fill={fill}
    />
  ) : (
    <ImageRaw
      src={src}
      className={className}
      alt={alt}
      title={title}
      onLoad={onLoad}
      width={width}
      height={height}
      style={style}
    />
  );
}
