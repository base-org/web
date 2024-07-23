import UsernameProfileContent from 'apps/web/src/components/Basenames/UsernameProfileContent';
import UsernameProfileSidebar from 'apps/web/src/components/Basenames/UsernameProfileSidebar';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { useAnalytics } from 'apps/web/contexts/Analytics';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import { useRouter } from 'next/navigation';
import { formatBaseEthDomain, USERNAME_DOMAIN } from 'apps/web/src/utils/usernames';

export default function UsernameProfile() {
  const { profileAddress, profileUsername, profileAddressIsLoading } = useUsernameProfile();
  const { logEventWithContext } = useAnalytics();
  const router = useRouter();

  if (!profileUsername.endsWith(USERNAME_DOMAIN)) {
    router.push(formatBaseEthDomain(profileUsername));
  }

  if (profileAddressIsLoading) {
    logEventWithContext('page_loading', ActionType.render);

    return (
      <main className="flex min-h-screen items-center justify-center">
        <Icon name="spinner" color="currentColor" height="2rem" width="2rem" />
      </main>
    );
  }

  if (!profileAddress) {
    logEventWithContext('page_unavailable', ActionType.error, { error: 'No address resolved' });

    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1>Name not found</h1>
      </main>
    );
  }
  if (!profileUsername) {
    logEventWithContext('page_unavailable', ActionType.error, { error: 'No username provided' });

    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1>Name not found</h1>
      </main>
    );
  }

  logEventWithContext('page_loaded', ActionType.render);

  return (
    <main className="mx-auto mt-32 flex min-h-screen w-full max-w-[1440px] flex-col justify-between gap-10 px-4 px-4 pb-40  md:flex-row md:px-8">
      <div className="w-full md:max-w-[25rem]">
        <UsernameProfileSidebar />
      </div>
      <div className="w-full">
        <UsernameProfileContent />
      </div>
    </main>
  );
}
