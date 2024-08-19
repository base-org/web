import { LocalStorageKeys } from 'apps/web/src/constants';
import { useEffect, useState } from 'react';

export type XmtpFrameContext = {
  conversationTopic: string;
  participantAccountAddresses: `0x${string}`[];
  groupId?: Uint8Array;
  groupSecret?: Uint8Array;
};

export function useXmtpFrameContext({ fallbackContext }: { fallbackContext: XmtpFrameContext }) {
  const [frameContext, setFrameContext] = useState<XmtpFrameContext | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem(LocalStorageKeys.XMTP_FRAME_CONTEXT);
    if (storedData) {
      setFrameContext(JSON.parse(storedData) as XmtpFrameContext);
    }
  }, []);

  useEffect(() => {
    if (frameContext) {
      localStorage.setItem(LocalStorageKeys.XMTP_FRAME_CONTEXT, JSON.stringify(frameContext));
    }
  }, [frameContext]);

  function resetFrameContext() {
    localStorage.removeItem(LocalStorageKeys.XMTP_FRAME_CONTEXT);
    setFrameContext(null);
  }

  return {
    frameContext: frameContext ?? fallbackContext,
    setFrameContext,
    resetFrameContext,
  };
}
