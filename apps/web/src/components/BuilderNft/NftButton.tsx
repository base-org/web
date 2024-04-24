import { Button } from 'apps/web/src/components/Button/Button';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { MintButton } from './MintButton';
import { DisconnectButton } from './DisconnectButton';
import { MintStatus } from './useMintState';

export function NftButton({ status }: { status: MintStatus }) {
  const { openConnectModal } = useConnectModal();

  if (status === 'disconnected') {
    return (
      <Button variant="primary" className="w-fit" onClick={openConnectModal}>
        Connect Wallet
      </Button>
    );
  }

  if (status === 'loading-proof') {
    return (
      <Button variant="primary" className="w-fit">
        Checking eligibility...
      </Button>
    );
  }

  if (status === 'not-eligible') {
    return <DisconnectButton title="Wallet not eligible" />;
  }

  return <MintButton />;
}
