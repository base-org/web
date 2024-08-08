'use client';

import UsernameProfileContent from 'apps/web/src/components/Basenames/UsernameProfileContent';
import UsernameProfileSidebar from 'apps/web/src/components/Basenames/UsernameProfileSidebar';
import { useAnalytics } from 'apps/web/contexts/Analytics';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import UsernameProfileSettings from 'apps/web/src/components/Basenames/UsernameProfileSettings';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';

export default function UsernameProfile() {
  const { logEventWithContext } = useAnalytics();

  const { showProfileSettings } = useUsernameProfile();

  logEventWithContext('page_loaded', ActionType.render);

  if (showProfileSettings) return <UsernameProfileSettings />;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col justify-between gap-10 md:flex-row md:px-8">
      <div className="w-full md:max-w-[25rem]">
        <UsernameProfileSidebar />
      </div>
      <div className="w-full">
        <UsernameProfileContent />
      </div>
    </div>
  );
}
