import React from 'react';
import { Button } from '../Button/Button';
import { Icon } from '../SocialIcon/Icon';

const url = 'https://base.org/camp';

export function CafeSocialShare({ name }) {
  const shareText = encodeURIComponent(
    `I earned my ${name} badge on Base Camp!  Join Onchain Summer and learn to build the future at ${url}.`,
  );

  return (
    <div className="flex flex-row items-center gap-4">
      <a
        href={`https://warpcast.com/~/compose?embeds[]=${encodeURIComponent(
          url,
        )}&text=${shareText}`}
        target="_blank"
        rel="noreferrer"
      >
        <Button variant="secondary">
          <Icon name="farcaster" />
        </Button>
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${shareText}`}
        target="_blank"
        rel="noreferrer"
      >
        <Button variant="secondary">
          <Icon name="twitter" />
        </Button>
      </a>
    </div>
  );
}
