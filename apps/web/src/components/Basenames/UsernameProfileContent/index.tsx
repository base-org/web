import UsernameProfileSectionBadges from 'apps/web/src/components/Basenames/UsernameProfileSectionBadges';
import UsernameProfileSectionExplore from 'apps/web/src/components/Basenames/UsernameProfileSectionExplore';

export default function UsernameProfileContent() {
  return (
    <div className="flex flex-col gap-8 rounded-2xl border border-[#EBEBEB] p-8 shadow-lg">
      <UsernameProfileSectionBadges />
      <UsernameProfileSectionExplore />
    </div>
  );
}
