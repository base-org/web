import { Button } from 'apps/web/src/components/Button/Button';

import { ConnectButton } from '@rainbow-me/rainbowkit';

type ConnectWalletButtonProps = {
  color: 'white' | 'black';
};

const colorVariant: Record<'white' | 'black', 'secondary' | 'secondaryDark'> = {
  white: 'secondary',
  black: 'secondaryDark',
};

export function ConnectWalletButton({ color }: ConnectWalletButtonProps) {
  // return <Button variant={colorVariant[color]}>Connect Wallet</Button>;
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        if (!connected) {
          return (
            <Button variant={colorVariant[color]} onClick={openConnectModal}>
              Connect
            </Button>
          );
        }

        if (chain.unsupported) {
          return (
            <button onClick={openChainModal} type="button">
              Wrong network
            </button>
          );
        }

        return (
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={openChainModal}
              style={{ display: 'flex', alignItems: 'center' }}
              type="button"
            >
              {chain.hasIcon && (
                <div
                  style={{
                    background: chain.iconBackground,
                    width: 12,
                    height: 12,
                    borderRadius: 999,
                    overflow: 'hidden',
                    marginRight: 4,
                  }}
                >
                  {chain.iconUrl && (
                    <img
                      alt={chain.name ?? 'Chain icon'}
                      src={chain.iconUrl}
                      style={{ width: 12, height: 12 }}
                    />
                  )}
                </div>
              )}
              {chain.name}
            </button>

            <button onClick={openAccountModal} type="button">
              {account.displayName}
              {account.displayBalance ? ` (${account.displayBalance})` : ''}
            </button>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
