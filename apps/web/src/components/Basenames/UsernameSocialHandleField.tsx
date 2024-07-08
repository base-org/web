import Fieldset from 'apps/web/src/components/Fieldset';
import Input from 'apps/web/src/components/Input';
import Label from 'apps/web/src/components/Label';
import {
  SocialPlatform,
  socialPlatformHandleFunction,
  socialPlatformsNameForDisplay,
} from 'apps/web/src/utils/socialPlatforms';
import {
  UsernameTextRecordKeys,
  socialPlatformToTextRecordKeys,
} from 'apps/web/src/utils/usernames';

import { ChangeEvent, useCallback, useId } from 'react';

export type UsernameSocialHandleFieldProps = {
  socialPlatform: SocialPlatform;
  onChange: (key: UsernameTextRecordKeys, value: string) => void;
  value: string;
  disabled?: boolean;
};

export default function UsernameSocialHandleField({
  socialPlatform,
  onChange,
  value,
  disabled = false,
}: UsernameSocialHandleFieldProps) {
  const usernameSocialHandleFieldId = useId();
  const handleFunction = socialPlatformHandleFunction[socialPlatform];
  const handle = handleFunction({ handle: 'username' });
  const textRecordKey = socialPlatformToTextRecordKeys[socialPlatform];
  const onChangeSocialHandle = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const socialHandleValue = event.target.value;

      if (onChange) onChange(textRecordKey, socialHandleValue);
    },
    [onChange, textRecordKey],
  );

  return (
    <Fieldset inline>
      <Label htmlFor={usernameSocialHandleFieldId} className="w-full max-w-[6rem]">
        {socialPlatformsNameForDisplay[socialPlatform]}
      </Label>
      <Input
        id={usernameSocialHandleFieldId}
        placeholder={handle}
        className="flex-1 rounded-md border border-line/20 p-2 text-black"
        disabled={disabled}
        value={value}
        autoComplete="off"
        type="text"
        onChange={onChangeSocialHandle}
        data-1p-ignore
      />
    </Fieldset>
  );
}
