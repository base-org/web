import { FrameState } from '@frames.js/render';
import { useFrame } from '@frames.js/render/use-frame';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import useReadBaseEnsTextRecords from 'apps/web/src/hooks/useReadBaseEnsTextRecords';
import { XmtpFrameContext, useXmtpFrameContext } from 'apps/web/src/hooks/useXmtpFrameContext';
import { useXmtpIdentity } from 'apps/web/src/hooks/useXmtpIdentity';
import { UsernameTextRecordKeys } from 'apps/web/src/utils/usernames';
import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { zeroAddress } from 'viem';
import { useAccount } from 'wagmi';

type XmtpSigner = {
  walletAddress: string;
  keys: Uint8Array;
};

export type FrameContextValue = {
  frameModalOpen: boolean;
  openFrameModal: () => void;
  closeFrameModal: () => void;
  currentWalletIsOwner?: boolean;
  homeframeUrl: string;
  frameState: FrameState<XmtpSigner, XmtpFrameContext>;
  xmtpSignerState: ReturnType<typeof useXmtpIdentity>;
  xmtpFrameContext: XmtpFrameContext;
};

export const FrameContext = createContext<FrameContextValue | null>(null);

export const useFrameContext = () => {
  const context = useContext(FrameContext);
  if (!context) {
    throw new Error('useFrameContext must be used within a FrameProvider');
  }
  return context;
};

type FrameProviderProps = {
  children: React.ReactNode;
};

export function FrameProvider({ children }: FrameProviderProps) {
  const [frameModalOpen, setFrameModalOpen] = useState(true);
  const openFrameModal = useCallback(() => setFrameModalOpen(true), []);
  const closeFrameModal = useCallback(() => setFrameModalOpen(false), []);

  const { address } = useAccount();
  const { profileUsername, profileAddress, currentWalletIsOwner } = useUsernameProfile();
  const { existingTextRecords } = useReadBaseEnsTextRecords({
    address: profileAddress,
    username: profileUsername,
  });

  const homeframeUrl = existingTextRecords[UsernameTextRecordKeys.Frame];
  const { frameContext } = useXmtpFrameContext({
    fallbackContext: {
      conversationTopic: 'base-name-profile',
      participantAccountAddresses: address ? [address, zeroAddress] : [zeroAddress],
    },
  });
  const xmtpSignerState = useXmtpIdentity();

  const frameState = useFrame({
    connectedAddress: address,
    homeframeUrl,
    frameActionProxy: '/frames',
    frameGetProxy: '/frames',
    onError: (e) => console.error('frame error: ', e),
    signerState: xmtpSignerState,
    specification: 'farcaster',
    frameContext,
  });

  const value = useMemo(
    () => ({
      frameModalOpen,
      openFrameModal,
      closeFrameModal,
      currentWalletIsOwner,
      homeframeUrl,
      frameState,
      xmtpSignerState,
      xmtpFrameContext: frameContext,
    }),
    [
      closeFrameModal,
      currentWalletIsOwner,
      frameModalOpen,
      frameState,
      homeframeUrl,
      openFrameModal,
      frameContext,
      xmtpSignerState,
    ],
  );

  return <FrameContext.Provider value={value}>{children}</FrameContext.Provider>;
}
