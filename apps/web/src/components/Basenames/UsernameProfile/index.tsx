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
    <div className="mx-auto flex min-h-screen flex-col justify-between gap-10 md:flex-row">
      <div className="w-full md:max-w-[25rem]">
        <UsernameProfileSidebar />
      </div>
      <div className="w-full">
        <UsernameProfileContent />
      </div>
    </div>
  );
}
