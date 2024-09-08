import { type FrameUITheme } from '@frames.js/render/ui';

export const theme: FrameUITheme<Record<string, unknown>> = {
  Error: {
    className:
      'flex flex-col max-w-[380px] rounded-lg overflow-hidden bg-white relative items-center justify-center opacity-50',
  },
  Root: {
    className: 'flex flex-col max-w-[380px] rounded-lg overflow-hidden bg-white relative',
  },
  LoadingScreen: {
    className:
      'flex flex-col items-center max-w-[380px] justify-center rounded-lg bg-white absolute top-0 left-0 right-0 bottom-0 z-10',
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
    className: 'relative w-full h-full border-0 overflow-hidden',
    style: {
      aspectRatio: 'var(--frame-image-aspect-ratio)',
    },
  },
  TextInputContainer: {
    className: 'flex flex-row items-center justify-around gap-2 w-full',
  },
  TextInput: {
    className: 'w-full outline-0 focus:outline-0',
  },
};
