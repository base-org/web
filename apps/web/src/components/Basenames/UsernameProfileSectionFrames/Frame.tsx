import { FrameUI } from '@frames.js/render/ui';
import { useFrame } from '@frames.js/render/use-frame';
import { useQueryClient } from '@tanstack/react-query';
import { useFrameContext } from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/Context';
import {
  components,
  theme,
} from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/FrameTheme';
import cn from 'classnames';
import { useEffect, useMemo, useState } from 'react';

type FrameProps = {
  url: string;
  className?: string;
};

export default function Frame({ url, className }: FrameProps) {
  const { frameConfig, farcasterSignerState, anonSignerState } = useFrameContext();
  const queryClient = useQueryClient();

  const fetchFn = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const queryKey = ['frame-data', input];
    return queryClient.fetchQuery({
      queryKey,
      queryFn: async () => {
        return fetch(input, init);
      },
    });
  };

  const farcasterFrameState = useFrame({
    ...frameConfig,
    homeframeUrl: url,
    signerState: farcasterSignerState,
    specification: 'farcaster',
    // @ts-expect-error frames.js uses node.js Response typing here instead of web Response
    fetchFn,
  });
  const openFrameState = useFrame({
    ...frameConfig,
    homeframeUrl: url,
    signerState: anonSignerState,
    specification: 'openframes',
    // @ts-expect-error frames.js uses node.js Response typing here instead of web Response
    fetchFn,
  });

  // Persist if openFrameWorks has ever been true for this frame
  const [openFrameWorksPersisted, setOpenFrameWorksPersisted] = useState(false);

  useEffect(() => {
    const currentFrameStackItem = openFrameState.currentFrameStackItem;
    if (!openFrameWorksPersisted && currentFrameStackItem) {
      const status = currentFrameStackItem.status;
      if (status === 'done' && currentFrameStackItem.frameResult.frame.accepts) {
        const acceptsAnonymous = currentFrameStackItem.frameResult.frame.accepts.some(
          (element) => element.id === 'anonymous',
        );
        if (acceptsAnonymous) {
          setOpenFrameWorksPersisted(true);
        }
      }
    }
  }, [openFrameState, openFrameWorksPersisted]);

  const frameState = useMemo(
    () => (openFrameWorksPersisted ? openFrameState : farcasterFrameState),
    [farcasterFrameState, openFrameState, openFrameWorksPersisted],
  );

  const aggregatedTheme = useMemo(
    () => ({
      ...theme,
      Root: {
        ...theme.Root,
        className: cn(theme.Root?.className, className),
      },
    }),
    [className],
  );

  return <FrameUI frameState={frameState} theme={aggregatedTheme} components={components} />;
}
