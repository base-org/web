import UsernameProfileSectionBadges from 'apps/web/src/components/Basenames/UsernameProfileSectionBadges';
import UsernameProfileSectionExplore from 'apps/web/src/components/Basenames/UsernameProfileSectionExplore';
import BadgeContextProvider from 'apps/web/src/components/Basenames/UsernameProfileSectionBadges/BadgeContext';

import NeymarCast from 'apps/web/src/components/NeymarCast';

export default function UsernameProfileContent() {
  const identifier = 'https://warpcast.com/morpheus-network/0xda14ca4b';
  return (
    <div className="flex flex-col gap-8 rounded-2xl border border-[#EBEBEB] p-4 shadow-lg md:gap-12 md:p-12">
      <section>
        <div className="max-w-2/3">
          <NeymarCast identifier={identifier} type="url" />
        </div>
      </section>
      <BadgeContextProvider>
        <UsernameProfileSectionBadges />
      </BadgeContextProvider>
      <UsernameProfileSectionExplore />
    </div>
  );
}
