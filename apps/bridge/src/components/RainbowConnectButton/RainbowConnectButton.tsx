import { useCallback, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Popover } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import chainList from 'apps/bridge/chains';
import { DisconnectWalletButton } from 'apps/bridge/src/components/DisconnectWalletButton/DisconnectWalletButton';
import { CustomChain } from 'apps/bridge/src/types/Asset';
import { useChainEnv } from 'apps/bridge/src/utils/hooks/useChainEnv';
import { useIsPermittedToBridge } from 'apps/bridge/src/utils/hooks/useIsPermittedToBridge';
import getConfig from 'next/config';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useNetwork, useSwitchNetwork } from 'wagmi';

const { publicRuntimeConfig } = getConfig();

type WalletModalProps = {
  isOpen: boolean;
  address: string;
  displayAddress: string;
  Close: typeof Popover.Button;
};

export function WalletModal({ isOpen, displayAddress, address, Close }: WalletModalProps) {
  return (
    <div
      className={`relative z-10 ${isOpen ? 'block' : 'hidden'} `}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <Close>
        <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
      </Close>
      <div className="fixed right-[32px] top-[40px] z-10 box-border w-[300px] overflow-y-auto bg-black sm:bg-transparent">
        <div className="flex h-full justify-center text-center sm:min-h-full sm:items-center sm:p-0">
          <div className="modal box-border flex w-[300px] w-full w-full transform flex-col items-start justify-center overflow-hidden rounded-lg p-0 text-left shadow-xl transition-all sm:relative sm:my-8">
            <div className="absolute right-3 top-3 flex w-full flex-row items-center justify-end sm:relative sm:right-0 sm:top-0 sm:p-4 sm:px-6" />
            <div className="mb-4 mt-4 flex w-full flex-row justify-center">
              <Image src="/icons/default-avatar.svg" alt="avatar" width={64} height={64} />
            </div>
            <h5 className="flex w-full justify-center font-mono text-base text-white">
              {displayAddress}
              <CopyToClipboard text={address}>
                <Image
                  src="/icons/copy.svg"
                  width="16"
                  height="16"
                  alt="copy"
                  className="ml-3 cursor-pointer"
                />
              </CopyToClipboard>
            </h5>
            <div className="w-full items-center justify-center p-4 pb-8 pt-6 text-center">
              <div className="inline-block">
                <DisconnectWalletButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ALL_SUPPORTED_CHAIN_IDS = [1, 5, 11155111, 8453, 84531, 84532];
const TESTNET_SUPPORTED_CHAIN_IDS = [5, 11155111, 84531, 84532];
const supportedChains = (
  publicRuntimeConfig.mainnetGALaunchFlag === 'true'
    ? ALL_SUPPORTED_CHAIN_IDS
    : TESTNET_SUPPORTED_CHAIN_IDS
).map((chainId) => chainList.find((chain) => chain.id === chainId)) as CustomChain[];

type NetworkSwitcherOptionsProps = {
  selectedChainId: number;
};

function NetworkSwitcherOptions({ selectedChainId }: NetworkSwitcherOptionsProps) {
  const { push, pathname } = useRouter();
  const { switchNetwork } = useSwitchNetwork();
  const chainEnv = useChainEnv();
  const isMainnet = chainEnv === 'mainnet';

  // Ugly but temporary while we support 2 testnets
  const isGoerli = publicRuntimeConfig.l1ChainID === '5';

  return (
    <>
      {supportedChains.map((chain) => {
        function handleSwitchNetwork() {
          // We are on the mainnet bridge. If trying to switch to a testnet, redirect to the corresponding bridge.
          // Otherwise, switch networks.
          if (isMainnet) {
            if (chain.id === 5 || chain.id === 84531) {
              void push(`${publicRuntimeConfig.goerliBridgeURL}${pathname}`);
              return;
            } else if (chain.id === 11155111 || chain.id === 84532) {
              void push(`${publicRuntimeConfig.sepoliaBridgeURL}${pathname}`);
              return;
            }
            switchNetwork?.(chain.id);
            return;
          }

          // We are on one of the testnet bridges. If trying to switch to mainnet, redirect to the mainnet bridge.
          // This is independent of which testnet bridge we are on.
          if (chain.id === 1 || chain.id === 8453) {
            void push(`${publicRuntimeConfig.mainnetBridgeURL}${pathname}`);
            return;
          }

          // We are on the Goerli bridge. If trying to switch to Sepolia, redirect to the Sepolia bridge.
          // Otherwise, switch networks. Note that switching to mainnet is already handled above.
          if (isGoerli) {
            if (chain.id === 11155111 || chain.id === 84532) {
              void push(`${publicRuntimeConfig.sepoliaBridgeURL}${pathname}`);
              return;
            }
            switchNetwork?.(chain.id);
          }

          // We are on the Sepolia bridge. If trying to switch to Goerli, redirect to the Goerli bridge.
          // Otherwise, switch networks. Note that switching to mainnet is already handled above.
          if (chain.id === 5 || chain.id === 84531) {
            void push(`${publicRuntimeConfig.goerliBridgeURL}${pathname}`);
            return;
          }
          switchNetwork?.(chain.id);
        }

        return (
          <div
            className={`flex h-12 w-full flex-row items-center justify-between px-4 ${
              selectedChainId === chain.id ? 'bg-cds-background-gray-5' : ''
            }`}
            key={chain.id}
          >
            <button
              type="button"
              onClick={handleSwitchNetwork}
              className={`flex flex-row space-x-2 ${
                selectedChainId === chain.id ? 'text-white' : 'text-cds-background-gray-60'
              }`}
            >
              <Image src={chain.svg} width={24} height={24} alt={chain.name} />
              <p className="font-sans">{chain.summary.location}</p>
            </button>
            {selectedChainId === chain.id && (
              <CheckIcon width={24} height={24} color="rgba(88, 138, 245, 1)" />
            )}
          </div>
        );
      })}
    </>
  );
}

// We show this button if the user is on the wrong network for a given bridge. Eg user is
// on Goerli but on the mainnet bridge. Some confusing situations can arise if we are in
// this state, and this is the easiest way to reliably deal with them.
function SwitchNetworkButton() {
  const { pathname } = useRouter();
  const { switchNetwork } = useSwitchNetwork();

  const handleSwitchNetwork = useCallback(() => {
    switchNetwork?.(
      parseInt(
        pathname === '/withdraw' ? publicRuntimeConfig.l2ChainID : publicRuntimeConfig.l1ChainID,
      ),
    );
  }, [pathname, switchNetwork]);

  return (
    <button
      onClick={handleSwitchNetwork}
      className="border-gray-400 flex w-36 flex-row py-2 font-mono text-xl uppercase
      text-white sm:items-center sm:justify-center sm:rounded sm:border sm:font-sans sm:text-sm"
      type="button"
    >
      Switch Network
    </button>
  );
}

export function RainbowConnectButton() {
  const { push, pathname } = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const { chain: currentChain } = useNetwork();
  const chainEnv = useChainEnv();
  const isMainnet = chainEnv === 'mainnet';
  const isPermittedToBridge = useIsPermittedToBridge();

  const isOnWrongNetworkForChainEnv =
    (isMainnet && currentChain?.id !== 1 && currentChain?.id !== 8453) ||
    (!isMainnet &&
      currentChain?.id !== 5 &&
      currentChain?.id !== 11155111 &&
      currentChain?.id !== 84531 &&
      currentChain?.id !== 84532);

  return (
    <ConnectButton.Custom>
      {({ account, chain, authenticationStatus, mounted, openConnectModal }) => {
        const handleOpenConnectModal = () => {
          localStorage.setItem('autoconnect', '1');
          openConnectModal();
          setLoggedIn(true);
        };
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        if (pathname === '/' && connected && loggedIn && isPermittedToBridge) {
          void push('/deposit');
        }
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={handleOpenConnectModal}
                    type="button"
                    className="rounded bg-white px-4 py-3.5 font-sans"
                  >
                    Connect wallet
                  </button>
                );
              }

              if (pathname === '/') {
                return (
                  <div className="rounded bg-white px-4 py-3.5 text-center font-sans">
                    <Link href="/deposit">Bridge assets</Link>
                  </div>
                );
              }

              return (
                <div className="flex flex-col pr-7 sm:flex-row sm:items-center sm:justify-center sm:pr-0">
                  {isOnWrongNetworkForChainEnv ? (
                    <SwitchNetworkButton />
                  ) : (
                    <Popover className="relative">
                      <Popover.Button className="border-gray-400 flex w-36 flex-row py-2 font-mono text-xl text-white sm:items-center sm:justify-center sm:rounded sm:border sm:font-sans sm:text-sm">
                        {chain.name}
                      </Popover.Button>
                      <Popover.Panel className="absolute z-50">
                        <div className="flex w-72 flex-col bg-gray">
                          <NetworkSwitcherOptions selectedChainId={chain.id} />
                        </div>
                      </Popover.Panel>
                    </Popover>
                  )}
                  <Popover className="relative">
                    <Popover.Button className="flex flex-row items-center pt-7 font-mono text-lg text-white sm:pl-4 sm:pt-0">
                      <Image
                        src="/icons/default-avatar.svg"
                        className="mr-2 h-10 w-10 rounded-full bg-white"
                        width="40"
                        height={40}
                        alt="Avatar"
                      />
                      {account.displayName}
                    </Popover.Button>
                    <Popover.Panel>
                      <WalletModal
                        address={account.address}
                        displayAddress={account.displayName}
                        Close={Popover.Button}
                        isOpen
                      />
                    </Popover.Panel>
                    <div className="block pt-8 sm:hidden">
                      <DisconnectWalletButton />
                    </div>
                  </Popover>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
