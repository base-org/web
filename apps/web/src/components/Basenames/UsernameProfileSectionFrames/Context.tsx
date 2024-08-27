import {
  fallbackFrameContext,
  FarcasterFrameContext,
  OnSignatureFunc,
  OnTransactionFunc,
} from '@frames.js/render';
import {
  FarcasterSignerInstance,
  useFarcasterFrameContext,
  useFarcasterIdentity,
} from '@frames.js/render/identity/farcaster';
import { useFrame } from '@frames.js/render/use-frame';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import L2ResolverAbi from 'apps/web/src/abis/L2Resolver';
import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import useBasenameChain, { isBasenameSupportedChain } from 'apps/web/src/hooks/useBasenameChain';
import useReadBaseEnsTextRecords from 'apps/web/src/hooks/useReadBaseEnsTextRecords';
import { UsernameTextRecordKeys } from 'apps/web/src/utils/usernames';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { namehash } from 'viem';
import { useAccount, useChainId, useConfig, useWriteContract } from 'wagmi';
import { sendTransaction, signTypedData, switchChain } from 'wagmi/actions';

class InvalidChainIdError extends Error {}
class CouldNotChangeChainError extends Error {}

function isValidChainId(id: string): boolean {
  return id.startsWith('eip155:');
}

function parseChainId(id: string): number {
  if (!isValidChainId(id)) {
    throw new InvalidChainIdError(`Invalid chainId ${id}`);
  }

  return parseInt(id.split('eip155:')[1]);
}

export type FrameContextValue = {
  frameManagerModalOpen: boolean;
  openFrameManagerModal: () => void;
  closeFrameManagerModal: () => void;
  currentWalletIsProfileOwner?: boolean;
  homeframeUrl: string;
  frameInteractionError: string;
  setFrameInteractionError: (s: string) => void;
  frameConfig: Omit<
    Parameters<typeof useFrame>[0],
    'homeframeUrl' | 'signerState' | 'frameContext'
  > & {
    specification: 'farcaster';
    signerState: FarcasterSignerInstance;
    frameContext: FarcasterFrameContext;
  };
  showFarcasterQRModal: boolean;
  pendingFrameChange: boolean;
  setShowFarcasterQRModal: (b: boolean) => void;
  setFrameRecord: (url: string) => void;
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
  const [frameManagerModalOpen, setFrameManagerModalOpen] = useState(true);
  const openFrameManagerModal = useCallback(() => setFrameManagerModalOpen(true), []);
  const closeFrameManagerModal = useCallback(() => setFrameManagerModalOpen(false), []);
  const [showFarcasterQRModal, setShowFarcasterQRModal] = useState(false);

  const { address } = useAccount();
  const { profileUsername, profileAddress, currentWalletIsProfileOwner } = useUsernameProfile();
  const { existingTextRecords } = useReadBaseEnsTextRecords({
    address: profileAddress,
    username: profileUsername,
  });

  const homeframeUrl = existingTextRecords[UsernameTextRecordKeys.Frame];
  const { frameContext: farcasterFrameContext } = useFarcasterFrameContext({
    fallbackContext: fallbackFrameContext,
  });
  const signerState = useFarcasterIdentity({
    signerUrl: '/frames/signer',
    onMissingIdentity() {
      setShowFarcasterQRModal(true);
    },
  });

  const currentChainId = useChainId();
  const config = useConfig();
  const { openConnectModal } = useConnectModal();
  const [frameInteractionError, setFrameInteractionError] = useState('');
  const onTransaction: OnTransactionFunc = useCallback(
    async ({ transactionData }) => {
      if (!address) {
        openConnectModal?.();
        return null;
      }

      try {
        const { params, chainId } = transactionData;
        const requestedChainId = parseChainId(chainId);

        if (currentChainId !== requestedChainId) {
          await switchChain(config, {
            chainId: requestedChainId,
          }).catch((e) => {
            throw new CouldNotChangeChainError(e.message as string);
          });
        }

        const transactionId = await sendTransaction(config, {
          to: params.to,
          data: params.data,
          value: BigInt(params.value ?? 0),
        });
        return transactionId;
      } catch (error) {
        if (error instanceof InvalidChainIdError) {
          setFrameInteractionError('Invalid chain id');
        } else if (error instanceof CouldNotChangeChainError) {
          setFrameInteractionError('Could not change chain');
        } else {
          setFrameInteractionError('Error sending transaction');
        }

        console.warn(error);

        return null;
      }
    },
    [address, config, currentChainId, openConnectModal],
  );
  const onError = useCallback((e: Error) => {
    console.error(e);
  }, []);
  const onSignature: OnSignatureFunc = useCallback(
    async ({ signatureData }) => {
      if (!address) {
        openConnectModal?.();
        console.info('Opened connect modal because the account address is not set');

        return null;
      }

      try {
        const { params, chainId } = signatureData;
        const requestedChainId = parseChainId(chainId);

        if (currentChainId !== requestedChainId) {
          await switchChain(config, {
            chainId: requestedChainId,
          }).catch((e) => {
            throw new CouldNotChangeChainError(e.message as string);
          });
        }

        return await signTypedData(config, params);
      } catch (error) {
        if (error instanceof InvalidChainIdError) {
          setFrameInteractionError('Invalid chain id');
        } else if (error instanceof CouldNotChangeChainError) {
          setFrameInteractionError('Could not change chain');
        } else {
          setFrameInteractionError('Error signing data');
        }

        console.error(error);

        return null;
      }
    },
    [address, openConnectModal, currentChainId, config],
  );

  const { writeContractAsync, isPending: pendingFrameChange } = useWriteContract();
  const { basenameChain } = useBasenameChain(profileUsername);
  const setFrameRecord = useCallback(
    (frameUrl: string) => {
      async function doTransaction() {
        if (!frameUrl) return;
        if (!address) {
          openConnectModal?.();
          return;
        }
        if (!isBasenameSupportedChain(currentChainId)) {
          await switchChain(config, {
            chainId: basenameChain.id,
          }).catch((e) => {
            throw new CouldNotChangeChainError(e.message as string);
          });
        }
        const nameHash = namehash(profileUsername);
        await writeContractAsync({
          abi: L2ResolverAbi,
          chainId: basenameChain.id,
          address: USERNAME_L2_RESOLVER_ADDRESSES[basenameChain.id],
          args: [nameHash, UsernameTextRecordKeys.Frame, frameUrl.trim()],
          functionName: 'setText',
        });
      }
      doTransaction().catch(console.warn);
    },
    [writeContractAsync],
  );

  const value = useMemo(
    () => ({
      frameManagerModalOpen,
      openFrameManagerModal,
      closeFrameManagerModal,
      currentWalletIsProfileOwner,
      homeframeUrl,
      frameConfig: {
        connectedAddress: address,
        frameActionProxy: '/frames',
        frameGetProxy: '/frames',
        onTransaction,
        onError,
        onSignature,
        onConnectWallet: openConnectModal,
        signerState,
        specification: 'farcaster' as const,
        frameContext: farcasterFrameContext,
      },
      frameInteractionError,
      setFrameInteractionError,
      showFarcasterQRModal,
      setShowFarcasterQRModal,
      pendingFrameChange,
      setFrameRecord,
    }),
    [
      frameManagerModalOpen,
      openFrameManagerModal,
      closeFrameManagerModal,
      currentWalletIsProfileOwner,
      homeframeUrl,
      address,
      onTransaction,
      onError,
      onSignature,
      openConnectModal,
      signerState,
      farcasterFrameContext,
      frameInteractionError,
      showFarcasterQRModal,
      pendingFrameChange,
      setFrameRecord,
    ],
  );

  return <FrameContext.Provider value={value}>{children}</FrameContext.Provider>;
}
