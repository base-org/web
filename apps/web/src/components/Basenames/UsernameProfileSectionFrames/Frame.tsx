import { FrameUI } from '@frames.js/render/ui';
import { useFrame } from '@frames.js/render/use-frame';
import { useFrameContext } from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/Context';
import {
  theme,
  components,
} from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/FrameTheme';
import { useMemo } from 'react';

type FrameProps = {
  url: string;
};
export default function Frame({ url }: FrameProps) {
  const { frameConfig, farcasterSignerState, anonSignerState } = useFrameContext();
  const farcasterFrameState = useFrame({
    ...frameConfig,
    homeframeUrl: url,
    signerState: farcasterSignerState,
    specification: 'farcaster',
  });
  const openFrameState = useFrame({
    ...frameConfig,
    homeframeUrl: url,
    signerState: anonSignerState,
    specification: 'openframes',
  });
  // console.log('jf =====================');

  const openFrameWorks = useMemo(() => {
    // console.log('jf openFrameState', openFrameState);
    const currentFrameStackItem = openFrameState.currentFrameStackItem;
    // console.log('jf openFrameWorks:currentFrameStackItem', currentFrameStackItem);
    if (!currentFrameStackItem) return false;
    const status = currentFrameStackItem.status;
    // console.log('jf openFrameWorks:status', status);
    if (status === 'done' && currentFrameStackItem.frameResult.frame.accepts) {
      return currentFrameStackItem.frameResult.frame.accepts.some(
        (element) => element.id === 'anonymous',
      );
      // return currentFrameStackItem.frameResult.status !== 'failure';
    } else {
      return false;
    }
  }, [openFrameState]);

  // const farcasterFrameWorks = useMemo(() => {
  //   // console.log('jf farcasterFrameState', farcasterFrameState);
  //   const currentFrameStackItem = farcasterFrameState.currentFrameStackItem;
  //   // console.log('jf farcasterFrameWorks:currentFrameStackItem', currentFrameStackItem);
  //   if (!currentFrameStackItem) return false;
  //   const status = currentFrameStackItem.status;
  //   // console.log('jf farcasterFrameWorks:status', status);
  //   if (status !== 'done') return false;
  //   // console.log('jf farcasterFrameWorks:currentFrameStackItem.frameResult', currentFrameStackItem.frameResult);
  //   return currentFrameStackItem.frameResult.status !== 'failure';
  // }, [farcasterFrameState]);

  // console.log('jf farcasterFrameWorks', farcasterFrameWorks);
  // console.log('jf openFrameWorks', openFrameWorks);
  const frameState = useMemo(
    () => (openFrameWorks ? openFrameState : farcasterFrameState),
    [farcasterFrameState, openFrameState, openFrameWorks],
  );

  // console.log('jf =====================');

  return <FrameUI frameState={frameState} theme={theme} components={components} />;
}
