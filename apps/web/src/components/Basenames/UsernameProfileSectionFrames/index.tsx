'use client';

import { fallbackFrameContext, OnSignatureFunc, OnTransactionFunc } from '@frames.js/render';
import { FrameUI, type FrameUIComponents, type FrameUITheme } from '@frames.js/render/ui';
import { useFrame } from '@frames.js/render/use-frame';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import AddFrameModal from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/AddFrameModal';
import FarcasterAccountModal from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/FarcasterAccountModal';
import UsernameProfileSectionTitle from 'apps/web/src/components/Basenames/UsernameProfileSectionTitle';
import { Button, ButtonSizes, ButtonVariants } from 'apps/web/src/components/Button/Button';
import ImageAdaptive from 'apps/web/src/components/ImageAdaptive';
import { useFarcasterFrameContext } from 'apps/web/src/hooks/useFarcasterFrameContext';
import { useFarcasterIdentity } from 'apps/web/src/hooks/useFarcasterIdentity';
import useReadBaseEnsTextRecords from 'apps/web/src/hooks/useReadBaseEnsTextRecords';
import { UsernameTextRecordKeys } from 'apps/web/src/utils/usernames';
import { StaticImageData } from 'next/image';
import { useCallback, useState } from 'react';
import { useAccount, useChainId, useConfig } from 'wagmi';
import { sendTransaction, signTypedData, switchChain } from 'wagmi/actions';
import { FrameProvider } from './Context';
import cornerGarnish from './corner-garnish.svg';
import frameIcon from './frame-icon.svg';

type StylingProps = {
  className?: string;
  style?: React.CSSProperties;
};
const components: FrameUIComponents<StylingProps> = {};
const theme: FrameUITheme<StylingProps> = {
  Error: {
    className:
      'flex flex-col w-[380px] h-[200px] border border-gray-90 rounded-lg overflow-hidden bg-white relative mt-6 items-center justify-center opacity-50',
  },
  Root: {
    className:
      'flex flex-col max-w-[380px] border rounded-lg overflow-hidden bg-white relative mt-6',
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

function SectionContent() {
  const { address } = useAccount();
  const config = useConfig();
  const currentChainId = useChainId();
  const { profileUsername, profileAddress, currentWalletIsProfileOwner } = useUsernameProfile();
  const { existingTextRecords } = useReadBaseEnsTextRecords({
    address: profileAddress,
    username: profileUsername,
  });
  const { openConnectModal } = useConnectModal();
  const openFrameModal = console.log;
  const homeframeUrl = existingTextRecords[UsernameTextRecordKeys.Frame];
  const [showFarcasterQRModal, setShowFarcasterQRModal] = useState(false);
  const [frameInteractionError, setFrameInteractionError] = useState('');
  const farcasterSignerState = useFarcasterIdentity({
    onMissingIdentity() {
      setShowFarcasterQRModal(true);
    },
  });

  const onTransaction: OnTransactionFunc = useCallback(
    async ({ transactionData }) => {
      if (!address) {
        openConnectModal?.();
        console.info('Opened connect modal because the account address is not set');
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

  const farcasterFrameContext = useFarcasterFrameContext({
    fallbackContext: fallbackFrameContext,
  });

  const frameState = useFrame({
    connectedAddress: address,
    homeframeUrl,
    frameActionProxy: '/frames',
    frameGetProxy: '/frames',
    onTransaction,
    onError,
    onSignature,
    onConnectWallet: openConnectModal,
    signerState: farcasterSignerState,
    specification: 'farcaster',
    frameContext: farcasterFrameContext.frameContext,
  });

  if (currentWalletIsProfileOwner && !homeframeUrl) {
    return (
      <section className="relative flex flex-row-reverse items-center justify-between gap-0 rounded-xl border border-palette-line/20 pb-5 pl-5 pt-5 lg:flex-row lg:justify-start lg:gap-2 lg:pb-0 lg:pl-1 lg:pr-6 lg:pt-0">
        <ImageAdaptive alt="" src={frameIcon as StaticImageData} className="z-1" />
        <div className="grow">
          <h1 className="text-xl font-medium text-illoblack">Pin a frame to your profile</h1>
          <p className="max-w-80 text-illoblack">
            Add fun and interactive experiences to your profile with a frame.
          </p>
          <Button
            rounded
            variant={ButtonVariants.Black}
            onClick={openFrameModal}
            className="mt-1 lg:hidden"
          >
            Try it now
          </Button>
        </div>
        <Button
          rounded
          variant={ButtonVariants.Black}
          onClick={openFrameModal}
          className="hidden lg:block"
        >
          Try it now
        </Button>
        <ImageAdaptive
          alt=""
          src={cornerGarnish as StaticImageData}
          className="absolute right-0 top-0 z-0 rotate-180 rounded-bl-xl lg:bottom-0 lg:left-0 lg:right-[unset] lg:top-[unset] lg:rotate-0"
        />
      </section>
    );
  }
  if (!homeframeUrl) return null;
  return (
    <section>
      <div className="flex flex-row justify-between">
        <UsernameProfileSectionTitle title="Frames" />
        {currentWalletIsProfileOwner && (
          <Button className="text-sm text-palette-foregroundMuted" onClick={openFrameModal}>
            + Add Frame
          </Button>
        )}
      </div>
      <div>
        <FrameUI frameState={frameState} components={components} theme={theme} />
        {frameInteractionError && (
          <Button
            size={ButtonSizes.Small}
            onClick={() => setFrameInteractionError('')}
            className="text-sm text-state-n-hovered"
          >
            {frameInteractionError}
          </Button>
        )}
      </div>
      <FarcasterAccountModal
        farcasterUser={farcasterSignerState.signer ?? null}
        loading={!!farcasterSignerState.isLoadingSigner ?? false}
        startFarcasterSignerProcess={farcasterSignerState.createSigner}
        isOpen={showFarcasterQRModal}
        onClose={() => setShowFarcasterQRModal(false)}
      />
    </section>
  );
}

function UsernameProfileSectionFrames() {
  return (
    <FrameProvider>
      <SectionContent />
      <AddFrameModal />
    </FrameProvider>
  );
}

export default UsernameProfileSectionFrames;
