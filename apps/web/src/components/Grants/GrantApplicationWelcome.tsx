import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import Button from 'apps/web/src/components/base-org/Button';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Link from 'apps/web/src/components/Link';
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

  let welcomeMessage: React.ReactNode;
  if (!addressCheck) {
    welcomeMessage = (
      <>
        <div className="text-center text-xl">Please connect a wallet to continue.</div>
        <ConnectWalletButton connectWalletButtonVariant={ConnectWalletButtonVariants.BaseOrg} />
      </>
    );
  } else if (!basenameCheck) {
    welcomeMessage = (
      <>
        <div className="text-center text-xl">
          This wallet is not associated with a basename. <br />
          Please connect another address or claim a basename to continue.
        </div>
        <ButtonWithLink href="/names">Claim a Basename</ButtonWithLink>
      </>
    );
  } else {
    welcomeMessage = (
      <>
        <div className="text-center text-xl">
          Thank you for your enthusiasm for Base! We are excited to support awesome builders like
          you. <br />
          Please fill out this form to nominate yourself or others for a Base Grant!
        </div>
        <Button onClick={handleClick}>Start Application</Button>
      </>
    );
  }
  return (
    <div className="flex flex-col items-center gap-6 pb-16">
      {welcomeMessage}
      <div>
        <h2 className="mb-4 mt-12 text-2xl">Application FAQ</h2>
        <FaqItem
          question="What is a Base Builder Grant?"
          answer={
            <ul className="mt-4 flex list-inside list-disc flex-col items-start">
              <li className="mb-2">
                You must log in with your Basename to submit your application
              </li>
              <li className="mb-2">
                Read more{' '}
                <Link
                  className="underline hover:text-gray-30 hover:no-underline"
                  href="https://paragraph.xyz/@grants.base.eth/calling-based-builders"
                >
                  here
                </Link>
              </li>
            </ul>
          }
        />
        <FaqItem
          question="What are the application requirements?"
          answer={
            <ul className="mt-4 flex list-inside list-disc flex-col items-start">
              <li className="mb-2">
                You must log in with your Basename to submit your application
              </li>
              <li className="mb-2">Your project must be live on Base Mainnet</li>
            </ul>
          }
        />
        <FaqItem
          question="How can I set myself up for success?"
          answer={
            <ul className="mt-4 flex list-inside list-disc flex-col items-start">
              <li className="mb-2">
                Apply with a project that's unique, fun, and/or making an impact
              </li>
              <li className="mb-2">Build something that brings more users onchain</li>
            </ul>
          }
        />
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: JSX.Element | string }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="mb-8">
      <button className="flex w-full flex-row justify-between" onClick={toggleOpen} type="button">
        <span className="text-xl">{question}</span>
        <Icon name="caret" width="24" height="24" />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div>{answer}</div>
      </div>
    </div>
  );
}
