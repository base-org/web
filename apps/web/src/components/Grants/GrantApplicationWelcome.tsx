import { Suspense } from 'react';
import { FramesProvider } from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/Context';
import Frame from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/Frame';
import { DOMAIN } from 'apps/web/pages/api/basenames/frame/constants';
import {
  ConnectWalletButton,
  ConnectWalletButtonVariants,
} from 'apps/web/src/components/ConnectWalletButton/ConnectWalletButton';
import GrantsFaq from 'apps/web/src/components/Grants/GrantsFaq';

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

function WelcomeMessage({ addressCheck, basenameCheck }: WelcomeProps) {
  if (!addressCheck) {
    return (
      <Suspense>
        <div className="text-center text-xl">Please connect a wallet to continue.</div>
        <ConnectWalletButton
          cta="Login with Basename"
          connectWalletButtonVariant={ConnectWalletButtonVariants.BaseOrg}
        />
      </Suspense>
    );
  } else if (!basenameCheck) {
    return (
      <>
        <div className="text-center text-xl">
          This wallet is not associated with a basename. <br />
          Please connect another address or claim a basename to continue.
        </div>
        <div className="h-auto w-full border-2 border-white p-2 lg:h-[495px] lg:w-[797px]">
          <Suspense fallback={<div>Loading frame...</div>}>
            <Frame url={`${DOMAIN}/names`} className="text-black" />
          </Suspense>
        </div>
      </>
    );
  }

  return null;
}
