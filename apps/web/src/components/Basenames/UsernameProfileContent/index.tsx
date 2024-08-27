import UsernameProfileSectionBadges from 'apps/web/src/components/Basenames/UsernameProfileSectionBadges';
import UsernameProfileSectionExplore from 'apps/web/src/components/Basenames/UsernameProfileSectionExplore';
import BadgeContextProvider from 'apps/web/src/components/Basenames/UsernameProfileSectionBadges/BadgeContext';
import UsernameProfileCasts from 'apps/web/src/components/Basenames/UsernameProfileCasts';
import { USERNAMES_PINNED_CASTS_ENABLED } from 'apps/web/src/utils/usernames';

export default function UsernameProfileContent() {
  return (
    <div className="flex flex-col gap-8 rounded-2xl border border-[#EBEBEB] p-4 shadow-lg md:gap-12 md:p-12">
      {USERNAMES_PINNED_CASTS_ENABLED && <UsernameProfileCasts />}

      <BadgeContextProvider>
        <UsernameProfileSectionBadges />
      </BadgeContextProvider>
      <UsernameProfileSectionExplore />
    </div>
  );
}
