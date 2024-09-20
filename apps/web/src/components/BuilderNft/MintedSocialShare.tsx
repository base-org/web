import { useMintStateContext } from 'apps/web/src/components/BuilderNft/useMintState';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Link from 'next/link';

const url = 'https://base.org/builder-anniversary-nft';
const shareText = encodeURIComponent(
  `I just minted the Base Quest Mainnet Anniversary NFT by @andreoshea on @base at ${url}`,
);

export function MintedSocialShare() {
  const { txHash } = useMintStateContext();

  return (
    <div className="flex flex-row items-center gap-4">
      <Link href={`https://basescan.org/tx/${txHash}`} target="_blank" rel="noreferrer">
        <Button variant={ButtonVariants.Secondary}>View on Basescan</Button>
      </Link>
      <Link
        href={`https://warpcast.com/~/compose?embeds[]=${encodeURIComponent(
          url,
        )}&text=${shareText}`}
        target="_blank"
        rel="noreferrer"
      >
        <Button variant={ButtonVariants.Secondary}>
          <Icon name="farcaster" />
        </Button>
      </Link>
      <Link
        href={`https://twitter.com/intent/tweet?text=${shareText}`}
        target="_blank"
        rel="noreferrer"
      >
        <Button variant={ButtonVariants.Secondary}>
          <Icon name="twitter" />
        </Button>
      </Link>
    </div>
  );
}
