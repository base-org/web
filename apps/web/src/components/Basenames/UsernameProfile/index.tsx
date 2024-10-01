'use client';

import UsernameProfileContent from 'apps/web/src/components/Basenames/UsernameProfileContent';
import UsernameProfileSidebar from 'apps/web/src/components/Basenames/UsernameProfileSidebar';
import UsernameProfileSettings from 'apps/web/src/components/Basenames/UsernameProfileSettings';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import UsernameProfileSettingsProvider from 'apps/web/src/components/Basenames/UsernameProfileSettingsContext';

export default function UsernameProfile() {
  const { showProfileSettings } = useUsernameProfile();

  if (showProfileSettings)
    return (
      <UsernameProfileSettingsProvider>
        <UsernameProfileSettings />
      </UsernameProfileSettingsProvider>
    );

  return (
    <div className="mx-auto grid min-h-screen grid-cols-1 gap-10 md:grid-cols-[25rem_minmax(0,1fr)]">
      <div className="w-full">
        <UsernameProfileSidebar />
      </div>
      <div className="w-full">
        <UsernameProfileContent />
      </div>
    </div>
  );
}
