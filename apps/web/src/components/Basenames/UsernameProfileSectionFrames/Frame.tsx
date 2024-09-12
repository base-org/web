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
    if (!stackItem) return false;
    const status = stackItem.status;
    if (status !== 'done') return false;
    return stackItem.frameResult.status !== 'failure';
  }, [openFrameState.framesStack]);

  if (openFrameWorks) {
    return <FrameUI frameState={openFrameState} theme={theme} components={components} />;
  }
  return <FrameUI frameState={farcasterFrameState} theme={theme} components={components} />;
}
