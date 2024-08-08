import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { MintButton } from './MintButton';
import { DisconnectButton } from './DisconnectButton';
import { useMintStateContext } from './useMintState';

export function NftButton() {
  const { status, reset } = useMintStateContext();
  const { openConnectModal } = useConnectModal();

  if (status === 'mint-error') {
    return (
      <Button variant={ButtonVariants.Primary} className="w-fit" onClick={reset}>
        Reset
      </Button>
    );
  }

  if (status === 'already-minted') {
    return null;
  }

  if (status === 'minted') {
    return null;
  }

  if (status === 'disconnected') {
    return (
      <Button variant={ButtonVariants.Primary} className="w-fit" onClick={openConnectModal}>
        Connect
      </Button>
    );
  }

  if (status === 'loading-proof') {
    return (
      <Button variant={ButtonVariants.Primary} className="w-fit">
        Checking eligibility...
      </Button>
    );
  }

  if (status === 'not-eligible') {
    return <DisconnectButton title="Wallet not eligible" />;
  }

  return <MintButton />;
}
