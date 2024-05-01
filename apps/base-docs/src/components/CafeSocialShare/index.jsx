import React from 'react';
import { Button } from 'apps/web/src/components/Button/Button';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Link from 'next/link';

const url = 'https://base.org/camp';

export type CafeSocialShareProps = {
  name: string,
};

export function CafeSocialShare({ name }: CafeSocialShareProps) {
  const shareText = encodeURIComponent(
    `I earned my ${name} badge on Base Camp!  Learn to build the onchain future at ${url}.`,
  );

  return (
    <div className="flex flex-row items-center gap-4">
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
