/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/prop-types */
import type { FrameUIComponents, FrameUITheme } from '@frames.js/render/ui';
import classNames from 'classnames';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import baseLoading from './base-loading.gif';

type StylingProps = {
  className?: string;
  style?: React.CSSProperties;
};

export const theme: FrameUITheme<StylingProps> = {
  Error: {
    className:
      'flex flex-col rounded-3xl overflow-hidden bg-transparent relative items-center justify-center opacity-50',
  },
  Root: {
    className:
      'relative flex flex-col rounded-3xl items-center justify-center overflow-hidden bg-transparent relative border border-palette-line/20 min-w-[245px] min-h-[245px]',
  },
  ButtonsContainer: {
    className:
      'w-full text-xs sm:text-sm flex p-2 justify-around bg-palette-positiveForeground gap-2 sm:gap-4',
  },
  Button: {
    className:
      'text-sm grow py-3 px-5 rounded-full bg-[#F3F3F3] text-palette-secondaryForeground font-medium transition-colors hover:bg-state-b-hovered min-h-[44px]',
  },
  ImageContainer: {
    className: 'flex flex-grow border-0 overflow-hidden',
  },
  TextInputContainer: {
    className:
      'bg-palette-positiveForeground flex flex-row items-center justify-around gap-2 w-full',
  },
  TextInput: {
    className: 'rounded-xl border border-palette-line/20 px-3 py-2 mt-3 mx-3 w-full',
  },
};

function isDataUrl(url: string) {
  return /^data:image\/[a-zA-Z]+;base64,/.test(url);
}

function isSvgDataUrl(url: string) {
  return url.startsWith('data:image/svg+xml');
}

type TransitionWrapperProps = {
  aspectRatio: '1:1' | '1.91:1';
  src: string;
  alt: string;
  onImageLoadEnd: () => void;
  stylingProps: StylingProps;
  status: 'frame-loading' | 'frame-loading-complete';
};

function TransitionWrapper({
  aspectRatio,
  src,
  alt,
  onImageLoadEnd,
  stylingProps,
  status,
}: TransitionWrapperProps) {
  const [isTransitioning, setIsTransitioning] = useState(true);
  const isLoading = status === 'frame-loading';
  useEffect(() => {
    let timeout: number;
    if (!isLoading) {
      timeout = setTimeout(() => {
        setIsTransitioning(false);
      }, 500) as unknown as number;
    } else {
      setIsTransitioning(true);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isLoading]);

  const ar = aspectRatio.replace(':', '/');

  const style = useMemo(
    () => ({
      '--frame-image-aspect-ratio': ar,
      ...(isCssProperties(stylingProps.style) && stylingProps.style),
    }),
    [ar, stylingProps.style],
  );

  const assetSrc = useMemo(
    () =>
      isLoading || isSvgDataUrl(src)
        ? '' // todo: in the svg case, add an error state instead
        : isDataUrl(src)
        ? src
        : `/frames/img-proxy?url=${encodeURIComponent(src)}`,
    [isLoading, src],
  );

  return (
    <div className="relative">
      {/* Loading Screen */}
      <div
        className={classNames(
          'absolute inset-0 flex items-center justify-center transition-opacity duration-500',
          { 'opacity-0': !isLoading || !isTransitioning, 'opacity-100': isLoading },
        )}
      >
        <Image src={baseLoading} alt="" width={22} height={22} />
      </div>

      {/* Image */}
      <img
        {...stylingProps}
        src={assetSrc}
        alt={alt}
        onLoad={onImageLoadEnd}
        onError={onImageLoadEnd}
        data-aspect-ratio={ar}
        style={style}
        className={classNames('transition-opacity duration-500', {
          'opacity-0': isLoading || isTransitioning,
          'opacity-100': !isLoading && !isTransitioning,
        })}
      />
    </div>
  );
}

export const components: FrameUIComponents<StylingProps> = {
  LoadingScreen: (props, stylingProps) => {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src={baseLoading}
          alt=""
          width={22}
          height={22}
          className={classNames('', {
            hidden: props.frameState.status !== 'loading',
          })}
          style={stylingProps.style}
        />
      </div>
    );
  },
  Image(props, stylingProps) {
    // @ts-expect-error frames.js doesn't export this type so ours is a little off
    return <TransitionWrapper {...props} stylingProps={stylingProps} />;
  },
};

function isCssProperties(value: unknown): value is React.CSSProperties {
  return typeof value === 'object' && value !== null;
}
