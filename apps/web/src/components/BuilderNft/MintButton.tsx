import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import { useSwitchChain, useChainId } from 'wagmi';
import { useCallback } from 'react';
import { base } from 'viem/chains';
import { useMintStateContext } from './useMintState';

export function MintButton() {
  const { mint } = useMintStateContext();
  const chainId = useChainId();
  const isBase = chainId === base.id;
  const { switchChain } = useSwitchChain();

  const switchToBase = useCallback(() => {
    switchChain({ chainId: base.id });
  }, [switchChain]);

  if (!isBase) {
    return (
      <Button variant={ButtonVariants.Primary} className="w-fit" onClick={switchToBase}>
        Connect to Base
      </Button>
    );
  }

  return (
    <Button variant={ButtonVariants.Primary} className="w-fit" onClick={mint}>
      Mint
    </Button>
  );
}
