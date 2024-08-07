import UsernameProfileSectionFrames from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames';
import UsernameProfileSectionBadges from 'apps/web/src/components/Basenames/UsernameProfileSectionBadges';
import UsernameProfileSectionExplore from 'apps/web/src/components/Basenames/UsernameProfileSectionExplore';

export default function UsernameProfileContent() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[#EBEBEB] p-4 shadow-lg sm:gap-8 sm:p-8">
      <UsernameProfileSectionFrames />
      <UsernameProfileSectionBadges />
      <UsernameProfileSectionExplore />
    </div>
  );
}
