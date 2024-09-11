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
      'flex-1 w-full text-xs sm:text-sm flex sm:py-3 py-2 sm:px-7 px-2 justify-around bg-[#F3F3F3] gap-2 sm:gap-4',
  },
  Button: {
    className:
      'grow py-4 rounded-lg bg-white border border-[#CFD0D2] transition-colors hover:bg-state-b-hovered',
  },
  ImageContainer: {
    className: 'flex w-full h-full border-0 overflow-hidden',
  },
  TextInputContainer: {
    className: 'flex flex-row items-center justify-around gap-2 w-full',
  },
  TextInput: {
    className: 'w-full outline-0 focus:outline-0',
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
  // this implementation is taken from frames.js with a slight modification to account for a bug with alt text
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
