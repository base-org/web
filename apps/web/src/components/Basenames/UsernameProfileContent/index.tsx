import UsernameProfileSectionBadges from 'apps/web/src/components/Basenames/UsernameProfileSectionBadges';
import UsernameProfileSectionExplore from 'apps/web/src/components/Basenames/UsernameProfileSectionExplore';
import BadgeContextProvider from 'apps/web/src/components/Basenames/UsernameProfileSectionBadges/BadgeContext';
import NeymarProvider from 'apps/web/src/contexts/NeymarProvider';
import NeymarFarcasterFrames from 'apps/web/src/components/NeymarFarcasterFrames';

export default function UsernameProfileContent() {
  return (
    <div className="flex flex-col gap-8 rounded-2xl border border-[#EBEBEB] p-4 shadow-lg md:gap-12 md:p-12">
      <section>
        <NeymarProvider>
          <NeymarFarcasterFrames />
        </NeymarProvider>
      </section>
      <BadgeContextProvider>
        <UsernameProfileSectionBadges />
      </BadgeContextProvider>
      <UsernameProfileSectionExplore />
    </div>
  );
}
