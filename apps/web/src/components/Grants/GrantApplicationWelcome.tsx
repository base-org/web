import { Dispatch, SetStateAction, useCallback } from 'react';
import Button from 'apps/web/src/components/base-org/Button';
import { ButtonWithLink } from 'apps/web/src/components/Button/ButtonWithLink';
import {
  ConnectWalletButton,
  ConnectWalletButtonVariants,
} from 'apps/web/src/components/ConnectWalletButton/ConnectWalletButton';
import { FormStates } from 'apps/web/src/components/Grants/grantApplicationTypes';

type WelcomeProps = {
  addressCheck: boolean;
  basenameCheck: boolean;
  formSetter: Dispatch<SetStateAction<FormStates>>;
};

export default function GrantApplicationWelcome({
  addressCheck,
  basenameCheck,
  formSetter,
}: WelcomeProps) {
  const handleClick = useCallback(() => formSetter(FormStates.Started), [formSetter]);

  if (!addressCheck) {
    return (
      <div className="flex flex-col items-center gap-6 pb-16">
        <div className="text-center text-xl">Please connect a wallet to continue.</div>
        <ConnectWalletButton connectWalletButtonVariant={ConnectWalletButtonVariants.BaseOrg} />
      </div>
    );
  }

  if (!basenameCheck) {
    return (
      <div className="flex flex-col items-center gap-6 pb-16">
        <div className="text-center text-xl">
          This wallet is not associated with a basename. <br />
          Please connect another address or claim a basename to continue.
        </div>
        <ButtonWithLink href="/names">Claim a Basename</ButtonWithLink>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 pb-16">
      <div className="text-center text-xl">
        Thank you for your enthusiasm for Base! We are excited to support awesome builders like you.{' '}
        <br />
        Please fill out this form to nominate yourself or others for a Base Grant!
      </div>
      <Button onClick={handleClick}>Start Application</Button>
    </div>
  );
}
