import { FramesProvider } from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/Context';
import GrantsFaq from 'apps/web/src/components/Grants/GrantsFaq';
import WelcomeMessage from 'apps/web/src/components/Grants/GrantApplicationWelcome/GrantApplicationWelcomeMessage';

export type WelcomeProps = {
  addressCheck: boolean;
  basenameCheck: boolean;
};

export default function GrantApplicationWelcome({ addressCheck, basenameCheck }: WelcomeProps) {
  return (
    <FramesProvider>
      <div className="flex flex-col items-center gap-6 pb-16">
        <WelcomeMessage addressCheck={addressCheck} basenameCheck={basenameCheck} />
        <GrantsFaq />
      </div>
    </FramesProvider>
  );
}
