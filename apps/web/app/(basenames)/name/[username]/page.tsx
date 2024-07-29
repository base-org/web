import ProfileProviders from 'apps/web/app/(basenames)/name/[username]/ProfileProviders';
import { Metadata } from 'next';
import { base } from 'viem/chains';
import {
  fetchAddress,
  fetchDescription,
  formatDefaultUsername,
  USERNAME_DOMAINS,
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
    title: `Basenames | ${params.username}`,
    description: description ?? defaultDescription,
    openGraph: {
      title: `Basenames | ${params.username}`,
      url: `/${username}`,
      images: [`/${params.username}/assets/coverImage.png`],
    },
  };
}

export default async function Username({ params }: UsernameProfileProps) {
  let username = params.username;

  // redirect /[name].base.eth to /name
  if (username.endsWith(`.${USERNAME_DOMAINS[base.id]}`)) {
    return redirect(username.replace(`.${USERNAME_DOMAINS[base.id]}`, ''));
  }

  username = await formatDefaultUsername(params.username);

  const usernameProfilePageClasses = classNames(
    'mx-auto mt-32 flex min-h-screen w-full max-w-[1440px] flex-col justify-between gap-10 px-4 px-4 pb-40 md:flex-row md:px-8',
  );

  const ensAddress = await fetchAddress(username);

  // Domain doesn't exist
  if (!ensAddress) {
    redirect(`/name/not-found?name=${username}`);
  }

  return (
    <ProfileProviders username={username} address={ensAddress}>
      <main className={usernameProfilePageClasses}>
        <UsernameProfile />
      </main>
    </ProfileProviders>
  );
}
