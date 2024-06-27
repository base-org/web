import UsernameDescriptionField from 'apps/web/src/components/Basenames/UsernameDescriptionField';
import UsernameSocialHandleField from 'apps/web/src/components/Basenames/UsernameSocialHandleField';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import Fieldset from 'apps/web/src/components/Fieldset';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Label from 'apps/web/src/components/Label';
import { SocialPlatform } from 'apps/web/src/utils/socialPlatforms';
import classNames from 'classnames';
import { useCallback, useState } from 'react';

export enum FormSteps {
  Description = 'description',
  Socials = 'socials',
}

export const socialPlatformsEnabled = [
  SocialPlatform.Twitter,
  SocialPlatform.Farcaster,
  SocialPlatform.Lens,
  SocialPlatform.Telegram,
  SocialPlatform.Discord,
];

export function UsernameProfileForm() {
  const [currentFormStep, setCurrentFormStep] = useState<FormSteps>(FormSteps.Description);
  const formClasses = classNames(
    ' min-w-[26rem] flex flex-col justify-between gap-4 rounded-2xl bg-white p-8 text-gray/60 shadow-xl  md:items-center',
  );

  const descriptionLabelChildren = (
    <div className="flex w-full cursor-pointer flex-col">
      <p className="flex flex-row justify-between text-black">
        <div className="flex flex-row items-center gap-1 text-blue-500">
          <Icon name="blueCircle" color="currentColor" height="0.8rem" width="0.8rem" />
          <strong className="text-black">Add Bio</strong>
        </div>
        <span>Step 1 of 2</span>
      </p>
    </div>
  );

  const socialsLabelChildren = (
    <div className="flex w-full cursor-pointer flex-col">
      <p className="flex flex-row justify-between text-black">
        <div className="flex flex-row items-center gap-1 text-blue-500">
          <Icon name="blueCircle" color="currentColor" height="0.8rem" width="0.8rem" />
          <strong className="text-black">Add Socials</strong>
        </div>
        <span>Step 2 of 2</span>
      </p>
    </div>
  );

  const onClickSkip = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (currentFormStep === FormSteps.Description) setCurrentFormStep(FormSteps.Socials);
      if (currentFormStep === FormSteps.Socials) {
        // TODO: Redirects to userprofile
      }
    },
    [currentFormStep],
  );

  const onClickSave = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (currentFormStep === FormSteps.Description) {
        // TODO: Contract call
        // On success, setCurrentFormStep(FormSteps.Socials);
      }
    },
    [currentFormStep],
  );

  return (
    <form className={formClasses}>
      {currentFormStep === FormSteps.Description && (
        <UsernameDescriptionField labelChildren={descriptionLabelChildren} />
      )}
      {currentFormStep === FormSteps.Socials && (
        <Fieldset>
          <Label>{socialsLabelChildren}</Label>
          {socialPlatformsEnabled.map((socialPlatform) => (
            <UsernameSocialHandleField key={socialPlatform} socialPlatform={socialPlatform} />
          ))}
        </Fieldset>
      )}

      <div className="flex w-full flex-row gap-4">
        <Button variant={ButtonVariants.Gray} rounded fullWidth onClick={onClickSkip}>
          Skip
        </Button>
        <Button variant={ButtonVariants.Black} rounded fullWidth onClick={onClickSave}>
          Next
        </Button>
      </div>
    </form>
  );
}
