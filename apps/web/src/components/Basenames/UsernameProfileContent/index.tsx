import UsernameProfileSectionBadges from 'apps/web/src/components/Basenames/UsernameProfileSectionBadges';
import UsernameProfileSectionExplore from 'apps/web/src/components/Basenames/UsernameProfileSectionExplore';
import BadgeContextProvider from 'apps/web/src/components/Basenames/UsernameProfileSectionBadges/BadgeContext';
import NeymarProvider from 'apps/web/src/contexts/NeymarProvider';
import NeymarFarcasterFrames from 'apps/web/src/components/NeymarFarcasterFrames';
import { NeynarAuthButton, NeynarCastCard } from '@neynar/react';

export default function UsernameProfileContent() {
  const identifier = 'https://warpcast.com/morpheus-network/0xda14ca4b';
  return (
    <div className="flex flex-col gap-8 rounded-2xl border border-[#EBEBEB] p-4 shadow-lg md:gap-12 md:p-12">
      <section>
        <NeymarProvider>
          <span>Neymar Login</span>
          <NeynarAuthButton />
          <span>Neymar default cast:</span>
          <NeynarCastCard identifier={identifier} type="url" />
          <span>Hackery frames from cast:</span>
          <NeymarFarcasterFrames identifier={identifier} type="url" />
        </NeymarProvider>
      </section>
      <BadgeContextProvider>
        <UsernameProfileSectionBadges />
      </BadgeContextProvider>
      <UsernameProfileSectionExplore />
    </div>
  );
}
