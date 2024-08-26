import { FarcasterFrameContext } from '@frames.js/render';
import { WebStorage } from '@frames.js/render/identity/storage';
import { FrameContextManager } from '@frames.js/render/identity/types';
import { LocalStorageKeys } from 'apps/web/src/constants';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const defaultStorage = new WebStorage();

export function useFarcasterFrameContext({
  fallbackContext,
}: {
  fallbackContext: FarcasterFrameContext;
}): FrameContextManager<FarcasterFrameContext> {
  const storageRef = useRef<WebStorage>(defaultStorage);
  const [frameContext, setFrameContext] = useState<FarcasterFrameContext | null>(null);

  useEffect(() => {
    if (!storageRef.current) return;
    storageRef.current
      .get<FarcasterFrameContext>(LocalStorageKeys.FARCASTER_FRAME_CONTEXT)
      .then((data) => {
        if (data) {
          setFrameContext(data);
        }
      })
      .catch((e) => {
        console.error('@frames.js/render: Could not load frame context from storage', e);
      });
  }, []);

  const handleSetFrameContext: FrameContextManager<FarcasterFrameContext>['setFrameContext'] =
    useCallback(async (newFrameContext) => {
      await storageRef.current.set(LocalStorageKeys.FARCASTER_FRAME_CONTEXT, () => newFrameContext);
      setFrameContext(newFrameContext);
    }, []);

  const resetFrameContext = useCallback(async () => {
    await storageRef.current.delete(LocalStorageKeys.FARCASTER_FRAME_CONTEXT);
    setFrameContext(null);
  }, []);

  return useMemo(
    () => ({
      frameContext: frameContext ?? fallbackContext,
      setFrameContext: handleSetFrameContext,
      resetFrameContext,
    }),
    [fallbackContext, frameContext, handleSetFrameContext, resetFrameContext],
  );
}
