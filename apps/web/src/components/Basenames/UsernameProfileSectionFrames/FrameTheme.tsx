import type { FrameUIComponents, FrameUITheme } from '@frames.js/render/ui';
import Image from 'next/image';
import BaseLoading from './base-loading.gif';
import classNames from 'classnames';
import { createElement } from 'react';

type StylingProps = {
  className?: string;
  style?: React.CSSProperties;
};

export const theme: FrameUITheme<StylingProps> = {
  Error: {
    className:
      'flex flex-col rounded-lg overflow-hidden bg-transparent relative items-center justify-center opacity-50',
  },
  Root: {
    className:
      'flex flex-col rounded-lg items-center justify-center overflow-hidden bg-transparent relative border border-palette-line/20 min-h-[245px] min-w-[346px]',
  },
  ButtonsContainer: {
    className:
      'flex-1 w-full text-xs sm:text-sm flex sm:py-3 py-2 sm:px-7 px-2 justify-around bg-palette-positiveForeground gap-2 sm:gap-4',
  },
  Button: {
    className:
      'grow py-3 px-8 rounded-full bg-[#F3F3F3] text-palette-secondaryForeground font-medium transition-colors hover:bg-state-b-hovered max-h-[44px]',
  },
  ImageContainer: {
    className: 'flex w-full h-full border-0 overflow-hidden',
  },
  TextInputContainer: {
    className:
      'bg-palette-positiveForeground flex flex-row items-center justify-around gap-2 w-full',
  },
  TextInput: {
    className: 'rounded-xl border border-palette-line/20 px-3 py-2 mt-3 mx-3 w-full',
  },
};

export const components: FrameUIComponents<StylingProps> = {
  LoadingScreen: (props) => {
    return (
      <Image
        src={BaseLoading}
        alt=""
        width={22}
        height={22}
        className={classNames({
          // eslint-disable-next-line react/prop-types
          hidden: props.frameState.status !== 'loading',
        })}
      />
    );
  },
  // This implementation is taken from frames.js with a slight modification to account for a bug with alt text.
  Image(props, stylingProps) {
    // eslint-disable-next-line react/prop-types
    const aspectRatio = props.aspectRatio.replace(':', '/');

    return createElement('img', {
      ...stylingProps,
      'data-aspect-ratio': aspectRatio,

      style: {
        '--frame-image-aspect-ratio': aspectRatio,
        ...(isCssProperties(stylingProps.style) && stylingProps.style),
      },
      // eslint-disable-next-line react/prop-types
      onLoad: props.onImageLoadEnd,
      // eslint-disable-next-line react/prop-types
      onError: props.onImageLoadEnd,
      // eslint-disable-next-line react/prop-types
      src: props.status === 'frame-loading' ? undefined : props.src,
    });
  },
};

function isCssProperties(value: unknown): value is React.CSSProperties {
  return typeof value === 'object' && value !== null;
}
