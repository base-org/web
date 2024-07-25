import UsernameProfileContent from 'apps/web/src/components/Basenames/UsernameProfileContent';
import UsernameProfileSidebar from 'apps/web/src/components/Basenames/UsernameProfileSidebar';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { useAnalytics } from 'apps/web/contexts/Analytics';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import { useRouter } from 'next/navigation';
import { formatBaseEthDomain, USERNAME_DOMAINS } from 'apps/web/src/utils/usernames';
import UsernameProfileNotFound from 'apps/web/src/components/Basenames/UsernameProfileNotFound';
import classNames from 'classnames';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';

export default function UsernameProfile() {
  const { profileAddress, profileUsername, profileAddressIsLoading } = useUsernameProfile();
  const { logEventWithContext } = useAnalytics();
  const router = useRouter();
  const { basenameChain } = useBasenameChain();
  const usernameProfilePageClasses = classNames(
    'mx-auto mt-32 flex min-h-screen w-full max-w-[1440px] flex-col justify-between gap-10 px-4 px-4 pb-40 md:flex-row md:px-8',
  );

  if (!profileUsername.endsWith(USERNAME_DOMAINS[basenameChain.id])) {
    router.push(formatBaseEthDomain(profileUsername, basenameChain.id));
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
      <main className={classNames(usernameProfilePageClasses, 'items-center justify-center')}>
        <UsernameProfileNotFound username={profileUsername} />
      </main>
    );
  }

  logEventWithContext('page_loaded', ActionType.render);

  return (
    <main className={usernameProfilePageClasses}>
      <div className="w-full md:max-w-[25rem]">
        <UsernameProfileSidebar />
      </div>
      <div className="w-full">
        <UsernameProfileContent />
      </div>
    </main>
  );
}
