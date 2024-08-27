export const theme = {
  Error: {
    className:
      'flex flex-col w-[380px] h-[200px] border border-gray-90 rounded-lg overflow-hidden bg-white relative items-center justify-center opacity-50',
  },
  Root: {
    className: 'flex flex-col max-w-[380px] border rounded-lg overflow-hidden bg-white relative',
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
