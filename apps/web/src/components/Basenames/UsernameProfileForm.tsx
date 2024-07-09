import UsernameDescriptionField from 'apps/web/src/components/Basenames/UsernameDescriptionField';
import UsernameSocialHandleField from 'apps/web/src/components/Basenames/UsernameSocialHandleField';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import Fieldset from 'apps/web/src/components/Fieldset';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Label from 'apps/web/src/components/Label';
import useReadBaseEnsTextRecords from 'apps/web/src/hooks/useReadBaseEnsTextRecords';
import useWriteBaseEnsTextRecords from 'apps/web/src/hooks/useWriteBaseEnsTextRecords';
import { SocialPlatform } from 'apps/web/src/utils/socialPlatforms';
import {
  UsernameTextRecords,
  UsernameTextRecordKeys,
  socialPlatformToTextRecordKeys,
} from 'apps/web/src/utils/usernames';
import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { baseSepolia } from 'viem/chains';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';

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

  const { address } = useAccount();
  const fakeAddress = address ?? '0x63e216601B3588a5B54d9f961cFFc4af916a63c7';

  // Get textRecords (for display)
  const { existingTextRecords, existingTextRecordsIsLoading, refetchExistingTextRecords } =
    useReadBaseEnsTextRecords({
      address: fakeAddress,
      chainId: baseSepolia.id,
    });

  // Write text records
  const { writeTextRecords, writeTextRecordsIsPending, writeTextRecordsTransactionHash } =
    useWriteBaseEnsTextRecords({
      address: fakeAddress,
      chainId: baseSepolia.id,
    });

  // Wait for text record transaction to be processed
  const { isFetching: transactionIsFetching, isSuccess: transactionIsSuccess } =
    useWaitForTransactionReceipt({
      hash: writeTextRecordsTransactionHash,
      query: {
        enabled: !!writeTextRecordsTransactionHash,
      },
    });

  const [textRecords, setTextRecords] = useState<UsernameTextRecords>(existingTextRecords);

  useEffect(() => {
    if (transactionIsSuccess) {
      refetchExistingTextRecords()
        .then(() => {})
        .catch(() => {});
    }
  }, [refetchExistingTextRecords, transactionIsSuccess]);

  useEffect(() => {
    setTextRecords(existingTextRecords);
  }, [existingTextRecords]);

  const updateTextRecords = useCallback((key: UsernameTextRecordKeys, value: string) => {
    setTextRecords((previousTextRecords) => {
      return {
        ...previousTextRecords,
        [key]: value,
      };
    });
  }, []);

  const onClickSkip = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (currentFormStep === FormSteps.Description) {
        // Reset description to the existing description (onchain)
        updateTextRecords(
          UsernameTextRecordKeys.Description,
          existingTextRecords[UsernameTextRecordKeys.Description],
        );

        // Skip to next step
        setCurrentFormStep(FormSteps.Socials);
      }
      if (currentFormStep === FormSteps.Socials) {
        // Reset social handles to the existing description (onchain)
        socialPlatformsEnabled.map((socialPlatform) => {
          const usernameTextRecordKeys = socialPlatformToTextRecordKeys[socialPlatform];
          updateTextRecords(usernameTextRecordKeys, existingTextRecords[usernameTextRecordKeys]);
        });

        // TODO: Redirects to userprofile
      }
    },
    [currentFormStep, existingTextRecords, updateTextRecords],
  );

  const onClickSave = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (currentFormStep === FormSteps.Description) {
        // We are saving this in the state, so saving description = go to social
        setCurrentFormStep(FormSteps.Socials);
      }

      if (currentFormStep === FormSteps.Socials) {
        // Contract call
        writeTextRecords(textRecords)
          .then(() => {
            // TODO: Redirects to userprofile
          })
          .catch(() => {
            // TODO: Show an error
          });
      }

      event.preventDefault();
    },
    [currentFormStep, textRecords, writeTextRecords],
  );

  const onChangeTextRecord = useCallback(
    (key: UsernameTextRecordKeys, value: string) => {
      updateTextRecords(key, value);
    },
    [updateTextRecords],
  );

  const formClasses = classNames(
    'flex flex-col justify-between gap-4 text-gray/60 md:items-center',
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

  const isLoading =
    existingTextRecordsIsLoading || writeTextRecordsIsPending || transactionIsFetching;

  return (
    <form className={formClasses}>
      {currentFormStep === FormSteps.Description && (
        <UsernameDescriptionField
          labelChildren={descriptionLabelChildren}
          onChange={onChangeTextRecord}
          value={textRecords[UsernameTextRecordKeys.Description]}
          disabled={isLoading}
        />
      )}
      {currentFormStep === FormSteps.Socials && (
        <Fieldset>
          <Label>{socialsLabelChildren}</Label>
          {socialPlatformsEnabled.map((socialPlatform) => (
            <UsernameSocialHandleField
              key={socialPlatform}
              socialPlatform={socialPlatform}
              onChange={onChangeTextRecord}
              value={textRecords[socialPlatformToTextRecordKeys[socialPlatform]]}
              disabled={isLoading}
            />
          ))}
        </Fieldset>
      )}
      <div className="flex w-full flex-row gap-4">
        <Button
          variant={ButtonVariants.Gray}
          rounded
          fullWidth
          disabled={isLoading}
          onClick={onClickSkip}
        >
          Skip
        </Button>
        <Button
          variant={ButtonVariants.Black}
          rounded
          fullWidth
          disabled={isLoading}
          isLoading={isLoading}
          onClick={onClickSave}
        >
          Next
        </Button>
      </div>
    </form>
  );
}
