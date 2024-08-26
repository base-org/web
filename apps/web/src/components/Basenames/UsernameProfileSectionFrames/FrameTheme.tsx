import { type FrameUIComponents, type FrameUITheme } from '@frames.js/render/ui';

type StylingProps = {
  className?: string;
  style?: React.CSSProperties;
};

/**
 * You can override components to change their internal logic or structure if you want.
 * By default it is not necessary to do that since the default structure is already there
 * so you can just pass an empty object and use theme to style the components.
 *
 * You can also style components here and completely ignore theme if you wish.
 */
export const components: FrameUIComponents<StylingProps> = {};

/**
 * By default there are no styles so it is up to you to style the components as you wish.
 */
export const theme: FrameUITheme<StylingProps> = {
  Error: {
    className:
      'flex flex-col w-[380px] h-[200px] border border-palette-line/20 rounded-lg overflow-hidden bg-white relative mt-4 items-center justify-center opacity-50',
  },
  Root: {
    className:
      'flex flex-col max-w-[380px] border rounded-lg overflow-hidden bg-white relative mt-6',
  },
  LoadingScreen: {
    className:
      'flex flex-col items-center justify-center border border-gray-90 rounded-lg bg-white absolute top-0 left-0 right-0 bottom-0 z-10',
  },
  ButtonsContainer: {
    className:
      'text-xs sm:text-sm flex sm:py-3 py-2 sm:px-7 px-2 justify-around bg-[#F3F3F3] gap-2 sm:gap-4',
  },
  Button: {
    className:
      'grow py-4 rounded-lg bg-white border border-[#CFD0D2] transition-colors hover:bg-state-b-hovered',
  },
  ImageContainer: {
    className: 'relative w-full h-full border-b border-gray-90 overflow-hidden',
    style: {
      aspectRatio: 'var(--frame-image-aspect-ratio)',
    },
  },
};
