import ProfileProviders from 'apps/web/app/(basenames)/name/[username]/ProfileProviders';
import { Metadata } from 'next';
import {
  fetchAddress,
  fetchDescription,
  formatDefaultUsername,
} from 'apps/web/src/utils/usernames';
import { redirect } from 'next/navigation';
import classNames from 'classnames';
import { BaseName } from '@coinbase/onchainkit/identity';
import UsernameProfile from 'apps/web/src/components/Basenames/UsernameProfile';

type UsernameProfileProps = {
  params: { username: BaseName };
};

export async function generateMetadata({ params }: UsernameProfileProps): Promise<Metadata> {
  const username = await formatDefaultUsername(params.username);
  const defaultDescription = `${username}, a Basename`;
  const description = await fetchDescription(username);

  return {
    metadataBase: new URL('https://base.org'),
    title: `Basenames | ${username}`,
    description: description ?? defaultDescription,
    openGraph: {
      title: `Basenames | ${username}`,
      url: `/${username}`,
      images: [`api/basenames/${username}/assets/coverImage.png`],
    },
  };
}

export default async function Username({ params }: UsernameProfileProps) {
  let username = await formatDefaultUsername(params.username);

  const ensAddress = await fetchAddress(username);

  // Domain doesn't exist
  if (!ensAddress) {
    redirect(`/name/not-found?name=${username}`);
  }

  const usernameProfilePageClasses = classNames(
    'mx-auto mt-32 flex min-h-screen w-full max-w-[1440px] flex-col justify-between gap-10 px-4 px-4 pb-40 md:flex-row md:px-8',
  );

  return (
    <ProfileProviders username={username} address={ensAddress}>
      <main className={usernameProfilePageClasses}>
        <UsernameProfile />
      </main>
    </ProfileProviders>
  );
}
