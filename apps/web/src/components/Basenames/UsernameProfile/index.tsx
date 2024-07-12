import UsernameProfileContent from 'apps/web/src/components/Basenames/UsernameProfileContent';
import UsernameProfileSidebar from 'apps/web/src/components/Basenames/UsernameProfileSidebar';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import { Icon } from 'apps/web/src/components/Icon/Icon';

export default function UsernameProfile() {
  const { profileAddress, profileUsername, profileAddressIsLoading } = useUsernameProfile();

  if (profileAddressIsLoading)
    return (
      <main className="flex min-h-screen items-center justify-center">
        <Icon name="spinner" color="currentColor" height="2rem" width="2rem" />
      </main>
    );

  if (!profileUsername || !profileAddress) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1>Name not found</h1>
      </main>
    );
  }

  return (
    <main className="mx-auto mt-32 flex min-h-screen w-full max-w-[1440px] flex-col justify-between gap-10 p-8 pb-40 md:flex-row">
      <div className="w-full md:max-w-[25rem]">
        <UsernameProfileSidebar />
      </div>
      <div className="w-full">
        <UsernameProfileContent />
      </div>
    </main>
  );
}
