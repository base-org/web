import ProfileProviders from 'apps/web/app/(basenames)/name/[username]/ProfileProviders';
import { Metadata } from 'next';
import {
  formatDefaultUsername,
  getBasenameAddress,
  getBasenameOwner,
  getBasenameTextRecord,
  UsernameTextRecordKeys,
} from 'apps/web/src/utils/usernames';
import { redirect } from 'next/navigation';
import classNames from 'classnames';
import { BaseName } from '@coinbase/onchainkit/identity';
import UsernameProfile from 'apps/web/src/components/Basenames/UsernameProfile';
import ErrorsProvider from 'apps/web/contexts/Errors';
import DynamicProfilePromo from 'apps/web/src/components/Basenames/ProfilePromo/dynamic';

export type UsernameProfileProps = {
  params: { username: BaseName };
};

export async function generateMetadata({ params }: UsernameProfileProps): Promise<Metadata> {
  const username = await formatDefaultUsername(params.username);
  const defaultDescription = `${username}, a Basename`;
  const description = await getBasenameTextRecord(username, UsernameTextRecordKeys.Description);

  return {
    metadataBase: new URL('https://base.org'),
    title: `Basenames | ${username}`,
    description: description ?? defaultDescription,
    openGraph: {
      title: `Basenames | ${username}`,
      url: `/${username}`,
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

export default async function Username({ params }: UsernameProfileProps) {
  let username = await formatDefaultUsername(decodeURIComponent(params.username) as BaseName);

  const address = await getBasenameAddress(username);
  const owner = await getBasenameOwner(username);

  // Domain does have address or owner (ie: doesn't exist)
  if (!address || !owner) {
    redirect(`/name/not-found?name=${username}`);
  }

  const usernameProfilePageClasses = classNames(
    'mx-auto mt-32 flex min-h-screen w-full max-w-[1440px] flex-col justify-between gap-10 px-4 px-4 pb-40 md:flex-row md:px-8',
  );

  return (
    <ErrorsProvider context="profile">
      <ProfileProviders username={username}>
        <main className={usernameProfilePageClasses}>
          <UsernameProfile />
          <DynamicProfilePromo />
        </main>
      </ProfileProviders>
    </ErrorsProvider>
  );
}
