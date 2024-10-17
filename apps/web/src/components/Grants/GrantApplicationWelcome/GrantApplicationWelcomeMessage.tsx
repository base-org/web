'use client';

import { DOMAIN } from 'apps/web/pages/api/basenames/frame/constants';
import { useFrameContext } from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/Context';
import Frame from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/Frame';
import {
  ConnectWalletButton,
  ConnectWalletButtonVariants,
} from 'apps/web/src/components/ConnectWalletButton/ConnectWalletButton';
import { WelcomeProps } from 'apps/web/src/components/Grants/GrantApplicationWelcome/GrantApplicationWelcome';
import { Suspense } from 'react';

export default function WelcomeMessage({ addressCheck, basenameCheck }: WelcomeProps) {
  const { frameInteractionError } = useFrameContext();

  let welcomeMessage: React.ReactNode;
  if (!addressCheck) {
    welcomeMessage = (
      <>
        <div className="text-center text-xl">Please connect a wallet to continue.</div>
        <ConnectWalletButton
          cta="Login with Basename"
          connectWalletButtonVariant={ConnectWalletButtonVariants.BaseOrg}
        />
      </>
    );
  } else if (!basenameCheck) {
    welcomeMessage = (
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

  return (
    <>
      {welcomeMessage}
      {frameInteractionError && <div>{frameInteractionError}</div>}
    </>
  );
}
