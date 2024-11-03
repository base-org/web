import { BaseName } from '@coinbase/onchainkit/identity';
import ProfileProviders from 'apps/web/app/(basenames)/name/[username]/ProfileProviders';
import ErrorsProvider from 'apps/web/contexts/Errors';
import FrameBuilder from 'apps/web/src/components/Basenames/ConfigureFramesPageContent/FrameBuilder';
import { FramesProvider } from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/Context';
import { redirectIfNotNameOwner } from 'apps/web/src/utils/redirectIfNotNameOwner';
import { formatDefaultUsername } from 'apps/web/src/utils/usernames';

export type ConfigureFramesProps = {
  params: { username: BaseName };
};

export default async function ConfigureFrames({ params }: ConfigureFramesProps) {
  let username = await formatDefaultUsername(decodeURIComponent(params.username) as BaseName);
  await redirectIfNotNameOwner(username);

  return (
    <ErrorsProvider context="profile_configure_frames">
      <ProfileProviders username={username}>
        <FramesProvider>
          <main className="mx-auto mt-32 flex min-h-screen w-full max-w-[1440px] flex-col justify-between gap-10 px-4 pb-40 md:flex-row md:px-8">
            <FrameBuilder />
          </main>
        </FramesProvider>
      </ProfileProviders>
    </ErrorsProvider>
  );
}
