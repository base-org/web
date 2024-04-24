import { useMintState } from 'apps/web/src/components/BuilderNft/useMintState';
import { Button } from 'apps/web/src/components/Button/Button';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Link from 'next/link';

const url = 'https://base.org/builder-nft';
const shareText = encodeURIComponent(`I just minted my Base Mainnet Builder NFT on ${url}`);

export function MintedSocialShare() {
  const { txHash } = useMintState();

  return (
    <div className="flex flex-row items-center gap-4">
      <Link href={`https://basescan.org/tx/${txHash}`} target="_blank" rel="noreferrer">
        <Button variant="secondary">View on Basescan</Button>
      </Link>
      <Link
        href={`https://warpcast.com/~/compose?embeds[]=${encodeURIComponent(
          url,
        )}&text=${shareText}`}
        target="_blank"
        rel="noreferrer"
      >
        <Button variant="secondary">
          <Icon name="farcaster" />
        </Button>
      </Link>
      <Link
        href={`https://twitter.com/intent/tweet?text=${shareText}`}
        target="_blank"
        rel="noreferrer"
      >
        <Button variant="secondary">
          <Icon name="twitter" />
        </Button>
      </Link>
    </div>
  );
}
