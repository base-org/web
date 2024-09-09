import { BaseName } from '@coinbase/onchainkit/identity';
import ProfileProviders from 'apps/web/app/(basenames)/name/[username]/ProfileProviders';
import ErrorsProvider from 'apps/web/contexts/Errors';
import {
  formatDefaultUsername,
  getBasenameAddress,
  getBasenameEditor,
  getBasenameOwner,
} from 'apps/web/src/utils/usernames';
import classNames from 'classnames';
import { redirect } from 'next/navigation';

export type ConfigureFramesProps = {
  params: { username: BaseName };
};

export default async function ConfigureFrames({ params }: ConfigureFramesProps) {
  let username = await formatDefaultUsername(decodeURIComponent(params.username) as BaseName);

  const address = await getBasenameAddress(username);
  const editor = await getBasenameEditor(username);
  const owner = await getBasenameOwner(username);

  // Domain does have address or editor (ie: doesn't exist)
  if (!address || !editor || !owner) {
    redirect(`/name/not-found?name=${username}`);
  }

  const usernameProfilePageClasses = classNames(
    'mx-auto mt-32 flex min-h-screen w-full max-w-[1440px] flex-col justify-between gap-10 px-4 px-4 pb-40 md:flex-row md:px-8',
  );

  return (
    <ErrorsProvider context="profile">
      <ProfileProviders username={username}>
        <main className={usernameProfilePageClasses} />
      </ProfileProviders>
    </ErrorsProvider>
  );
}
