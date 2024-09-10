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

  const openFrameWorks = useMemo(() => {
    const stackItem = openFrameState.framesStack[0];
    console.log('jf openFrameWorks:stackItem', stackItem);
    if (!stackItem) return false;
    const status = stackItem.status;
    console.log('jf openFrameWorks:status', status);
    if (status !== 'done') return false;
    console.log('jf openFrameWorks:stackItem.frameResult', stackItem.frameResult);
    return stackItem.frameResult.status !== 'failure';
  }, [openFrameState.framesStack]);

  const farcasterFrameWorks = useMemo(() => {
    const stackItem = farcasterFrameState.framesStack[0];
    console.log('jf farcasterFrameWorks:stackItem', stackItem);
    if (!stackItem) return false;
    const status = stackItem.status;
    console.log('jf farcasterFrameWorks:status', status);
    if (status !== 'done') return false;
    console.log('jf farcasterFrameWorks:stackItem.frameResult', stackItem.frameResult);
    return stackItem.frameResult.status !== 'failure';
  }, [farcasterFrameState.framesStack]);

  console.log('jf farcasterFrameWorks', farcasterFrameWorks);
  console.log('jf openFrameWorks', openFrameWorks);
  if (openFrameWorks)
    return <FrameUI frameState={openFrameState} theme={theme} components={components} />;
  if (farcasterFrameWorks)
    return <FrameUI frameState={farcasterFrameState} theme={theme} components={components} />;
  return <FrameUI frameState={openFrameState} theme={theme} components={components} />;
}
