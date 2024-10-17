import { OnSignatureFunc, OnTransactionFunc } from '@frames.js/render';
import { FrameUI } from '@frames.js/render/ui';
import { useFrame } from '@frames.js/render/use-frame';
import { Transition } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/16/solid';
import { useQueryClient } from '@tanstack/react-query';
import {
  CouldNotChangeChainError,
  InvalidChainIdError,
  parseChainId,
  useFrameContext,
} from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/Context';
import {
  components,
  theme,
} from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/FrameTheme';
import cn from 'classnames';
import { useCallback, useEffect, useMemo, useState } from 'react';

type FrameProps = {
  url: string;
  className?: string;
};

// Define distinct types for signature and transaction data
type SignatureData = {
  signatureData: {
    chainId: string;
  };
};

type TransactionData = {
  transactionData: {
    chainId: string;
  };
};

export default function Frame({ url, className }: FrameProps) {
  const { frameConfig: sharedConfig, farcasterSignerState, anonSignerState } = useFrameContext();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string>('');
  const clearError = useCallback(() => setError(''), []);
  const [isDismissing, setIsDismissing] = useState<boolean>(false);
  const handleDismissError = () => {
    setIsDismissing(true);
    setTimeout(() => {
      clearError();
      setIsDismissing(false);
    }, 200); // Match the fade-out duration
  };

  const fetchFn = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const queryKey = ['frame-data', input];
    return queryClient.fetchQuery({
      queryKey,
      queryFn: async () => {
        return fetch(input, init);
      },
    });
  };

  const useSharedCallback = <T extends SignatureData | TransactionData>(
    callback: ((a: T) => Promise<null | `0x${string}`>) | undefined,
  ) =>
    useCallback(
      async (a: T) => {
        if (!callback) return null;
        try {
          return await callback(a);
        } catch (err) {
          const signatureData = 'signatureData' in a && a.signatureData;
          const transactionData = 'transactionData' in a && a.transactionData;
          if (err instanceof InvalidChainIdError) {
            setError('Invalid chain id');
          } else if (err instanceof CouldNotChangeChainError) {
            const chainId =
              'signatureData' in a ? a.signatureData.chainId : a.transactionData.chainId;
            const requestedChainId = parseChainId(chainId);
            setError(`Must switch chain to ${requestedChainId}`);
          } else {
            if (signatureData) {
              setError('Error signing data');
            } else if (transactionData) {
              setError('Error sending transaction');
            } else {
              setError('Error processing data');
            }
          }
          return null;
        }
      },
      [callback],
    );

  const onSignature: OnSignatureFunc = useSharedCallback(sharedConfig.onSignature);
  const onTransaction: OnTransactionFunc = useSharedCallback(sharedConfig.onTransaction);

  const frameConfig = useMemo(
    () => ({
      ...sharedConfig,
      onSignature,
      onTransaction,
    }),
    [onSignature, onTransaction, sharedConfig],
  );

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

  return (
    <div className="relative">
      <Transition
        show={!!error && !isDismissing}
        enter="transition-opacity ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        onClick={handleDismissError}
        className="absolute left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 transform cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-30 bg-red-0 px-2 py-3 text-xs font-medium text-palette-negative shadow-lg"
        afterLeave={clearError}
      >
        <InformationCircleIcon width={16} height={16} /> {error}
      </Transition>
      <FrameUI frameState={frameState} theme={aggregatedTheme} components={components} />
    </div>
  );
}
